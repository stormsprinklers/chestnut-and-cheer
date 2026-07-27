import type { Metadata } from "next";
import { EstimateWizard } from "@/components/estimate/EstimateWizard";
import { COMPANY, ASSETS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Instant Estimate",
  description:
    "Get a free Christmas lighting design and quote in a few minutes. Upload photos of your Utah home or business — no obligation.",
  alternates: { canonical: "/estimate" },
  openGraph: {
    title: `Get Instant Estimate | ${COMPANY.name}`,
    description:
      "Tell us about your property and get a free Christmas lighting design & quote.",
    url: `${SITE_URL}/estimate`,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1200,
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
