/**
 * Editorial "Ride Setup" curation. Picks are chosen from the existing catalogue by SKU and are NOT
 * fit, safety or performance recommendations — no specifications have been verified. Wording describes
 * the riding style only, never product claims. A test checks every SKU exists and is published.
 */
export type RideStyleId = "city" | "touring" | "adventure" | "racing";

export interface RideSlot {
  label: string;
  skus: string[];
}

export interface RideStyle {
  id: RideStyleId;
  label: string;
  tagline: string;
  slots: RideSlot[];
}

export const RIDE_STYLES: readonly RideStyle[] = [
  {
    id: "city",
    label: "City",
    tagline: "Daily commutes and short hops through traffic.",
    slots: [
      { label: "Jacket", skus: ["JK17", "JK21"] },
      { label: "Gloves", skus: ["GL01", "GL02", "GL06"] },
      { label: "Boots", skus: ["BO01"] },
      { label: "Extras", skus: ["LG01", "ACS02", "ACS03"] },
    ],
  },
  {
    id: "touring",
    label: "Touring",
    tagline: "Long days, long distances and gear to carry.",
    slots: [
      { label: "Jacket", skus: ["JK19", "JK21"] },
      { label: "Gloves", skus: ["GL05", "GL07"] },
      { label: "Boots", skus: ["BO01"] },
      { label: "Luggage", skus: ["LG04", "LG02", "LG05"] },
      { label: "Extras", skus: ["AC02", "ACS02"] },
    ],
  },
  {
    id: "adventure",
    label: "Adventure",
    tagline: "Mixed roads and rougher routes.",
    slots: [
      { label: "Jacket", skus: ["JK23", "JK20", "JK18"] },
      { label: "Gloves", skus: ["GL07", "GL05"] },
      { label: "Boots", skus: ["BO02"] },
      { label: "Luggage", skus: ["LG03", "LG05"] },
      { label: "Extras", skus: ["FL01", "AC03"] },
    ],
  },
  {
    id: "racing",
    label: "Racing",
    tagline: "Track-day and sport-riding style.",
    slots: [
      { label: "Gloves", skus: ["GL08", "GL04", "GL03"] },
      { label: "Boots", skus: ["BO02"] },
      { label: "Extras", skus: ["AC02", "AC03"] },
    ],
  },
];

export function isRideStyleId(value: string | null | undefined): value is RideStyleId {
  return RIDE_STYLES.some((s) => s.id === value);
}
