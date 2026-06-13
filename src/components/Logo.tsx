import { Warehouse } from "lucide-react";

/**
 * Brand wordmark. Text placeholder for now — drop in the real logo asset later
 * by replacing the icon span (and/or wrapping in next/image).
 */
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand/10 text-brand">
        <Warehouse size={20} strokeWidth={1.75} />
      </span>
      <div className="leading-none">
        <p className="text-xl font-bold text-brand">Agrion</p>
        <p className="mt-0.5 text-[8px] font-medium tracking-[0.22em] text-gray-400">
          WAREHOUSE MANAGEMENT
        </p>
      </div>
    </div>
  );
}
