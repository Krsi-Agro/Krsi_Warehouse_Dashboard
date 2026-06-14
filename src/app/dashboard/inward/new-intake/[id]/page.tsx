import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { IntakeSidePanels } from "@/components/dashboard/intake/IntakeSidePanels";
import { IntakeStepper } from "@/components/dashboard/intake/IntakeStepper";

export const metadata: Metadata = {
  title: "Deposit Details | WDRA Portal",
};

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

const grid = "grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-4";

export default async function DepositDetailsPage(
  props: PageProps<"/dashboard/inward/new-intake/[id]">,
) {
  const { id } = await props.params;

  return (
    <>
      <IntakeStepper active={0} />

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
              <Link
                href={`/dashboard/inward/new-intake/${id}/quality-check`}
                className="flex h-11 shrink-0 items-center whitespace-nowrap rounded-md bg-brand px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Save &amp; Next
              </Link>
            </div>
          </div>
        </section>

        {/* Right: summary panels */}
        <IntakeSidePanels />
      </div>
    </>
  );
}
