"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";

export type SignInState = {
  error?: string;
};

/**
 * Sign-in Server Action wired to the login <form>.
 *
 * This is a placeholder credential check — swap the validation block for a
 * real call to the WDRA auth backend and keep the session/redirect handling.
 */
export async function signIn(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const userId = String(formData.get("userId") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!userId || !password) {
    return { error: "Please enter both your User ID and password." };
  }

  // TODO: replace with a real authentication request.
  const isValid = password.length >= 4;
  if (!isValid) {
    return { error: "Invalid User ID or password." };
  }

  await createSession(userId);
  redirect("/dashboard");
}

export async function signOut(): Promise<void> {
  await deleteSession();
  redirect("/login");
}

export type RegisterState = {
  error?: string;
};

/**
 * Registration Server Action shared by both the Individual and Entity forms.
 *
 * Validates the fields common to every entity type, then hands off to the
 * WDRA backend. Replace the TODO with the real onboarding request.
 */
export async function register(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const entityType = String(formData.get("entityType") ?? "");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!entityType) {
    return { error: "Please select your entity type." };
  }
  if (!email) {
    return { error: "Communication email is required." };
  }
  if (password.length < 4) {
    return { error: "Password must be at least 4 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  // TODO: submit the application to the WDRA onboarding backend.
  redirect("/login?registered=1");
}
