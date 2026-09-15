import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { getServicePageSchemas } from "@/lib/structured-data";

const path = "/permanent-lighting";
const title = "Permanent Christmas Lights in Utah";
const description = "Professional permanent Christmas and year-round roofline lighting for Utah homes and businesses, with app-controlled colors and a 5-year warranty.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
};

export default function PermanentLightingPage() {
  return (
    <>
    <JsonLd data={getServicePageSchemas({ path, name: title, description, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: LINKS.services }, { name: "Permanent Lighting", path }] })} />
    <ServicePage
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: LINKS.services }, { label: "Permanent Lighting" }]}
      eyebrow="Year-round brilliance"
      title={title}
      description={`Install once, enjoy every season. ${COMPANY.name} installs premium permanent LED lighting with a 5-year warranty — perfect for Christmas, holidays, and everyday curb appeal.`}
      heroImage={ASSETS.photos.permanentLighting}
      heroImageAlt="Permanent app-controlled roofline lighting installed on a Utah home"
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
        {
          heading: "Controls, colors, and everyday use",
          body: "The system can be programmed for warm architectural accents, Christmas colors, other holidays, game days, and events. During the walkthrough, we demonstrate the app, schedules, brightness, and saved scenes so the homeowner can operate the lighting without a seasonal service call.",
        },
        {
          heading: "Design and installation considerations",
          body: "A quote accounts for measured roofline coverage, story height, power, controller placement, track color, roof-edge transitions, and safe access. We discuss where the system will be visible during daylight and how corners, peaks, garages, and additions affect the final layout.",
        },
        {
          heading: "Warranty and service expectations",
          body: "Permanent lighting includes a 5-year warranty. Your proposal should identify the covered product and workmanship terms, control components, exclusions, and how to request support. Ask for those details before approving the installation so expectations are clear.",
        },
      ]}
      relatedLinks={[{ label: "Compare seasonal Christmas lights", href: LINKS.residentialLighting }, { label: "Commercial Christmas lighting", href: LINKS.commercialLighting }, { label: "Pricing", href: LINKS.pricing }, { label: "Service areas", href: LINKS.serviceAreas }, { label: "Project gallery", href: LINKS.projects }]}
    />
    </>
  );
}
