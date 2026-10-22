import type { AvailabilityStatus } from "@/types/product";

const LABELS: Record<AvailabilityStatus, { text: string; light: string; dark: string }> = {
  in_stock: { text: "In stock", light: "border-emerald-600/40 bg-emerald-600/10 text-emerald-700", dark: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" },
  partially_out_of_stock: { text: "Some variants out of stock", light: "border-amber-600/50 bg-amber-500/10 text-amber-700", dark: "border-amber-400/50 bg-amber-400/10 text-amber-300" },
  out_of_stock: { text: "Out of stock", light: "border-red-600/40 bg-red-600/10 text-red-700", dark: "border-red-400/40 bg-red-400/10 text-red-300" },
};

export function availabilityLabel(s: AvailabilityStatus) {
  return LABELS[s].text;
}

export function AvailabilityBadge({ status, onDark = false }: { status: AvailabilityStatus; onDark?: boolean }) {
  const l = LABELS[status];
  return <span className={`inline-block border px-2 py-0.5 text-xs font-semibold ${onDark ? l.dark : l.light}`}>{l.text}</span>;
}
