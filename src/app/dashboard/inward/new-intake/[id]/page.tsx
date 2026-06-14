import type { Metadata } from "next";
import {
  ClipboardList,
  Package,
  Scale,
  Upload,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deposit Details | WDRA Portal",
};

const STEPS = ["Deposit Details", "Quality Check", "Documents", "Summary"];

function Stepper({ active }: { active: number }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-6 py-3 shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {STEPS.map((s, i) => {
          const isActive = i === active;
          return (
            <div key={s} className="flex shrink-0 items-center gap-2">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                  isActive ? "bg-brand text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`whitespace-nowrap text-sm ${
                  isActive ? "font-medium text-gray-900" : "text-gray-400"
                }`}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-xs font-medium text-gray-600">
      {children}
      {required ? <span className="text-red-500">*</span> : null}
    </label>
  );
}

function Field({
  label,
  required,
  value,
  placeholder,
  className = "",
}: {
  label: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input
        defaultValue={value}
        placeholder={placeholder}
        className={`mt-1 h-10 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand ${className}`}
      />
    </div>
  );
}

function SelectField({
  label,
  required,
  value,
  options,
}: {
  label: string;
  required?: boolean;
  value: string;
  options: string[];
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <select
        defaultValue={value}
        className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-800 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-6 text-sm font-semibold text-brand first:mt-0">
      {children}
    </h3>
  );
}

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

export default function DepositDetailsPage() {
  return (
    <>
      <Stepper active={0} />

      <div className="grid items-start gap-4 lg:grid-cols-3">
        {/* Left: form */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <ClipboardList size={20} className="text-brand" />
            Deposit Details
          </h2>

          <SectionTitle>Depositor Information</SectionTitle>
          <div className={grid}>
            <SelectField
              label="Depositor Type"
              required
              value="Farmer"
              options={["Farmer", "Trader", "FPO"]}
            />
            <Field label="Depositor Name" required placeholder="Name" />
            <Field label="Mobile Number" required value="9818026511" />
            <div>
              <Label required>KYC Verified</Label>
              <div className="mt-1 flex h-10 items-center justify-center rounded-md bg-green-100 text-sm font-semibold text-green-700">
                Verified
              </div>
            </div>

            <SelectField
              label="KYC Type"
              required
              value="Aadhaar"
              options={["Aadhaar", "PAN", "Voter ID"]}
            />
            <Field label="Aadhaar Number" placeholder="Farmer" />
            <Field label="Address" placeholder="Farmer" />
            <Field label="Farmed ID/FPO(Optional)" placeholder="Farmer" />
          </div>

          <SectionTitle>Commodity Information</SectionTitle>
          <div className={grid}>
            <SelectField
              label="Commodity"
              required
              value="Wheat"
              options={["Wheat", "Rice", "Coffee (Robusta)", "Maize"]}
            />
            <Field label="Variety" required value="HD 2967" />
            <Field label="Grade (Expected)" value="A" />
            <Field label="Season" value="Rabi 2025-26" />
          </div>

          <SectionTitle>Lot &amp; Quantity Details</SectionTitle>
          <div className={grid}>
            <Field label="Lot Number" required value="LOT-160524-001" />
            <Field label="Quantity (MT)" required value="120.00" />
            <Field label="No. of Bags" required value="240" />
            <Field label="Moisture (%)" value="11.2" />

            <Field label="Impurities (%)" value="2.1" />
            <Field
              label="Other Remark (Optional)"
              placeholder="Good Quality Produce"
            />
            <Field label="Market Price ($/Quintal)" placeholder="Farmer" />
            <Field
              label="Estimated Value ($)"
              value="$2000.00"
              className="bg-green-50 font-semibold text-green-700"
            />
          </div>

          <SectionTitle>Warehouse &amp; Storage Details</SectionTitle>
          <div className={grid}>
            <SelectField
              label="Warehouse"
              required
              value="KRSI-HR-001-Karnal"
              options={["KRSI-HR-001-Karnal"]}
            />
            <Field label="Storage Location" required placeholder="Name" />
            <Field label="Stack/Bin" required value="A3" />
            <Field
              label="Stack Capacity"
              value="200 MT"
              className="bg-gray-100"
            />

            <Field label="Storage From" required placeholder="Aadhaar" />
            <Field label="Storage To" required placeholder="Farmer" />
            <SelectField
              label="Insurance Required"
              required
              value="Yes"
              options={["Yes", "No"]}
            />
            <SelectField
              label="Insurance Company"
              value="Royal Sundaram"
              options={["Royal Sundaram", "ICICI Lombard", "Bajaj Allianz"]}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              className="h-11 shrink-0 whitespace-nowrap rounded-md border border-gray-300 px-6 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Save as Draft
            </button>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/dashboard/inward/new-intake"
                className="flex h-11 shrink-0 items-center whitespace-nowrap rounded-md border border-gray-300 px-6 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="h-11 shrink-0 whitespace-nowrap rounded-md bg-brand px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Save &amp; Next
              </button>
            </div>
          </div>
        </section>

        {/* Right: summary panels */}
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
              <SummaryRow
                label="Weigh Date & Time"
                value="16 June 2026, 09:45 AM"
              />
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
              {[
                "Upload Lab Report",
                "Other Documents",
                "Upload Weighbridge slip",
              ].map((label) => (
                <div key={label}>
                  <p className="mb-1 text-xs text-gray-500">{label}</p>
                  <button
                    type="button"
                    className="rounded-md border border-brand px-4 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                  >
                    Upload Document
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
