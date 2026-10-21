import { describe, expect, it } from "vitest";
import { buildAllProducts, isPublished } from "@/lib/catalogue";
import { DEFAULT_FILTERS, UNSPECIFIED_BRAND, collectBrands, filterAndSort } from "@/lib/filter";
import { formatINR, discountPercent } from "@/lib/format";

const products = buildAllProducts().filter(isPublished);

describe("filterAndSort", () => {
  it("filters by category", () => {
    const r = filterAndSort(products, { ...DEFAULT_FILTERS, categories: ["gloves"] });
    expect(r).toHaveLength(8);
  });
  it("filters by brand incl. unspecified", () => {
    expect(filterAndSort(products, { ...DEFAULT_FILTERS, brands: ["Rynox"] })).toHaveLength(3);
    expect(filterAndSort(products, { ...DEFAULT_FILTERS, brands: [UNSPECIFIED_BRAND] }).every((p) => p.brand === null)).toBe(true);
  });
  it("filters by price range and availability", () => {
    const r = filterAndSort(products, { ...DEFAULT_FILTERS, minPrice: 9000, maxPrice: 13000 });
    expect(r.every((p) => p.sellingPrice >= 9000 && p.sellingPrice <= 13000)).toBe(true);
    expect(filterAndSort(products, { ...DEFAULT_FILTERS, availability: ["partially_out_of_stock"] })).toHaveLength(2);
  });
  it("searches name, SKU and brand", () => {
    expect(filterAndSort(products, { ...DEFAULT_FILTERS, query: "gopro" })).toHaveLength(3);
    expect(filterAndSort(products, { ...DEFAULT_FILTERS, query: "jk23" })).toHaveLength(1);
  });
  it("sorts by price and name", () => {
    const asc = filterAndSort(products, { ...DEFAULT_FILTERS, sort: "price-asc" }).map((p) => p.sellingPrice);
    expect([...asc].sort((a, b) => a - b)).toEqual(asc);
    const names = filterAndSort(products, { ...DEFAULT_FILTERS, sort: "name-asc" }).map((p) => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });
  it("collects brands with the unspecified bucket last", () => {
    const b = collectBrands(products);
    expect(b.at(-1)?.value).toBe(UNSPECIFIED_BRAND);
  });
});

describe("format", () => {
  it("formats INR with Indian grouping", () => {
    expect(formatINR(50999).replace(/\s/g, "")).toBe("₹50,999");
    expect(formatINR(1450000).replace(/\s/g, "")).toBe("₹14,50,000");
  });
  it("derives discount only from supplied prices", () => {
    expect(discountPercent(50999, 54990)).toBe(7);
    expect(discountPercent(3500, null)).toBeNull();
  });
});
