import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="display mt-3 text-5xl sm:text-7xl">Wrong turn</h1>
      <p className="mx-auto mt-4 max-w-md text-silver">That page doesn’t exist or the product is no longer listed.</p>
      <ButtonLink href="/shop" className="mt-8">Back to the shop</ButtonLink>
    </Container>
  );
}
