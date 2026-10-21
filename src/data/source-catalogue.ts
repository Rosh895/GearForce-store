import type { AvailabilityStatus, CategoryId, SourceRecord } from "@/types/product";

/**
 * SOURCE OF TRUTH — transcribed from the Wix Store screenshots (48 entries).
 *
 * Rules:
 *  - Do not edit prices, original prices, inventory or SKUs without a new Wix export.
 *  - `visibleName` is exactly what the screenshot showed (a trailing "..." means cut off).
 *  - `null` means "not supplied / unknown". Never replace with a guess.
 *  - Derived UI fields live in `src/lib/catalogue.ts`, not here.
 */

const IN: AvailabilityStatus = "in_stock";
const PART: AvailabilityStatus = "partially_out_of_stock";
const OUT: AvailabilityStatus = "out_of_stock";

function rec(
  sku: string | null,
  visibleName: string,
  category: CategoryId,
  price: number,
  originalPrice: number | null,
  variantCount: number | null,
  inventory: AvailabilityStatus,
  brand: string | null,
  extra: Pick<SourceRecord, "featured" | "publish"> = {},
): SourceRecord {
  return { sku, visibleName, category, price, originalPrice, variantCount, inventory, brand, ...extra };
}

export const SOURCE_CATALOGUE: readonly SourceRecord[] = [
  // ── Action cameras ───────────────────────────────────────────────
  rec("AC03", "GoPro MAX", "cameras", 50999, 54990, null, IN, "GoPro", { featured: true }),
  rec("AC02", "GoPro HERO10 Black", "cameras", 49999, 54500, null, IN, "GoPro", { featured: true }),
  rec("AC01", "GoPro HERO 8 Action Camera", "cameras", 30000, 36500, null, IN, "GoPro"),

  // ── Motorcycle accessories & maintenance ─────────────────────────
  rec("ACS12", "CNC Adjustable Rear...", "accessories", 19999, 22000, null, IN, null),
  rec("ACS11", "Himalayan Expedition...", "accessories", 1999, 2499, null, IN, null),
  rec("ACS10", "Himalayan Brake Fluid...", "accessories", 499, 699, null, IN, null),
  rec("ACS09", "Himalayan Rear Mast...", "accessories", 499, 699, null, IN, null),
  rec("ACS08", "Himalayan Head Light...", "accessories", 1399, 1599, null, IN, null),
  rec("ACS07", "66BHP Premium Me...", "accessories", 2199, 2499, null, IN, "66BHP"),
  rec("ACS06", "66BHP Universal Tail...", "accessories", 249, 299, null, IN, "66BHP"),
  rec("ACS05", "66BHP Duffle Leather...", "accessories", 2999, 3499, null, IN, "66BHP"),
  rec("ACS04", "Universal Motorcycle...", "accessories", 2999, 3599, null, IN, null),
  rec("ACS03", "Helmet Chin Strap M...", "accessories", 900, 1500, null, IN, null),
  rec("ACS02", "Phone Mount Anti Sh...", "accessories", 420, 700, null, IN, null),
  rec("ACS01", "AllExtreme 2nd Gener...", "accessories", 1200, 1400, null, IN, "AllExtreme"),

  // ── Lighting & protection ────────────────────────────────────────
  rec("FL02", "AllExtreme Universal...", "lighting", 250, 400, null, IN, "AllExtreme"),
  rec("FL01", "Autofy LED Bar Light...", "lighting", 1200, 2500, null, IN, "Autofy"),

  // ── Luggage & bags ───────────────────────────────────────────────
  rec("LG05", "Tail Bag", "luggage", 3500, null, null, IN, null),
  rec("LG04", "Saddle Bag Set", "luggage", 3500, null, null, IN, null, { featured: true }),
  rec("LG03", "Sports Saddle Bag", "luggage", 3500, null, null, IN, null),
  rec("LG02", "Tank Bag", "luggage", 3250, null, null, IN, null, { featured: true }),
  rec("LG01", "Mini Tank Bag", "luggage", 2200, null, null, IN, null),

  // ── Riding boots ─────────────────────────────────────────────────
  rec("BO02", "Calf Boot", "boots", 9999, null, 28, IN, null, { featured: true }),
  rec("BO01", "Ankle Boot – Black", "boots", 7000, null, 7, IN, null),

  // ── Riding gloves ────────────────────────────────────────────────
  rec("GL08", "Racer Gloves", "gloves", 4500, null, 15, IN, null, { featured: true }),
  rec("GL07", "Full Gauntlet Gloves", "gloves", 4000, null, 5, IN, null),
  rec("GL06", "Semi Gauntlet Gloves", "gloves", 3000, null, 5, IN, null),
  rec("GL05", "Touring Gloves", "gloves", 3000, null, 5, IN, null),
  rec("GL04", "Snell Iconic", "gloves", 3000, null, 10, IN, null),
  rec("GL03", "Snell Retro", "gloves", 2500, null, 10, IN, null),
  rec("GL02", "Breeze Gloves", "gloves", 2500, null, 10, IN, null),
  rec("GL01", "Riding Gloves", "gloves", 1800, null, 9, IN, null),

  // ── Riding jackets ───────────────────────────────────────────────
  rec("JK24", "Royal Enfield Streetwi...", "jackets", 4000, null, null, IN, "Royal Enfield"),
  rec("JK23", "Adventure Jacket", "jackets", 10000, null, 5, IN, null, { featured: true }),
  rec("JK22", "Captain Jacket", "jackets", 9000, null, 10, IN, null, { featured: true }),
  rec("JK21", "Navigator Jacket", "jackets", 8500, null, 10, IN, null),
  rec("JK20", "Spiti Jacket – Black", "jackets", 8000, null, 5, IN, null),
  rec("JK19", "Voyager Jacket", "jackets", 7000, null, 15, IN, null),
  rec("JK18", "Xplorer Jacket", "jackets", 6850, null, 15, IN, null),
  rec("JK17", "Metro Jacket", "jackets", 6000, null, 5, IN, null),
  rec("JK16", "Rynox Tornado P...", "jackets", 8950, null, 9, PART, "Rynox"),
  rec("JK15", "Rynox Air GT 3 Jac...", "jackets", 6880, null, null, IN, "Rynox"),
  rec("JK14", "Rynox Stealth Ev...", "jackets", 12950, null, 4, IN, "Rynox"),
  rec("JK13", "Tarmac Expeditio...", "jackets", 7999, null, null, IN, "Tarmac"),
  // SKU shown as "SKU TO VERIFY" in the source — deliberately null, never inferred.
  rec(null, "Tarmac One III Ridi...", "jackets", 7200, null, 10, PART, "Tarmac"),
  rec("JK02", "XDI Motoliza Ladi...", "jackets", 6499, null, null, IN, "XDI"),
  rec("JK01", "Tarmac Drifter II...", "jackets", 5200, null, null, IN, "Tarmac"),

  // ── Wix placeholder (kept for the migration audit, never published) ─
  rec("0001", "I'm a Product", "accessories", 1450, null, null, OUT, null, {
    publish: "hidden_pending_confirmation",
  }),
];
