import { Icon } from "./Icon";
import { kpis } from "@/lib/dashboard-data";

export function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Icon name={k.icon} size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] text-gray-500">{k.label}</p>
              <p className="text-lg font-bold leading-tight text-gray-900">
                {k.value}
              </p>
              <p className="truncate text-[10px] text-gray-400">{k.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
