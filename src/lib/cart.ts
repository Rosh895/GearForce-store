import type { CartCatalogueEntry } from "@/types/product";

export const CART_STORAGE_KEY = "gearforce.cart.v1";
export const MAX_LINE_QUANTITY = 10; // UI guard only — NOT a stock quantity.

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartLine {
  item: CartItem;
  product: CartCatalogueEntry;
  /** false when the product is out of stock (it stays visible but is excluded from the subtotal). */
  purchasable: boolean;
  lineTotal: number;
}

const clamp = (q: number) => Math.min(MAX_LINE_QUANTITY, Math.max(1, Math.floor(q)));

export function addItem(items: CartItem[], productId: string, quantity = 1): CartItem[] {
  const existing = items.find((i) => i.productId === productId);
  if (!existing) return [...items, { productId, quantity: clamp(quantity) }];
  return items.map((i) => (i.productId === productId ? { ...i, quantity: clamp(i.quantity + quantity) } : i));
}

export function setQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeItem(items, productId);
  return items.map((i) => (i.productId === productId ? { ...i, quantity: clamp(quantity) } : i));
}

export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

/** Parse untrusted localStorage content. Unknown shapes yield an empty cart. */
export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const items: CartItem[] = [];
    for (const entry of data) {
      if (
        entry && typeof entry === "object" &&
        typeof (entry as CartItem).productId === "string" &&
        Number.isFinite((entry as CartItem).quantity)
      ) {
        const { productId, quantity } = entry as CartItem;
        if (!items.some((i) => i.productId === productId)) items.push({ productId, quantity: clamp(quantity) });
      }
    }
    return items;
  } catch {
    return [];
  }
}

/** Re-derive lines from the live catalogue so stale or tampered prices in storage are never trusted. */
export function computeLines(items: CartItem[], catalogue: ReadonlyMap<string, CartCatalogueEntry>): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = catalogue.get(item.productId);
    if (!product) continue; // product no longer exists → dropped
    const purchasable = product.availability !== "out_of_stock";
    lines.push({ item, product, purchasable, lineTotal: purchasable ? product.price * item.quantity : 0 });
  }
  return lines;
}

export function subtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.lineTotal, 0);
}

export function itemCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.item.quantity, 0);
}
