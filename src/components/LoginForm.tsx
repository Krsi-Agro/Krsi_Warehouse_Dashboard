"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function LoginForm({ notice }: { notice?: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error } = useAppSelector((s) => s.auth);
  const [showPassword, setShowPassword] = useState(false);

  const pending = status === "loading";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = await dispatch(
      login({
        userId: String(form.get("userId") ?? ""),
        password: String(form.get("password") ?? ""),
        remember: form.get("remember") === "on",
      }),
    );
    if (login.fulfilled.match(result)) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
      <p className="mt-1 text-sm text-gray-500">
        Sign in to continue to your account
      </p>

      {notice ? (
        <p className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
          {notice}
        </p>
      ) : null}

      <h2 className="mt-6 text-base font-semibold text-gray-900">Sign In</h2>

      <form onSubmit={handleSubmit} className="mt-3 space-y-4">
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          >
            User ID
          </label>
          <input
            id="userId"
            name="userId"
            type="text"
            autoComplete="username"
            placeholder="Enter User ID"
            className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="h-11 w-full rounded-md border border-gray-300 px-3 pr-16 text-sm text-gray-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 px-3 text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
            />
            Remember me
          </label>
          <div className="flex items-center gap-2 text-indigo-700">
            <Link href="/get-user-id" className="hover:underline">
              Get User ID
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-md bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        Or
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <p className="text-center text-sm text-gray-500">
        Sign Up to access WDRA account.
      </p>

      <Link
        href="/register"
        className="mt-3 flex h-11 w-full items-center justify-center rounded-md border border-gray-300 text-sm font-semibold text-indigo-700 transition-colors hover:bg-gray-50"
      >
        Apply for Registration
      </Link>
    </div>
  );
}
