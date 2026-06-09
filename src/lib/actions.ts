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
