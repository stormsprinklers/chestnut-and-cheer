import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { getServicePageSchemas } from "@/lib/structured-data";

const path = "/christmas-light-installation";
const title = "Professional Christmas Light Installation in Utah";
const description = "Full-service Christmas light installation for homes and commercial properties across Utah County and Salt Lake County, including design, maintenance, takedown, and storage.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
};

export default function ChristmasLightInstallationPage() {
  return (
    <>
      <JsonLd data={getServicePageSchemas({ path, name: title, description, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: LINKS.services }, { name: "Christmas Light Installation", path }] })} />
      <ServicePage
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: LINKS.services }, { label: "Christmas Light Installation" }]}
        eyebrow="Design · Install · Maintain · Remove · Store"
        title={title}
        description={`${COMPANY.name} provides professional Christmas light installation from the first design conversation through January takedown. We serve residential, commercial, and community properties across Utah County and Salt Lake County.`}
        heroImage={ASSETS.professionalPhotos.carryingLadderHero}
        heroImageAlt="Chestnut & Cheer Christmas light technician carrying a ladder to an installation"
        highlights={["Commercial-grade custom-fit strands", "Residential and commercial properties", "Rooflines, peaks, trees, bushes, and entries", "In-season maintenance", "January and early-February takedown", "Off-season storage for seasonal displays"]}
        sections={[
          { heading: "A complete service, not just light hanging", body: "We measure the property, build a design around the most visible architectural lines, prepare the strands, install and test the display, respond to normal bulb failures, and return for takedown. Seasonal customers do not need to untangle, label, store, or replace a mismatched collection of consumer lights." },
          { heading: "Custom-fit residential displays", body: "Residential plans can include eaves, peaks, garages, porches, columns, trees, and bushes. We prioritize the features that create the strongest view from the street instead of lighting every edge by default. Story height, roof pitch, safe ladder access, power, and landscaping shape the final scope." },
          { heading: "Commercial and community lighting", body: "Storefronts, offices, HOAs, multifamily properties, campuses, and public-facing spaces need scheduling and maintenance plans as well as a design. We coordinate access, operating hours, approvals, power, pedestrian areas, installation windows, and takedown expectations before work begins." },
          { heading: "Temporary or permanent Christmas lights", body: "Seasonal lighting delivers the traditional custom-cut C9 look and can add trees or landscape accents, then comes down after the holidays. Permanent lighting stays discreetly mounted along the roofline and provides app-controlled colors for holidays and year-round use. We can help compare the visual goals and long-term cost of each." },
          { heading: "Built for a Utah winter", body: "Installation timing and access change quickly once snow and ice arrive, especially on foothill streets and steep roofs. Earlier reservations give the crew more flexibility. No outdoor display is storm-proof, but compatible clips, supported runs, careful power routing, and included service reduce avoidable problems." },
        ]}
        relatedLinks={[{ label: "Residential Christmas light installation", href: LINKS.residentialLighting }, { label: "Commercial Christmas light installation", href: LINKS.commercialLighting }, { label: "Permanent holiday lighting", href: LINKS.permanentLighting }, { label: "Christmas light pricing", href: LINKS.pricing }, { label: "Browse service areas", href: LINKS.serviceAreas }, { label: "View project gallery", href: LINKS.projects }]}
      />
    </>
  );
}
