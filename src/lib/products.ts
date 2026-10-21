import { SOURCE_CATALOGUE } from "@/data/source-catalogue";
import { getCategory } from "@/data/categories";
import type { CartCatalogueEntry, CategoryId, Product } from "@/types/product";
import { buildProduct, isPublished, recordKey } from "./catalogue";
import { findProductImages } from "./product-images";

/**
 * Server-side data layer. Today it reads the local catalogue; later swap the body of these
 * functions for a database query without touching any component.
 */
let cache: Product[] | null = null;

function load(): Product[] {
  if (cache) return cache;
  cache = SOURCE_CATALOGUE.map((record) => {
    const product = buildProduct(record);
    return { ...product, images: findProductImages(recordKey(record), product.name) };
  });
  return cache;
}

/** Customer-facing products only (placeholder/unconfirmed records excluded). */
export function getPublishedProducts(): Product[] {
  return load().filter(isPublished);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getPublishedProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return getPublishedProducts().filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return getPublishedProducts().filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getPublishedProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function getCartCatalogue(): CartCatalogueEntry[] {
  return getPublishedProducts().map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    sku: p.sku,
    price: p.sellingPrice,
    originalPrice: p.originalPrice,
    availability: p.availabilityStatus,
    image: p.images[0] ?? null,
    categoryLabel: getCategory(p.category).label,
    variantCount: p.variantCount,
  }));
}
