import { Coffee, Wheat } from "lucide-react";
import type { IntakeRecord } from "@/lib/dashboard-data";

const THUMB = {
  coffee: { from: "#5b3a29", to: "#a06a43", Icon: Coffee },
  wheat: { from: "#b8860b", to: "#e6c200", Icon: Wheat },
} as const;

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-gray-800">{value}</p>
    </div>
  );
}

export function IntakeCard({
  record,
  actions = "none",
}: {
  record: IntakeRecord;
  actions?: "none" | "approve" | "invoice";
}) {
  const thumb = THUMB[record.thumb];
  const ThumbIcon = thumb.Icon;

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div
        className="flex h-[70px] w-[90px] shrink-0 items-center justify-center rounded-lg text-white/90"
        style={{
          backgroundImage: `linear-gradient(135deg, ${thumb.from}, ${thumb.to})`,
        }}
      >
        <ThumbIcon size={30} strokeWidth={1.5} />
      </div>

      <div className="min-w-[190px]">
        <p className="text-sm font-bold text-gray-900">{record.commodity}</p>
        <p className="text-xs text-gray-500">{record.party}</p>
        <p className="text-xs text-gray-500">Village : {record.village}</p>
        <p className="text-xs text-gray-500">Mobile: {record.mobile}</p>
      </div>

      <div className="flex flex-1 items-center justify-around gap-4">
        <Info label="Quantity" value={record.quantity} />
        <Info label="Expected Date" value={record.expectedDate} />
        <Info label="Request Day" value={record.requestDay} />
      </div>

      {actions === "approve" ? (
        <div className="flex shrink-0 flex-col gap-2">
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
      ) : null}

      {actions === "invoice" ? (
        <button
          type="button"
          className="shrink-0 rounded-md bg-green-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-green-700"
        >
          Generate Invoice
        </button>
      ) : null}
    </div>
  );
}
