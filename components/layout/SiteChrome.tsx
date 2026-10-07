"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookButton } from "@/components/layout/FloatingBookButton";

export function SiteHeaderChrome() {
  const pathname = usePathname();
  return pathname?.startsWith("/ppc/") || pathname?.startsWith("/meta/") ? null : <Header />;
}

export function SiteFooterChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/ppc/") || pathname?.startsWith("/meta/")) return null;
  return <><Footer /><FloatingBookButton /></>;
}
