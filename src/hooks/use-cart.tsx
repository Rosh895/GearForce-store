"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CART_STORAGE_KEY,
  addItem,
  computeLines,
  itemCount,
  parseStoredCart,
  removeItem,
  setQuantity,
  subtotal,
  type CartItem,
  type CartLine,
} from "@/lib/cart";
import type { CartCatalogueEntry } from "@/types/product";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** false until localStorage has been read (avoids hydration mismatch). */
  hydrated: boolean;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ catalogue, children }: { catalogue: CartCatalogueEntry[]; children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const map = useMemo(() => new Map(catalogue.map((c) => [c.id, c])), [catalogue]);

  useEffect(() => {
    let stored: CartItem[] = [];
    try {
      stored = parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY));
    } catch {
      /* storage unavailable (private mode etc.) — start empty */
    }
    setItems(stored.filter((i) => map.has(i.productId)));
    setHydrated(true);
  }, [map]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) setItems(parseStoredCart(e.newValue).filter((i) => map.has(i.productId)));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [map]);

  const add = useCallback((id: string, q = 1) => setItems((cur) => addItem(cur, id, q)), []);
  const remove = useCallback((id: string) => setItems((cur) => removeItem(cur, id)), []);
  const setQty = useCallback((id: string, q: number) => setItems((cur) => setQuantity(cur, id, q)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = computeLines(items, map);
    return { lines, count: itemCount(lines), subtotal: subtotal(lines), hydrated, add, remove, setQty, clear };
  }, [items, map, hydrated, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
