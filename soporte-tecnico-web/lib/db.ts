import { createClient, type Client } from "@libsql/client";
import bcrypt from "bcryptjs";

/**
 * Database layer using libSQL (SQLite-compatible).
 *
 * - Local development: with no extra setup this reads/writes a plain
 *   file (data.db) in the project folder, exactly like before.
 * - Production: set TURSO_DATABASE_URL (and TURSO_AUTH_TOKEN) to a
 *   free Turso database so data survives redeploys and cold starts
 *   on serverless hosts like Vercel, where the local filesystem is
 *   not persistent.
 */

let client: Client | null = null;

function getClient(): Client {
  if (client) return client;

  const url =
    process.env.TURSO_DATABASE_URL ||
    `file:${process.env.DATABASE_PATH || "data.db"}`;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  client = createClient(authToken ? { url, authToken } : { url });
  return client;
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) schemaReady = initSchema();
  return schemaReady;
}

async function initSchema(): Promise<void> {
  const db = getClient();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      career TEXT NOT NULL,
      institution TEXT NOT NULL,
      year TEXT NOT NULL,
      bio TEXT NOT NULL
    );
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const adminCount = await db.execute("SELECT COUNT(*) as count FROM admin");
  if (Number(adminCount.rows[0].count) === 0) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const hash = bcrypt.hashSync(password, 10);
    await db.execute({
      sql: "INSERT INTO admin (username, password_hash) VALUES (?, ?)",
      args: [username, hash],
    });
  }

  const aboutCount = await db.execute("SELECT COUNT(*) as count FROM about");
  if (Number(aboutCount.rows[0].count) === 0) {
    await db.execute({
      sql: "INSERT INTO about (id, name, career, institution, year, bio) VALUES (1, ?, ?, ?, ?, ?)",
      args: [
        "Arturo Díaz",
        "Ingeniería en Informática",
        "INACAP",
        "3er año",
        "Soy estudiante de Ingeniería en Informática en INACAP, con conocimientos técnicos sólidos y actualizados en sistemas operativos, seguridad y optimización de equipos. Me especializo en devolverle la velocidad y estabilidad a su computador mediante soluciones 100% de software, tratando cada equipo como si fuera el mío.",
      ],
    });
  }
}

export interface About {
  id: number;
  name: string;
  career: string;
  institution: string;
  year: string;
  bio: string;
}

export async function getAbout(): Promise<About> {
  await ensureSchema();
  const res = await getClient().execute("SELECT * FROM about WHERE id = 1");
  return res.rows[0] as unknown as About;
}

export async function updateAbout(data: Omit<About, "id">): Promise<void> {
  await ensureSchema();
  await getClient().execute({
    sql: "UPDATE about SET name = ?, career = ?, institution = ?, year = ?, bio = ? WHERE id = 1",
    args: [data.name, data.career, data.institution, data.year, data.bio],
  });
}

export async function verifyAdmin(
  username: string,
  password: string
): Promise<boolean> {
  await ensureSchema();
  const res = await getClient().execute({
    sql: "SELECT password_hash FROM admin WHERE username = ?",
    args: [username],
  });
  const row = res.rows[0] as unknown as { password_hash: string } | undefined;
  if (!row) return false;
  return bcrypt.compareSync(password, row.password_hash);
}

export async function saveMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  await ensureSchema();
  await getClient().execute({
    sql: "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    args: [name, email, message],
  });
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export async function getMessages(): Promise<ContactMessage[]> {
  await ensureSchema();
  const res = await getClient().execute(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );
  return res.rows as unknown as ContactMessage[];
}
