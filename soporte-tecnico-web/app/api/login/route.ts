import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/db";
import { getSession } from "@/lib/session";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // Max 8 intentos cada 15 minutos por IP — frena fuerza bruta sobre /admin.
  const ip = getClientIp(req);
  const limit = rateLimit(`login:${ip}`, 8, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Inténtalo de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const { username, password } = (body ?? {}) as Record<string, unknown>;

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  if (!(await verifyAdmin(username, password))) {
    return NextResponse.json(
      { error: "Credenciales incorrectas" },
      { status: 401 }
    );
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.username = username;
  await session.save();

  return NextResponse.json({ ok: true });
}
