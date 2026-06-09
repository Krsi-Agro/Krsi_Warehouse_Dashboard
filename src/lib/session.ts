import { cookies } from "next/headers";

export const SESSION_COOKIE = "krsi_session";

export type Session = {
  userId: string;
};

/**
 * Create a session cookie. In a real app this would store a signed token
 * issued by the auth backend; here we keep the userId for demo purposes.
 *
 * Note: in Next.js 16 `cookies()` is async and must be awaited.
 */
export async function createSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(SESSION_COOKIE)?.value;
  return userId ? { userId } : null;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
