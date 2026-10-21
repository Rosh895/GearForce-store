import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <li key={p.id} className="flex">
          <div className="flex w-full flex-col [&>article]:flex-1">
            <ProductCard product={p} />
          </div>
        </li>
      ))}
    </ul>
  );
}
