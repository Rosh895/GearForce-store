"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

export function CartLink() {
  const { count, hydrated } = useCart();
  const shown = hydrated ? count : 0;
  return (
    <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center text-arctic hover:text-racing" aria-label={`Cart, ${shown} ${shown === 1 ? "item" : "items"}`}>
      <ShoppingCart className="h-5 w-5" aria-hidden />
      {shown > 0 && (
        <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center bg-racing px-1 text-[11px] font-bold text-white">
          {shown}
        </span>
      )}
    </Link>
  );
}
