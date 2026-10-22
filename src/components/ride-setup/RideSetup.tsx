"use client";

import { Check, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { PriceTag } from "@/components/product/PriceTag";
import { ProductImage } from "@/components/product/ProductImage";
import { Button } from "@/components/ui/Button";
import { RIDE_STYLES, type RideStyleId } from "@/data/ride-setups";
import { useCart } from "@/hooks/use-cart";
import { formatINR } from "@/lib/format";
import type { Product } from "@/types/product";

export function RideSetup({ products, initialStyle = "city" }: { products: Product[]; initialStyle?: RideStyleId }) {
  const { add } = useCart();
  const [styleId, setStyleId] = useState<RideStyleId>(initialStyle);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [added, setAdded] = useState(false);

  const bySku = useMemo(() => new Map(products.filter((p) => p.sku).map((p) => [p.sku as string, p])), [products]);
  const style = RIDE_STYLES.find((s) => s.id === styleId) ?? RIDE_STYLES[0]!;

  const slots = style.slots
    .map((slot) => ({ label: slot.label, items: slot.skus.map((s) => bySku.get(s)).filter((p): p is Product => !!p) }))
    .filter((s) => s.items.length > 0);

  const allItems = slots.flatMap((s) => s.items);
  const chosen = allItems.filter((p) => picked.has(p.id) && p.availabilityStatus !== "out_of_stock");
  const total = chosen.reduce((sum, p) => sum + p.sellingPrice, 0);

  function selectStyle(id: RideStyleId) {
    setStyleId(id);
    setPicked(new Set());
    setAdded(false);
  }

  function toggle(id: string) {
    setAdded(false);
    setPicked((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addKit() {
    chosen.forEach((p) => add(p.id, 1));
    setAdded(true);
  }

  return (
    <div className="bg-arctic text-midnight">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div role="tablist" aria-label="Riding style" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {RIDE_STYLES.map((s) => (
            <button
              key={s.id}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={s.id === styleId}
              aria-controls="ride-panel"
              type="button"
              onClick={() => selectStyle(s.id)}
              className={`display border-2 px-4 py-4 text-xl transition-colors sm:text-2xl ${s.id === styleId ? "border-racing bg-midnight text-white" : "border-black/15 bg-white hover:border-racing"}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div id="ride-panel" role="tabpanel" aria-labelledby={`tab-${styleId}`} className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <p className="text-lg text-ink-muted">{style.tagline}</p>
            {slots.map((slot) => (
              <section key={slot.label} aria-labelledby={`slot-${slot.label}`}>
                <h2 id={`slot-${slot.label}`} className="display mb-4 text-2xl">{slot.label}</h2>
                <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {slot.items.map((p) => {
                    const soldOut = p.availabilityStatus === "out_of_stock";
                    const on = picked.has(p.id);
                    return (
                      <li key={p.id} className={`flex flex-col border bg-white ${on ? "border-racing" : "border-black/10"}`}>
                        <div className="relative aspect-[4/3] bg-graphite">
                          <ProductImage image={p.images[0]} sizes="(min-width:1280px) 22vw, (min-width:640px) 40vw, 90vw" />
                        </div>
                        <div className="flex flex-1 flex-col gap-2 p-3">
                          <Link href={`/product/${p.slug}`} className="font-heading text-lg font-bold leading-tight hover:text-racing">{p.name}</Link>
                          <PriceTag price={p.sellingPrice} originalPrice={p.originalPrice} />
                          <AvailabilityBadge status={p.availabilityStatus} />
                          <label className={`mt-auto flex items-center gap-2 pt-2 text-sm font-semibold ${soldOut ? "opacity-50" : "cursor-pointer"}`}>
                            <input type="checkbox" className="h-4 w-4 accent-[#E10600]" checked={on} disabled={soldOut} onChange={() => toggle(p.id)} />
                            Add to my kit
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <aside aria-label="My kit" className="h-fit border border-black/10 bg-white p-5 lg:sticky lg:top-24">
            <h2 className="font-heading text-xl font-bold uppercase tracking-[0.1em]">My {style.label} kit</h2>
            {chosen.length === 0 ? (
              <p className="mt-3 text-sm text-ink-muted">Tick “Add to my kit” on the products you want.</p>
            ) : (
              <ul className="mt-3 space-y-1 text-sm">
                {chosen.map((p) => (
                  <li key={p.id} className="flex justify-between gap-3"><span>{p.name}</span><span>{formatINR(p.sellingPrice)}</span></li>
                ))}
              </ul>
            )}
            <p className="mt-4 flex justify-between border-t border-black/10 pt-3 font-semibold"><span>Total</span><span>{formatINR(total)}</span></p>
            <Button className="mt-4 w-full" disabled={chosen.length === 0} onClick={addKit}>
              {added ? <Check className="h-4 w-4" aria-hidden /> : <ShoppingCart className="h-4 w-4" aria-hidden />}
              {added ? "Added to cart" : "Add kit to cart"}
            </Button>
            <p role="status" className="mt-2 min-h-5 text-sm">
              {added && <Link href="/cart" className="font-semibold text-racing underline">View cart</Link>}
            </p>
            <p className="mt-3 text-xs text-ink-muted">
              Hand-picked by GearForce from the catalogue by riding style. These are not fit or safety recommendations;
              specifications and sizes are still being verified — please contact us before ordering.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
