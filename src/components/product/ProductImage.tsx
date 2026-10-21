import { ImageOff } from "lucide-react";
import Image from "next/image";
import type { ProductImage as ProductImageData } from "@/types/product";

/** Real photo when one exists; otherwise an explicit, honest placeholder (never a fake product picture). */
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
    <div role="img" aria-label="Product photo not yet available" className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-graphite to-graphite-deep text-silver">
      <div className="speed-lines absolute inset-0" aria-hidden />
      <ImageOff className="relative h-8 w-8" aria-hidden />
      <span className="relative font-heading text-xs font-semibold uppercase tracking-[0.2em]">Photo coming soon</span>
    </div>
  );
}
