import type { Metadata } from "next";
import { CheckoutPanel } from "@/components/cart/CheckoutPanel";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCheckoutStatus } from "@/lib/checkout";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader title="Checkout" />
      <div className="bg-arctic text-midnight">
        <Container className="py-10">
          <CheckoutPanel status={getCheckoutStatus()} />
        </Container>
      </div>
    </>
  );
}
