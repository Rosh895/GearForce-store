import type { Metadata } from "next";
import { Confirm, PolicyPage } from "@/components/ui/PolicyPage";

export const metadata: Metadata = { title: "Shipping Policy (Draft)", robots: { index: false } };

export default function Page() {
  return (
    <PolicyPage
      title="Shipping policy"
      intro="This page will describe how GearForce ships orders. No shipping terms have been confirmed yet."
      sections={[
        { heading: "Areas served", body: <p><Confirm>Which locations in India are served</Confirm></p> },
        { heading: "Shipping charges", body: <p><Confirm>Shipping charges, or whether any free-shipping threshold exists</Confirm></p> },
        { heading: "Dispatch and delivery times", body: <p><Confirm>Order processing time and courier partners</Confirm></p> },
        { heading: "Tracking", body: <p><Confirm>How customers receive tracking details</Confirm></p> },
      ]}
    />
  );
}
