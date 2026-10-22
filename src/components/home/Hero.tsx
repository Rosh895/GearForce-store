import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Tachometer } from "./Tachometer";

interface HeroStat {
  value: string;
  label: string;
}

/**
 * Art-directed hero. No motorcycle photograph has been supplied, so the centrepiece is the tachometer
 * graphic. Drop a licensed photo at `public/images/hero.jpg` (.webp/.avif) and it takes over automatically.
 */
export function Hero({ heroImage, stats }: { heroImage: string | null; stats: HeroStat[] }) {
  return (
    <section className="relative isolate overflow-clip bg-midnight">
      {heroImage ? (
        <>
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="-z-30 object-cover" />
          <div className="absolute inset-0 -z-20 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/20" aria-hidden />
        </>
      ) : (
        <>
          <div className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_75%_40%,rgb(225_6_0/0.22),transparent_60%)]" aria-hidden />
          <div className="speed-lines absolute inset-0 -z-20" aria-hidden />
          {/* red livery slash */}
          <div className="absolute -right-32 top-0 -z-20 h-full w-40 skew-x-[-20deg] bg-racing/90 sm:w-56 lg:w-72" aria-hidden />
          <div className="absolute -right-4 top-0 -z-20 hidden h-full w-3 skew-x-[-20deg] bg-white/80 sm:block lg:right-24" aria-hidden />
        </>
      )}
      <div className="checker absolute left-0 top-0 -z-10 h-6 w-48 opacity-70" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pb-28 pt-14 sm:px-6 sm:pt-20 lg:min-h-[calc(100svh-120px)] lg:grid-cols-[1.25fr_1fr] lg:px-8 lg:pb-32">
        <div className="animate-streak">
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-racing" aria-hidden /> Hyderabad · Riding gear &amp; accessories
          </p>
          <h1 className="display text-[clamp(3.25rem,11vw,9.5rem)] leading-[0.88]">
            Gear up.
            <br />
            <span className="outline-text">Ride</span>
            <br />
            <span className="text-racing">beyond.</span>
          </h1>
          <p className="mt-7 max-w-md text-lg text-silver">
            Premium riding gear and motorcycle accessories for every road and every adventure.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/shop">Shop now</ButtonLink>
            <ButtonLink href="#collections" variant="secondary">Explore collections</ButtonLink>
            <ButtonLink href="/ride-setup" variant="ghost">Build a ride setup →</ButtonLink>
          </div>
        </div>

        {!heroImage && (
          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
            <Tachometer className="w-full drop-shadow-[0_30px_60px_rgb(0_0_0/0.6)]" />
          </div>
        )}
      </div>

      {/* Facts derived from the real catalogue */}
      <dl className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-midnight/80 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/10 px-4 sm:px-6 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-4 first:pl-0 sm:px-6 sm:py-5">
              <dt className="order-2 text-[11px] uppercase tracking-[0.18em] text-silver sm:text-xs">{s.label}</dt>
              <dd className="display text-2xl text-arctic sm:text-4xl">{s.value}</dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  );
}
