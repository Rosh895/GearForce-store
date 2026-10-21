/**
 * Owner-confirmed full product names, keyed by SKU (or by slug seed for SKU-less records).
 * Wix screenshots cut long names off; we never guess the rest. Fill this in as names are confirmed
 * and the storefront will switch from the truncated fragment to the full name automatically.
 * Slugs are NOT affected (they are pinned to the original fragment).
 */
export const CONFIRMED_NAMES: Record<string, string> = {
  // JK24: "Royal Enfield Streetwear Jacket ...",
};
