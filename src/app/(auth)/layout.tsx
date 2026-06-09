import Image from "next/image";
import { images } from "@/utils/images";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <Image
        src={images.loginBackground}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative z-10 flex w-full items-center justify-center">
        {children}
      </main>
    </div>
  );
}
