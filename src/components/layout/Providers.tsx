"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { CartProvider } from "@/hooks/use-cart";
import type { CartCatalogueEntry } from "@/types/product";

export function Providers({ catalogue, children }: { catalogue: CartCatalogueEntry[]; children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider catalogue={catalogue}>{children}</CartProvider>
    </MotionConfig>
  );
}
