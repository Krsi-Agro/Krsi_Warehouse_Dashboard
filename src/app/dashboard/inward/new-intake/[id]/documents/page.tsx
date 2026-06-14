import type { Metadata } from "next";
import { CheckCheck, FileText } from "lucide-react";
import Link from "next/link";
import { IntakeSidePanels } from "@/components/dashboard/intake/IntakeSidePanels";
import { IntakeStepper } from "@/components/dashboard/intake/IntakeStepper";

export const metadata: Metadata = {
  title: "Documents | WDRA Portal",
};

const DOCUMENTS = ["Lab Report", "KYC Document", "Weight Slip"];

function UploadBox({ label }: { label: string }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-brand">{label}</p>
      <label className="flex h-28 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:border-brand/50 hover:bg-brand/5">
        <CheckCheck size={28} className="text-brand" />
        <input type="file" className="hidden" />
      </label>
    </div>
  );
}

export default async function DocumentsPage(
  props: PageProps<"/dashboard/inward/new-intake/[id]/documents">,
) {
  const { id } = await props.params;
  const base = `/dashboard/inward/new-intake/${id}`;

  return (
    <>
      <IntakeStepper active={2} />

      <div className="grid items-start gap-4 lg:grid-cols-3">
        {/* Left: uploads */}
        <section className="flex min-h-[480px] flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900">
            <FileText size={20} className="text-brand" />
            Documents
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {DOCUMENTS.map((d) => (
              <UploadBox key={d} label={d} />
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
            <button
              type="button"
              className="h-11 shrink-0 whitespace-nowrap rounded-md border border-gray-300 px-6 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Save as Draft
            </button>
            <div className="flex shrink-0 gap-3">
              <Link
                href={`${base}/quality-check`}
                className="flex h-11 shrink-0 items-center whitespace-nowrap rounded-md border border-gray-300 px-6 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Back
              </Link>
              <Link
                href="/dashboard/inward/new-intake"
                className="flex h-11 shrink-0 items-center whitespace-nowrap rounded-md bg-brand px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Generate
              </Link>
            </div>
          </div>
        </section>

        {/* Right: same summary panels */}
        <IntakeSidePanels />
      </div>
    </>
  );
}
