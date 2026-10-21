"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { isCategoryId } from "@/data/categories";
import { DEFAULT_FILTERS, SORT_LABELS, collectBrands, filterAndSort, isSortKey, type ShopFilters, type SortKey } from "@/lib/filter";
import type { AvailabilityStatus, CategoryId, Product } from "@/types/product";
import { FilterPanel } from "./FilterPanel";
import { ProductGrid } from "./ProductGrid";

const PAGE_SIZE = 12;
const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  in_stock: "In stock",
  partially_out_of_stock: "Some variants out of stock",
  out_of_stock: "Out of stock",
};

/** Client-side browsing over the (small, static) local catalogue. `lockedCategory` hides the category filter. */
export function ShopBrowser({ products, lockedCategory }: { products: Product[]; lockedCategory?: CategoryId }) {
  const params = useSearchParams();
  const initialCategory = params.get("category");
  const initialSort = params.get("sort");
  const [filters, setFilters] = useState<ShopFilters>(() => ({
    ...DEFAULT_FILTERS,
    query: params.get("q") ?? "",
    categories: initialCategory && isCategoryId(initialCategory) ? [initialCategory] : [],
    sort: isSortKey(initialSort) ? initialSort : "recommended",
  }));
  const [shown, setShown] = useState(PAGE_SIZE);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const brands = useMemo(() => collectBrands(products), [products]);
  const availabilityOptions = useMemo(
    () => [...new Set(products.map((p) => p.availabilityStatus))].map((value) => ({ value, label: AVAILABILITY_LABELS[value] })),
    [products],
  );
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.sellingPrice);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);
  const results = useMemo(() => filterAndSort(products, filters), [products, filters]);

  function update(next: ShopFilters) {
    setFilters(next);
    setShown(PAGE_SIZE);
  }

  const panel = (idPrefix: string) => (
    <FilterPanel idPrefix={idPrefix} filters={filters} onChange={update} brands={brands} showCategories={!lockedCategory} availabilityOptions={availabilityOptions} priceBounds={priceBounds} />
  );

  return (
    <div className="bg-arctic text-midnight">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="hidden lg:block" aria-label="Filters">{panel("side")}</aside>

        <section aria-label="Products">
          <div className="mb-5 flex flex-wrap items-end gap-3">
            <div className="min-w-0 flex-1 basis-48">
              <label htmlFor="shop-search" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Search</label>
              <input id="shop-search" type="search" value={filters.query} onChange={(e) => update({ ...filters, query: e.target.value })} placeholder="Name, SKU or brand" className="w-full border border-black/30 bg-white px-3 py-2" />
            </div>
            <div>
              <label htmlFor="shop-sort" className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Sort by</label>
              <select id="shop-sort" value={filters.sort} onChange={(e) => update({ ...filters, sort: e.target.value as SortKey })} className="border border-black/30 bg-white px-3 py-2">
                {Object.entries(SORT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <Button variant="dark" className="lg:hidden" onClick={() => dialogRef.current?.showModal()}>
              <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters
            </Button>
          </div>

          <p role="status" aria-live="polite" className="mb-4 text-sm text-ink-muted">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>

          {results.length === 0 ? (
            <div className="border border-dashed border-black/30 p-10 text-center">
              <p className="font-heading text-xl font-bold">No products match these filters</p>
              <button type="button" className="mt-3 font-semibold text-racing underline" onClick={() => update({ ...DEFAULT_FILTERS, categories: lockedCategory ? [lockedCategory] : [] })}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <ProductGrid products={results.slice(0, shown)} />
              {shown < results.length && (
                <div className="mt-8 text-center">
                  <Button variant="dark" onClick={() => setShown((s) => s + PAGE_SIZE)}>
                    Show more ({results.length - shown} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <dialog ref={dialogRef} aria-label="Filters" className="drawer m-0 h-full max-h-none w-[min(22rem,92vw)] bg-arctic p-0 text-midnight open:flex open:flex-col backdrop:bg-black/60 lg:hidden">
        <div className="flex items-center justify-between border-b border-black/10 p-4">
          <h2 className="font-heading text-xl font-bold uppercase">Filters</h2>
          <button type="button" aria-label="Close filters" onClick={() => dialogRef.current?.close()} className="p-2"><X className="h-5 w-5" aria-hidden /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{panel("drawer")}</div>
        <div className="border-t border-black/10 p-4">
          <Button className="w-full" onClick={() => dialogRef.current?.close()}>Show {results.length} results</Button>
        </div>
      </dialog>
    </div>
  );
}
