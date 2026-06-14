const STEPS = ["Deposit Details", "Quality Check", "Documents", "Summary"];

export function IntakeStepper({ active }: { active: number }) {
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
