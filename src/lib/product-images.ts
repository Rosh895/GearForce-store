import fs from "node:fs";
import path from "node:path";
import type { ProductImage } from "@/types/product";

const IMAGE_EXT = /\.(avif|webp|jpe?g|png)$/i;
const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Real product photos only. Drop files into `public/products/<sku-lowercase>/` (or `<slug>/` for
 * SKU-less products), e.g. `public/products/jk23/1.jpg`. Nothing is generated or faked.
 */
export function findProductImages(folderKey: string, productName: string): ProductImage[] {
  const dir = path.join(PUBLIC_DIR, "products", folderKey.toLowerCase());
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f, i) => ({
        src: `/products/${folderKey.toLowerCase()}/${f}`,
        alt: `${productName} — photo ${i + 1}`,
      }));
  } catch {
    return [];
  }
}

/** Optional cinematic hero photograph. Place a licensed image at `public/images/hero.jpg` (or .webp/.avif). */
export function findHeroImage(): string | null {
  for (const ext of ["avif", "webp", "jpg", "jpeg", "png"]) {
    if (fs.existsSync(path.join(PUBLIC_DIR, "images", `hero.${ext}`))) return `/images/hero.${ext}`;
  }
  return null;
}
