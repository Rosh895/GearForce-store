import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/types/product";

function Section({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details open={defaultOpen} className="group border-b border-black/10 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-xl font-bold uppercase tracking-[0.08em] marker:hidden [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-2xl text-racing transition-transform duration-200 group-open:rotate-45" aria-hidden>+</span>
      </summary>
      <div className="mt-3 space-y-2 text-ink-muted">{children}</div>
    </details>
  );
}

/** Honest detail panels: unknown data is labelled as unknown, never filled in. */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="border-t border-black/10">
      <Section title="Description" defaultOpen>
        <p>{product.description ?? "A product description has not been added yet."}</p>
      </Section>
      <Section title="Specifications">
        {product.specifications.length ? (
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
            {product.specifications.map((s) => (
              <div key={s.label} className="contents"><dt className="font-semibold text-midnight">{s.label}</dt><dd>{s.value}</dd></div>
            ))}
          </dl>
        ) : (
          <p>Specifications will be added once verified. <Link href="/contact" className="font-semibold text-racing underline">Contact us</Link> for details.</p>
        )}
      </Section>
      <Section title="Variants & sizing">
        {product.variants.length ? (
          <ul className="list-disc pl-5">{product.variants.map((v) => <li key={v.id}>{v.label}</li>)}</ul>
        ) : product.variantCount ? (
          <p>This product has {product.variantCount} variants in our store system. The option list is still being migrated.</p>
        ) : (
          <p>No variant information has been supplied for this product yet.</p>
        )}
      </Section>
      <Section title="About this listing">
        <p>
          SKU: {product.sku ?? "being verified"}. Prices are in Indian Rupees (₹). This site is an academic demonstration:
          no payments are processed and no orders are placed.
        </p>
      </Section>
    </div>
  );
}
