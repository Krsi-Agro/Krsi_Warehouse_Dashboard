import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Forgot Password | WDRA Portal",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      leftTitle="Welcome Back!"
      topRight={
        <Link
          href="/login"
          className="rounded-md border border-brand px-4 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
        >
          Login
        </Link>
      }
    >
      <AuthCard
        title="Forgot Password?"
        description="Enter your registered details to reset your password."
      >
        <p className="text-sm text-gray-600">
          The password reset form will go here.
        </p>
      </AuthCard>
    </AuthShell>
  );
}
