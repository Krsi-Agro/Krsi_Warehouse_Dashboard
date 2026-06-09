"use client";

import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import { signOut } from "@/lib/actions";

export function UserMenu({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-gray-50"
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-500">
          <User size={18} />
        </span>
        <span className="text-sm font-medium text-gray-800">{name}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
