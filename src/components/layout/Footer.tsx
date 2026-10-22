import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/data/business";
import { CATEGORIES } from "@/data/categories";
import { Container } from "@/components/ui/Container";

const TBA = <span className="text-silver/70">To be added</span>;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-graphite-deep">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Image src="/logo/gearforce-logo.png" alt="GearForce — Gear for Every Journey" width={1400} height={530} className="h-20 w-auto mix-blend-lighten" />
          <p className="mt-4 text-sm text-silver">
            Motorcycle riding gear and accessories from {BUSINESS.city}, {BUSINESS.region}.
          </p>
        </div>
        <FooterColumn title="Shop">
          <li><Link href="/shop">Shop All</Link></li>
          <li><Link href="/ride-setup">Ride Setup</Link></li>
          {CATEGORIES.map((c) => (
            <li key={c.id}><Link href={`/category/${c.id}`}>{c.label}</Link></li>
          ))}
        </FooterColumn>
        <FooterColumn title="Company">
          <li><Link href="/about">About GearForce</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/shipping-policy">Shipping Policy</Link></li>
          <li><Link href="/return-refund-policy">Return &amp; Refund Policy</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
        </FooterColumn>
        <FooterColumn title="Contact">
          <li>{BUSINESS.city}, {BUSINESS.region}, {BUSINESS.country}</li>
          <li>Phone: {BUSINESS.phone ?? TBA}</li>
          <li>Email: {BUSINESS.email ?? TBA}</li>
          <li>Address: {BUSINESS.address ?? TBA}</li>
          {BUSINESS.social.map((s) => (
            <li key={s.href}><a href={s.href} rel="noopener noreferrer" target="_blank">{s.label}</a></li>
          ))}
        </FooterColumn>
      </Container>
      <div className="border-t border-white/10 py-5 text-center text-xs text-silver">
        © {new Date().getFullYear()} GearForce. All rights reserved. Policies are drafts pending owner approval.
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-racing">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-silver [&_a]:transition-colors [&_a:hover]:text-white">{children}</ul>
    </div>
  );
}
