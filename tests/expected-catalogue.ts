/**
 * Independent transcription of the owner-supplied Wix tables, used to cross-check
 * `src/data/source-catalogue.ts`. Tuple: [sku, price, originalPrice, inventory].
 * Do NOT generate this file from the source data — the point is a second, separate copy.
 */
export type Inv = "in_stock" | "partially_out_of_stock" | "out_of_stock";
export const EXPECTED: [sku: string | null, price: number, original: number | null, inv: Inv][] = [
  ["AC03", 50999, 54990, "in_stock"],
  ["AC02", 49999, 54500, "in_stock"],
  ["AC01", 30000, 36500, "in_stock"],
  ["ACS12", 19999, 22000, "in_stock"],
  ["ACS11", 1999, 2499, "in_stock"],
  ["ACS10", 499, 699, "in_stock"],
  ["ACS09", 499, 699, "in_stock"],
  ["ACS08", 1399, 1599, "in_stock"],
  ["ACS07", 2199, 2499, "in_stock"],
  ["ACS06", 249, 299, "in_stock"],
  ["ACS05", 2999, 3499, "in_stock"],
  ["ACS04", 2999, 3599, "in_stock"],
  ["ACS03", 900, 1500, "in_stock"],
  ["ACS02", 420, 700, "in_stock"],
  ["ACS01", 1200, 1400, "in_stock"],
  ["FL02", 250, 400, "in_stock"],
  ["FL01", 1200, 2500, "in_stock"],
  ["LG05", 3500, null, "in_stock"],
  ["LG04", 3500, null, "in_stock"],
  ["LG03", 3500, null, "in_stock"],
  ["LG02", 3250, null, "in_stock"],
  ["LG01", 2200, null, "in_stock"],
  ["BO02", 9999, null, "in_stock"],
  ["BO01", 7000, null, "in_stock"],
  ["GL08", 4500, null, "in_stock"],
  ["GL07", 4000, null, "in_stock"],
  ["GL06", 3000, null, "in_stock"],
  ["GL05", 3000, null, "in_stock"],
  ["GL04", 3000, null, "in_stock"],
  ["GL03", 2500, null, "in_stock"],
  ["GL02", 2500, null, "in_stock"],
  ["GL01", 1800, null, "in_stock"],
  ["JK24", 4000, null, "in_stock"],
  ["JK23", 10000, null, "in_stock"],
  ["JK22", 9000, null, "in_stock"],
  ["JK21", 8500, null, "in_stock"],
  ["JK20", 8000, null, "in_stock"],
  ["JK19", 7000, null, "in_stock"],
  ["JK18", 6850, null, "in_stock"],
  ["JK17", 6000, null, "in_stock"],
  ["JK16", 8950, null, "partially_out_of_stock"],
  ["JK15", 6880, null, "in_stock"],
  ["JK14", 12950, null, "in_stock"],
  ["JK13", 7999, null, "in_stock"],
  [null, 7200, null, "partially_out_of_stock"], // Tarmac One III — SKU TO VERIFY
  ["JK02", 6499, null, "in_stock"],
  ["JK01", 5200, null, "in_stock"],
  ["0001", 1450, null, "out_of_stock"], // Wix placeholder
];

/** Variant counts as supplied; `null` = Unknown / not supplied. Keyed by SKU. */
export const EXPECTED_VARIANT_COUNTS: Record<string, number> = {
  BO02: 28, BO01: 7,
  GL08: 15, GL07: 5, GL06: 5, GL05: 5, GL04: 10, GL03: 10, GL02: 10, GL01: 9,
  JK23: 5, JK22: 10, JK21: 10, JK20: 5, JK19: 15, JK18: 15, JK17: 5, JK16: 9, JK14: 4,
};
