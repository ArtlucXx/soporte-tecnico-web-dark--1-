export default function CornerFrame({ inset = "8px" }: { inset?: string }) {
  const arm = "absolute h-3.5 w-3.5 shadow-[0_0_6px_rgba(255,255,255,.8)]";
  return (
    <div
      className="pointer-events-none absolute z-10"
      style={{ inset }}
      aria-hidden
    >
      <span className={`${arm} left-0 top-0 border-l-2 border-t-2 border-white/80`} />
      <span className={`${arm} right-0 top-0 border-r-2 border-t-2 border-white/80`} />
      <span className={`${arm} left-0 bottom-0 border-l-2 border-b-2 border-white/80`} />
      <span className={`${arm} right-0 bottom-0 border-r-2 border-b-2 border-white/80`} />
    </div>
  );
}
