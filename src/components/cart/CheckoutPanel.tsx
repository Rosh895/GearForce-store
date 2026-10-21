"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/hooks/use-cart";
import { formatINR } from "@/lib/format";
import type { CheckoutStatus } from "@/lib/checkout";

export function CheckoutPanel({ status }: { status: CheckoutStatus }) {
  const { lines, subtotal, hydrated } = useCart();

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <div>
        {!status.configured ? (
          <div role="status" className="flex gap-3 border-l-4 border-racing bg-white p-6">
            <Info className="mt-1 h-5 w-5 shrink-0 text-racing" aria-hidden />
            <div>
              <h2 className="font-heading text-2xl font-bold uppercase">Online checkout isn’t available yet</h2>
              <p className="mt-2 text-ink-muted">
                {status.reason} No order has been placed and no payment has been taken. Your cart is kept in this browser.
              </p>
              <p className="mt-2 text-ink-muted">
                To enquire about these items, please <Link href="/contact" className="font-semibold text-racing underline">contact GearForce</Link>.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/cart" variant="dark">Back to cart</ButtonLink>
                <ButtonLink href="/shop" variant="ghost">Continue shopping</ButtonLink>
              </div>
            </div>
          </div>
        ) : (
          <p>Checkout provider: {status.provider}</p>
        )}
      </div>

      <aside className="h-fit border border-black/10 bg-white p-6" aria-label="Order summary">
        <h2 className="font-heading text-xl font-bold uppercase tracking-[0.1em]">Your items</h2>
        {!hydrated ? (
          <p className="mt-3 text-sm text-ink-muted">Loading…</p>
        ) : lines.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mt-3 space-y-2 text-sm">
              {lines.map((l) => (
                <li key={l.item.productId} className="flex justify-between gap-3">
                  <span>{l.product.name} × {l.item.quantity}</span>
                  <span>{l.purchasable ? formatINR(l.lineTotal) : "Out of stock"}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex justify-between border-t border-black/10 pt-3 font-semibold"><span>Subtotal</span><span>{formatINR(subtotal)}</span></p>
          </>
        )}
      </aside>
    </div>
  );
}
