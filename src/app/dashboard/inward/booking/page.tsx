import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookingActions } from "@/components/dashboard/BookingActions";
import { Calendar } from "@/components/dashboard/Calendar";
import { IntakeCard } from "@/components/dashboard/IntakeCard";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { ApiError, type Booking, type BookingStatus, getOperatorBookings } from "@/lib/api";
import { toCard } from "@/lib/booking-view";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Booking | WDRA Portal",
};

// Booking is the decision queue — accepted requests move to New Intake.
const TABS: { label: string; value: BookingStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

export default async function BookingPage(
  props: PageProps<"/dashboard/inward/booking">,
) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const { status } = await props.searchParams;
  const active: BookingStatus = status === "rejected" ? "rejected" : "pending";

  let bookings: Booking[] = [];
  let loadError: string | null = null;
  try {
    bookings = await getOperatorBookings(session.token, active);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login");
    }
    loadError =
      err instanceof Error ? err.message : "Failed to load bookings.";
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">Booking</h2>
        <nav className="flex gap-1">
          {TABS.map((t) => (
            <Link
              key={t.value}
              href={`/dashboard/inward/booking?status=${t.value}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                active === t.value
                  ? "bg-brand text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
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
              No {active} booking requests.
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
