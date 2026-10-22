import type { Metadata } from "next";
import { RideSetup } from "@/components/ride-setup/RideSetup";
import { PageHeader } from "@/components/ui/PageHeader";
import { isRideStyleId } from "@/data/ride-setups";
import { absoluteUrl } from "@/lib/site";
import { getPublishedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ride Setup — Build Your Kit by Riding Style",
  description: "Choose City, Touring, Adventure or Racing and see GearForce riding gear picked from our catalogue for that style.",
  alternates: { canonical: absoluteUrl("/ride-setup") },
};

export default async function RideSetupPage({ searchParams }: { searchParams: Promise<{ style?: string }> }) {
  const { style } = await searchParams;
  return (
    <>
      <PageHeader eyebrow="Ride setup" title="Build your kit" intro="Pick your riding style and see gear from our catalogue to match." />
      <RideSetup products={getPublishedProducts()} initialStyle={isRideStyleId(style) ? style : undefined} />
    </>
  );
}
