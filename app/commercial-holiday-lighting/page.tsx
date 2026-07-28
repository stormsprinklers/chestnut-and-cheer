import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Commercial Holiday Lighting",
  description:
    "Commercial Christmas light installation for businesses, HOAs, property managers, and municipal displays across Utah County and Salt Lake County.",
  alternates: { canonical: "/commercial-holiday-lighting" },
};

export default function CommercialHolidayLightingPage() {
  return (
    <ServicePage
      eyebrow="Businesses · HOAs · Cities"
      title="Commercial Holiday Lighting"
      description={`Storefronts, HOA common areas, and municipal displays — ${COMPANY.name} designs and installs commercial holiday lighting that draws customers and celebrates the season.`}
      highlights={[
        "Retail & restaurant storefronts",
        "HOAs and multi-family properties",
        "Property managers & campuses",
        "City and event displays",
        "Coordinated design & install windows",
        "Early-season commercial booking",
      ]}
      sections={[
        {
          heading: "Bigger properties. Bigger impact.",
          body: "Commercial clients often book earlier and need reliable crews who can scale. We plan coverage, timelines, and maintenance so your property looks polished from kickoff through takedown.",
        },
        {
          heading: "Seasonal or permanent options",
          body: "Choose temporary Christmas lighting with storage, permanent architectural LEDs for year-round branding, or a mix. We’ll recommend what fits your property, budget, and brand standards.",
        },
        {
          heading: "Request a commercial quote",
          body: `Tell us about your property and timeline. Serving ${COMPANY.serviceAreas.join(" and ")}. Licensed & insured — ${COMPANY.license}.`,
        },
      ]}
    />
  );
}
