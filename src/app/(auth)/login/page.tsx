import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import LoginForm from "@/components/LoginForm";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Sign In | WDRA Portal",
};

export default async function LoginPage(props: PageProps<"/login">) {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }
  const { registered } = await props.searchParams;

  return (
    <AuthShell
      leftTitle="Welcome Back!"
      topRight={
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-500 sm:inline">
            Do not have an account?
          </span>
          <Link
            href="/register"
            className="rounded-md border border-brand px-4 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Sign Up
          </Link>
        </div>
      }
    >
      <LoginForm
        notice={
          registered
            ? "Your registration was submitted. You can sign in once your account is approved."
            : undefined
        }
      />
    </AuthShell>
  );
}
