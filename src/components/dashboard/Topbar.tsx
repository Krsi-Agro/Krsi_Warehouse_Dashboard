import { Search } from "lucide-react";
import { UserMenu } from "./UserMenu";

export function Topbar({ userName }: { userName: string }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-gray-900">Warehouse Dashboard</h1>
        <p className="text-sm text-gray-500">
          Real time overview of warehouse operations and key metrics
        </p>
      </div>

      <div className="relative hidden flex-1 justify-center md:flex">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            placeholder="Search receipts, lot, farmer, commodity..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      <UserMenu name={userName} />
    </header>
  );
}
