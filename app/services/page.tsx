import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, LINKS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Christmas & Holiday Lighting Services",
  description: "Compare residential Christmas light installation, commercial holiday lighting, permanent roofline lighting, and seasonal service across Utah County and Salt Lake County.",
  alternates: { canonical: "/services" },
};

const services = [
  { title: "Christmas Light Installation", description: "Start with our complete seasonal installation service, including custom design, commercial-grade lights, maintenance, takedown, and storage.", href: LINKS.christmasLightInstallation, image: ASSETS.professionalPhotos.rooflineInstall },
  { title: "Residential Christmas Lights", description: "Professional roofline, peak, porch, tree, and bush lighting designed around the architecture of your home.", href: LINKS.residentialLighting, image: ASSETS.professionalPhotos.closeInstall },
  { title: "Commercial Holiday Lighting", description: "Planned displays for storefronts, offices, HOAs, property managers, multifamily properties, and public-facing spaces.", href: LINKS.commercialLighting, image: ASSETS.photos.commercialTree },
  { title: "Permanent Holiday Lighting", description: "Discreet, app-controlled roofline lighting for Christmas, other holidays, game days, and year-round architectural accents.", href: LINKS.permanentLighting, image: ASSETS.photos.permanentLighting },
] as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <PageHero
        eyebrow="Professional design, installation, and service"
        title="Christmas and Holiday Lighting Services"
        description="Choose a seasonal residential display, a coordinated commercial installation, or permanent roofline lighting. Chestnut & Cheer serves Utah County and Salt Lake County from Lehi."
        image={ASSETS.professionalPhotos.bundlingLights}
        imageAlt="Chestnut & Cheer technician preparing commercial-grade Christmas lights for installation"
      />
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.href} className="overflow-hidden rounded-2xl border border-chestnut/10 bg-white">
                <div className="relative aspect-[16/9]">
                  <Image src={service.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl font-bold text-chestnut">{service.title}</h2>
                  <p className="mt-3 leading-relaxed text-chestnut/70">{service.description}</p>
                  <Link href={service.href} className="mt-5 inline-block font-semibold text-primary-red hover:underline">Explore {service.title.toLowerCase()}</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-accent-gold/40 bg-accent-gold/10 p-6 text-center">
            <h2 className="font-display text-2xl font-bold text-chestnut">Not sure which service fits?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-chestnut/70">Compare seasonal and permanent options during a free quote, or browse our pricing and service-area pages first.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <Link href={LINKS.pricing} className="font-semibold text-primary-red hover:underline">Christmas light installation pricing</Link>
              <Link href={LINKS.serviceAreas} className="font-semibold text-primary-red hover:underline">Utah service areas</Link>
              <Link href={LINKS.projects} className="font-semibold text-primary-red hover:underline">Project gallery</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
