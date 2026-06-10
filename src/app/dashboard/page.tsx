import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { Icon } from "@/components/dashboard/Icon";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { BarChart, DonutChart } from "@/components/dashboard/Charts";
import {
  alerts,
  capacity,
  commodities,
  dailyInward,
  dailyOutward,
  loanRequests,
  quickActions,
  recentEnwrs,
  shortcuts,
} from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Warehouse Dashboard | WDRA Portal",
};

function Card({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-gray-100 bg-white p-4 shadow-sm ${className}`}
    >
      {title ? (
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPledge = status.toLowerCase() === "pledge";
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
        isPledge ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
      }`}
    >
      {status}
    </span>
  );
}

const dot = (color: string) => (
  <span
    className="inline-block h-2.5 w-2.5 rounded-full"
    style={{ backgroundColor: color }}
  />
);

export default function DashboardPage() {
  return (
    <>
      <KpiRow />

      {/* Row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Capacity Utilization">
          <div className="flex items-center justify-between gap-4">
            <DonutChart
              data={capacity.segments}
              centerTop={`${capacity.utilized}%`}
              centerBottom="Utilized"
            />
            <ul className="space-y-3 text-sm">
              <li>
                <div className="flex items-center gap-2">
                  {dot("#1b5e3f")}
                  <span className="text-gray-600">Occupied</span>
                </div>
                <p className="ml-4 text-xs text-gray-400">3,820 MT</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  {dot("#e5e7eb")}
                  <span className="text-gray-600">Available</span>
                </div>
                <p className="ml-4 text-xs text-gray-400">1,180 MT</p>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  {dot("#9ca3af")}
                  <span className="text-gray-600">Total Capacity</span>
                </div>
                <p className="ml-4 text-xs text-gray-400">5,000 MT</p>
              </li>
            </ul>
          </div>
        </Card>

        <Card title="Commodity Distribution (By Quantity)">
          <div className="flex items-center justify-between gap-4">
            <DonutChart data={commodities} />
            <ul className="flex-1 space-y-2 text-sm">
              {commodities.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="flex items-center gap-2">
                    {dot(c.color)}
                    <span className="text-gray-700">{c.label}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{c.value} MT</span>
                    <span className="w-10 text-right text-xs text-gray-400">
                      {c.pct}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card title="Recent Alerts">
          <ul className="divide-y divide-gray-100">
            {alerts.map((a) => (
              <li
                key={a.title}
                className="flex items-start gap-3 py-2.5 first:pt-0"
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    a.tone === "red"
                      ? "bg-red-100 text-red-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  <Icon name={a.icon} size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-gray-900">
                    {a.title}
                  </p>
                  <p className="truncate text-[11px] text-gray-500">
                    {a.detail}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] text-gray-400">
                  {a.time}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Daily Outward (MT)">
          <BarChart data={dailyOutward} color="#1b5e3f" />
        </Card>
        <Card title="Daily Inward (MT)">
          <BarChart data={dailyInward} color="#eab308" />
        </Card>
        <Card title="Quick Actions">
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((q) => (
              <button
                key={q.label}
                type="button"
                className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-100 p-2 text-center transition-colors hover:border-brand/40 hover:bg-brand/5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-50 text-brand">
                  <Icon name={q.icon} size={18} />
                </span>
                <span className="text-[9px] leading-tight text-gray-600">
                  {q.label}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Card
          title="Recent eNWRs"
          className="xl:col-span-5"
          action={
            <a href="#" className="text-xs font-medium text-indigo-600">
              View All
            </a>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase text-gray-400">
                <tr>
                  <th className="pb-2 font-medium">Receipt No.</th>
                  <th className="pb-2 font-medium">Commodity</th>
                  <th className="pb-2 font-medium">Quantity</th>
                  <th className="pb-2 font-medium">Depositor</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {recentEnwrs.map((r) => (
                  <tr key={r.receipt}>
                    <td className="py-2 text-[10px] text-gray-500">
                      {r.receipt}
                    </td>
                    <td className="py-2">{r.commodity}</td>
                    <td className="py-2">{r.qty}</td>
                    <td className="py-2">{r.depositor}</td>
                    <td className="py-2 whitespace-nowrap">{r.date}</td>
                    <td className="py-2">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          title="Recent Loan Requests"
          className="xl:col-span-4"
          action={
            <a href="#" className="text-xs font-medium text-indigo-600">
              View All
            </a>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase text-gray-400">
                <tr>
                  <th className="pb-2 font-medium">Receipt ID</th>
                  <th className="pb-2 font-medium">Commodity</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Depositor</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {loanRequests.map((r) => (
                  <tr key={r.id}>
                    <td className="py-2 text-[10px] text-gray-500">{r.id}</td>
                    <td className="py-2">{r.depositor}</td>
                    <td className="py-2">{r.amount}</td>
                    <td className="py-2">{r.lender}</td>
                    <td className="py-2">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Shortcuts" className="xl:col-span-3">
          <ul className="space-y-2">
            {shortcuts.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5 text-sm text-gray-700 transition-colors hover:border-brand/40 hover:bg-brand/5"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand/10 text-brand">
                    <Icon name={s.icon} size={15} />
                  </span>
                  <span className="flex-1">{s.label}</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
