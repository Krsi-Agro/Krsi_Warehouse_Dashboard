import type { Metadata } from "next";
import { IntakeCard } from "@/components/dashboard/IntakeCard";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { bookingRequests } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Booking | WDRA Portal",
};

export default function BookingPage() {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900">Booking</h2>
      <KpiRow />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {bookingRequests.map((r) => (
          <IntakeCard key={r.commodity} record={r} showActions />
        ))}
      </div>
    </>
  );
}
