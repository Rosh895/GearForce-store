"use client";

import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/use-cart";
import { MAX_LINE_QUANTITY } from "@/lib/cart";
import type { Product } from "@/types/product";

export function AddToCartPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [variantId, setVariantId] = useState<string>("");
  const [added, setAdded] = useState(false);

  const soldOut = product.availabilityStatus === "out_of_stock";
  const hasVariantData = product.variants.length > 0;
  const needsVariant = hasVariantData && !variantId;

  function onAdd() {
    add(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="space-y-5">
      {hasVariantData && (
        <div>
          <label htmlFor="variant" className="mb-1 block text-sm font-semibold">Variant</label>
          <select id="variant" value={variantId} onChange={(e) => setVariantId(e.target.value)} className="w-full border border-black/30 bg-white px-3 py-2">
            <option value="">Select an option</option>
            {product.variants.map((v) => (
              <option key={v.id} value={v.id} disabled={v.availability === "out_of_stock"}>
                {v.label}{v.availability === "out_of_stock" ? " — out of stock" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      {!hasVariantData && product.variantCount !== null && product.variantCount > 1 && (
        <p className="border-l-4 border-amber-500 bg-amber-50 p-3 text-sm text-midnight">
          This product has {product.variantCount} variants in our store system. The option list is still being migrated, so
          please <Link href="/contact" className="font-semibold underline">contact us</Link> to confirm the exact option before ordering.
        </p>
      )}
      {product.availabilityStatus === "partially_out_of_stock" && (
        <p className="border-l-4 border-amber-500 bg-amber-50 p-3 text-sm text-midnight">
          Some variants of this product are out of stock. Per-variant availability is not yet shown here — please confirm with us.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div role="group" aria-label="Quantity" className="flex items-center border border-black/30">
          <button type="button" className="p-3 hover:bg-black/5 disabled:opacity-40" aria-label="Decrease quantity" disabled={soldOut || qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <Minus className="h-4 w-4" aria-hidden />
          </button>
          <output aria-live="polite" className="w-10 text-center font-semibold">{qty}</output>
          <button type="button" className="p-3 hover:bg-black/5 disabled:opacity-40" aria-label="Increase quantity" disabled={soldOut || qty >= MAX_LINE_QUANTITY} onClick={() => setQty((q) => Math.min(MAX_LINE_QUANTITY, q + 1))}>
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <Button onClick={onAdd} disabled={soldOut || needsVariant} className="flex-1 sm:flex-none">
          {added ? <Check className="h-4 w-4" aria-hidden /> : <ShoppingCart className="h-4 w-4" aria-hidden />}
          {soldOut ? "Out of stock" : added ? "Added" : "Add to cart"}
        </Button>
      </div>
      <p role="status" className="min-h-5 text-sm text-ink-muted">
        {added && (<>Added to your cart. <Link href="/cart" className="font-semibold text-racing underline">View cart</Link></>)}
      </p>
    </div>
  );
}
