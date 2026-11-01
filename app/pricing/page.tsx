import type { Metadata } from "next";
import { PricingPage } from "@/components/sections/PricingPage";
import { COMPANY, ASSETS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Christmas Light Installation Cost & Pricing in Utah",
  description:
    "One custom service price covers company-provided lights, installation, maintenance, takedown, and storage. Seasonal service starts at $299 for qualifying scopes.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `Christmas Light Pricing | ${COMPANY.name}`,
    description:
      "One custom upfront price for the complete seasonal lighting service, with company-provided materials and no ownership tiers.",
    url: `${SITE_URL}/pricing`,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1067,
        alt: "Chestnut & Cheer Christmas light technician carrying a ladder in Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Christmas Light Pricing | ${COMPANY.name}`,
    description:
      "Company-provided lights, installation, maintenance, takedown, and storage in one custom service quote.",
    images: [absoluteUrl(ASSETS.photos.hero)],
  },
};

export default function Pricing() {
  return <><JsonLd data={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} /><PricingPage /></>;
}
