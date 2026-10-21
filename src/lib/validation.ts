import { buildProduct, isTruncatedName, nameFragment } from "./catalogue";
import { SLUG_PATTERN } from "./slug";
import { CATEGORY_IDS } from "@/data/categories";
import type { SourceRecord } from "@/types/product";

export interface CatalogueReport {
  total: number;
  published: number;
  hidden: number;
  /** Hard failures — the catalogue must not ship with any of these. */
  errors: string[];
  /** Unresolved migration data (honestly unknown values). Not failures. */
  unresolved: {
    truncatedNames: string[];
    unverifiedSkus: string[];
    unknownVariantCounts: string[];
    missingOriginalPrice: string[];
    hiddenRecords: string[];
  };
}

const label = (r: SourceRecord) => `${r.sku ?? "NO-SKU"} (${r.visibleName})`;

export function validateCatalogue(records: readonly SourceRecord[]): CatalogueReport {
  const errors: string[] = [];
  const slugs = new Map<string, string>();
  const ids = new Map<string, string>();
  const skus = new Map<string, string>();

  for (const r of records) {
    const p = buildProduct(r);
    const who = label(r);

    if (!Number.isFinite(r.price) || r.price < 0) errors.push(`${who}: invalid selling price ${r.price}`);
    if (r.originalPrice !== null && (!Number.isFinite(r.originalPrice) || r.originalPrice < 0)) {
      errors.push(`${who}: invalid original price ${r.originalPrice}`);
    }
    if (r.originalPrice !== null && r.originalPrice < r.price) {
      errors.push(`${who}: original price is lower than selling price`);
    }
    if (r.variantCount !== null && (!Number.isInteger(r.variantCount) || r.variantCount < 0)) {
      errors.push(`${who}: invalid variant count`);
    }
    if (!(CATEGORY_IDS as string[]).includes(r.category)) errors.push(`${who}: unknown category ${r.category}`);
    if (!SLUG_PATTERN.test(p.slug)) errors.push(`${who}: invalid slug "${p.slug}"`);

    const slugOwner = slugs.get(p.slug);
    if (slugOwner) errors.push(`${who}: slug "${p.slug}" duplicates ${slugOwner}`);
    slugs.set(p.slug, who);

    const idOwner = ids.get(p.id);
    if (idOwner) errors.push(`${who}: id "${p.id}" duplicates ${idOwner}`);
    ids.set(p.id, who);

    if (r.sku !== null) {
      const skuOwner = skus.get(r.sku);
      if (skuOwner) errors.push(`${who}: SKU duplicates ${skuOwner}`);
      skus.set(r.sku, who);
    }

    // Incomplete / placeholder entries must never be published.
    const looksLikePlaceholder = r.visibleName.trim().toLowerCase() === "i'm a product" || r.inventory === "out_of_stock";
    if (looksLikePlaceholder && (r.publish ?? "published") === "published") {
      errors.push(`${who}: placeholder/out-of-stock record must not be published`);
    }
  }

  const published = records.filter((r) => (r.publish ?? "published") === "published");
  return {
    total: records.length,
    published: published.length,
    hidden: records.length - published.length,
    errors,
    unresolved: {
      truncatedNames: records.filter((r) => isTruncatedName(r.visibleName)).map((r) => `${label(r)} → fragment "${nameFragment(r.visibleName)}"`),
      unverifiedSkus: records.filter((r) => r.sku === null).map(label),
      unknownVariantCounts: published.filter((r) => r.variantCount === null).map(label),
      missingOriginalPrice: published.filter((r) => r.originalPrice === null).map(label),
      hiddenRecords: records.filter((r) => (r.publish ?? "published") !== "published").map(label),
    },
  };
}
