import type { Metadata } from "next";
import { PpcLandingPage } from "@/components/ppc/PpcLandingPage";

export const metadata: Metadata = { title: "Permanent Christmas Light Installation | Free Quote", description: "Professional permanent Christmas light installation in Utah starting at $2,999.", robots: { index: false, follow: false } };

export default function PermanentChristmasLightInstallationPpcPage() {
  return <PpcLandingPage service="permanent" />;
}
