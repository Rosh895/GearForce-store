import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function BrandStory() {
  return (
    <section className="relative overflow-clip bg-midnight py-24 sm:py-32">
      <div className="checker absolute right-0 top-0 h-6 w-64 opacity-70" aria-hidden />
      <Container className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow mb-4">04 / The story</p>
          <h2 className="display text-[clamp(2.75rem,9vw,8rem)] leading-[0.9]">
            Gear for
            <br />
            <span className="text-racing">every</span>
            <br />
            <span className="outline-text">journey</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Image src="/logo/gearforce-mark.png" alt="" width={800} height={310} className="mb-6 w-48 mix-blend-lighten" />
          <p className="text-lg text-silver">
            GearForce is a Hyderabad-based retailer of motorcycle riding gear and accessories, serving commuters, touring and
            adventure riders and motorsport enthusiasts. Jackets, gloves, boots, luggage, accessories, lighting and action cameras,
            all in one place.
          </p>
          <ButtonLink href="/about" variant="secondary" className="mt-8">About GearForce</ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
