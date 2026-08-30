"use client";

import { useEffect, useState } from "react";

const LINES = [
  "Analizando sistema...",
  "Detectando archivos basura...",
  "Eliminando 4.2 GB liberados ✓",
  "Procesos optimizados ✓",
  "Protección activada ✓",
  "Velocidad: +340% ✓",
];

export default function HeroPC() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {
    if (lineIndex >= LINES.length) return;
    const line = LINES[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 45);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, line]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex(l => l + 1);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  const progress = Math.min(100, Math.round((lineIndex / LINES.length) * 100));

  return (
    <div className="relative flex flex-col items-center">
      {/* Glow behind */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      {/* PC Monitor SVG */}
      <div className="animate-float w-full max-w-sm">
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">
          {/* Monitor body */}
          <rect x="30" y="20" width="340" height="220" rx="16" fill="#0f172a" stroke="#1e40af" strokeWidth="2.5"/>
          {/* Screen bezel */}
          <rect x="44" y="34" width="312" height="192" rx="8" fill="#020617"/>
          {/* Screen content area */}
          <rect x="48" y="38" width="304" height="184" rx="6" fill="#0a0f1e"/>
          {/* Scanline */}
          <rect x="48" y="38" width="304" height="2" rx="1" fill="rgba(96,165,250,0.3)" className="scanline"/>

          {/* Terminal window inside screen */}
          <rect x="56" y="46" width="288" height="168" rx="4" fill="#010811"/>
          {/* Terminal titlebar */}
          <rect x="56" y="46" width="288" height="22" rx="4" fill="#0f172a"/>
          <circle cx="70" cy="57" r="4.5" fill="#ef4444"/>
          <circle cx="84" cy="57" r="4.5" fill="#f59e0b"/>
          <circle cx="98" cy="57" r="4.5" fill="#22c55e"/>
          <text x="170" y="61" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">soporte-cli — bash</text>

          {/* Prompt lines (static decorative) */}
          <text x="64" y="86" fill="#22c55e" fontSize="8" fontFamily="monospace">$ sudo soporte --scan</text>
          <text x="64" y="98" fill="#60a5fa" fontSize="7.5" fontFamily="monospace">▶ Iniciando diagnóstico del sistema...</text>
          <text x="64" y="110" fill="#94a3b8" fontSize="7" fontFamily="monospace">CPU: Intel Core i5 │ RAM: 8GB │ Disco: 85% lleno</text>

          {/* Progress bar bg */}
          <rect x="64" y="120" width="272" height="7" rx="3.5" fill="#1e293b"/>
          {/* Progress bar fill */}
          <rect x="64" y="120" width={272 * progress / 100} height="7" rx="3.5" fill="url(#prog)"/>
          <defs>
            <linearGradient id="prog" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
          <text x="340" y="128" fill="#60a5fa" fontSize="7" fontFamily="monospace" textAnchor="end">{progress}%</text>

          {/* Dynamic typing area */}
          <rect x="64" y="136" width="272" height="72" rx="3" fill="#000a18"/>
          {/* Previous lines */}
          {displayed.slice(-5).map((ln, i) => (
            <text key={i} x="68" y={148 + i * 12} fill="#4ade80" fontSize="7" fontFamily="monospace">
              {ln}
            </text>
          ))}
          {/* Current typing line */}
          {currentLine && (
            <text x="68" y={148 + displayed.slice(-5).length * 12} fill="#93c5fd" fontSize="7" fontFamily="monospace">
              {currentLine}<tspan fill="#60a5fa" className="cursor">█</tspan>
            </text>
          )}
          {lineIndex >= LINES.length && (
            <text x="68" y={148 + Math.min(displayed.length, 5) * 12} fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">
              ✓ ¡Listo! Sistema optimizado al 100%
            </text>
          )}

          {/* Monitor stand */}
          <rect x="180" y="240" width="40" height="28" rx="3" fill="#1e293b"/>
          <rect x="148" y="264" width="104" height="10" rx="5" fill="#0f172a" stroke="#1e3a8a" strokeWidth="1.5"/>

          {/* Corner LEDs */}
          <circle cx="354" cy="234" r="3" fill="#3b82f6" opacity="0.8"/>
          <circle cx="354" cy="234" r="6" fill="#3b82f6" opacity="0.15"/>
        </svg>
      </div>

      {/* Status badges below PC */}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {[
          { icon: "🛡️", text: "Protección activa", ok: true },
          { icon: "⚡", text: "+340% velocidad",   ok: true },
          { icon: "💾", text: "4.2 GB liberados",  ok: true },
        ].map(b => (
          <span key={b.text}
            className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            {b.icon} {b.text}
          </span>
        ))}
      </div>
    </div>
  );
}
