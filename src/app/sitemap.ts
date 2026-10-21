import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { getPublishedProducts } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Sitemaps need absolute URLs; until the domain is known we fall back to localhost (dev only).
  const base = getSiteUrl() ?? "http://localhost:3000";
  const staticPaths = ["", "/shop", "/about", "/contact", "/faq", "/shipping-policy", "/return-refund-policy", "/privacy-policy", "/terms-and-conditions"];
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}` })),
    ...CATEGORIES.map((c) => ({ url: `${base}/category/${c.id}` })),
    ...getPublishedProducts().map((p) => ({ url: `${base}/product/${p.slug}` })),
  ];
}
