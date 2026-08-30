"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { About, ContactMessage } from "@/lib/db";

export default function AdminPanel({
  about,
  messages,
}: {
  about: About;
  messages: ContactMessage[];
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    const data = new FormData(e.currentTarget);
    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        career: data.get("career"),
        institution: data.get("institution"),
        year: data.get("year"),
        bio: data.get("bio"),
      }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
    }
  }

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const inputClass =
    "rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-blue-600 focus:outline-none";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Panel de Administración
          </h1>
          <div className="flex gap-5 text-sm font-medium">
            <Link
              href="/"
              className="text-slate-500 transition hover:text-slate-800"
            >
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 transition hover:text-red-500"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-900">
            Editar sección &quot;Sobre Mí&quot;
          </h2>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Nombre
            <input name="name" defaultValue={about.name} required className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Carrera
            <input name="career" defaultValue={about.career} required className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Institución
            <input name="institution" defaultValue={about.institution} required className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Año de carrera
            <input name="year" defaultValue={about.year} required className={inputClass} />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            Presentación (bio)
            <textarea name="bio" defaultValue={about.bio} required rows={5} className={inputClass} />
          </label>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          {saved && (
            <p className="text-sm text-emerald-600">
              Cambios guardados. Ya se ven reflejados en la página principal.
            </p>
          )}
        </form>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Mensajes recibidos ({messages.length})
          </h2>
          {messages.length === 0 ? (
            <p className="mt-4 text-slate-500">Aún no hay mensajes.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-4">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-slate-900">
                      {msg.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {msg.created_at}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">{msg.email}</p>
                  <p className="mt-2 text-sm text-slate-600">{msg.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
