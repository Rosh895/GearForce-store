import Link from "next/link";
import { getCategory } from "@/data/categories";
import type { Product } from "@/types/product";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { PriceTag } from "./PriceTag";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product, sizes = "(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw" }: { product: Product; sizes?: string }) {
  return (
    <article className="group relative flex flex-col border border-black/10 bg-white text-midnight transition-shadow duration-200 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-graphite">
        <ProductImage image={product.images[0]} sizes={sizes} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{getCategory(product.category).label}</p>
        <h3 className="font-heading text-lg font-bold leading-tight">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0 group-hover:text-racing">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto space-y-2 pt-2">
          <PriceTag price={product.sellingPrice} originalPrice={product.originalPrice} />
          <AvailabilityBadge status={product.availabilityStatus} />
        </div>
      </div>
    </article>
  );
}
