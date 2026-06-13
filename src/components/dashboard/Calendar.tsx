"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Cell = { day: number; current: boolean };

export function Calendar({ className = "" }: { className?: string }) {
  const today = new Date();
  const [selected, setSelected] = useState(today);
  const [view, setView] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  function shiftMonth(delta: number) {
    setView((v) => {
      const m = v.month + delta;
      if (m < 0) return { month: 11, year: v.year - 1 };
      if (m > 11) return { month: 0, year: v.year + 1 };
      return { month: m, year: v.year };
    });
  }

  const firstWeekday = (new Date(view.year, view.month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const daysPrev = new Date(view.year, view.month, 0).getDate();

  const cells: Cell[] = [];
  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ day: daysPrev - firstWeekday + 1 + i, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  let trailing = 1;
  while (cells.length < 42) cells.push({ day: trailing++, current: false });

  const isSelected = (c: Cell) =>
    c.current &&
    selected.getFullYear() === view.year &&
    selected.getMonth() === view.month &&
    selected.getDate() === c.day;

  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-4 text-lg font-semibold text-gray-900">
          <span className="flex items-center gap-0.5">
            {MONTHS[view.month]}
            <ChevronDown size={14} className="text-blue-500" />
          </span>
          <span className="flex items-center gap-0.5">
            {view.year}
            <ChevronDown size={14} className="text-blue-500" />
          </span>
        </div>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-400">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1.5">
            {w}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-sm">
        {cells.map((c, i) => {
          const selectedCell = isSelected(c);
          return (
            <button
              key={i}
              type="button"
              disabled={!c.current}
              onClick={() => setSelected(new Date(view.year, view.month, c.day))}
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-md ${
                selectedCell
                  ? "bg-blue-600 font-semibold text-white"
                  : c.current
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-gray-300"
              }`}
            >
              {c.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
