import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Apply for Registration | WDRA Portal",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="flex items-center justify-end gap-3 border-b border-gray-200 bg-white px-6 py-3">
        <span className="text-sm text-gray-500">Already have an account?</span>
        <Link
          href="/login"
          className="rounded-md border border-brand px-4 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
        >
          Login
        </Link>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-10">
        <RegisterForm />
      </main>
    </div>
  );
}
