import Image from "next/image";
import { images } from "@/utils/images";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Image
      src={images.logo}
      alt="Agrion — Warehouse Management"
      priority
      className={className}
    />
  );
}
