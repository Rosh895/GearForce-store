import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCheckoutStatus } from "@/lib/checkout";

export const metadata: Metadata = { title: "Your Cart", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageHeader title="Your cart" />
      <div className="bg-arctic text-midnight">
        <Container className="py-10">
          <CartView checkoutAvailable={getCheckoutStatus().configured} />
        </Container>
      </div>
    </>
  );
}
