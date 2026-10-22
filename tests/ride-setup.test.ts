import { describe, expect, it } from "vitest";
import { RIDE_STYLES } from "@/data/ride-setups";
import { buildAllProducts, isPublished } from "@/lib/catalogue";

describe("ride setups", () => {
  const published = new Set(buildAllProducts().filter(isPublished).map((p) => p.sku));

  it("has the four riding styles", () => {
    expect(RIDE_STYLES.map((s) => s.id)).toEqual(["city", "touring", "adventure", "racing"]);
  });

  it("only references published catalogue SKUs, with no duplicates inside a style", () => {
    for (const style of RIDE_STYLES) {
      const skus = style.slots.flatMap((s) => s.skus);
      for (const sku of skus) expect(published.has(sku), `${style.id}: ${sku}`).toBe(true);
      expect(new Set(skus).size, style.id).toBe(skus.length === new Set(skus).size ? skus.length : -1);
    }
  });
});
