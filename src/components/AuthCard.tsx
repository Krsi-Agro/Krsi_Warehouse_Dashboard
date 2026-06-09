import Link from "next/link";

export default function AuthCard({
  title,
  description,
  children,
  backHref = "/login",
  backLabel = "Back to Sign In",
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {description ? (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      ) : null}
      <div className="mt-5">{children}</div>
      <Link
        href={backHref}
        className="mt-6 inline-block text-sm font-medium text-indigo-700 hover:underline"
      >
        ← {backLabel}
      </Link>
    </div>
  );
}
