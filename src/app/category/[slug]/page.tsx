import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ShopBrowser } from "@/components/product/ShopBrowser";
import { PageHeader } from "@/components/ui/PageHeader";
import { CATEGORIES, getCategory, isCategoryId } from "@/data/categories";
import { getProductsByCategory } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategoryId(slug)) return {};
  const c = getCategory(slug);
  return {
    title: `${c.label} — Hyderabad, India`,
    description: `${c.blurb} Shop ${c.label.toLowerCase()} from GearForce, Hyderabad.`,
    alternates: { canonical: absoluteUrl(`/category/${slug}`) },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  if (!isCategoryId(slug)) notFound();
  const c = getCategory(slug);
  return (
    <>
      <PageHeader eyebrow="Collection" title={c.label} intro={c.blurb} />
      <Suspense fallback={<p className="bg-arctic p-10 text-center text-ink-muted">Loading products…</p>}>
        <ShopBrowser products={getProductsByCategory(slug)} lockedCategory={slug} />
      </Suspense>
    </>
  );
}
