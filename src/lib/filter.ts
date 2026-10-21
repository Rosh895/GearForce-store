import type { AvailabilityStatus, CategoryId, Product } from "@/types/product";

export type SortKey = "recommended" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export const UNSPECIFIED_BRAND = "__unspecified__";

export interface ShopFilters {
  query: string;
  categories: CategoryId[];
  brands: string[];
  availability: AvailabilityStatus[];
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortKey;
}

export const DEFAULT_FILTERS: ShopFilters = {
  query: "",
  categories: [],
  brands: [],
  availability: [],
  minPrice: null,
  maxPrice: null,
  sort: "recommended",
};

export const SORT_LABELS: Record<SortKey, string> = {
  recommended: "Recommended",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "name-asc": "Name: A–Z",
  "name-desc": "Name: Z–A",
};

export function isSortKey(value: string | null | undefined): value is SortKey {
  return !!value && value in SORT_LABELS;
}

function haystack(p: Product): string {
  return [p.name, p.sku ?? "", p.brand ?? ""].join(" ").toLowerCase();
}

export function filterAndSort(products: readonly Product[], f: ShopFilters): Product[] {
  const terms = f.query.toLowerCase().split(/\s+/).filter(Boolean);

  const result = products.filter((p) => {
    if (terms.length && !terms.every((t) => haystack(p).includes(t))) return false;
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (f.brands.length && !f.brands.includes(p.brand ?? UNSPECIFIED_BRAND)) return false;
    if (f.availability.length && !f.availability.includes(p.availabilityStatus)) return false;
    if (f.minPrice !== null && p.sellingPrice < f.minPrice) return false;
    if (f.maxPrice !== null && p.sellingPrice > f.maxPrice) return false;
    return true;
  });

  const indexed = result.map((p, i) => ({ p, i }));
  indexed.sort((a, b) => {
    switch (f.sort) {
      case "price-asc":
        return a.p.sellingPrice - b.p.sellingPrice || a.i - b.i;
      case "price-desc":
        return b.p.sellingPrice - a.p.sellingPrice || a.i - b.i;
      case "name-asc":
        return a.p.name.localeCompare(b.p.name) || a.i - b.i;
      case "name-desc":
        return b.p.name.localeCompare(a.p.name) || a.i - b.i;
      default:
        return Number(b.p.featured) - Number(a.p.featured) || a.i - b.i;
    }
  });
  return indexed.map((x) => x.p);
}

export function collectBrands(products: readonly Product[]): { value: string; label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    const key = p.brand ?? UNSPECIFIED_BRAND;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: value === UNSPECIFIED_BRAND ? "Brand not specified" : value, count }))
    .sort((a, b) => (a.value === UNSPECIFIED_BRAND ? 1 : b.value === UNSPECIFIED_BRAND ? -1 : a.label.localeCompare(b.label)));
}
