import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { ProfessionalPhotoGallery } from "@/components/sections/ProfessionalPhotoGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { getServicePageSchemas } from "@/lib/structured-data";

const path = "/christmas-light-installation/residential";
const title = "Residential Christmas Light Installation in Utah";
const description = "Professional residential Christmas light installation in Utah County and Salt Lake County with custom-fit lights, maintenance, takedown, and storage.";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function ResidentialChristmasLightsPage() {
  return (
    <>
      <JsonLd data={getServicePageSchemas({ path, name: title, description, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: LINKS.services }, { name: "Christmas Light Installation", path: LINKS.christmasLightInstallation }, { name: "Residential", path }] })} />
      <ServicePage
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: LINKS.services }, { label: "Christmas Light Installation", href: LINKS.christmasLightInstallation }, { label: "Residential" }]}
        eyebrow="Custom-fit for your home"
        title={title}
        description={`Skip the ladder, tangled strands, and January storage bins. ${COMPANY.name} designs, installs, maintains, removes, and stores professional seasonal lighting for homes across Utah County and Salt Lake County.`}
        heroImage={ASSETS.professionalPhotos.technicianHero}
        heroImageAlt="Licensed Chestnut & Cheer technician installing residential Christmas lights in Utah"
        highlights={["Custom-cut commercial-grade roofline lights", "Peaks, garages, porches, trees, and bushes", "Warm white, color, and coordinated designs", "Compatible clips selected for the roof edge", "In-season maintenance and normal bulb replacement", "Takedown and labeled off-season storage"]}
        sections={[
          { heading: "Designed for the architecture", body: "A useful design starts with the lines people actually see from the street. We measure the eaves and peaks, identify one or two focal points, review color and spacing, and price optional garages, porches, columns, trees, or bushes separately. That keeps the scope understandable and lets homeowners prioritize impact." },
          { heading: "Professional materials and preparation", body: "We provide the commercial-grade strands, bulbs, timer, and compatible clips used in the approved plan. Strands are prepared for the measured runs so spacing remains consistent and extra wire does not bunch at the end of a roofline. We do not install customer-owned lights because mixed products make reliability and service difficult to control." },
          { heading: "Installation and in-season service", body: "Before installation, we confirm access, roof conditions, landscaping, power, and any HOA restrictions the homeowner provides. The crew installs and tests the display, and customers can contact us if a normal bulb failure affects the system we installed. Weather may affect service timing, but maintenance is part of the seasonal program." },
          { heading: "Takedown and storage", body: "Temporary displays are removed in January or early February as route and weather conditions allow. We organize and store the lighting for the next season, which is why returning-customer installation pricing can be lower than the first year. The next season begins with the established design, plus any changes requested during quoting." },
          { heading: "When to reserve", body: "Earlier reservations provide more installation-date flexibility, especially for tall, complex, or foothill properties. Homeowners do not need to wait until November to finalize a design. Quotes can begin remotely with property details and photos, followed by a video or in-person review when needed." },
        ]}
        relatedLinks={[{ label: "All Christmas light installation services", href: LINKS.christmasLightInstallation }, { label: "Commercial Christmas lighting", href: LINKS.commercialLighting }, { label: "Permanent lighting", href: LINKS.permanentLighting }, { label: "Pricing and inclusions", href: LINKS.pricing }, { label: "Service areas", href: LINKS.serviceAreas }, { label: "Project gallery", href: LINKS.projects }]}
      />
      <ProfessionalPhotoGallery eyebrow="Professional installation process" title="From strand preparation to a tested roofline" description="These Utah project and crew photos show the equipment, preparation, attachment, and roofline work behind a full-service installation." photos={[
        { src: ASSETS.professionalPhotos.bundlingLights, alt: "Technician organizing commercial-grade Christmas light strands" },
        { src: ASSETS.professionalPhotos.rooflineClip, alt: "Close view of a Christmas light clip secured beneath a roof edge" },
        { src: ASSETS.professionalPhotos.closeInstall, alt: "Professional installer fastening Christmas lights along a residential roofline" },
        { src: ASSETS.professionalPhotos.roofInstall, alt: "Christmas light technician working on a two-story Utah home" },
      ]} />
    </>
  );
}
