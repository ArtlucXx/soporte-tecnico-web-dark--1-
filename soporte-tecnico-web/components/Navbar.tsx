"use client";

import { useState } from "react";
import Image from "next/image";

const LINKS: [string, string][] = [
  ["#inicio", "Inicio"],
  ["#sobre-mi", "Sobre Mí"],
  ["#servicios", "Servicios"],
  ["#contacto", "Contacto"],
];

function IgIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Navbar({ ig }: { ig: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#06060a]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_0_10px_rgba(255,255,255,.4)]">
            <Image src="/images/logo-aropcip.png" alt="AROPCIP" width={80} height={80} className="h-full w-full object-cover" />
          </span>
          <span className="text-base font-bold tracking-tight text-white">
            Soporte Técnico Informático
          </span>
        </a>

        {/* Enlaces — visibles desde tablet en adelante (≥640px) */}
        <div className="hidden items-center gap-8 text-sm font-medium text-white/65 sm:flex">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="nav-link transition hover:text-white">{label}</a>
          ))}
        </div>

        <a href={`https://instagram.com/${ig}`} target="_blank" rel="noopener noreferrer"
          className="hidden items-center gap-2 border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/50 hover:text-white sm:flex">
          <IgIcon className="h-4 w-4 text-pink-400" />
          @{ig}
        </a>

        {/* Botón hamburguesa — solo en celulares (<640px) */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-white sm:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Panel desplegable — solo en celulares */}
      {open && (
        <div className="border-t border-white/10 bg-[#06060a] px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-white/70">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="transition hover:text-white">
                {label}
              </a>
            ))}
            <a href={`https://instagram.com/${ig}`} target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2 border border-white/15 px-4 py-2.5 font-semibold text-white/80 transition hover:border-white/50 hover:text-white">
              <IgIcon className="h-4 w-4 text-pink-400" />
              @{ig}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
