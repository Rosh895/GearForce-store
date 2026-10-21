"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { ProductImage } from "@/components/product/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/hooks/use-cart";
import { MAX_LINE_QUANTITY } from "@/lib/cart";
import { formatINR } from "@/lib/format";

export function CartView({ checkoutAvailable }: { checkoutAvailable: boolean }) {
  const { lines, subtotal, hydrated, remove, setQty, clear } = useCart();

  if (!hydrated) return <p className="py-16 text-center text-ink-muted">Loading your cart…</p>;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-ink-muted" aria-hidden />
        <h2 className="display mt-4 text-3xl">Your cart is empty</h2>
        <p className="mt-2 text-ink-muted">Browse the range and add something to get started.</p>
        <ButtonLink href="/shop" variant="dark" className="mt-6">Continue shopping</ButtonLink>
      </div>
    );
  }

  const hasUnavailable = lines.some((l) => !l.purchasable);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <ul className="divide-y divide-black/10 border-y border-black/10">
        {lines.map(({ item, product, purchasable, lineTotal }) => (
          <li key={item.productId} className="flex gap-4 py-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-graphite sm:h-28 sm:w-28">
              <ProductImage image={product.image} sizes="112px" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/product/${product.slug}`} className="font-heading text-lg font-bold leading-tight hover:text-racing">{product.name}</Link>
                  <p className="text-xs text-ink-muted">SKU: {product.sku ?? "being verified"} · {formatINR(product.price)} each</p>
                </div>
                <button type="button" onClick={() => remove(item.productId)} aria-label={`Remove ${product.name} from cart`} className="h-fit p-2 text-ink-muted hover:text-racing">
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>

              {!purchasable && (
                <p role="alert" className="text-sm font-semibold text-red-700">This product is out of stock and is not included in the subtotal. Please remove it.</p>
              )}
              {purchasable && product.availability === "partially_out_of_stock" && <AvailabilityBadge status={product.availability} />}
              {purchasable && product.variantCount !== null && product.variantCount > 1 && (
                <p className="text-xs text-ink-muted">Variant option not yet selectable online — to be confirmed with GearForce.</p>
              )}

              <div className="mt-auto flex items-center justify-between">
                <div role="group" aria-label={`Quantity for ${product.name}`} className="flex items-center border border-black/30">
                  <button type="button" className="p-2 hover:bg-black/5 disabled:opacity-40" aria-label="Decrease quantity" onClick={() => setQty(item.productId, item.quantity - 1)}>
                    <Minus className="h-4 w-4" aria-hidden />
                  </button>
                  <output className="w-9 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</output>
                  <button type="button" className="p-2 hover:bg-black/5 disabled:opacity-40" aria-label="Increase quantity" disabled={item.quantity >= MAX_LINE_QUANTITY || !purchasable} onClick={() => setQty(item.productId, item.quantity + 1)}>
                    <Plus className="h-4 w-4" aria-hidden />
                  </button>
                </div>
                <p className="font-heading text-xl font-bold">{purchasable ? formatINR(lineTotal) : "—"}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit border border-black/10 bg-white p-6" aria-label="Order summary">
        <h2 className="font-heading text-xl font-bold uppercase tracking-[0.1em]">Summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">{formatINR(subtotal)}</dd></div>
          <div className="flex justify-between text-ink-muted"><dt>Shipping &amp; taxes</dt><dd>Not calculated yet</dd></div>
        </dl>
        {hasUnavailable && <p className="mt-3 text-sm text-red-700">Remove out-of-stock items before checking out.</p>}
        <ButtonLink href="/checkout" className="mt-5 w-full">Proceed to checkout</ButtonLink>
        {!checkoutAvailable && <p className="mt-2 text-xs text-ink-muted">Online checkout is not available yet.</p>}
        <button type="button" onClick={clear} className="mt-4 text-sm text-ink-muted underline hover:text-racing">Clear cart</button>
        <p className="mt-4 text-xs text-ink-muted">Your cart is saved in this browser only. Prices and availability are confirmed again at checkout.</p>
      </aside>
    </div>
  );
}
