import { NextRequest, NextResponse } from "next/server";
import { saveMessage } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const OWNER_EMAIL = process.env.OWNER_EMAIL || "aropcip@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 150;
const MAX_MESSAGE = 3000;
const MAX_SERVICE = 150;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  // Max 5 solicitudes cada 10 minutos por IP — evita spam del formulario.
  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const { name, email, message, service, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden field real visitors never see or fill in. Bots
  // that auto-fill every input on the form will trip it — we report
  // success without actually sending anything, so they don't learn
  // to avoid this field on the next attempt.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true, mailError: null });
  }

  if (
    [name, email, message].some(
      (field) => typeof field !== "string" || (field as string).trim() === ""
    )
  ) {
    return NextResponse.json(
      { error: "Todos los campos son obligatorios" },
      { status: 400 }
    );
  }

  const nameStr = (name as string).trim();
  const emailStr = (email as string).trim();
  const messageStr = (message as string).trim();

  if (nameStr.length > MAX_NAME || messageStr.length > MAX_MESSAGE || emailStr.length > MAX_EMAIL) {
    return NextResponse.json({ error: "Uno de los campos es demasiado largo" }, { status: 400 });
  }
  if (!EMAIL_RE.test(emailStr)) {
    return NextResponse.json({ error: "Correo electrónico inválido" }, { status: 400 });
  }

  // Save to database
  await saveMessage(nameStr, emailStr, messageStr);

  // Detect service from message if not provided
  const serviceName =
    typeof service === "string" && service.trim()
      ? service.trim().slice(0, MAX_SERVICE)
      : "No especificado";

  // Everything below is user input echoed back into an HTML email —
  // escape it so nobody can inject markup/scripts into the message
  // the owner opens in their inbox.
  const safeName = escapeHtml(nameStr);
  const safeEmail = escapeHtml(emailStr);
  const safeService = escapeHtml(serviceName);
  const safeMessage = escapeHtml(messageStr).replace(/\n/g, "<br/>");

  // Send email notification to owner
  const now = new Date().toLocaleString("es-CL", {
    timeZone: "America/Santiago",
    dateStyle: "full",
    timeStyle: "short",
  });

  const emailHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
    .card { background: #fff; border-radius: 12px; padding: 32px; max-width: 540px; margin: 0 auto; border: 1px solid #e2e8f0; }
    .header { background: #1d4ed8; color: white; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; }
    .header h1 { margin: 0; font-size: 18px; }
    .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.85; }
    .row { display: flex; gap: 8px; margin-bottom: 12px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; min-width: 90px; }
    .value { font-size: 14px; color: #1e293b; font-weight: 500; }
    .message-box { background: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 16px; font-size: 14px; line-height: 1.6; color: #334155; }
    .service-badge { display: inline-block; background: #dbeafe; color: #1d4ed8; border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 600; }
    .footer { margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center; }
    .divider { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
    .action { background: #1d4ed8; color: white; text-decoration: none; border-radius: 8px; padding: 12px 24px; font-size: 14px; font-weight: 600; display: inline-block; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🔔 Nueva solicitud de servicio</h1>
      <p>${now}</p>
    </div>

    <div class="row">
      <span class="label">Cliente</span>
      <span class="value">${safeName}</span>
    </div>
    <div class="row">
      <span class="label">Email</span>
      <span class="value"><a href="mailto:${safeEmail}" style="color:#1d4ed8;">${safeEmail}</a></span>
    </div>
    <div class="row">
      <span class="label">Servicio</span>
      <span class="service-badge">${safeService}</span>
    </div>

    <hr class="divider" />

    <div class="label" style="margin-bottom:8px;">Descripción del problema</div>
    <div class="message-box">${safeMessage}</div>

    <hr class="divider" />

    <div style="font-size:13px; color:#475569; background:#f0f9ff; border-radius:8px; padding:14px 16px; border-left:4px solid #1d4ed8;">
      <strong style="color:#1e293b;">📋 ¿Qué debes hacer ahora?</strong><br/><br/>
      1. Responde a <strong>${safeName}</strong> en su correo:<br/>
      &nbsp;&nbsp;&nbsp;<a href="mailto:${safeEmail}" style="color:#1d4ed8; font-weight:600;">${safeEmail}</a><br/><br/>
      2. Coordina el diagnóstico del equipo ($4.000).<br/>
      3. Confirma si el servicio es <strong>presencial o remoto</strong> y tu disponibilidad horaria.<br/><br/>
      <span style="color:#64748b; font-size:12px;">Este aviso llegó a tu correo: <strong>aropcip@gmail.com</strong></span>
    </div>

    <div class="footer">Notificación automática · Soporte Técnico Informático</div>
  </div>
</body>
</html>
`;

  let mailError: string | null = null;
  try {
    await sendMail({
      to: OWNER_EMAIL,
      subject: `[Soporte] Nueva solicitud de ${nameStr} — ${serviceName}`,
      html: emailHtml,
    });
  } catch (err) {
    // Log for the terminal, and also surface a short version to the
    // client so the failure is visible without needing server logs.
    console.error("[contact] Email notification failed:", err);
    mailError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({ ok: true, mailError });
}
