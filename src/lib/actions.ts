"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiLogin, postBookingDecision } from "./api";
import { createSession, deleteSession, getSession } from "./session";

export type LoginResult =
  | { ok: true; userId: string; name: string; role: string }
  | { ok: false; error: string };

/**
 * Login Server Action invoked from the Redux `login` thunk.
 *
 * Authenticates against the WDRA backend, stores the access token + user in the
 * HTTP-only session cookie (so the proxy guard and server-side API calls work),
 * and returns a serializable result. The client handles navigation by role.
 */
export async function loginRequest(credentials: {
  userId: string;
  password: string;
}): Promise<LoginResult> {
  const phoneNumber = credentials.userId.trim();
  const password = credentials.password;

  if (!phoneNumber || !password) {
    return { ok: false, error: "Please enter both your User ID and password." };
  }

  try {
    const data = await apiLogin(phoneNumber, password);
    await createSession({
      token: data.session.access_token,
      user: {
        id: data.user.id,
        name: data.user.full_name,
        phone: data.user.phone,
        role: data.user.role,
      },
    });
    return {
      ok: true,
      userId: data.user.id,
      name: data.user.full_name,
      role: data.user.role,
    };
  } catch (err) {
    const error =
      err instanceof Error
        ? err.message
        : "Login failed. Please try again.";
    return { ok: false, error };
  }
}

export async function signOut(): Promise<void> {
  await deleteSession();
  redirect("/login");
}

/**
 * Accept or reject a booking request, then refresh the booking list.
 * Used as a bound form action: `decideBooking.bind(null, id, "accepted")`.
 */
export async function decideBooking(
  bookingId: string,
  decision: "accepted" | "rejected",
): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  await postBookingDecision(session.token, bookingId, decision);
  // Approving moves a request from Booking into New Intake — refresh both.
  revalidatePath("/dashboard/inward/booking");
  revalidatePath("/dashboard/inward/new-intake");
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
