import type { Metadata } from "next";
import { Calendar } from "@/components/dashboard/Calendar";
import { IntakeCard } from "@/components/dashboard/IntakeCard";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { bookingRequests } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Booking | WDRA Portal",
};

export default function BookingPage() {
  return (
    <>
      <div className="rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Booking</h2>
      </div>

      <KpiRow />

      <div className="grid items-start gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {bookingRequests.map((r) => (
            <IntakeCard key={r.commodity} record={r} actions="approve" />
          ))}
        </div>

        <Calendar className="lg:col-span-1" />
      </div>
    </>
  );
}
