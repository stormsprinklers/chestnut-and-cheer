import type { Metadata } from "next";
import { PpcLandingPage } from "@/components/ppc/PpcLandingPage";

export const metadata: Metadata = { title: "Christmas Light Installation | Free Quote", description: "Professional Christmas light installation in Utah starting at $499.", robots: { index: false, follow: false } };

export default function ChristmasLightInstallationPpcPage() {
  return <PpcLandingPage service="temporary" />;
}
