import type { Metadata } from "next";
import { IntakeCard } from "@/components/dashboard/IntakeCard";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { newIntakeItems } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "New Intake | WDRA Portal",
};

export default function NewIntakePage() {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900">New Intake</h2>
      <KpiRow />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {newIntakeItems.map((r) => (
          <IntakeCard key={r.commodity} record={r} />
        ))}
      </div>
    </>
  );
}
