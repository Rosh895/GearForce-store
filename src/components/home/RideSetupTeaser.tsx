import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RIDE_STYLES } from "@/data/ride-setups";

export function RideSetupTeaser() {
  return (
    <section className="relative overflow-hidden bg-graphite-deep py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="eyebrow mb-2">Ride setup</p>
          <h2 className="display text-3xl sm:text-5xl">How do you ride?</h2>
          <p className="mt-3 max-w-xl text-silver">Choose your style and build a kit from our catalogue.</p>
        </Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {RIDE_STYLES.map((s) => (
            <li key={s.id}>
              <Link href={`/ride-setup?style=${s.id}`} className="display group block border border-white/15 bg-graphite p-5 text-2xl transition-colors hover:border-racing hover:text-racing sm:text-3xl">
                {s.label}
                <span className="mt-2 block font-sans text-xs font-normal normal-case not-italic tracking-normal text-silver">{s.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
