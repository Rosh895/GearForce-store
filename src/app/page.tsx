import { BrandStory } from "@/components/home/BrandStory";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { RideSetupTeaser } from "@/components/home/RideSetupTeaser";
import { CATEGORIES } from "@/data/categories";
import { findHeroImage } from "@/lib/product-images";
import { getFeaturedProducts, getPublishedProducts } from "@/lib/products";

export default function HomePage() {
  const published = getPublishedProducts();
  const counts: Record<string, number> = {};
  for (const p of published) counts[p.category] = (counts[p.category] ?? 0) + 1;

  // Only facts that are true of the catalogue itself.
  const stats = [
    { value: String(published.length), label: "Products listed" },
    { value: String(CATEGORIES.length), label: "Categories" },
    { value: "HYD", label: "Hyderabad, India" },
  ];

  return (
    <>
      <Hero heroImage={findHeroImage()} stats={stats} />
      <Marquee items={CATEGORIES.map((c) => c.label)} />
      <CategoryGrid counts={counts} />
      <RideSetupTeaser />
      <FeaturedProducts products={getFeaturedProducts()} />
      <BrandStory />
    </>
  );
}
