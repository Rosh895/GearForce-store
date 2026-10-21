import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "@/components/product/ShopBrowser";
import { PageHeader } from "@/components/ui/PageHeader";
import { absoluteUrl } from "@/lib/site";
import { getPublishedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop All Motorcycle Riding Gear",
  description: "Browse GearForce riding jackets, gloves, boots, luggage, accessories, lighting and action cameras. Filter by category, brand, price and availability.",
  alternates: { canonical: absoluteUrl("/shop") },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader eyebrow="The full range" title="Shop all" intro="Riding gear and motorcycle accessories from Hyderabad." />
      <Suspense fallback={<p className="bg-arctic p-10 text-center text-ink-muted">Loading products…</p>}>
        <ShopBrowser products={getPublishedProducts()} />
      </Suspense>
    </>
  );
}
