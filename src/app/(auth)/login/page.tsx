import type { Metadata } from "next";
import { redirect } from "next/navigation";
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
    <LoginForm
      notice={
        registered
          ? "Your registration was submitted. You can sign in once your account is approved."
          : undefined
      }
    />
  );
}
