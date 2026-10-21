import type { Metadata } from "next";
import { Confirm, PolicyPage } from "@/components/ui/PolicyPage";

export const metadata: Metadata = { title: "Privacy Policy (Draft)", robots: { index: false } };

export default function Page() {
  return (
    <PolicyPage
      title="Privacy policy"
      intro="This draft explains, in outline, how this website handles information. It must be reviewed and approved before launch."
      sections={[
        {
          heading: "What this website stores today",
          body: <p>Your shopping cart (product identifiers and quantities) is saved in your own browser’s local storage so it is still there when you return. It is not sent to GearForce.</p>,
        },
        { heading: "Information collected at order time", body: <p><Confirm>What personal data is collected once checkout is enabled (name, address, phone, email), why, and how long it is kept</Confirm></p> },
        { heading: "Payment processing", body: <p><Confirm>Payment provider and its role, once chosen</Confirm></p> },
        { heading: "Analytics and cookies", body: <p><Confirm>Whether analytics or cookies are used</Confirm></p> },
        { heading: "Your rights and contact", body: <p><Confirm>Grievance / data contact details under applicable Indian law</Confirm></p> },
      ]}
    />
  );
}
