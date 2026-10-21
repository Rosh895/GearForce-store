import type { Metadata } from "next";
import { Confirm, PolicyPage } from "@/components/ui/PolicyPage";

export const metadata: Metadata = { title: "Return & Refund Policy (Draft)", robots: { index: false } };

export default function Page() {
  return (
    <PolicyPage
      title="Return & refund policy"
      intro="This page will describe returns, exchanges and refunds. GearForce has not yet confirmed any of these terms."
      sections={[
        { heading: "Eligibility", body: <p><Confirm>Whether returns/exchanges are accepted and the time window</Confirm></p> },
        { heading: "Condition of items", body: <p><Confirm>Condition requirements, e.g. unused / original packaging</Confirm></p> },
        { heading: "Refunds", body: <p><Confirm>Refund method and timing</Confirm></p> },
        { heading: "Warranty", body: <p><Confirm>Whether any manufacturer or store warranty applies, per product</Confirm></p> },
      ]}
    />
  );
}
