import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/types/product";

/** "The paddock": a scroll-snap row — swipeable on mobile, comfortable on a laptop. */
export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-midnight py-20 sm:py-28">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">03 / Featured</p>
            <h2 className="display text-[clamp(2.5rem,7vw,6rem)]">
              From the <span className="text-racing">paddock</span>
            </h2>
          </div>
          <ButtonLink href="/shop" variant="secondary">View all products</ButtonLink>
        </div>
      </Container>
      <div
        role="region"
        aria-label="Featured products, scroll horizontally"
        tabIndex={0}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-6 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[68vw] max-w-[320px] shrink-0 snap-start sm:w-[300px]">
            <ProductCard product={p} variant="dark" />
          </div>
        ))}
      </div>
    </section>
  );
}
