"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";
import { sidebarNav } from "@/lib/dashboard-data";

export function Sidebar() {
  const pathname = usePathname();
  const childActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const [open, setOpen] = useState<string | null>(
    sidebarNav.find((i) => i.children?.some((c) => childActive(c.href)))
      ?.label ?? null,
  );

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-brand text-white">
      <div className="px-5 py-5">
        <h2 className="text-sm font-semibold tracking-wide text-white/90">
          Warehouse Management
        </h2>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
        {sidebarNav.map((item) => {
          if (item.children) {
            const isOpen = open === item.label;
            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.label)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
                >
                  <Icon name={item.icon} size={18} className="shrink-0" />
                  <span className="flex-1 truncate text-left">
                    {item.label}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-white/50 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen ? (
                  <div className="ml-9 mt-0.5 space-y-0.5">
                    {item.children.map((c) => {
                      const active = childActive(c.href);
                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                            active
                              ? "bg-white/15 font-medium text-white"
                              : "text-white/70 hover:bg-white/10"
                          }`}
                        >
                          <span className="flex-1 truncate">{c.label}</span>
                          <ChevronRight
                            size={12}
                            className="shrink-0 text-white/40"
                          />
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          }

          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-white/15 font-medium text-white"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Icon name={item.icon} size={18} className="shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {!active && !item.href ? (
                <ChevronDown size={14} className="shrink-0 text-white/50" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
