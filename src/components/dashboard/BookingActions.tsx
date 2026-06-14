import Link from "next/link";
import { decideBooking } from "@/lib/actions";
import type { BookingStatus } from "@/lib/api";

export function BookingActions({
  id,
  status,
  canGenerateInvoice,
}: {
  id: string;
  status: BookingStatus;
  canGenerateInvoice: boolean;
}) {
  if (status === "pending") {
    return (
      <div className="flex flex-col gap-2">
        <form action={decideBooking.bind(null, id, "accepted")}>
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 px-6 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
          >
            Approve
          </button>
        </form>
        <form action={decideBooking.bind(null, id, "rejected")}>
          <button
            type="submit"
            className="w-full rounded-md bg-red-500 px-6 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
          >
            Reject
          </button>
        </form>
      </div>
    );
  }

  if (canGenerateInvoice) {
    return (
      <Link
        href={`/dashboard/inward/new-intake/${id}`}
        className="inline-block rounded-md bg-green-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-green-700"
      >
        Generate Invoice
      </Link>
    );
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-medium ${
        status === "accepted"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status[0].toUpperCase() + status.slice(1)}
    </span>
  );
}
