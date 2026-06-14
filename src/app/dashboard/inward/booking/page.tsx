import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookingActions } from "@/components/dashboard/BookingActions";
import { Calendar } from "@/components/dashboard/Calendar";
import { IntakeCard, type IntakeCardData } from "@/components/dashboard/IntakeCard";
import { KpiRow } from "@/components/dashboard/KpiRow";
import {
  ApiError,
  type Booking,
  type BookingStatus,
  getOperatorBookings,
} from "@/lib/api";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Booking | WDRA Portal",
};

const TABS: { label: string; value?: BookingStatus }[] = [
  { label: "All" },
  { label: "Pending", value: "pending" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

function thumbFor(commodity: string): string {
  const c = commodity.toLowerCase();
  if (c.includes("coffee")) return "coffee";
  if (c.includes("wheat")) return "wheat";
  return "default";
}

function toCard(b: Booking): IntakeCardData {
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

export default async function BookingPage(
  props: PageProps<"/dashboard/inward/booking">,
) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const { status } = await props.searchParams;
  const active =
    typeof status === "string" ? (status as BookingStatus) : undefined;

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
          {TABS.map((t) => {
            const isActive = active === t.value || (!active && !t.value);
            return (
              <Link
                key={t.label}
                href={
                  t.value
                    ? `/dashboard/inward/booking?status=${t.value}`
                    : "/dashboard/inward/booking"
                }
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
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
              No booking requests found.
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
