"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Phone, Sparkles } from "lucide-react";
import { COMPANY, LINKS } from "@/lib/constants";

export function FloatingBookButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/visualize") || pathname?.startsWith("/estimate") || pathname?.startsWith("/book")) {
    return null;
  }

  return (
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 border-t border-chestnut/10 bg-white/95 px-3 pb-[calc(.5rem+env(safe-area-inset-bottom,0px))] pt-2 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a href={LINKS.tel} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-chestnut/15 text-sm font-semibold text-chestnut touch-manipulation" aria-label={`Call ${COMPANY.phone}`}>
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <a href={LINKS.sms} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-chestnut/15 text-sm font-semibold text-chestnut touch-manipulation" aria-label={`Text ${COMPANY.phone}`}>
          <MessageSquare className="h-4 w-4" aria-hidden /> Text
        </a>
        <Link href={LINKS.estimate} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary-red text-sm font-semibold text-warm-white touch-manipulation">
          <Sparkles className="h-4 w-4" aria-hidden /> Quote
        </Link>
      </div>
    </nav>
  );
}
