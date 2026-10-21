export type CategoryId =
  | "jackets"
  | "gloves"
  | "boots"
  | "luggage"
  | "accessories"
  | "lighting"
  | "cameras";

/** Wix product-level inventory status. NOT a stock quantity. */
export type AvailabilityStatus = "in_stock" | "partially_out_of_stock" | "out_of_stock";

export type PublishStatus =
  | "published"
  | "draft"
  /** Present in the Wix export but excluded from the storefront until the owner confirms it. */
  | "hidden_pending_confirmation";

/**
 * One row exactly as read from the Wix Store screenshots.
 * Unknown values are `null` — never guessed.
 */
export interface SourceRecord {
  /** Wix SKU. `null` when the screenshot shows "SKU TO VERIFY". */
  sku: string | null;
  /** Product name exactly as visible in the screenshot, including a trailing "..." if cut off. */
  visibleName: string;
  category: CategoryId;
  /** Selling price in INR. */
  price: number;
  /** Original (strike-through) price in INR, `null` when none was supplied. */
  originalPrice: number | null;
  /** Number of Wix variants; `null` when unknown/not supplied. */
  variantCount: number | null;
  inventory: AvailabilityStatus;
  /** Brand only when it is literally the leading words of the visible name; otherwise `null`. */
  brand: string | null;
  /** Editorial choice for the homepage. Not a Wix fact. */
  featured?: boolean;
  publish?: PublishStatus;
}

export interface ProductImage {
  src: string;
  alt: string;
}

/** Only populated when real variant data has been migrated. Never invented. */
export interface ProductVariant {
  id: string;
  label: string;
  options: Record<string, string>;
  availability: AvailabilityStatus | null;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

/** Derived, UI-facing product. Built from SourceRecord by `buildProduct`. */
export interface Product {
  id: string;
  sku: string | null;
  skuVerified: boolean;
  name: string;
  /** `false` when the Wix name was cut off and no confirmed full name exists yet. */
  nameComplete: boolean;
  slug: string;
  category: CategoryId;
  brand: string | null;
  sellingPrice: number;
  originalPrice: number | null;
  currency: "INR";
  description: string | null;
  images: ProductImage[];
  availabilityStatus: AvailabilityStatus;
  variants: ProductVariant[];
  variantCount: number | null;
  specifications: ProductSpecification[];
  featured: boolean;
  publishStatus: PublishStatus;
}

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  /** Short label for nav items. */
  navLabel: string;
  blurb: string;
}

/** Minimal product data the cart needs, passed from the server to the client provider. */
export interface CartCatalogueEntry {
  id: string;
  slug: string;
  name: string;
  sku: string | null;
  price: number;
  originalPrice: number | null;
  availability: AvailabilityStatus;
  image: ProductImage | null;
  categoryLabel: string;
  variantCount: number | null;
}
