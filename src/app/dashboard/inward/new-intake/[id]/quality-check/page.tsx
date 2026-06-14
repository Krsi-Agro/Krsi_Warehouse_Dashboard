import type { Metadata } from "next";
import {
  Check,
  Copy,
  Droplet,
  FlaskConical,
  Layers,
  Leaf,
  type LucideIcon,
  QrCode,
  RefreshCw,
  Scale,
  Wheat,
} from "lucide-react";
import Link from "next/link";
import { IntakeSidePanels } from "@/components/dashboard/intake/IntakeSidePanels";
import { IntakeStepper } from "@/components/dashboard/intake/IntakeStepper";

export const metadata: Metadata = {
  title: "Quality Check | WDRA Portal",
};

const TABS = [
  "Quality Parameters",
  "Moisture Analysis",
  "Physical Analysis",
  "Chemical Analysis",
  "Nutritional Analysis",
];

const PARAMS: {
  name: string;
  result: string;
  unit: string;
  gradeA: string;
  gradeB: string;
  icon: LucideIcon;
  color: string;
}[] = [
  { name: "Moisture Content", result: "11.2", unit: "%", gradeA: "Max 12.0", gradeB: "Max 13.0", icon: Droplet, color: "text-sky-500" },
  { name: "Foreign Matter", result: "1.8", unit: "%", gradeA: "Max 2.0", gradeB: "Max 4.0", icon: Leaf, color: "text-green-600" },
  { name: "Damaged Grain", result: "1.2", unit: "%", gradeA: "Max 3.0", gradeB: "Max 5.0", icon: Wheat, color: "text-amber-500" },
  { name: "Broken Grain", result: "2.6", unit: "%", gradeA: "Max 6.0", gradeB: "Max 10.0", icon: Wheat, color: "text-amber-500" },
  { name: "Test Weight", result: "78.5", unit: "kg/hl", gradeA: "Min 76.0", gradeB: "Min 74.0", icon: Scale, color: "text-gray-500" },
  { name: "Protein Content", result: "11.8", unit: "%", gradeA: "Min 10.0", gradeB: "Min 8.0", icon: FlaskConical, color: "text-indigo-500" },
  { name: "Gluten Content", result: "24.5", unit: "%", gradeA: "Min 20.0", gradeB: "Min 16.0", icon: Wheat, color: "text-amber-600" },
  { name: "Ash Content", result: "1.6", unit: "%", gradeA: "Max 2.0", gradeB: "Max 3.0", icon: Layers, color: "text-stone-500" },
];

const GRADES = [
  { label: "Grade A", range: "≥ 90", cls: "border-green-400 bg-green-100 text-green-800" },
  { label: "Grade B", range: "75 - 89", cls: "border-transparent bg-green-50 text-gray-600" },
  { label: "Grade C", range: "60 - 74", cls: "border-transparent bg-orange-50 text-orange-600" },
  { label: "Reject", range: "< 60", cls: "border-transparent bg-red-100 text-red-600" },
];

const TRENDS: {
  title: string;
  value: string;
  delta: string;
  color: string;
  data: number[];
}[] = [
  { title: "Moisture %", value: "11.2%", delta: "↓ 0.4 vs last lot", color: "#1b5e3f", data: [11.8, 11.6, 11.9, 11.5, 11.4, 11.7, 11.3, 11.5, 11.6, 11.2] },
  { title: "Foreign Matter %", value: "1.8%", delta: "↓ 0.2 vs last lot", color: "#1b5e3f", data: [2.2, 2.0, 2.3, 1.9, 2.1, 1.9, 2.0, 1.9, 2.0, 1.8] },
  { title: "Test Weight (kg/hl)", value: "78.5", delta: "↑ 0.6 vs last lot", color: "#1b5e3f", data: [77.2, 77.6, 77.4, 78.0, 77.8, 78.2, 77.9, 78.1, 77.9, 78.5] },
  { title: "Protein %", value: "11.8%", delta: "↑ 0.3 vs last lot", color: "#eab308", data: [11.2, 11.4, 11.1, 11.5, 11.3, 11.6, 11.4, 11.5, 11.5, 11.8] },
];

function PassBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
      <Check size={12} /> Pass
    </span>
  );
}

function Stacked({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function InlineRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const L = Math.PI * 90;
  const filled = (value / 100) * L;
  return (
    <svg viewBox="0 0 200 118" className="h-28 w-48">
      <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="16" strokeLinecap="round" />
      <path d="M10 100 A90 90 0 0 1 190 100" fill="none" stroke="#1b5e3f" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${filled} ${L}`} />
      <text x="100" y="86" textAnchor="middle" className="fill-gray-900 text-3xl font-bold">
        {value}
      </text>
      <text x="100" y="102" textAnchor="middle" className="fill-gray-400 text-[10px]">
        /100
      </text>
    </svg>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 140;
  const h = 44;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-11 w-full" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default async function QualityCheckPage(
  props: PageProps<"/dashboard/inward/new-intake/[id]/quality-check">,
) {
  const { id } = await props.params;
  const base = `/dashboard/inward/new-intake/${id}`;

  return (
    <>
      <IntakeStepper active={1} />

      <div className="grid items-start gap-4 lg:grid-cols-12">
        {/* Left info column */}
        <div className="space-y-4 lg:col-span-3">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Lot Information
              </h3>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                In Inspection
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] text-gray-400">Lot ID</p>
                <p className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  LOT-160524-001
                  <Copy size={13} className="text-gray-400" />
                  <RefreshCw size={13} className="text-gray-400" />
                  <QrCode size={13} className="text-gray-400" />
                </p>
              </div>
              <Stacked label="Commodity" value="Wheat (HD 2967)" />
              <Stacked label="Quantity" value="120.000 MT (240 Bags)" />
              <Stacked label="Depositor" value="Suresh Yadav" />
              <Stacked label="Warehouse" value="KRSI-HR-001 - Karnal" />
              <Stacked label="Stack / Bin" value="A3 (Godown A)" />
              <Stacked label="Date of Deposit" value="16 May 2024, 09:45 AM" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Sample Information
            </h3>
            <div className="divide-y divide-gray-100">
              <InlineRow
                label="Sample ID"
                value={
                  <span className="flex items-center gap-1">
                    SPL-160524-001 <Copy size={13} className="text-gray-400" />
                  </span>
                }
              />
              <InlineRow
                label="Sampling Method"
                value={
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    Automatic Sampler
                  </span>
                }
              />
              <InlineRow label="Sampled On" value="16 May 2024, 10:02 AM" />
              <InlineRow label="Sampled By" value="Rohit Sharma" />
              <InlineRow label="Sample Quantity" value="2.5 Kg" />
              <InlineRow label="Sample Bags" value="3 of 240" />
            </div>
            <button
              type="button"
              className="mt-3 h-10 w-full rounded-md bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              View Sampling History
            </button>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">
              Test Method
            </h3>
            <div className="divide-y divide-gray-100">
              <InlineRow label="Method Type" value="WDRA Prescribed" />
              <InlineRow label="Standard" value="IS 9286 : 1990 (Reaffirmed 2016)" />
              <InlineRow label="Assaying By" value="KRSI Lab - Karnal" />
              <InlineRow label="Equipment Calibrated On" value="10 May 2024" />
            </div>
            <div className="mt-3">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Valid
              </span>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="space-y-4 lg:col-span-6">
          {/* Quality parameters */}
          <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-wrap gap-x-6 border-b border-gray-100 px-5">
              {TABS.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className={`whitespace-nowrap border-b-2 py-3 text-sm transition-colors ${
                    i === 0
                      ? "border-brand font-semibold text-gray-900"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto p-2">
              <table className="w-full text-left text-sm">
                <thead className="text-[11px] uppercase text-gray-400">
                  <tr>
                    <th className="px-3 py-2 font-medium">Parameter</th>
                    <th className="px-3 py-2 font-medium">Result</th>
                    <th className="px-3 py-2 font-medium">Unit</th>
                    <th className="px-3 py-2 font-medium">Standard Limit (Grade A)</th>
                    <th className="px-3 py-2 font-medium">Grade B Limit</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PARAMS.map((p) => {
                    const Icon = p.icon;
                    return (
                      <tr key={p.name}>
                        <td className="px-3 py-3">
                          <span className="flex items-center gap-2 font-medium text-gray-800">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50">
                              <Icon size={15} className={p.color} />
                            </span>
                            {p.name}
                          </span>
                        </td>
                        <td className="px-3 py-3 font-semibold text-gray-900">{p.result}</td>
                        <td className="px-3 py-3 text-gray-500">{p.unit}</td>
                        <td className="px-3 py-3 text-gray-500">{p.gradeA}</td>
                        <td className="px-3 py-3 text-gray-500">{p.gradeB}</td>
                        <td className="px-3 py-3">
                          <PassBadge />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overall quality score */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Overall Quality Score
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col items-center">
                <Gauge value={96} />
                <p className="-mt-2 text-xs font-medium text-gray-500">
                  Excellent Quality
                </p>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
                {GRADES.map((g) => (
                  <div
                    key={g.label}
                    className={`rounded-lg border py-3 text-center ${g.cls}`}
                  >
                    <p className="text-sm font-semibold">{g.label}</p>
                    <p className="mt-1 text-xs">{g.range}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Historical trend */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Historical Trend{" "}
              <span className="font-normal text-gray-400">(vs Last 10 Lots)</span>
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {TRENDS.map((t) => (
                <div key={t.title} className="rounded-lg border border-gray-100 p-3">
                  <p className="text-xs text-gray-500">{t.title}</p>
                  <p className="text-xl font-bold text-gray-900">{t.value}</p>
                  <p className="text-[11px] text-gray-400">{t.delta}</p>
                  <div className="mt-2">
                    <Sparkline data={t.data} color={t.color} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right summary panels — same on every step */}
        <div className="lg:col-span-3">
          <IntakeSidePanels />
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
        <button
          type="button"
          className="h-11 shrink-0 whitespace-nowrap rounded-md border border-gray-300 px-6 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          Save as Draft
        </button>
        <div className="flex shrink-0 gap-3">
          <Link
            href={base}
            className="flex h-11 shrink-0 items-center whitespace-nowrap rounded-md border border-gray-300 px-6 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Back
          </Link>
          <Link
            href={`${base}/documents`}
            className="flex h-11 shrink-0 items-center whitespace-nowrap rounded-md bg-brand px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Save &amp; Next
          </Link>
        </div>
      </div>
    </>
  );
}
