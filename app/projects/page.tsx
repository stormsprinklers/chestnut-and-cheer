import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { ProfessionalPhotoGallery } from "@/components/sections/ProfessionalPhotoGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, LINKS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Christmas Light Installation Project Gallery",
  description: "See Chestnut & Cheer technicians, commercial-grade lighting preparation, roofline attachment, and professional Christmas light installations in Utah.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
      <PageHero eyebrow="Real crew and installation work" title="Christmas Light Installation Project Gallery" description="See how Chestnut & Cheer prepares commercial-grade strands, handles ladders and access, secures roofline lighting, and tests professional displays across our Utah service area." image={ASSETS.professionalPhotos.travenHero} imageAlt="Chestnut & Cheer lighting technician at a Utah Christmas light installation" />
      <ProfessionalPhotoGallery eyebrow="Installation details" title="The work behind a clean holiday display" description="These are Chestnut & Cheer crew and process images. City-specific completed displays will be added only when their location and customer approval are documented." photos={[
        { src: ASSETS.professionalPhotos.bundlingLights, alt: "Technician bundling commercial-grade Christmas lights before installation" },
        { src: ASSETS.professionalPhotos.rooflineClip, alt: "Close-up of a professional roofline Christmas light clip" },
        { src: ASSETS.professionalPhotos.truckLadder, alt: "Technician unloading a ladder from the Chestnut & Cheer service truck" },
        { src: ASSETS.professionalPhotos.closeInstall, alt: "Technician fastening Christmas lights beneath a residential roofline" },
        { src: ASSETS.professionalPhotos.checkingBulb, alt: "Technician checking a Christmas light bulb before installation" },
        { src: ASSETS.professionalPhotos.roofInstall, alt: "Professional Christmas light installation on a two-story Utah roofline" },
      ]} />
      <section className="section-pad bg-cream"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><h2 className="font-display text-3xl font-bold text-chestnut">Turn an idea into a measured design</h2><p className="mx-auto mt-4 max-w-2xl text-chestnut/70">Share photos of the property and the features you want to emphasize. We will use them to prepare a realistic scope and recommend seasonal or permanent lighting.</p><div className="mt-5 flex flex-wrap justify-center gap-4"><Link href={LINKS.estimate} className="font-semibold text-primary-red hover:underline">Request an estimate</Link><Link href={LINKS.residentialLighting} className="font-semibold text-primary-red hover:underline">Residential service</Link><Link href={LINKS.commercialLighting} className="font-semibold text-primary-red hover:underline">Commercial service</Link></div></div></section>
    </>
  );
}
