import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/product/AddToCartPanel";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { PriceTag } from "@/components/product/PriceTag";
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
    <div className="bg-arctic text-midnight">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Container className="py-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-muted">
          <Link href="/shop" className="hover:text-racing">Shop</Link> / <Link href={`/category/${category.id}`} className="hover:text-racing">{category.label}</Link> / <span aria-current="page">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} />
          <div className="space-y-6">
            <div>
              {product.brand && <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">{product.brand}</p>}
              <h1 className="display mt-1 text-3xl sm:text-5xl">{product.name}</h1>
              {!product.nameComplete && (
                <p className="mt-2 text-sm text-ink-muted">Full product name is being confirmed.</p>
              )}
            </div>
            <PriceTag price={product.sellingPrice} originalPrice={product.originalPrice} size="lg" />
            <div className="flex flex-wrap items-center gap-3">
              <AvailabilityBadge status={product.availabilityStatus} />
              <span className="text-sm text-ink-muted">SKU: {product.sku ?? "being verified"}</span>
            </div>
            <AddToCartPanel product={product} />

            <section aria-labelledby="desc" className="border-t border-black/10 pt-6">
              <h2 id="desc" className="font-heading text-lg font-bold uppercase tracking-[0.1em]">Description</h2>
              <p className="mt-2 text-ink-muted">{product.description ?? "A product description has not been added yet."}</p>
            </section>
            <section aria-labelledby="specs" className="border-t border-black/10 pt-6">
              <h2 id="specs" className="font-heading text-lg font-bold uppercase tracking-[0.1em]">Specifications</h2>
              {product.specifications.length ? (
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
                  {product.specifications.map((s) => (
                    <div key={s.label} className="contents"><dt className="font-semibold">{s.label}</dt><dd>{s.value}</dd></div>
                  ))}
                </dl>
              ) : (
                <p className="mt-2 text-ink-muted">Specifications will be added once they have been verified. Please <Link href="/contact" className="font-semibold text-racing underline">contact us</Link> for details.</p>
              )}
            </section>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-16">
            <h2 id="related" className="display mb-6 text-3xl">Related products</h2>
            <ProductGrid products={related} />
          </section>
        )}
      </Container>
    </div>
  );
}
