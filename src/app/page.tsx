import { BrandStory } from "@/components/home/BrandStory";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { findHeroImage } from "@/lib/product-images";
import { getFeaturedProducts, getPublishedProducts } from "@/lib/products";

export default function HomePage() {
  const counts: Record<string, number> = {};
  for (const p of getPublishedProducts()) counts[p.category] = (counts[p.category] ?? 0) + 1;

  return (
    <>
      <Hero heroImage={findHeroImage()} />
      <CategoryGrid counts={counts} />
      <FeaturedProducts products={getFeaturedProducts()} />
      <BrandStory />
    </>
  );
}
