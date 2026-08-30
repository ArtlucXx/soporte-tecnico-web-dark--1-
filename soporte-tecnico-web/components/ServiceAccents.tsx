/* Each accent sits on top of a REAL photo and animates something specific
   to that service — not a repeated template. Pure CSS, no fake device UI. */

export function StorageAccent() {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10">
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/25 backdrop-blur-sm">
        <div className="h-full rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400 acc-storage-fill" />
      </div>
      <div className="relative mt-2 h-4">
        <span className="absolute inset-0 text-xs font-bold text-white drop-shadow acc-chip-a">
          Disco 92% lleno
        </span>
        <span className="absolute inset-0 text-xs font-bold text-white drop-shadow acc-chip-b">
          24% lleno · 14 GB libres
        </span>
      </div>
    </div>
  );
}

export function ShieldAccent() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]">
        <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-emerald-300/50 to-transparent acc-scan" />
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm acc-pulse">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 3.5 19 6v6c0 4.6-3 7.6-7 8.5-4-.9-7-3.9-7-8.5V6l7-2.5z" />
          <path d="M9.3 12.2l1.9 1.9 3.5-4.2" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 h-4">
        <span className="absolute inset-0 text-xs font-bold text-white drop-shadow acc-chip-a">
          ⚠ Amenaza detectada
        </span>
        <span className="absolute inset-0 text-xs font-bold text-white drop-shadow acc-chip-b">
          Protegido · escudo activo
        </span>
      </div>
    </>
  );
}

export function SpeedAccent() {
  return (
    <>
      <div className="pointer-events-none absolute right-4 top-4 z-10 h-14 w-16">
        <svg viewBox="0 0 100 60" className="h-full w-full overflow-visible">
          <path d="M8 52a42 42 0 0 1 84 0" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="7" strokeLinecap="round" />
          <path d="M8 52a42 42 0 0 1 84 0" fill="none" stroke="url(#speedgrad)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray="132" strokeDashoffset="132" className="acc-gauge-arc" />
          <defs>
            <linearGradient id="speedgrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="55%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <g className="acc-needle" style={{ transformOrigin: "50px 52px" }}>
            <line x1="50" y1="52" x2="50" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </g>
          <circle cx="50" cy="52" r="4" fill="white" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 h-4">
        <span className="absolute inset-0 text-xs font-bold text-white drop-shadow acc-chip-a">
          Rendimiento lento
        </span>
        <span className="absolute inset-0 text-xs font-bold text-white drop-shadow acc-chip-b">
          +340% de velocidad
        </span>
      </div>
    </>
  );
}

export function InstallAccent() {
  const rows = [
    { label: "Windows activado", cls: "acc-step1" },
    { label: "Controladores al día", cls: "acc-step2" },
    { label: "Programas instalados", cls: "acc-step3" },
  ];
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 space-y-1.5">
      {rows.map((r) => (
        <div key={r.label} className={`flex items-center gap-2 rounded-md bg-slate-900/55 px-2.5 py-1.5 backdrop-blur-sm ${r.cls}`}>
          <svg viewBox="0 0 20 20" fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
            <path d="M4 10.5l3.2 3.2L16 5" />
          </svg>
          <span className="text-[11px] font-semibold text-white">{r.label}</span>
        </div>
      ))}
    </div>
  );
}
