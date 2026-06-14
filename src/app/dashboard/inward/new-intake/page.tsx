import type { Metadata } from "next";
import { Calendar } from "@/components/dashboard/Calendar";
import { IntakeCard } from "@/components/dashboard/IntakeCard";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { newIntakeItems } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "New Intake | WDRA Portal",
};

export default function NewIntakePage() {
  return (
    <>
      <div className="rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">New Intake</h2>
      </div>

      <KpiRow />

      <div className="grid items-start gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {newIntakeItems.map((r) => (
            <IntakeCard
              key={r.commodity}
              record={r}
              actions={
                r.action === "invoice" ? (
                  <button
                    type="button"
                    className="rounded-md bg-green-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-green-700"
                  >
                    Generate Invoice
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="rounded-md bg-green-600 px-6 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
                    >
                      Approved
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-red-500 px-6 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
                    >
                      Rejected
                    </button>
                  </div>
                )
              }
            />
          ))}
        </div>

        <Calendar className="lg:col-span-1" />
      </div>
    </>
  );
}
