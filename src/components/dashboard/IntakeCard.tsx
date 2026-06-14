import { Coffee, Sprout, Wheat, type LucideIcon } from "lucide-react";

export type IntakeCardData = {
  commodity: string;
  party: string;
  village: string;
  mobile: string;
  quantity: string;
  expectedDate: string;
  requestDay: string;
  thumb: string;
};

const THUMB: Record<string, { from: string; to: string; Icon: LucideIcon }> = {
  coffee: { from: "#5b3a29", to: "#a06a43", Icon: Coffee },
  wheat: { from: "#b8860b", to: "#e6c200", Icon: Wheat },
};
const DEFAULT_THUMB = { from: "#3f7d4e", to: "#1b5e3f", Icon: Sprout };

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
  actions,
}: {
  record: IntakeCardData;
  actions?: React.ReactNode;
}) {
  const thumb = THUMB[record.thumb] ?? DEFAULT_THUMB;
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

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
