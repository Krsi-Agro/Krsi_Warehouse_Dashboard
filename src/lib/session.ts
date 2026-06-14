import { cookies } from "next/headers";

export const SESSION_COOKIE = "krsi_session";

export type SessionUser = {
  id: string;
  name: string;
  phone: string;
  role: string;
};

export type Session = {
  token: string;
  user: SessionUser;
};

/**
 * Persist the authenticated session in an HTTP-only cookie. Holds the backend
 * access token (used for server-side API calls) plus the user's display info.
 *
 * Note: in Next.js 16 `cookies()` is async and must be awaited.
 */
export async function createSession(session: Session): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour — matches the access-token lifetime
  });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
