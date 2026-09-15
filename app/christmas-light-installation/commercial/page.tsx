import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { getServicePageSchemas } from "@/lib/structured-data";

const path = "/christmas-light-installation/commercial";
const title = "Commercial Christmas Light Installation in Utah";
const description = "Commercial Christmas and holiday lighting for Utah businesses, HOAs, property managers, multifamily properties, and public-facing spaces.";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function CommercialChristmasLightsPage() {
  return (
    <>
      <JsonLd data={getServicePageSchemas({ path, name: title, description, breadcrumbs: [{ name: "Home", path: "/" }, { name: "Services", path: LINKS.services }, { name: "Christmas Light Installation", path: LINKS.christmasLightInstallation }, { name: "Commercial", path }] })} />
      <ServicePage
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: LINKS.services }, { label: "Christmas Light Installation", href: LINKS.christmasLightInstallation }, { label: "Commercial" }]}
        eyebrow="Businesses · HOAs · Property managers · Communities"
        title={title}
        description={`${COMPANY.name} plans and installs commercial holiday lighting across Utah County and Salt Lake County, with coordinated access, installation windows, in-season support, takedown, and storage.`}
        heroImage={ASSETS.professionalPhotos.serviceTruck}
        heroImageAlt="Chestnut & Cheer commercial Christmas lighting service truck and technician in Utah"
        highlights={["Retail and restaurant storefronts", "Offices and professional buildings", "HOAs and multifamily common areas", "Property managers and campuses", "Municipal and event displays", "Seasonal and permanent lighting options"]}
        sections={[
          { heading: "A plan for the property and the people using it", body: "Commercial installation begins with visibility, operating hours, pedestrian and vehicle access, power, approvals, and the installation window—not just linear footage. We identify the entrances, rooflines, trees, common areas, and photo moments that matter most, then define responsibilities and timing before work starts." },
          { heading: "Storefront and customer-facing displays", body: "Retail, restaurant, and office displays should be easy to recognize without obscuring signs, entrances, or customer routes. A focused roofline, entry, tree, or column plan can create a strong seasonal presence while remaining practical to install, service, and remove around normal operations." },
          { heading: "HOAs, multifamily, and property managers", body: "Common-area projects may require board or owner approval, access coordination, multiple buildings, tenant communication, and consistent color or spacing standards. We can quote the approved scope and document service contacts, installation sequencing, power assumptions, and takedown timing for the property team." },
          { heading: "Maintenance and schedule reliability", body: "The display is public-facing for weeks, so the service plan matters. We test each section at installation and provide a contact path for normal bulb failures on lighting we installed. Severe weather and unsafe access can affect response timing, and those limitations are discussed rather than hidden." },
          { heading: "Seasonal versus permanent commercial lighting", body: "Temporary lighting supports a classic Christmas-specific display with annual removal and storage. Permanent architectural systems remain discreetly mounted and can support additional holidays, events, or brand colors. Some properties combine permanent rooflines with temporary trees, wreaths, or landscape accents." },
          { heading: "Reserve commercial installation early", body: "Larger properties and approval-dependent projects benefit from earlier design and scheduling. Share the property type, decision makers, desired display dates, access constraints, and any brand or HOA standards during the first quote so the scope and timeline are realistic." },
        ]}
        relatedLinks={[{ label: "All Christmas light installation services", href: LINKS.christmasLightInstallation }, { label: "Residential Christmas lights", href: LINKS.residentialLighting }, { label: "Permanent commercial lighting", href: LINKS.permanentLighting }, { label: "Commercial pricing factors", href: LINKS.pricing }, { label: "Service areas", href: LINKS.serviceAreas }, { label: "Request a commercial quote", href: LINKS.estimate }]}
      />
    </>
  );
}
