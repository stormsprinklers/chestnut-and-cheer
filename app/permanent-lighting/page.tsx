import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Permanent Holiday Lighting",
  description:
    "Permanent Christmas and year-round LED lighting for Utah homes. Locally sourced product, 5-year warranty, professional install across Utah County & Salt Lake County.",
  alternates: { canonical: "/permanent-lighting" },
};

export default function PermanentLightingPage() {
  return (
    <ServicePage
      eyebrow="Year-round brilliance"
      title="Permanent Holiday Lighting"
      description={`Install once, enjoy every season. ${COMPANY.name} installs premium permanent LED lighting with a 5-year warranty — perfect for Christmas, holidays, and everyday curb appeal.`}
      highlights={[
        "Locally sourced Utah product",
        "5-year warranty",
        "App-controlled color & schedules",
        "Professional roofline install",
        "Year-round lighting modes",
        `Licensed & insured · ${COMPANY.license}`,
      ]}
      sections={[
        {
          heading: "Installed once. Loved every night.",
          body: "Permanent lighting is mounted discreetly along your roofline and programmed for warm holiday whites, festive colors, or subtle accent lighting the rest of the year. No annual install or takedown required.",
        },
        {
          heading: "Built for Utah weather",
          body: "We use a durable, higher-end system designed for rooftop exposure through snow, sun, and wind. Our team handles design, install, and walkthrough so you know exactly how to control your display.",
        },
        {
          heading: "Who it’s best for",
          body: "Homeowners who want a clean architectural outline, easy phone control, and multi-year value. If you also want trees and bushes lit each December, ask us about combining permanent rooflines with seasonal accents.",
        },
      ]}
    />
  );
}
