import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { signOut } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Dashboard | WDRA Portal",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 p-8">
      <header className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Signed in as{" "}
            <span className="font-medium text-gray-700">{session.userId}</span>
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="h-10 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sign out
          </button>
        </form>
      </header>

      <p className="text-gray-600">Welcome to the WDRA portal.</p>
    </div>
  );
}
