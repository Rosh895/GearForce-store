import { ProductGrid } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/types/product";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-arctic py-16 text-midnight sm:py-20">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Featured</p>
            <h2 className="display text-3xl sm:text-5xl">Featured gear</h2>
          </div>
          <ButtonLink href="/shop" variant="dark">View all products</ButtonLink>
        </div>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
