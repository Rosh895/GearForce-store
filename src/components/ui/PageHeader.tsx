import { Container } from "./Container";

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <section className="clip-slash relative overflow-clip bg-midnight pb-6">
      <div className="speed-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="absolute -right-20 top-0 h-full w-24 skew-x-[-20deg] bg-racing/80 sm:w-40" aria-hidden />
      <div className="checker absolute left-0 top-0 h-4 w-32 opacity-70" aria-hidden />
      <Container className="relative py-14 sm:py-20">
        {eyebrow && <p className="eyebrow mb-3 flex items-center gap-3"><span className="h-px w-8 bg-racing" aria-hidden />{eyebrow}</p>}
        <h1 className="display text-[clamp(2.75rem,8vw,6.5rem)]">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-silver">{intro}</p>}
      </Container>
    </section>
  );
}
