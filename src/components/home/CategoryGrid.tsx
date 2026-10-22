import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getCategory } from "@/data/categories";
import type { CategoryId } from "@/types/product";

/** Editorial bento layout: sizes are deliberate, not a uniform card grid. */
const LAYOUT: { id: CategoryId; span: string; tall?: boolean }[] = [
  { id: "jackets", span: "lg:col-span-7", tall: true },
  { id: "gloves", span: "lg:col-span-5", tall: true },
  { id: "boots", span: "lg:col-span-4" },
  { id: "luggage", span: "lg:col-span-4" },
  { id: "accessories", span: "lg:col-span-4" },
  { id: "cameras", span: "lg:col-span-8" },
  { id: "lighting", span: "lg:col-span-4" },
];

export function CategoryGrid({ counts }: { counts: Record<string, number> }) {
  return (
    <section id="collections" className="scroll-mt-20 bg-graphite-deep py-20 sm:py-28">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">01 / Collections</p>
            <h2 className="display text-[clamp(2.5rem,7vw,6rem)]">
              Shop by <span className="outline-text">category</span>
            </h2>
          </div>
          <Link href="/shop" className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-silver hover:text-racing">
            View everything →
          </Link>
        </div>

        <ul className="grid auto-rows-[11rem] gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {LAYOUT.map(({ id, span, tall }, i) => {
            const c = getCategory(id);
            return (
              <li key={id} className={`${span} ${tall ? "lg:row-span-2" : ""}`}>
                <Reveal delay={Math.min(i, 4) * 0.05} className="h-full">
                  <Link
                    href={`/category/${id}`}
                    className="group relative flex h-full flex-col justify-between overflow-hidden border border-white/10 bg-graphite p-5 transition-colors duration-300 hover:border-racing sm:p-7"
                  >
                    <div className="carbon absolute inset-0 opacity-60" aria-hidden />
                    <div className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-[20deg] bg-racing/0 transition-all duration-500 group-hover:left-[110%] group-hover:bg-racing/20" aria-hidden />
                    <span className="display outline-text pointer-events-none absolute -right-2 -top-3 text-[7rem] leading-none [--outline-color:rgb(255_255_255/0.22)] transition-all duration-300 group-hover:[--outline-color:var(--color-racing)] sm:text-[9rem]" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight className="relative h-6 w-6 text-silver transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-racing" aria-hidden />
                    <div className="relative">
                      <h3 className={`display ${tall ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{c.label}</h3>
                      <p className="mt-2 flex items-center gap-3 text-sm text-silver">
                        <span className="h-px w-8 bg-racing transition-all duration-300 group-hover:w-14" aria-hidden />
                        {counts[id] ?? 0} products
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
