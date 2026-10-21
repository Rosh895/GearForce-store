import type { ReactNode } from "react";
import { Container } from "./Container";
import { DraftNotice } from "./DraftNotice";
import { PageHeader } from "./PageHeader";

export interface PolicySection {
  heading: string;
  body: ReactNode;
}

/** Shared layout for policy pages. Wording is DRAFT placeholder text until the owner approves it. */
export function PolicyPage({ title, intro, sections }: { title: string; intro: string; sections: PolicySection[] }) {
  return (
    <>
      <PageHeader eyebrow="Policy" title={title} />
      <div className="bg-arctic text-midnight">
        <Container className="max-w-3xl py-12">
          <DraftNotice>
            <strong>Draft placeholder.</strong> This text has not been approved by GearForce. Items marked{" "}
            <mark className="bg-amber-200 px-1 text-midnight">[OWNER TO CONFIRM]</mark> must be completed before launch.
          </DraftNotice>
          <p className="mt-6 text-ink-muted">{intro}</p>
          {sections.map((s) => (
            <section key={s.heading} className="mt-8">
              <h2 className="font-heading text-2xl font-bold uppercase tracking-[0.06em]">{s.heading}</h2>
              <div className="mt-2 space-y-3 text-ink-muted">{s.body}</div>
            </section>
          ))}
        </Container>
      </div>
    </>
  );
}

export function Confirm({ children }: { children: ReactNode }) {
  return <mark className="bg-amber-200 px-1 text-midnight">[OWNER TO CONFIRM: {children}]</mark>;
}
