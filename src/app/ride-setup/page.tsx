import type { Metadata } from "next";
import { RideSetup } from "@/components/ride-setup/RideSetup";
import { isRideStyleId } from "@/data/ride-setups";
import { absoluteUrl } from "@/lib/site";
import { getPublishedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ride Setup — Build Your Kit by Riding Style",
  description: "Choose City, Touring, Adventure or Racing and build a kit from GearForce riding gear, one step at a time.",
  alternates: { canonical: absoluteUrl("/ride-setup") },
};

export default async function RideSetupPage({ searchParams }: { searchParams: Promise<{ style?: string }> }) {
  const { style } = await searchParams;
  return <RideSetup products={getPublishedProducts()} initialStyle={isRideStyleId(style) ? style : undefined} />;
}
