import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "About GearForce",
  description: "GearForce is a Hyderabad-based retailer of motorcycle riding gear and accessories for riders across India.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title="About GearForce" intro="Gear for Every Journey." />
      <div className="bg-arctic text-midnight">
        <Container className="max-w-3xl space-y-5 py-14 text-lg text-ink-muted">
          <p>
            GearForce is a motorcycle riding gear and accessories business based in Hyderabad, Telangana. We serve commuters,
            touring and adventure riders and motorsport enthusiasts across India.
          </p>
          <p>
            Our range includes riding jackets, gloves and boots, luggage, motorcycle accessories and maintenance products,
            lighting, and action cameras. This website is our online storefront, and the catalogue is being brought across
            from our existing store.
          </p>
          <p className="text-base">
            More about our story, team and showroom will be added here once confirmed by the business.
          </p>
          <div className="flex gap-3 pt-2">
            <ButtonLink href="/shop" variant="dark">Shop the range</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Contact us</ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
