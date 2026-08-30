import nodemailer, { Transporter } from "nodemailer";

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

let cachedTransporter: Transporter | null = null;
let cachedFrom = "";

function getTransporter(): { transporter: Transporter; from: string } | null {
  const user = process.env.SMTP_USER || "";
  // Google shows app passwords with spaces for readability
  // ("xxxx xxxx xxxx xxxx"), but the real credential has none —
  // strip them so it works no matter how it was pasted into .env.
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const from = process.env.SMTP_FROM || user;

  if (!user || !pass) return null;

  if (!cachedTransporter || cachedFrom !== from) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true = implicit TLS (465), false = STARTTLS (587)
      auth: { user, pass },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });
    cachedFrom = from;
  }

  return { transporter: cachedTransporter, from };
}

export async function sendMail(opts: MailOptions): Promise<void> {
  const setup = getTransporter();

  if (!setup) {
    console.warn("[mailer] SMTP not configured – email not sent");
    return;
  }

  const { transporter, from } = setup;

  await transporter.sendMail({
    from: `"Soporte Técnico Web" <${from}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
}
