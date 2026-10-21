import type { CategoryId, CategoryInfo } from "@/types/product";

export const CATEGORIES: readonly CategoryInfo[] = [
  { id: "jackets", label: "Riding Jackets", navLabel: "Riding Jackets", blurb: "Jackets for commuting, touring and adventure riding." },
  { id: "gloves", label: "Riding Gloves", navLabel: "Gloves", blurb: "Gloves from short gauntlets to full racing styles." },
  { id: "boots", label: "Riding Boots", navLabel: "Boots", blurb: "Ankle and calf boots for the road." },
  { id: "luggage", label: "Luggage & Bags", navLabel: "Luggage", blurb: "Tank bags, tail bags and saddle bags." },
  { id: "accessories", label: "Motorcycle Accessories", navLabel: "Accessories", blurb: "Accessories and maintenance products." },
  { id: "lighting", label: "Lighting & Protection", navLabel: "Lighting", blurb: "Auxiliary lighting and protection." },
  { id: "cameras", label: "Action Cameras", navLabel: "Cameras", blurb: "Action cameras to record every ride." },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function getCategory(id: CategoryId): CategoryInfo {
  const found = CATEGORIES.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown category: ${id}`);
  return found;
}

export function isCategoryId(value: string): value is CategoryId {
  return (CATEGORY_IDS as string[]).includes(value);
}

/** Categories shown as cards on the homepage (as specified by the brief). */
export const HOME_CATEGORY_IDS: readonly CategoryId[] = ["jackets", "gloves", "boots", "luggage", "accessories", "cameras"];
