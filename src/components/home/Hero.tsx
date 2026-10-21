import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * TEMPORARY visual: no licensed motorcycle photograph has been supplied yet. Until one is placed at
 * `public/images/hero.jpg` (or .webp/.avif) the hero falls back to a brand graphic built from the
 * supplied logo. See README → "Replacing temporary assets".
 */
export function Hero({ heroImage }: { heroImage: string | null }) {
  return (
    <section className="relative isolate overflow-hidden bg-midnight">
      {heroImage ? (
        <>
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/20" aria-hidden />
        </>
      ) : (
        <>
          <div className="speed-lines absolute inset-0 -z-10" aria-hidden />
          <div className="absolute -right-24 top-0 -z-10 hidden h-full w-1/2 bg-gradient-to-l from-racing/15 to-transparent md:block" aria-hidden />
        </>
      )}
      <div className="checker absolute right-0 top-10 -z-10 hidden h-12 w-36 opacity-80 md:block" aria-hidden />

      <Container className="grid items-center gap-10 py-16 sm:py-24 lg:min-h-[620px] lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-streak">
          <p className="eyebrow mb-4">Hyderabad · Riding gear &amp; accessories</p>
          <h1 className="display text-[clamp(2.75rem,8vw,6.25rem)]">
            Gear up.
            <br />
            <span className="text-racing">Ride beyond.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-silver">
            Premium riding gear and motorcycle accessories for every road and every adventure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop">Shop now</ButtonLink>
            <ButtonLink href="#collections" variant="secondary">Explore collections</ButtonLink>
          </div>
        </div>
        {!heroImage && (
          <div className="hidden lg:block" aria-hidden>
            <Image src="/logo/gearforce-mark.png" alt="" width={800} height={310} priority className="w-full mix-blend-lighten" />
          </div>
        )}
      </Container>
    </section>
  );
}
