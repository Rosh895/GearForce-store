import { discountPercent, formatINR } from "@/lib/format";

export function PriceTag({ price, originalPrice, size = "md", onDark = false }: { price: number; originalPrice: number | null; size?: "md" | "lg"; onDark?: boolean }) {
  const pct = discountPercent(price, originalPrice);
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={`font-heading font-bold ${size === "lg" ? "text-4xl" : "text-xl"} ${onDark ? "text-arctic" : "text-midnight"}`}>{formatINR(price)}</span>
      {originalPrice !== null && pct !== null && (
        <>
          <s className={`text-sm ${onDark ? "text-silver" : "text-ink-muted"}`}>
            <span className="sr-only">Original price </span>
            {formatINR(originalPrice)}
          </s>
          <span className="text-sm font-semibold text-racing">{pct}% off</span>
        </>
      )}
    </div>
  );
}
