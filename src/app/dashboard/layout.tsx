import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex overflow-hidden rounded-2xl bg-white shadow-sm">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar userName={session.userId || "Suraj Singh"} />

          <div className="min-h-[640px] space-y-5 bg-gray-50/60 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
