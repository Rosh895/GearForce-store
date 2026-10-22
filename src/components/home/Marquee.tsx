/** Slow category ticker. CSS-only; paused for users who prefer reduced motion (global rule in globals.css). */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-racing py-3 text-white" aria-hidden>
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="display flex items-center gap-10 text-xl sm:text-2xl">
            {t}
            <span className="inline-block h-2 w-2 rotate-45 bg-white" />
          </span>
        ))}
      </div>
    </div>
  );
}
