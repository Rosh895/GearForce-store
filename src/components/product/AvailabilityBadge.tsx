import type { AvailabilityStatus } from "@/types/product";

const LABELS: Record<AvailabilityStatus, { text: string; cls: string }> = {
  in_stock: { text: "In stock", cls: "border-emerald-600/40 bg-emerald-600/10 text-emerald-700" },
  partially_out_of_stock: { text: "Some variants out of stock", cls: "border-amber-600/50 bg-amber-500/10 text-amber-700" },
  out_of_stock: { text: "Out of stock", cls: "border-red-600/40 bg-red-600/10 text-red-700" },
};

export function availabilityLabel(s: AvailabilityStatus) {
  return LABELS[s].text;
}

export function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  const { text, cls } = LABELS[status];
  return <span className={`inline-block border px-2 py-0.5 text-xs font-semibold ${cls}`}>{text}</span>;
}
