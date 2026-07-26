import type { Metadata } from "next";
import { PricingPage } from "@/components/sections/PricingPage";
import { COMPANY, ASSETS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Christmas Light Pricing",
  description:
    "Year 1 Parts + Installation starts at $699. Year 2+ Installation Only starts at $299. Custom quotes based on your property — lights, install, maintenance, takedown & storage included.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `Christmas Light Pricing | ${COMPANY.name}`,
    description:
      "Understand Year 1 vs Year 2+ pricing. Parts + Installation from $699. Installation only from $299. Every job custom-quoted.",
    url: `${SITE_URL}/pricing`,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1200,
        alt: "Home with professional Christmas light installation in Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Christmas Light Pricing | ${COMPANY.name}`,
    description:
      "Year 1 from $699 (parts + install). Year 2+ from $299 (install only). Free custom quotes.",
    images: [absoluteUrl(ASSETS.photos.hero)],
  },
};

export default function Pricing() {
  return <PricingPage />;
}
