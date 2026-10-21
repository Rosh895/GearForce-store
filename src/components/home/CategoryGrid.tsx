import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HOME_CATEGORY_IDS, getCategory } from "@/data/categories";

export function CategoryGrid({ counts }: { counts: Record<string, number> }) {
  return (
    <section id="collections" className="scroll-mt-20 bg-graphite-deep py-16 sm:py-20">
      <Container>
        <p className="eyebrow mb-2">Collections</p>
        <h2 className="display mb-10 text-3xl sm:text-5xl">Shop by category</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_CATEGORY_IDS.map((id, i) => {
            const c = getCategory(id);
            return (
              <li key={id}>
                <Reveal delay={i * 0.05}>
                  <Link href={`/category/${id}`} className="group relative block overflow-hidden border border-white/10 bg-graphite p-6 transition-colors duration-200 hover:border-racing">
                    <div className="speed-lines absolute inset-0 opacity-60" aria-hidden />
                    <div className="relative flex min-h-32 flex-col justify-between">
                      <ArrowUpRight className="h-6 w-6 self-end text-silver transition-colors group-hover:text-racing" aria-hidden />
                      <div>
                        <h3 className="display text-2xl">{c.label}</h3>
                        <p className="mt-1 text-sm text-silver">{counts[id] ?? 0} products</p>
                      </div>
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
