import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-midnight py-20">
      <div className="speed-lines absolute inset-0" aria-hidden />
      <Container className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow mb-2">The GearForce story</p>
          <h2 className="display text-3xl sm:text-5xl">Gear for every journey</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-silver">
            GearForce is a Hyderabad-based retailer of motorcycle riding gear and accessories, serving commuters, touring
            and adventure riders and motorsport enthusiasts. Our range covers riding jackets, gloves, boots, luggage,
            accessories, lighting and action cameras.
          </p>
          <ButtonLink href="/about" variant="secondary" className="mt-6">About GearForce</ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
