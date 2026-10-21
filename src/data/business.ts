/**
 * Business facts. Only values confirmed by the owner belong here.
 * `null` renders as "to be added" in the UI — never invent contact details.
 */
export const BUSINESS = {
  name: "GearForce",
  tagline: "Gear for Every Journey",
  city: "Hyderabad",
  region: "Telangana",
  country: "India",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || null,
  /** Add { label, href } entries once the owner supplies social accounts. */
  social: [] as { label: string; href: string }[],
};
