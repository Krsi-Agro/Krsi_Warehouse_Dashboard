import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Apply for Registration | WDRA Portal",
};

export default function RegisterPage() {
  return (
    <AuthShell
      leftTitle="Welcome"
      topRight={
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-500 sm:inline">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="rounded-md border border-brand px-4 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Login
          </Link>
        </div>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
