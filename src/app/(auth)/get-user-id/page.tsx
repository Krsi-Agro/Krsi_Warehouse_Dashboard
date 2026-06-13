import type { Metadata } from "next";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Get User ID | WDRA Portal",
};

export default function GetUserIdPage() {
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
        title="Get User ID"
        description="Recover the User ID linked to your registered account."
      >
        <p className="text-sm text-gray-600">
          The User ID recovery form will go here.
        </p>
      </AuthCard>
    </AuthShell>
  );
}
