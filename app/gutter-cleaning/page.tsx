import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gutter Cleaning",
  description:
    "Professional gutter cleaning in Utah County & Salt Lake County. Bundle with Christmas light installation while our crew is already on your roof.",
  alternates: { canonical: "/gutter-cleaning" },
};

export default function GutterCleaningPage() {
  return (
    <ServicePage
      eyebrow="Smart add-on"
      title="Gutter Cleaning"
      description={`Clear gutters before winter while we’re already on the roof for your holiday lights. ${COMPANY.name} offers gutter cleaning as a convenient add-on across Utah County and Salt Lake County.`}
      highlights={[
        "Clears leaves, debris & buildup",
        "Helps prevent ice dams & overflow",
        "Pairs perfectly with light installs",
        "One rooftop visit, two jobs done",
        "Residential-friendly scheduling",
        `Licensed & insured · ${COMPANY.license}`,
      ]}
      sections={[
        {
          heading: "Already on the roof? Finish the job.",
          body: "Holiday light installation puts our crew in the perfect position to clean gutters and downspouts. Bundling saves you a second appointment and helps your home handle Utah snowmelt more safely.",
        },
        {
          heading: "Stand-alone gutter service",
          body: "Need gutters cleaned without lighting? Ask us about availability. We’ll confirm access, roof type, and pricing before we climb.",
        },
        {
          heading: "Add it to your estimate",
          body: "When you request a Christmas lighting quote, mention gutter cleaning and we’ll include it in your proposal.",
        },
      ]}
    />
  );
}
