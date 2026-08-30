"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  }

  const inputClass =
    "rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-blue-600 focus:outline-none";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-800">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 018 0v3" />
            </svg>
          </div>
          <h1 className="text-center text-2xl font-bold text-slate-900">
            Panel de Administración
          </h1>
          <p className="text-center text-sm text-slate-500">
            Acceso exclusivo del administrador
          </p>
          <input
            name="username"
            required
            placeholder="Usuario"
            autoComplete="username"
            className={inputClass}
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Contraseña"
            autoComplete="current-password"
            className={inputClass}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Iniciar sesión"}
          </button>
          <Link
            href="/"
            className="text-center text-sm text-slate-400 transition hover:text-slate-600"
          >
            ← Volver al inicio
          </Link>
        </form>
      </div>
    </main>
  );
}
