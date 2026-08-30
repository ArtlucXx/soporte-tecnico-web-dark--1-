#!/usr/bin/env node
/**
 * CLI de administración — uso exclusivo del dueño por terminal
 * Ejecutar: node admin-cli.mjs
 */

import readline from "readline";
import { createRequire } from "module";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
const envPath = path.join(__dirname, ".env.local");
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "";
const DB_PATH = path.join(__dirname, "data.db");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

function clearScreen() {
  process.stdout.write("\x1Bc");
}

function loadDb() {
  // Dynamic require for CommonJS better-sqlite3
  try {
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    return new Database(DB_PATH);
  } catch {
    return null;
  }
}

async function login() {
  clearScreen();
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  🖥  SOPORTE TÉCNICO — PANEL ADMIN");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  const user = await ask("Usuario: ");
  const pass = await ask("Contraseña: ");
  if (user.trim() !== ADMIN_USER || pass.trim() !== ADMIN_PASS) {
    console.log("\n❌ Credenciales incorrectas.\n");
    rl.close();
    process.exit(1);
  }
  return true;
}

function showMessages(db) {
  if (!db) { console.log("  ⚠ Base de datos no disponible.\n"); return; }
  const rows = db.prepare("SELECT * FROM messages ORDER BY created_at DESC LIMIT 20").all();
  if (!rows.length) { console.log("  (Sin mensajes)\n"); return; }
  rows.forEach((r, i) => {
    console.log(`\n  ── ${i + 1}. ${r.name} <${r.email}>`);
    console.log(`     📅 ${r.created_at}`);
    console.log(`     💬 ${r.message}`);
  });
  console.log();
}

function showAbout(db) {
  if (!db) { console.log("  ⚠ Base de datos no disponible.\n"); return; }
  const row = db.prepare("SELECT * FROM about WHERE id = 1").get();
  if (!row) { console.log("  (Sin datos)\n"); return; }
  console.log(`\n  Nombre:      ${row.name}`);
  console.log(`  Carrera:     ${row.career}`);
  console.log(`  Institución: ${row.institution}`);
  console.log(`  Año:         ${row.year}`);
  console.log(`  Bio:         ${row.bio}\n`);
}

async function editAbout(db) {
  if (!db) { console.log("  ⚠ Base de datos no disponible.\n"); return; }
  const row = db.prepare("SELECT * FROM about WHERE id = 1").get();
  console.log("\n  Deja en blanco para mantener el valor actual.\n");
  const name        = (await ask(`  Nombre [${row?.name || ""}]: `)).trim() || row?.name;
  const career      = (await ask(`  Carrera [${row?.career || ""}]: `)).trim() || row?.career;
  const institution = (await ask(`  Institución [${row?.institution || ""}]: `)).trim() || row?.institution;
  const year        = (await ask(`  Año [${row?.year || ""}]: `)).trim() || row?.year;
  const bio         = (await ask(`  Bio [${row?.bio || ""}]: `)).trim() || row?.bio;
  if (row) {
    db.prepare("UPDATE about SET name=?, career=?, institution=?, year=?, bio=? WHERE id=1")
      .run(name, career, institution, year, bio);
  } else {
    db.prepare("INSERT INTO about (id,name,career,institution,year,bio) VALUES (1,?,?,?,?,?)")
      .run(name, career, institution, year, bio);
  }
  console.log("\n  ✅ Datos actualizados.\n");
}

async function menu() {
  while (true) {
    clearScreen();
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  🖥  PANEL ADMIN — SOPORTE TÉCNICO");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  1. Ver mensajes recibidos");
    console.log("  2. Ver sección Sobre Mí");
    console.log("  3. Editar sección Sobre Mí");
    console.log("  0. Salir");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    const choice = (await ask("  Opción: ")).trim();
    const db = loadDb();
    clearScreen();
    switch (choice) {
      case "1": showMessages(db); await ask("  [Enter para volver]"); break;
      case "2": showAbout(db); await ask("  [Enter para volver]"); break;
      case "3": await editAbout(db); await ask("  [Enter para volver]"); break;
      case "0": console.log("\n  Hasta luego.\n"); rl.close(); process.exit(0);
      default: console.log("\n  Opción inválida.\n"); await ask("  [Enter para volver]");
    }
  }
}

await login();
await menu();
