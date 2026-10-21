"use client";

import { useState } from "react";
import type { ProductImage as Img } from "@/types/product";
import { ProductImage } from "./ProductImage";

export function ProductGallery({ images }: { images: Img[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-square overflow-hidden border border-black/10 bg-graphite">
        <ProductImage image={images[active]} sizes="(min-width:1024px) 50vw, 100vw" priority />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-pressed={i === active}
                className={`relative block aspect-square w-full overflow-hidden border-2 ${i === active ? "border-racing" : "border-transparent"}`}
              >
                <ProductImage image={img} sizes="100px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
