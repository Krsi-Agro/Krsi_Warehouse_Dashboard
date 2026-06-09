import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Apply for Registration | WDRA Portal",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Apply for Registration"
      description="Register to access the WDRA portal and manage your account securely."
    >
      <p className="text-sm text-gray-600">
        The registration form will go here.
      </p>
    </AuthCard>
  );
}
