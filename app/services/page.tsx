import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, TreePine } from "lucide-react";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, COMPANY, LINKS, PRICING } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Christmas & Holiday Lighting Services",
  description: "Compare residential Christmas light installation, professional tree wrapping, commercial holiday lighting, permanent roofline lighting, and seasonal service across northern Utah and the Wasatch Back.",
  alternates: { canonical: "/services" },
};

const services = [
  { title: "Christmas Light Installation", description: `Full seasonal service starts at $${PRICING.service.startsAt} for qualifying scopes. We provide the lights; one custom price covers installation, maintenance, takedown, and storage.`, href: LINKS.christmasLightInstallation, image: ASSETS.professionalPhotos.rooflineInstall },
  { title: "Residential Christmas Lights", description: "Professional roofline, peak, porch, tree, and bush lighting designed around the architecture of your home.", href: LINKS.residentialLighting, image: ASSETS.professionalPhotos.closeInstall },
  { title: "Tree Lighting & Wrapping", description: "Twinkling mini LED tree wraps in any color, installed by a trained team that handles everything from spiral wraps to detailed branch wraps.", href: LINKS.treeLighting, image: null },
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
        description={`Choose a seasonal residential display, a tree-only wrap, a coordinated commercial installation, or permanent roofline lighting. Chestnut & Cheer serves ${COMPANY.serviceAreaSummary}.`}
        image={ASSETS.professionalPhotos.bundlingLights}
        imageAlt="Chestnut & Cheer technician preparing commercial-grade Christmas lights for installation"
      />
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.href} className="overflow-hidden rounded-2xl border border-chestnut/10 bg-white">
                {service.image ? (
                  <div className="relative aspect-[16/9]">
                    <Image src={service.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-chestnut" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(234,186,92,0.28),transparent_45%)]" />
                    <TreePine className="relative h-24 w-24 text-accent-gold" strokeWidth={1.25} />
                    <Sparkles className="absolute right-[32%] top-[22%] h-7 w-7 text-warm-white" />
                    <Sparkles className="absolute bottom-[24%] left-[31%] h-5 w-5 text-primary-red" />
                  </div>
                )}
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
