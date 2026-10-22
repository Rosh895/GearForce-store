"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, RotateCcw, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { PriceTag } from "@/components/product/PriceTag";
import { ProductImage } from "@/components/product/ProductImage";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RIDE_STYLES, type RideStyleId } from "@/data/ride-setups";
import { useCart } from "@/hooks/use-cart";
import { formatINR } from "@/lib/format";
import type { Product } from "@/types/product";

/**
 * Three-phase configurator: 1) riding style → 2) one step per gear slot → 3) review.
 * Curated picks only (see data/ride-setups.ts); no backend.
 */
export function RideSetup({ products, initialStyle }: { products: Product[]; initialStyle?: RideStyleId }) {
  const { add } = useCart();
  const [styleId, setStyleId] = useState<RideStyleId | null>(initialStyle ?? null);
  const [step, setStep] = useState(initialStyle ? 1 : 0);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const bySku = useMemo(() => new Map(products.filter((p) => p.sku).map((p) => [p.sku as string, p])), [products]);
  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const style = RIDE_STYLES.find((s) => s.id === styleId) ?? null;

  const slots = useMemo(
    () =>
      (style?.slots ?? [])
        .map((slot) => ({ label: slot.label, items: slot.skus.map((s) => bySku.get(s)).filter((p): p is Product => !!p) }))
        .filter((s) => s.items.length > 0),
    [style, bySku],
  );

  const stepLabels = ["Style", ...slots.map((s) => s.label), "Review"];
  const reviewStep = stepLabels.length - 1;
  const chosen = slots.flatMap((s) => {
    const p = byId.get(picks[s.label] ?? "");
    return p && p.availabilityStatus !== "out_of_stock" ? [{ slot: s.label, product: p }] : [];
  });
  const total = chosen.reduce((sum, c) => sum + c.product.sellingPrice, 0);

  // Move focus to the new step's heading after a user-driven change (not on first load).
  const interacted = useRef(false);

  function go(next: number) {
    interacted.current = true;
    setAdded(false);
    setStep(Math.max(0, Math.min(reviewStep, next)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseStyle(id: RideStyleId) {
    interacted.current = true;
    if (id !== styleId) setPicks({});
    setStyleId(id);
    setAdded(false);
    setStep(1);
  }

  function restart() {
    interacted.current = true;
    setStyleId(null);
    setPicks({});
    setAdded(false);
    setStep(0);
  }

  function addKit() {
    chosen.forEach((c) => add(c.product.id, 1));
    setAdded(true);
  }

  const slot = step >= 1 && step < reviewStep ? slots[step - 1] : null;

  return (
    <section className="relative overflow-clip bg-midnight text-arctic">
      <div className="speed-lines absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute -right-32 top-0 h-full w-40 skew-x-[-20deg] bg-racing/35 sm:w-64" aria-hidden />

      <Container className="relative py-10 sm:py-16">
        {/* Gearbox-style progress */}
        <ol aria-label="Progress" className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3">
          {stepLabels.map((label, i) => {
            const done = i < step;
            const current = i === step;
            const clickable = style !== null && i < step;
            return (
              <li key={label} className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={() => go(i)}
                  aria-current={current ? "step" : undefined}
                  className={`flex items-center gap-2 border px-3 py-2 font-heading text-sm font-bold uppercase tracking-[0.14em] transition-colors ${
                    current ? "border-racing bg-racing text-white" : done ? "border-white/40 text-arctic hover:border-racing" : "border-white/15 text-silver/60"
                  }`}
                >
                  <span className="italic">{i + 1}</span>
                  <span className={current ? "inline" : "hidden sm:inline"}>{label}</span>
                </button>
                {i < stepLabels.length - 1 && <span className="hidden h-px w-4 bg-white/20 sm:block" aria-hidden />}
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24, transition: { duration: 0.12 } }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onAnimationComplete={() => interacted.current && headingRef.current?.focus({ preventScroll: true })}
          >
            {step === 0 && (
              <div>
                <h1 ref={headingRef} tabIndex={-1} className="display text-[clamp(2.75rem,8vw,7rem)] outline-none">
                  How do <span className="text-racing">you</span> ride?
                </h1>
                <p className="mt-4 max-w-xl text-silver">Choose a riding style. We’ll walk you through gear picked from our catalogue, one piece at a time.</p>
                <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {RIDE_STYLES.map((s, i) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => chooseStyle(s.id)}
                        className="group clip-cut relative flex h-full min-h-56 w-full flex-col justify-between border border-white/15 bg-graphite p-6 text-left transition-colors duration-300 hover:border-racing hover:bg-graphite-deep"
                      >
                        <span className="display outline-text text-[5.5rem] leading-none [--outline-color:rgb(255_255_255/0.3)] group-hover:[--outline-color:var(--color-racing)]">{i + 1}</span>
                        <span>
                          <span className="display block text-3xl group-hover:text-racing">{s.label}</span>
                          <span className="mt-2 block text-sm text-silver">{s.tagline}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {slot && style && (
              <div>
                <p className="eyebrow mb-3">{style.label} · Step {step + 1} of {stepLabels.length}</p>
                <h1 ref={headingRef} tabIndex={-1} className="display text-[clamp(2.5rem,7vw,5.5rem)] outline-none">
                  Choose your <span className="text-racing">{slot.label.toLowerCase()}</span>
                </h1>
                <div role="radiogroup" aria-label={`${slot.label} options`} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {slot.items.map((p) => {
                    const on = picks[slot.label] === p.id;
                    const soldOut = p.availabilityStatus === "out_of_stock";
                    return (
                      <div key={p.id} className={`clip-cut flex flex-col border bg-graphite transition-colors ${on ? "border-racing" : "border-white/10"}`}>
                        <button
                          type="button"
                          role="radio"
                          aria-checked={on}
                          disabled={soldOut}
                          onClick={() => setPicks((cur) => (cur[slot.label] === p.id ? omit(cur, slot.label) : { ...cur, [slot.label]: p.id }))}
                          className="flex flex-1 flex-col text-left disabled:opacity-50"
                        >
                          <span className="relative block aspect-[4/3] overflow-clip bg-graphite-deep">
                            <ProductImage image={p.images[0]} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" />
                            {on && (
                              <span className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center bg-racing text-white"><Check className="h-5 w-5" aria-hidden /></span>
                            )}
                          </span>
                          <span className="flex flex-1 flex-col gap-2 p-4">
                            <span className="font-heading text-xl font-bold leading-tight">{p.name}</span>
                            <PriceTag price={p.sellingPrice} originalPrice={p.originalPrice} onDark />
                            <span><AvailabilityBadge status={p.availabilityStatus} onDark /></span>
                          </span>
                        </button>
                        <Link href={`/product/${p.slug}`} className="border-t border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-silver hover:text-racing">
                          View details →
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === reviewStep && style && (
              <div>
                <p className="eyebrow mb-3">{style.label} kit · Final step</p>
                <h1 ref={headingRef} tabIndex={-1} className="display text-[clamp(2.5rem,7vw,5.5rem)] outline-none">
                  Your <span className="text-racing">{style.label.toLowerCase()}</span> setup
                </h1>
                {chosen.length === 0 ? (
                  <p className="mt-6 text-silver">You haven’t picked anything yet. Go back to a step and choose a product, or start over.</p>
                ) : (
                  <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                    {chosen.map(({ slot: label, product }, i) => (
                      <li key={product.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-racing">{label}</p>
                          <Link href={`/product/${product.slug}`} className="font-heading text-xl font-bold hover:text-racing">{product.name}</Link>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-heading text-xl font-bold">{formatINR(product.sellingPrice)}</span>
                          <button type="button" onClick={() => go(slots.findIndex((s) => s.label === label) + 1)} className="text-sm text-silver underline hover:text-racing" aria-label={`Change ${label}`}>
                            Change
                          </button>
                        </div>
                        <span className="sr-only">Item {i + 1}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-6 flex items-baseline justify-between border-b border-white/10 pb-4 font-heading text-3xl font-bold">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button onClick={addKit} disabled={chosen.length === 0}>
                    {added ? <Check className="h-4 w-4" aria-hidden /> : <ShoppingCart className="h-4 w-4" aria-hidden />}
                    {added ? "Added to cart" : "Add kit to cart"}
                  </Button>
                  {added && <Link href="/cart" className="font-semibold text-racing underline">View cart</Link>}
                  <Button variant="secondary" onClick={restart}><RotateCcw className="h-4 w-4" aria-hidden /> Start over</Button>
                </div>
                <p className="mt-6 max-w-2xl text-xs text-silver">
                  Hand-picked by GearForce from the catalogue by riding style. These are not fit or safety recommendations; sizes and
                  specifications are still being verified — please contact us before ordering. Academic demo: nothing is purchased.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step controls + running total */}
        {step > 0 && step < reviewStep && (
          <div className="sticky bottom-0 z-20 -mx-4 mt-10 flex items-center justify-between gap-3 border-t border-white/15 bg-midnight/95 px-4 py-4 backdrop-blur sm:mx-0 sm:px-0">
            <Button variant="secondary" onClick={() => go(step - 1)}><ArrowLeft className="h-4 w-4" aria-hidden /> Back</Button>
            <p className="hidden text-sm text-silver sm:block" aria-live="polite">
              {chosen.length} {chosen.length === 1 ? "item" : "items"} · <span className="font-semibold text-arctic">{formatINR(total)}</span>
            </p>
            <Button onClick={() => go(step + 1)}>
              {slot && picks[slot.label] ? "Continue" : "Skip"} <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

function omit(obj: Record<string, string>, key: string): Record<string, string> {
  const { [key]: _removed, ...rest } = obj;
  return rest;
}
