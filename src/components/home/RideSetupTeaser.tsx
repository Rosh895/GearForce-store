import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RIDE_STYLES } from "@/data/ride-setups";

export function RideSetupTeaser() {
  return (
    <section className="relative overflow-clip bg-graphite-deep py-20 sm:py-28">
      <div className="speed-lines absolute inset-0 opacity-70" aria-hidden />
      <Container className="relative">
        <Reveal>
          <p className="eyebrow mb-3">02 / Ride setup</p>
          <h2 className="display text-[clamp(2.5rem,7vw,6rem)]">
            How do <span className="outline-text">you</span> ride?
          </h2>
          <p className="mt-4 max-w-xl text-silver">Pick a riding style and build a kit from our catalogue in three steps.</p>
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RIDE_STYLES.map((s, i) => (
            <li key={s.id}>
              <Link
                href={`/ride-setup?style=${s.id}`}
                className="group clip-cut relative block h-full border border-white/15 bg-graphite p-6 transition-colors duration-300 hover:border-racing hover:bg-midnight"
              >
                <span className="display text-6xl text-racing/90">{i + 1}</span>
                <span className="display mt-3 block text-3xl transition-colors group-hover:text-racing">{s.label}</span>
                <span className="mt-2 block text-sm text-silver">{s.tagline}</span>
                <span className="mt-5 inline-block font-heading text-xs font-bold uppercase tracking-[0.2em] text-arctic group-hover:text-racing">
                  Start building →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
