import { Coffee, Wheat } from "lucide-react";
import type { IntakeRecord } from "@/lib/dashboard-data";

const THUMB = {
  coffee: { from: "#5b3a29", to: "#a06a43", Icon: Coffee },
  wheat: { from: "#b8860b", to: "#e6c200", Icon: Wheat },
} as const;

export function IntakeCard({
  record,
  showActions = false,
}: {
  record: IntakeRecord;
  showActions?: boolean;
}) {
  const thumb = THUMB[record.thumb];
  const ThumbIcon = thumb.Icon;

  return (
    <div className="flex gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg text-white/90"
        style={{
          backgroundImage: `linear-gradient(135deg, ${thumb.from}, ${thumb.to})`,
        }}
      >
        <ThumbIcon size={32} strokeWidth={1.5} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {record.commodity}
            </p>
            <p className="truncate text-xs text-gray-500">{record.party}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[10px] text-gray-400">Quantity</p>
            <p className="text-sm font-semibold text-gray-900">
              {record.quantity}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <p className="text-[11px] text-gray-400">
            Requested on {record.requestedOn}
          </p>
          {showActions ? (
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-green-700"
              >
                Approve
              </button>
              <button
                type="button"
                className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-red-600"
              >
                Decline
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
