import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "FAQ", description: "Frequently asked questions about shopping with GearForce." };

const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: "Can I order online right now?", a: <>Not yet. You can browse the catalogue and build a cart, but online payment and order placement are not enabled. Please <Link href="/contact" className="text-racing underline">contact us</Link> to enquire.</> },
  { q: "Where is GearForce based?", a: "GearForce is based in Hyderabad, Telangana, India." },
  { q: "How do I choose a variant (size, colour, etc.)?", a: "Many products have multiple variants in our store system. The option lists are still being migrated to this website, so please contact us to confirm options before ordering." },
  { q: "Are the prices final?", a: "Prices are shown in Indian Rupees (₹) as listed in our store system. Shipping and taxes are not calculated on this site yet." },
  { q: "What are the shipping, return and warranty terms?", a: <>These have not been confirmed yet. See the draft <Link href="/shipping-policy" className="text-racing underline">shipping</Link> and <Link href="/return-refund-policy" className="text-racing underline">returns</Link> pages.</> },
  { q: "Why do some product photos say “coming soon”?", a: "We only show real product photographs. Where one hasn’t been added yet, you’ll see a placeholder." },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="Help" title="FAQ" />
      <div className="bg-arctic text-midnight">
        <Container className="max-w-3xl py-12">
          <p className="mb-6 text-sm text-ink-muted">Draft answers — pending owner review.</p>
          <div className="divide-y divide-black/10 border-y border-black/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-heading text-xl font-bold marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="mr-2 text-racing group-open:hidden">+</span>
                  <span className="mr-2 hidden text-racing group-open:inline">−</span>
                  {f.q}
                </summary>
                <p className="mt-2 pl-6 text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
