"use client";

import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/use-cart";
import { MAX_LINE_QUANTITY } from "@/lib/cart";
import { formatINR } from "@/lib/format";
import type { Product } from "@/types/product";

export function AddToCartPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [variantId, setVariantId] = useState<string>("");
  const [added, setAdded] = useState(false);

  const soldOut = product.availabilityStatus === "out_of_stock";
  const hasVariantData = product.variants.length > 0;
  const needsVariant = hasVariantData && !variantId;
  const disabled = soldOut || needsVariant;

  function onAdd() {
    add(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  const label = soldOut ? "Out of stock" : added ? "Added" : "Add to cart";
  const icon = added ? <Check className="h-4 w-4" aria-hidden /> : <ShoppingCart className="h-4 w-4" aria-hidden />;

  return (
    <div className="space-y-5">
      {hasVariantData && (
        <div>
          <label htmlFor="variant" className="mb-1 block text-sm font-semibold">Variant</label>
          <select id="variant" value={variantId} onChange={(e) => setVariantId(e.target.value)} className="w-full border border-white/25 bg-graphite px-3 py-3 text-arctic">
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
        <p className="border-l-4 border-amber-400 bg-amber-400/10 p-3 text-sm text-amber-100">
          {product.variantCount} variants exist in our store system. The option list is still being migrated, so please{" "}
          <Link href="/contact" className="font-semibold underline">contact us</Link> to confirm the exact option.
        </p>
      )}
      {product.availabilityStatus === "partially_out_of_stock" && (
        <p className="border-l-4 border-amber-400 bg-amber-400/10 p-3 text-sm text-amber-100">
          Some variants are out of stock. Per-variant availability is not shown yet — please confirm with us.
        </p>
      )}

      <div className="flex flex-wrap items-stretch gap-3">
        <div role="group" aria-label="Quantity" className="flex items-center border border-white/25">
          <button type="button" className="p-3 hover:bg-white/10 disabled:opacity-40" aria-label="Decrease quantity" disabled={soldOut || qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <Minus className="h-4 w-4" aria-hidden />
          </button>
          <output aria-live="polite" className="w-10 text-center font-semibold">{qty}</output>
          <button type="button" className="p-3 hover:bg-white/10 disabled:opacity-40" aria-label="Increase quantity" disabled={soldOut || qty >= MAX_LINE_QUANTITY} onClick={() => setQty((q) => Math.min(MAX_LINE_QUANTITY, q + 1))}>
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <Button onClick={onAdd} disabled={disabled} className="flex-1 py-4">
          {icon}
          {label}
        </Button>
      </div>
      <p role="status" className="min-h-5 text-sm text-silver">
        {added && (<>Added to your cart. <Link href="/cart" className="font-semibold text-racing underline">View cart</Link></>)}
      </p>

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-white/15 bg-midnight/95 px-4 py-3 backdrop-blur lg:hidden">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-silver">{qty > 1 ? `${qty} ×` : "Price"}</p>
          <p className="font-heading text-2xl font-bold leading-none">{formatINR(product.sellingPrice * qty)}</p>
        </div>
        <Button onClick={onAdd} disabled={disabled} className="px-5">
          {icon}
          {label}
        </Button>
      </div>
    </div>
  );
}
