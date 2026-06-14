import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BookingActions } from "@/components/dashboard/BookingActions";
import { Calendar } from "@/components/dashboard/Calendar";
import { IntakeCard } from "@/components/dashboard/IntakeCard";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { ApiError, type Booking, getOperatorBookings } from "@/lib/api";
import { toCard } from "@/lib/booking-view";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "New Intake | WDRA Portal",
};

export default async function NewIntakePage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  let bookings: Booking[] = [];
  let loadError: string | null = null;
  try {
    bookings = await getOperatorBookings(session.token, "accepted");
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login");
    }
    loadError =
      err instanceof Error ? err.message : "Failed to load intake.";
  }

  return (
    <>
      <div className="rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">New Intake</h2>
      </div>

      <KpiRow />

      <div className="grid items-start gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {loadError ? (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {loadError}
            </div>
          ) : bookings.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-400 shadow-sm">
              No approved bookings yet.
            </div>
          ) : (
            bookings.map((b) => (
              <IntakeCard
                key={b.id}
                record={toCard(b)}
                actions={
                  <BookingActions
                    id={b.id}
                    status={b.status}
                    canGenerateInvoice={b.canGenerateInvoice}
                  />
                }
              />
            ))
          )}
        </div>

        <Calendar className="lg:col-span-1" />
      </div>
    </>
  );
}
