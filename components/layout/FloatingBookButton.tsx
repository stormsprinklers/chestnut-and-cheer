"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { LINKS } from "@/lib/constants";

export function FloatingBookButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/visualize") || pathname?.startsWith("/estimate") || pathname?.startsWith("/book")) {
    return null;
  }

  return (
    <Link
      href={LINKS.estimate}
      className="fixed right-4 z-40 flex min-h-11 items-center gap-2 rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-warm-white shadow-lg transition-transform active:scale-95 hover:bg-primary-red/90 lg:hidden touch-manipulation max-md:bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]"
    >
      <Sparkles className="h-4 w-4" />
      Get Instant Estimate
    </Link>
  );
}
