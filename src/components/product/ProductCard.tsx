import Link from "next/link";
import { getCategory } from "@/data/categories";
import { discountPercent } from "@/lib/format";
import type { Product } from "@/types/product";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { PriceTag } from "./PriceTag";
import { ProductImage } from "./ProductImage";

export function ProductCard({
  product,
  variant = "light",
  sizes = "(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw",
}: {
  product: Product;
  variant?: "light" | "dark";
  sizes?: string;
}) {
  const dark = variant === "dark";
  const pct = discountPercent(product.sellingPrice, product.originalPrice);
  return (
    <article
      className={`group clip-cut relative flex h-full flex-col border transition-all duration-300 hover:-translate-y-1 ${
        dark ? "border-white/10 bg-graphite text-arctic hover:border-racing" : "border-black/10 bg-white text-midnight hover:shadow-xl"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          <ProductImage image={product.images[0]} sizes={sizes} />
        </div>
        {product.sku && (
          <span className="absolute left-0 top-3 bg-midnight/90 px-2 py-1 font-heading text-xs font-bold tracking-[0.18em] text-silver">{product.sku}</span>
        )}
        {pct !== null && (
          <span className="absolute bottom-0 left-0 bg-racing px-3 py-1 font-heading text-sm font-bold italic tracking-wider text-white">{pct}% OFF</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-silver" : "text-ink-muted"}`}>
          {getCategory(product.category).label}
        </p>
        <h3 className="font-heading text-xl font-bold leading-tight">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0 group-hover:text-racing">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto space-y-2 pt-2">
          <PriceTag price={product.sellingPrice} originalPrice={product.originalPrice} onDark={dark} />
          <AvailabilityBadge status={product.availabilityStatus} onDark={dark} />
        </div>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-racing transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
    </article>
  );
}
