import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/product/AddToCartPanel";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { PriceTag } from "@/components/product/PriceTag";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { getCategory } from "@/data/categories";
import { getProductBySlug, getPublishedProducts, getRelatedProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getPublishedProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  const category = getCategory(p.category).label;
  return {
    title: p.name,
    description: `${p.name} — ${category.toLowerCase()} at GearForce, Hyderabad.${p.sku ? ` SKU ${p.sku}.` : ""}`,
    alternates: { canonical: absoluteUrl(`/product/${p.slug}`) },
    openGraph: p.images[0] ? { images: [p.images[0].src] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  // Structured data from verified facts only: no ratings, no delivery promises.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    category: category.label,
    ...(product.images.length ? { image: product.images.map((i) => absoluteUrl(i.src) ?? i.src) } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.sellingPrice,
      ...(product.availabilityStatus === "in_stock" ? { availability: "https://schema.org/InStock" } : {}),
      ...(product.availabilityStatus === "out_of_stock" ? { availability: "https://schema.org/OutOfStock" } : {}),
      ...(absoluteUrl(`/product/${product.slug}`) ? { url: absoluteUrl(`/product/${product.slug}`) } : {}),
    },
  };

  return (
    <div className="pb-24 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="relative overflow-hidden bg-midnight">
        <div className="speed-lines absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-silver">
            <Link href="/shop" className="hover:text-racing">Shop</Link> / <Link href={`/category/${category.id}`} className="hover:text-racing">{category.label}</Link> / <span aria-current="page" className="text-arctic">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <ProductGallery images={product.images} />
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div>
                <p className="eyebrow flex items-center gap-3">
                  <span className="h-px w-8 bg-racing" aria-hidden />
                  {product.brand ?? category.label}
                </p>
                <h1 className="display mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95]">{product.name}</h1>
                {!product.nameComplete && <p className="mt-2 text-sm text-silver">Full product name is being confirmed.</p>}
              </div>
              <PriceTag price={product.sellingPrice} originalPrice={product.originalPrice} size="lg" onDark />
              <div className="flex flex-wrap items-center gap-3">
                <AvailabilityBadge status={product.availabilityStatus} onDark />
                <span className="font-heading text-sm font-bold tracking-[0.18em] text-silver">SKU {product.sku ?? "BEING VERIFIED"}</span>
              </div>
              <AddToCartPanel product={product} />
              <p className="border-t border-white/10 pt-4 text-xs text-silver">Academic demo — checkout is disabled and nothing is charged.</p>
            </div>
          </div>
        </Container>
      </section>

      <div className="bg-arctic text-midnight">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <h2 className="display text-4xl sm:text-5xl">The <span className="text-racing">details</span></h2>
            <ProductDetails product={product} />
          </div>

          {related.length > 0 && (
            <section aria-labelledby="related" className="mt-16 border-t border-black/10 pt-12">
              <h2 id="related" className="display mb-6 text-3xl sm:text-4xl">More from {category.label}</h2>
              <ProductGrid products={related} />
            </section>
          )}
        </Container>
      </div>
    </div>
  );
}
