"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingBookButton } from "@/components/layout/FloatingBookButton";

export function SiteHeaderChrome() {
  const pathname = usePathname();
  return pathname?.startsWith("/ppc/") ? null : <Header />;
}

export function SiteFooterChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/ppc/")) return null;
  return <><Footer /><FloatingBookButton /></>;
}
