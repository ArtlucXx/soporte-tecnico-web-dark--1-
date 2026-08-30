"use client";

import { useRef } from "react";
import Image from "next/image";
import CornerFrame from "./CornerFrame";

const CHIPS = [
  { text: "🛡️ Protección activa", depth: 16, cls: "left-4 top-4" },
  { text: "💾 4.2 GB liberados", depth: 26, cls: "right-4 top-4" },
  { text: "⚡ +340% velocidad", depth: 20, cls: "right-4 bottom-20" },
];

export default function HeroParallax() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const priceRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    if (imgRef.current) {
      imgRef.current.style.transform = `perspective(1100px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) scale3d(1.025,1.025,1.025)`;
    }
    chipRefs.current.forEach((c, i) => {
      if (!c) return;
      const d = CHIPS[i].depth;
      c.style.transform = `translate3d(${(px * d).toFixed(1)}px, ${(py * d).toFixed(1)}px, 0)`;
    });
    if (priceRef.current) {
      priceRef.current.style.transform = `translate3d(${(px * 10).toFixed(1)}px, ${(py * 10).toFixed(1)}px, 0)`;
    }
  }

  function onLeave() {
    if (imgRef.current) imgRef.current.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    chipRefs.current.forEach((c) => c && (c.style.transform = "translate3d(0,0,0)"));
    if (priceRef.current) priceRef.current.style.transform = "translate3d(0,0,0)";
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
      style={{ perspective: 1100 }}
    >
      <div
        ref={imgRef}
        className="relative overflow-hidden border border-white/15 shadow-[0_0_40px_rgba(255,255,255,.08)] transition-transform duration-150 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Técnico de soporte informático trabajando en un computador"
          width={900}
          height={600}
          priority
          className="h-full w-full object-cover"
        />
        <CornerFrame inset="12px" />
      </div>

      {CHIPS.map((c, i) => (
        <div
          key={c.text}
          ref={(el) => { chipRefs.current[i] = el; }}
          className={`pointer-events-none absolute ${c.cls} border border-white/30 bg-black/80 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_10px_rgba(255,255,255,.35)] backdrop-blur transition-transform duration-150 ease-out`}
        >
          {c.text}
        </div>
      ))}

      <div
        ref={priceRef}
        className="pointer-events-none absolute bottom-5 left-5 border border-white/30 bg-black/85 px-5 py-3 shadow-[0_0_14px_rgba(255,255,255,.3)] backdrop-blur transition-transform duration-150 ease-out"
      >
        <p className="text-sm font-bold text-white">Diagnóstico $4.000</p>
        <p className="text-xs text-white/60">Si contrata → $2.000 de descuento</p>
      </div>
    </div>
  );
}
