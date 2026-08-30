"use client";

import { useState } from "react";

const SERVICES = [
  "Limpieza y Liberación de Espacio",
  "Eliminación de Virus y Protección",
  "Optimización y Aceleración",
  "Instalación de Windows y Programas",
  "No estoy seguro / Otro",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [selected, setSelected] = useState("");
  const [mailError, setMailError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("Error al enviar. Intente de nuevo o escríbame por Instagram.");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMailError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        service: selected,
        message: fd.get("message"),
        website: fd.get("website"), // honeypot — debe llegar vacío
      }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus("sent");
      setMailError(data?.mailError ?? null);
      (e.target as HTMLFormElement).reset();
      setSelected("");
    } else {
      const data = await res.json().catch(() => ({}));
      if (typeof data?.error === "string") setErrorMsg(data.error);
      setStatus("error");
    }
  }

  const input = "w-full border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder-white/35 text-sm transition focus:border-white/60 focus:outline-none focus:shadow-[0_0_10px_rgba(255,255,255,.25)]";

  if (status === "sent") return (
    <div className="flex h-full flex-col items-center justify-center gap-4 border border-emerald-400/30 bg-emerald-400/5 p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center border border-emerald-400/60 text-emerald-300 shadow-[0_0_14px_rgba(52,211,153,.35)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-7 w-7">
          <path d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 className="text-lg font-extrabold text-white">¡Solicitud enviada!</h3>
      <p className="text-sm leading-relaxed text-white/60">Le responderé a la brevedad para coordinar el diagnóstico.</p>
      {mailError && (
        <div className="w-full border border-amber-400/30 bg-amber-400/5 px-4 py-3 text-left text-xs leading-relaxed text-amber-200">
          <p className="font-bold uppercase tracking-wide text-amber-300">Guardado, pero el aviso por correo falló</p>
          <p className="mt-1 break-words font-mono">{mailError}</p>
        </div>
      )}
      <button onClick={() => setStatus("idle")}
        className="mt-2 border border-white/20 bg-transparent px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/50">
        Enviar otro mensaje
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}
      className="flex h-full flex-col gap-4 border border-white/12 bg-white/[0.03] p-7">
      <div>
        <h3 className="text-lg font-extrabold text-white">Solicitar diagnóstico</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">Diagnóstico $4.000</span>
          <span className="border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 text-xs font-semibold text-emerald-300">Si contrata → $2.000 de descuento</span>
          <span className="border border-white/15 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/60">Respuesta el mismo día</span>
        </div>
      </div>

      <input name="name" required placeholder="Su nombre completo" className={input} />
      <input name="email" type="email" required placeholder="Su correo electrónico" className={input} />

      {/* Honeypot anti-spam: oculto para personas, visible para bots */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="website">No completar este campo</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">¿Qué servicio necesita?</p>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map(s => (
            <button key={s} type="button"
              onClick={() => setSelected(s === selected ? "" : s)}
              className={`border px-3 py-1.5 text-xs font-semibold transition ${
                selected === s
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-transparent text-white/60 hover:border-white/40 hover:text-white"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <textarea name="message" required rows={4}
        placeholder="Describa brevemente el problema de su equipo…"
        className={input} />

      <button type="submit" disabled={status === "sending"}
        className="bg-white py-3.5 font-bold text-black shadow-[0_0_18px_rgba(255,255,255,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(255,255,255,.35)] disabled:opacity-50">
        {status === "sending"
          ? <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>Enviando…
            </span>
          : "Enviar solicitud →"}
      </button>

      {status === "error" && (
        <p className="border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
