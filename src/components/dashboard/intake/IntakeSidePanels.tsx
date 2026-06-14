import { Package, Scale, Upload } from "lucide-react";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

export function IntakeSidePanels() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Package size={16} className="text-brand" />
          Intake Summary
        </h3>
        <div className="divide-y divide-gray-100">
          <SummaryRow label="Depositor" value="Suresh Yadav" />
          <SummaryRow label="Commodity" value="Wheat(HD267)" />
          <SummaryRow label="Quantity" value="120.00 MT(240 Bags)" />
          <SummaryRow label="Warehouse" value="KRSI-HR-001-Karnal" />
          <SummaryRow label="Stack/Bin" value="A3(Godown A)" />
        </div>
        <div className="mt-4 rounded-lg bg-green-50 py-4 text-center">
          <p className="text-xs text-gray-500">Estimate Value</p>
          <p className="text-2xl font-bold text-gray-900">$2000.00</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Scale size={16} className="text-brand" />
          Weighbridge Information
        </h3>
        <div className="divide-y divide-gray-100">
          <SummaryRow label="Weighbridge Slip NO." value="WB-160524-0456" />
          <SummaryRow label="Gross Weight" value="64,500 Kg" />
          <SummaryRow label="Tare Weight" value="4,500 Kg" />
          <SummaryRow label="Net Weight" value="60,000Kg(120.00MT)" />
          <SummaryRow label="Weigh Date & Time" value="16 June 2026, 09:45 AM" />
        </div>
        <button
          type="button"
          className="mt-4 h-12 w-full rounded-lg bg-green-50 text-base font-semibold text-brand transition-colors hover:bg-green-100"
        >
          Weighbridge Sync
        </button>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
          <Upload size={16} className="text-brand" />
          Quick Actions
        </h3>
        <div className="space-y-3">
          {["Upload Lab Report", "Other Documents", "Upload Weighbridge slip"].map(
            (label) => (
              <div key={label}>
                <p className="mb-1 text-xs text-gray-500">{label}</p>
                <button
                  type="button"
                  className="rounded-md border border-brand px-4 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                >
                  Upload Document
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
