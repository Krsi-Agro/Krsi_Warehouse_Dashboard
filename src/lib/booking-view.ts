import type { Booking } from "./api";
import type { IntakeCardData } from "@/components/dashboard/IntakeCard";

export function thumbFor(commodity: string): string {
  const c = commodity.toLowerCase();
  if (c.includes("coffee")) return "coffee";
  if (c.includes("wheat")) return "wheat";
  return "default";
}

export function toCard(b: Booking): IntakeCardData {
  return {
    commodity: b.commodityLabel,
    party: `Farmer : ${b.farmerName}`,
    village: b.location,
    mobile: b.farmerPhone,
    quantity: `${b.quantityQuintal.toLocaleString("en-IN")} Qtl`,
    expectedDate: `${b.durationDays} Days`,
    requestDay: new Date(b.createdAt).toLocaleDateString("en-GB"),
    thumb: thumbFor(b.commodity),
  };
}
