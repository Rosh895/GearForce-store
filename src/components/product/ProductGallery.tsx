"use client";

import { useState } from "react";
import type { ProductImage as Img } from "@/types/product";
import { ProductImage } from "./ProductImage";

export function ProductGallery({ images }: { images: Img[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="clip-cut group relative aspect-[4/5] overflow-hidden border border-white/10 bg-graphite sm:aspect-square">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
          <ProductImage image={images[active]} sizes="(min-width:1024px) 50vw, 100vw" priority />
        </div>
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-midnight/80 px-2 py-1 font-heading text-xs font-bold tracking-widest">
            {active + 1} / {images.length}
          </span>
        )}
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
                className={`relative block aspect-square w-full overflow-hidden border-2 transition-colors ${i === active ? "border-racing" : "border-white/10 hover:border-white/40"}`}
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
