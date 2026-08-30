import { getAbout } from "@/lib/db";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import TiltPhoto from "@/components/TiltPhoto";
import HeroParallax from "@/components/HeroParallax";
import CornerFrame from "@/components/CornerFrame";
import Navbar from "@/components/Navbar";
import { StorageAccent, ShieldAccent, SpeedAccent, InstallAccent } from "@/components/ServiceAccents";

export const dynamic = "force-dynamic";

const IG   = "aropcip";
const MAIL = "aropcip@gmail.com";

/* ── Datos ─────────────────────────────────────────── */

const services = [
  {
    title: "Limpieza y Liberación de Espacio",
    price: "$10.000 – $18.000",
    badge: "Más solicitado",
    img: "/images/limpieza-disco.jpg",
    alt: "Disco duro de computador",
    desc: "Su computador recupera velocidad y espacio desde el primer uso. Eliminamos archivos basura, programas que se inician solos y todo lo que lo frena, sin tocar ninguna pieza de hardware.",
    benefits: [
      "Arranque notablemente más rápido",
      "Gigabytes de espacio recuperados",
      "Menor temperatura y mejor batería",
    ],
    Accent: StorageAccent,
  },
  {
    title: "Eliminación de Virus y Protección",
    price: "$15.000 – $25.000",
    badge: "Esencial",
    img: "/images/eliminacion-virus.jpg",
    alt: "Seguridad informática",
    desc: "Dejamos su equipo completamente limpio de virus, spyware y malware, y configuramos una protección activa para que no vuelva a infectarse. Sus datos, fotos y contraseñas quedan seguros.",
    benefits: [
      "Eliminación total de virus y adware",
      "Protección activa ante futuras amenazas",
      "Datos y contraseñas protegidos",
    ],
    Accent: ShieldAccent,
  },
  {
    title: "Optimización y Aceleración",
    price: "$18.000 – $30.000",
    badge: "Alta demanda",
    img: "/images/optimizacion.jpg",
    alt: "Notebook funcionando a máxima velocidad",
    desc: "Ajustamos todo lo que influye en el rendimiento de su equipo: memoria, procesos, configuración del sistema y actualizaciones. El resultado es inmediato y visible.",
    benefits: [
      "Velocidad mayor en el día a día",
      "Sin congeladas ni tiempos de espera",
      "Rendimiento óptimo para trabajo y estudio",
    ],
    Accent: SpeedAccent,
  },
  {
    title: "Instalación de Windows y Programas",
    price: "$20.000 – $35.000",
    badge: "Solución completa",
    img: "/images/instalacion-windows.jpg",
    alt: "Sistema operativo Windows instalado",
    desc: "Sistema operativo limpio, todos los controladores al día y los programas que necesita, listos para usar. Lo recibe como si fuera nuevo, con sus archivos respaldados y organizados.",
    benefits: [
      "Windows limpio y actualizado",
      "Programas esenciales instalados",
      "Archivos respaldados y organizados",
    ],
    Accent: InstallAccent,
  },
];

const steps = [
  {
    n: "01",
    title: "Diagnóstico — $4.000",
    desc: "Revisión completa del equipo. Si decide contratar el servicio, se descuentan $2.000 del total.",
  },
  {
    n: "02",
    title: "Presupuesto exacto",
    desc: "Recibe el precio final antes de autorizar cualquier trabajo. Sin sorpresas ni cobros adicionales.",
  },
  {
    n: "03",
    title: "Garantía de 2 semanas",
    desc: "Si el mismo problema reaparece en 14 días, lo solucionamos sin costo adicional.",
  },
];

const reasons = [
  { icon: "🎓", title: "Formación técnica", desc: "Estudiante de Ingeniería en Informática con conocimientos académicos actualizados." },
  { icon: "⚡", title: "Respuesta el mismo día", desc: "Le respondo en horas para coordinar el diagnóstico sin demoras." },
  { icon: "💰", title: "Precio justo y transparente", desc: "Presupuesto claro antes de comenzar. Pago solo al finalizar, una vez conforme." },
  { icon: "🛡️", title: "Garantía incluida", desc: "2 semanas de garantía en todos los servicios, sin letra chica." },
];

/* ── Componentes ─────────────────────────────────── */

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-white shrink-0 mt-0.5">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

function IgIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Page ─────────────────────────────────────────── */

export default async function Home() {
  const about = await getAbout();

  return (
    <main className="min-h-screen bg-[#06060a] text-white">

      {/* ── NAVBAR ─────────────────────────────────── */}
      <Navbar ig={IG} />

      {/* ── HERO ───────────────────────────────────── */}
      <section id="inicio" className="grid-lines relative overflow-hidden border-b border-white/10 bg-black">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2">

          {/* Texto */}
          <div>
            <Reveal variant="left">
              <span className="inline-block border border-white/25 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
                Servicio profesional de software
              </span>
            </Reveal>
            <Reveal variant="left" delay={1}>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl">
                Su computador,<br />
                <span className="text-white" style={{ textShadow: "0 0 22px rgba(255,255,255,.55)" }}>funcionando como nuevo.</span>
              </h1>
            </Reveal>
            <Reveal variant="left" delay={2}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60">
                Diagnóstico desde <strong className="text-white">$4.000</strong> y soluciones rápidas de software.
                Más velocidad, más seguridad y garantía de 2 semanas incluida.
              </p>
            </Reveal>
            <Reveal variant="left" delay={3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#servicios"
                  className="bg-white px-8 py-3.5 text-center font-bold text-black shadow-[0_0_20px_rgba(255,255,255,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,255,255,.4)]">
                  Ver servicios y precios
                </a>
                <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 bg-transparent px-8 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/60">
                  <IgIcon className="h-4 w-4 text-pink-400" />
                  @{IG}
                </a>
              </div>
            </Reveal>

            {/* Badges */}
            <Reveal variant="left" delay={3}>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Diagnóstico $4.000","Garantía 2 semanas","Respuesta el mismo día","100% software"].map(b => (
                  <span key={b} className="border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70">
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Foto real con profundidad 3D */}
          <Reveal variant="right" delay={1}>
            <HeroParallax />
          </Reveal>
        </div>
        <div className="glow-rule absolute inset-x-0 bottom-0" />
      </section>

      {/* ── RAZONES ────────────────────────────────── */}
      <section className="border-b border-white/10 bg-[#08080b]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) as 0|1|2} className="h-full">
                <div className="h-full" style={{ perspective: 800 }}>
                  <TiltPhoto intensity={6}>
                    <div className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-white/30 hover:shadow-[0_0_26px_rgba(255,255,255,.1)]">
                      <span className="text-3xl">{r.icon}</span>
                      <h3 className="mt-3 font-bold text-white">{r.title}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/60">{r.desc}</p>
                    </div>
                  </TiltPhoto>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE MÍ ───────────────────────────────── */}
      <section id="sobre-mi" className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 md:grid-cols-2 md:items-center">
            <Reveal variant="left">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">Sobre mí</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Formación académica<br />que respalda cada servicio
              </h2>
              <p className="mt-5 leading-relaxed text-white/60">{about.bio}</p>
              <div className="mt-8 flex gap-3">
                <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-white/85">
                  <IgIcon className="h-4 w-4" /> @{IG}
                </a>
                <a href={`mailto:${MAIL}`}
                  className="inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/50">
                  ✉ {MAIL}
                </a>
              </div>
            </Reveal>

            <Reveal variant="right" delay={1}>
              <div className="relative border border-white/15 bg-white/[0.03] p-8">
                <CornerFrame />
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="flex h-16 w-16 items-center justify-center bg-white text-xl font-extrabold text-black">
                    {about.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{about.name}</h3>
                    <p className="text-sm text-white/50">Técnico en software informático</p>
                    <p className="mt-1 text-xs text-white/70 font-semibold">✓ Servicio verificado</p>
                  </div>
                </div>
                <dl className="mt-6 space-y-4 text-sm">
                  {[
                    { dt: "Carrera",      dd: about.career },
                    { dt: "Institución",  dd: about.institution },
                    { dt: "Año en curso", dd: about.year },
                  ].map(({dt,dd}) => (
                    <div key={dt} className="flex justify-between gap-4">
                      <dt className="text-white/50">{dt}</dt>
                      <dd className="text-right font-semibold text-white">{dd}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80">
                  <span className="font-semibold text-white">Especialidad:</span> Soluciones 100% de software. No se realiza reparación de hardware.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ──────────────────────────────── */}
      <section id="servicios" className="border-b border-white/10 bg-[#08080b]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-white/60">Servicios y precios</p>
            <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Soluciones con precio claro desde el inicio
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
              Diagnóstico $4.000 — si contrata el servicio, se descuentan $2.000. Garantía de 2 semanas en todo trabajo.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} variant="zoom" delay={(i % 2) as 0|1}>
                <div className="group h-full overflow-hidden border border-white/12 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_0_28px_rgba(255,255,255,.1)]">
                  {/* Foto real + 3D tilt + acento propio del servicio */}
                  <div className="relative h-52 overflow-hidden" style={{ perspective: 900 }}>
                    <TiltPhoto>
                      <Image src={s.img} alt={s.alt} width={900} height={400}
                        className="h-full w-full object-cover" />
                    </TiltPhoto>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <CornerFrame />
                    <s.Accent />
                    <span className="absolute left-4 top-4 z-10 border border-white/70 bg-black/70 px-3 py-1 text-xs font-bold text-white shadow-[0_0_8px_rgba(255,255,255,.4)]">
                      {s.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 px-7 py-3">
                    <span className="text-xs font-semibold text-white/40">Precio</span>
                    <span className="text-sm font-extrabold text-white">{s.price}</span>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-col p-7">
                    <h3 className="text-lg font-extrabold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
                    <ul className="mt-5 space-y-2.5">
                      {s.benefits.map(b => (
                        <li key={b} className="flex items-start gap-2 text-sm text-white/75">
                          <Check /> {b}
                        </li>
                      ))}
                    </ul>
                    <a href="#contacto"
                      className="mt-7 block border border-white/30 py-2.5 text-center text-sm font-bold text-white transition hover:bg-white hover:text-black">
                      Solicitar este servicio
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-center text-xs text-white/40">
              * Precios varían según el estado del equipo · Diagnóstico $4.000 (se descuentan $2.000 si contrata) · Pago al finalizar · Garantía 2 semanas
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESO ────────────────────────────────── */}
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-white/60">Cómo funciona</p>
            <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Simple, transparente y sin sorpresas
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:items-stretch">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i as 0|1|2}>
                <div className="flex h-full flex-col border border-white/12 bg-white/[0.03] p-8 transition hover:border-white/35">
                  <span className="text-4xl font-extrabold text-white/15">{s.n}</span>
                  <h3 className="mt-3 text-base font-extrabold text-white">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ───────────────────────────────── */}
      <section id="contacto" className="border-b border-white/10 bg-[#08080b]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-white/60">Contacto</p>
            <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              ¿Su equipo necesita atención?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-white/60">
              Diagnóstico <strong className="text-white">$4.000</strong> — si contrata, se descuentan <strong className="text-white">$2.000</strong>. Respuesta el mismo día.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2 md:items-stretch">

            {/* Instagram */}
            <Reveal variant="left">
              <div className="flex h-full flex-col overflow-hidden border border-white/12 bg-white/[0.03]">
                <div className="relative h-44 overflow-hidden" style={{ perspective: 900 }}>
                  <TiltPhoto>
                    <Image src="/images/hero.jpg" alt="Soporte técnico" width={900} height={400}
                      className="h-full w-full object-cover" />
                  </TiltPhoto>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <CornerFrame />
                </div>
                <div className="flex flex-1 flex-col gap-5 p-7">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">Escribir por Instagram</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      Respondo en minutos para coordinar el diagnóstico de su equipo, sin esperas ni formularios.
                    </p>
                  </div>
                  <div className="mt-auto space-y-3">
                    <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 bg-white py-3.5 font-bold text-black transition hover:bg-white/85">
                      <IgIcon className="h-5 w-5" /> @{IG}
                    </a>
                    <a href={`mailto:${MAIL}`}
                      className="flex items-center justify-center gap-2 border border-white/15 py-3 text-sm font-semibold text-white/80 transition hover:border-white/50">
                      ✉ {MAIL}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Formulario */}
            <Reveal variant="right" delay={1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-black py-12 text-center text-sm text-white/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-center gap-2.5">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_0_10px_rgba(255,255,255,.4)]">
              <Image src="/images/logo-aropcip.png" alt="AROPCIP" width={72} height={72} className="h-full w-full object-cover" />
            </span>
            <span className="font-bold text-white">Soporte Técnico Informático</span>
          </div>
          <div className="mt-4 flex justify-center gap-5 text-sm">
            <a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition hover:text-white">
              <IgIcon className="h-4 w-4 text-pink-400" /> @{IG}
            </a>
            <span className="text-white/20">·</span>
            <a href={`mailto:${MAIL}`} className="transition hover:text-white">✉ {MAIL}</a>
          </div>
          <p className="mt-6 text-xs text-white/30">
            © {new Date().getFullYear()} · Servicio 100% software · No se realiza reparación de hardware
          </p>
        </div>
      </footer>
    </main>
  );
}
