import Image from "next/image";
import type { ProductImage as ProductImageData } from "@/types/product";

/**
 * Real photo when one exists; otherwise an on-brand placeholder panel built from the GearForce mark.
 * It is deliberately NOT a picture of any product.
 */
export function ProductImage({
  image,
  sizes,
  priority = false,
}: {
  image: ProductImageData | null | undefined;
  sizes: string;
  priority?: boolean;
}) {
  if (image) {
    return <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />;
  }
  return (
    <div role="img" aria-label="Product photo not yet available" className="carbon @container absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden">
      <div className="speed-lines absolute inset-0" aria-hidden />
      <Image src="/logo/gearforce-mark.png" alt="" width={800} height={310} sizes="160px" className="relative w-1/2 max-w-40 opacity-60 mix-blend-lighten" />
      <span className="relative font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-silver @max-[9rem]:hidden">
        Photo coming soon
      </span>
    </div>
  );
}
