import { Container } from "./Container";

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-midnight">
      <div className="speed-lines pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative py-12 sm:py-16">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="display text-4xl sm:text-6xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-silver">{intro}</p>}
      </Container>
    </section>
  );
}
