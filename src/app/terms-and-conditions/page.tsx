import type { Metadata } from "next";
import { Confirm, PolicyPage } from "@/components/ui/PolicyPage";

export const metadata: Metadata = { title: "Terms & Conditions (Draft)", robots: { index: false } };

export default function Page() {
  return (
    <PolicyPage
      title="Terms & conditions"
      intro="Draft outline of the terms for using this website and buying from GearForce. Not yet approved."
      sections={[
        { heading: "Use of this website", body: <p><Confirm>Acceptable-use terms</Confirm></p> },
        { heading: "Products and pricing", body: <p>Prices are shown in Indian Rupees (₹). <Confirm>Tax treatment, and the right to correct pricing errors</Confirm></p> },
        { heading: "Orders and payment", body: <p>Online ordering is not yet available. <Confirm>Order acceptance and payment terms</Confirm></p> },
        { heading: "Safety gear", body: <p><Confirm>Any safety / fitment disclaimers approved by the owner</Confirm></p> },
        { heading: "Governing law", body: <p><Confirm>Governing law and jurisdiction</Confirm></p> },
      ]}
    />
  );
}
