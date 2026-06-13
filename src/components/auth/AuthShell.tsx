import { Clock, ShieldCheck, UserRound } from "lucide-react";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { images } from "@/utils/images";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure Access",
    desc: "Your data is protected with enterprise grade security",
  },
  {
    icon: UserRound,
    title: "Easy Management",
    desc: "Manage your profile, applications and warehouse operations",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Access your account anytime anywhere",
  },
];

export function AuthShell({
  leftTitle,
  topRight,
  children,
}: {
  leftTitle: string;
  topRight: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-3">
        <Logo />
        {topRight}
      </header>

      <main className="relative flex flex-1 items-center">
        <Image
          src={images.loginBackground}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-white/40" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-2">
          <div className="hidden lg:block">
            <h2 className="text-3xl font-bold text-brand">{leftTitle}</h2>
            <div className="mt-2 h-1 w-12 rounded bg-brand/70" />
            <p className="mt-4 max-w-sm text-sm text-gray-600">
              Sign in to access your Warehouse Management System portal and
              manage your account securely.
            </p>

            <ul className="mt-9 space-y-6">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <f.icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {f.title}
                    </p>
                    <p className="max-w-xs text-xs text-gray-500">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">{children}</div>
        </div>
      </main>

      <footer className="flex flex-col items-center justify-between gap-1 border-t border-gray-100 px-6 py-3 text-[11px] text-gray-400 sm:flex-row">
        <span>All data is encrypted and protected</span>
        <span>© 2024 WDRA. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <a href="#" className="hover:text-gray-600">
            Privacy Policy
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-gray-600">
            Terms Of Use
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-gray-600">
            Contact Us
          </a>
        </span>
      </footer>
    </div>
  );
}
