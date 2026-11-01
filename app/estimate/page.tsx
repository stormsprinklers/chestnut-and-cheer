import type { Metadata } from "next";
import { EstimateWizard } from "@/components/estimate/EstimateWizard";
import { COMPANY, ASSETS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Instant Estimate",
  description:
    "Get a Christmas lighting estimate in about 60 seconds using your home size, roofline coverage, color preference, and tree size — no photos required.",
  alternates: { canonical: "/estimate" },
  robots: { index: false, follow: true },
  openGraph: {
    title: `Get Instant Estimate | ${COMPANY.name}`,
    description:
      "Choose your home size, roofline coverage, colors, and tree size to see a realistic Christmas lighting range.",
    url: `${SITE_URL}/estimate`,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1067,
        alt: "Home with professional Christmas light installation",
      },
    ],
  },
};

export default function EstimatePage() {
  return (
    <div className="bg-cream">
      <EstimateWizard />
    </div>
  );
}
