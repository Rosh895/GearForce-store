import type { Metadata } from "next";
import { BUSINESS } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Contact GearForce", description: "Contact GearForce, Hyderabad, India." };

function Row({ label, value, href }: { label: string; value: string | null; href?: string }) {
  return (
    <div className="border-b border-black/10 py-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{label}</dt>
      <dd className="mt-1 text-lg">
        {value ? (href ? <a href={href} className="text-racing underline">{value}</a> : value) : <span className="text-ink-muted">To be added</span>}
      </dd>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact" />
      <div className="bg-arctic text-midnight">
        <Container className="max-w-3xl py-12">
          {!(BUSINESS.email && BUSINESS.phone) && (
            <DraftNotice>Contact details have not been supplied yet. They are placeholders until the owner confirms them (see <code>.env.example</code>).</DraftNotice>
          )}
          <dl className="mt-6">
            <Row label="Location" value={`${BUSINESS.city}, ${BUSINESS.region}, ${BUSINESS.country}`} />
            <Row label="Phone" value={BUSINESS.phone} href={BUSINESS.phone ? `tel:${BUSINESS.phone.replace(/\s/g, "")}` : undefined} />
            <Row label="Email" value={BUSINESS.email} href={BUSINESS.email ? `mailto:${BUSINESS.email}` : undefined} />
            <Row label="Address" value={BUSINESS.address} />
            <Row label="Opening hours" value={null} />
          </dl>
        </Container>
      </div>
    </>
  );
}
