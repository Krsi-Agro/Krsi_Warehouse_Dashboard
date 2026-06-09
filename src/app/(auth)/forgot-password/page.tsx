import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Forgot Password | WDRA Portal",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot Password?"
      description="Enter your registered details to reset your password."
    >
      <p className="text-sm text-gray-600">
        The password reset form will go here.
      </p>
    </AuthCard>
  );
}
