import { ChevronDown } from "lucide-react";
import { Icon } from "./Icon";
import { sidebarNav } from "@/lib/dashboard-data";

export function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-brand text-white">
      <div className="px-5 py-5">
        <h2 className="text-sm font-semibold tracking-wide text-white/90">
          Warehouse Management
        </h2>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
        {sidebarNav.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              item.active
                ? "bg-white/15 font-medium text-white"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <Icon name={item.icon} size={18} className="shrink-0" />
            <span className="flex-1 truncate">{item.label}</span>
            {!item.active ? (
              <ChevronDown size={14} className="shrink-0 text-white/50" />
            ) : null}
          </a>
        ))}
      </nav>
    </aside>
  );
}
