const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inr.format(amount);
}

/** Whole-number percentage discount derived from the two supplied prices. `null` if not applicable. */
export function discountPercent(sellingPrice: number, originalPrice: number | null): number | null {
  if (originalPrice === null || originalPrice <= sellingPrice) return null;
  return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
}
