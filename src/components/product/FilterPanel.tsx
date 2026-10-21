"use client";

import { CATEGORIES } from "@/data/categories";
import { DEFAULT_FILTERS, type ShopFilters } from "@/lib/filter";
import type { AvailabilityStatus, CategoryId } from "@/types/product";

interface Props {
  filters: ShopFilters;
  onChange: (next: ShopFilters) => void;
  brands: { value: string; label: string; count: number }[];
  showCategories: boolean;
  availabilityOptions: { value: AvailabilityStatus; label: string }[];
  priceBounds: { min: number; max: number };
  idPrefix: string;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterPanel({ filters, onChange, brands, showCategories, availabilityOptions, priceBounds, idPrefix }: Props) {
  const set = (patch: Partial<ShopFilters>) => onChange({ ...filters, ...patch });
  const num = (v: string) => (v === "" ? null : Math.max(0, Number(v)));

  return (
    <div className="space-y-7 text-midnight">
      {showCategories && (
        <fieldset>
          <legend className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.16em]">Category</legend>
          <div className="space-y-1">
            {CATEGORIES.map((c) => (
              <Check key={c.id} label={c.label} checked={filters.categories.includes(c.id as CategoryId)} onChange={() => set({ categories: toggle(filters.categories, c.id) })} />
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.16em]">Brand</legend>
        <div className="space-y-1">
          {brands.map((b) => (
            <Check key={b.value} label={`${b.label} (${b.count})`} checked={filters.brands.includes(b.value)} onChange={() => set({ brands: toggle(filters.brands, b.value) })} />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.16em]">Price (₹)</legend>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor={`${idPrefix}-min-price`}>Minimum price</label>
          <input id={`${idPrefix}-min-price`} inputMode="numeric" type="number" min={0} placeholder={String(priceBounds.min)} value={filters.minPrice ?? ""} onChange={(e) => set({ minPrice: num(e.target.value) })} className="w-full border border-black/30 bg-white px-2 py-2 text-sm" />
          <span aria-hidden>–</span>
          <label className="sr-only" htmlFor={`${idPrefix}-max-price`}>Maximum price</label>
          <input id={`${idPrefix}-max-price`} inputMode="numeric" type="number" min={0} placeholder={String(priceBounds.max)} value={filters.maxPrice ?? ""} onChange={(e) => set({ maxPrice: num(e.target.value) })} className="w-full border border-black/30 bg-white px-2 py-2 text-sm" />
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.16em]">Availability</legend>
        <div className="space-y-1">
          {availabilityOptions.map((a) => (
            <Check key={a.value} label={a.label} checked={filters.availability.includes(a.value)} onChange={() => set({ availability: toggle(filters.availability, a.value) })} />
          ))}
        </div>
      </fieldset>

      <button type="button" onClick={() => onChange({ ...DEFAULT_FILTERS, sort: filters.sort, categories: showCategories ? [] : filters.categories })} className="text-sm font-semibold text-racing underline">
        Clear all filters
      </button>
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[#E10600]" />
      {label}
    </label>
  );
}
