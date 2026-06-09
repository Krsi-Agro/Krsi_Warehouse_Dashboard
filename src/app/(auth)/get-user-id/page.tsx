import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Get User ID | WDRA Portal",
};

export default function GetUserIdPage() {
  return (
    <AuthCard
      title="Get User ID"
      description="Recover the User ID linked to your registered account."
    >
      <p className="text-sm text-gray-600">
        The User ID recovery form will go here.
      </p>
    </AuthCard>
  );
}
