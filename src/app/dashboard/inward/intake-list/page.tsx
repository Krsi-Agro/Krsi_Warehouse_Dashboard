import type { Metadata } from "next";
import { KpiRow } from "@/components/dashboard/KpiRow";

export const metadata: Metadata = {
  title: "Intake List | WDRA Portal",
};

export default function IntakeListPage() {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900">Intake List</h2>
      <KpiRow />

      <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-400 shadow-sm">
        Intake list will appear here.
      </div>
    </>
  );
}
