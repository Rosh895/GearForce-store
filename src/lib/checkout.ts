/**
 * Checkout architecture seam. No payment is taken anywhere in this codebase yet.
 *
 * To go live you need (all outside this repo): a Razorpay account + keys in server env vars,
 * a persistent order store, server-side stock + price validation, and a webhook endpoint.
 * Implement `PaymentProvider` and return it from `getPaymentProvider()`.
 */
export interface CheckoutLineInput {
  productId: string;
  quantity: number;
}

export interface PaymentProvider {
  name: string;
  /** Create a provider-side order for a server-validated cart. */
  createOrder(lines: CheckoutLineInput[]): Promise<{ providerOrderId: string }>;
}

export type CheckoutStatus =
  | { configured: false; reason: string }
  | { configured: true; provider: string };

export function getPaymentProvider(): PaymentProvider | null {
  // Intentionally unimplemented: see the note above.
  return null;
}

export function getCheckoutStatus(): CheckoutStatus {
  const provider = getPaymentProvider();
  if (!provider) {
    return {
      configured: false,
      reason: "Online payments, order storage and stock validation have not been set up yet.",
    };
  }
  return { configured: true, provider: provider.name };
}
