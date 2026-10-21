import { CONFIRMED_NAMES } from "@/data/confirmed-names";
import { SOURCE_CATALOGUE } from "@/data/source-catalogue";
import type { Product, SourceRecord } from "@/types/product";
import { slugify } from "./slug";

const ELLIPSIS = "...";

export function isTruncatedName(visibleName: string): boolean {
  return visibleName.endsWith(ELLIPSIS);
}

/** Visible fragment without the trailing ellipsis. */
export function nameFragment(visibleName: string): string {
  return isTruncatedName(visibleName) ? visibleName.slice(0, -ELLIPSIS.length).trimEnd() : visibleName;
}

/** Key used for confirmed-name lookups and image folders: lower-case SKU, or the slug for SKU-less records. */
export function recordKey(record: SourceRecord): string {
  return record.sku ?? slugify(nameFragment(record.visibleName));
}

/**
 * Stable slug pinned to the ORIGINAL visible fragment + SKU, so confirming a full name later
 * does not change the public URL.
 */
export function buildSlug(record: SourceRecord): string {
  return `${slugify(nameFragment(record.visibleName))}-${record.sku ? slugify(record.sku) : "sku-unverified"}`;
}

export function buildId(record: SourceRecord): string {
  return record.sku ? `gf-${slugify(record.sku)}` : `gf-nosku-${slugify(nameFragment(record.visibleName))}`;
}

export function buildProduct(record: SourceRecord): Product {
  const truncated = isTruncatedName(record.visibleName);
  const confirmed = CONFIRMED_NAMES[recordKey(record)];
  const name = confirmed ?? (truncated ? `${nameFragment(record.visibleName)}…` : record.visibleName);

  return {
    id: buildId(record),
    sku: record.sku,
    skuVerified: record.sku !== null,
    name,
    nameComplete: !truncated || confirmed !== undefined,
    slug: buildSlug(record),
    category: record.category,
    brand: record.brand,
    sellingPrice: record.price,
    originalPrice: record.originalPrice,
    currency: "INR",
    description: null,
    images: [],
    availabilityStatus: record.inventory,
    variants: [],
    variantCount: record.variantCount,
    specifications: [],
    featured: record.featured ?? false,
    publishStatus: record.publish ?? "published",
  };
}

/** Every record, including unpublished ones (for audits and tests). */
export function buildAllProducts(records: readonly SourceRecord[] = SOURCE_CATALOGUE): Product[] {
  return records.map(buildProduct);
}

export function isPublished(product: Product): boolean {
  return product.publishStatus === "published";
}
