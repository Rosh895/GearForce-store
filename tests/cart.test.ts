import { describe, expect, it } from "vitest";
import { MAX_LINE_QUANTITY, addItem, computeLines, itemCount, parseStoredCart, removeItem, setQuantity, subtotal } from "@/lib/cart";
import type { CartCatalogueEntry } from "@/types/product";

const entry = (id: string, price: number, availability: CartCatalogueEntry["availability"] = "in_stock"): CartCatalogueEntry => ({
  id, slug: id, name: id, sku: id, price, originalPrice: null, availability, image: null, categoryLabel: "x", variantCount: null,
});
const catalogue = new Map([entry("a", 100), entry("b", 250), entry("c", 999, "out_of_stock")].map((e) => [e.id, e]));

describe("cart", () => {
  it("adds, merges, updates and removes items", () => {
    let items = addItem([], "a");
    items = addItem(items, "a", 2);
    items = addItem(items, "b");
    expect(items).toEqual([{ productId: "a", quantity: 3 }, { productId: "b", quantity: 1 }]);
    items = setQuantity(items, "a", 5);
    expect(items[0]!.quantity).toBe(5);
    expect(setQuantity(items, "a", 0).some((i) => i.productId === "a")).toBe(false);
    expect(removeItem(items, "b")).toHaveLength(1);
  });

  it("caps quantity at the UI limit", () => {
    expect(addItem([{ productId: "a", quantity: MAX_LINE_QUANTITY }], "a")[0]!.quantity).toBe(MAX_LINE_QUANTITY);
  });

  it("computes subtotal from live prices and excludes out-of-stock lines", () => {
    const lines = computeLines([{ productId: "a", quantity: 2 }, { productId: "c", quantity: 1 }, { productId: "gone", quantity: 1 }], catalogue);
    expect(lines).toHaveLength(2); // unknown product dropped
    expect(lines[1]!.purchasable).toBe(false);
    expect(subtotal(lines)).toBe(200);
    expect(itemCount(lines)).toBe(3);
  });

  it("parses stored cart defensively", () => {
    expect(parseStoredCart(null)).toEqual([]);
    expect(parseStoredCart("not json")).toEqual([]);
    expect(parseStoredCart('{"a":1}')).toEqual([]);
    expect(parseStoredCart('[{"productId":"a","quantity":2,"price":1},{"productId":"a","quantity":3},{"bad":true}]')).toEqual([{ productId: "a", quantity: 2 }]);
  });
});
