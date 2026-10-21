import { describe, expect, it } from "vitest";
import { SOURCE_CATALOGUE } from "@/data/source-catalogue";
import { buildAllProducts, buildProduct, isPublished } from "@/lib/catalogue";
import { SLUG_PATTERN, slugify } from "@/lib/slug";
import { validateCatalogue } from "@/lib/validation";
import type { SourceRecord } from "@/types/product";
import { EXPECTED, EXPECTED_VARIANT_COUNTS } from "./expected-catalogue";

describe("source catalogue vs supplied Wix records", () => {
  it("has exactly 48 entries including the placeholder", () => {
    expect(SOURCE_CATALOGUE).toHaveLength(48);
    expect(EXPECTED).toHaveLength(48);
  });

  it("matches every supplied price, original price, inventory status and SKU, in order", () => {
    const actual = SOURCE_CATALOGUE.map((r) => [r.sku, r.price, r.originalPrice, r.inventory]);
    expect(actual).toEqual(EXPECTED);
  });

  it("matches supplied variant counts and leaves the rest unknown (null)", () => {
    for (const r of SOURCE_CATALOGUE) {
      const expected = r.sku ? EXPECTED_VARIANT_COUNTS[r.sku] : undefined;
      if (r.sku === null) expect(r.variantCount).toBe(10); // Tarmac One III: 10 variants, SKU unverified
      else expect(r.variantCount).toBe(expected ?? null);
    }
  });

  it("never infers a missing SKU", () => {
    const noSku = SOURCE_CATALOGUE.filter((r) => r.sku === null);
    expect(noSku).toHaveLength(1);
    expect(buildProduct(noSku[0]!).skuVerified).toBe(false);
  });

  it("has unique SKUs where known", () => {
    const skus = SOURCE_CATALOGUE.map((r) => r.sku).filter((s): s is string => s !== null);
    expect(new Set(skus).size).toBe(skus.length);
  });
});

describe("derived products", () => {
  const products = buildAllProducts();

  it("has valid, unique slugs and ids", () => {
    for (const p of products) expect(p.slug).toMatch(SLUG_PATTERN);
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });

  it("rejects no negative prices", () => {
    for (const p of products) expect(p.sellingPrice).toBeGreaterThanOrEqual(0);
  });

  it("publishes 47 products and hides the Wix placeholder", () => {
    const published = products.filter(isPublished);
    expect(published).toHaveLength(47);
    expect(published.find((p) => p.sku === "0001")).toBeUndefined();
    expect(products.find((p) => p.sku === "0001")?.publishStatus).toBe("hidden_pending_confirmation");
  });

  it("does not invent variants, specifications, descriptions or images", () => {
    for (const p of products) {
      expect(p.variants).toEqual([]);
      expect(p.specifications).toEqual([]);
      expect(p.description).toBeNull();
      expect(p.images).toEqual([]);
    }
  });

  it("marks cut-off names as incomplete and keeps slugs stable", () => {
    const jk16 = products.find((p) => p.sku === "JK16")!;
    expect(jk16.nameComplete).toBe(false);
    expect(jk16.slug).toBe("rynox-tornado-p-jk16");
    expect(products.find((p) => p.sku === "AC03")!.nameComplete).toBe(true);
  });

  it("keeps the confirmed partial-stock statuses", () => {
    expect(products.find((p) => p.sku === "JK16")!.availabilityStatus).toBe("partially_out_of_stock");
    expect(products.find((p) => p.sku === null)!.availabilityStatus).toBe("partially_out_of_stock");
  });
});

describe("validateCatalogue", () => {
  const base: SourceRecord = {
    sku: "T1", visibleName: "Test", category: "gloves", price: 100, originalPrice: null,
    variantCount: null, inventory: "in_stock", brand: null,
  };

  it("passes for the real catalogue", () => {
    const report = validateCatalogue(SOURCE_CATALOGUE);
    expect(report.errors).toEqual([]);
    expect(report.total).toBe(48);
    expect(report.published).toBe(47);
  });

  it("rejects negative prices", () => {
    expect(validateCatalogue([{ ...base, price: -1 }]).errors.join()).toMatch(/invalid selling price/);
  });

  it("rejects duplicate SKUs", () => {
    expect(validateCatalogue([base, { ...base, visibleName: "Other" }]).errors.join()).toMatch(/SKU duplicates/);
  });

  it("rejects a published placeholder", () => {
    const r = validateCatalogue([{ ...base, visibleName: "I'm a Product", inventory: "out_of_stock" }]);
    expect(r.errors.join()).toMatch(/must not be published/);
  });

  it("rejects invalid slugs", () => {
    expect(slugify("Ünïcode & Spaces!")).toMatch(SLUG_PATTERN);
    expect(validateCatalogue([{ ...base, visibleName: "!!!", sku: null }]).errors.join()).toMatch(/invalid slug/);
  });
});
