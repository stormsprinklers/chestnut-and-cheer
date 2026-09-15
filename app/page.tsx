import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BookingProcess } from "@/components/sections/BookingProcess";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";
import { BookingPlaceholder } from "@/components/sections/BookingPlaceholder";
import { ProfessionalPhotoGallery } from "@/components/sections/ProfessionalPhotoGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY, ASSETS } from "@/lib/constants";
import { getHomePageSchemas } from "@/lib/structured-data";
import { SITE_URL, absoluteUrl } from "@/lib/site";

const BeforeAfter = dynamic(
  () =>
    import("@/components/sections/BeforeAfter").then((m) => ({
      default: m.BeforeAfter,
    })),
  { loading: () => <div className="section-pad" aria-hidden /> },
);

const Countdown = dynamic(
  () =>
    import("@/components/sections/Countdown").then((m) => ({
      default: m.Countdown,
    })),
  { loading: () => <div className="section-pad" aria-hidden /> },
);

const FAQs = dynamic(
  () =>
    import("@/components/sections/FAQs").then((m) => ({ default: m.FAQs })),
  { loading: () => <div className="section-pad" aria-hidden /> },
);

export const metadata: Metadata = {
  title: { absolute: `Christmas Light Installation in Utah | ${COMPANY.name}` },
  description:
    "Professional Christmas light installation in Utah County & Salt Lake County. Temporary & permanent holiday lighting for homes and businesses. Free quotes — licensed S330 contractor.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Christmas Light Installation | ${COMPANY.name}`,
    description: `${COMPANY.tagline} Serving Utah County & Salt Lake County — Provo, Orem, Lehi, Sandy, Draper, and more.`,
    url: SITE_URL,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1067,
        alt: "Chestnut & Cheer Christmas light technician carrying a ladder in Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Christmas Light Installation | ${COMPANY.name}`,
    description: COMPANY.tagline,
    images: [absoluteUrl(ASSETS.photos.hero)],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={getHomePageSchemas()} />
      <Hero />
      <SocialProof />
      <ServicesOverview />
      <WhyChooseUs />
      <ProfessionalPhotoGallery
        eyebrow="Real local installs"
        title="Professional Christmas light installation in action"
        description="Our Utah crews use commercial-grade lights, purpose-built clips, and professional equipment for clean, reliable roofline displays."
        photos={[
          { src: ASSETS.professionalPhotos.bundlingLights, alt: "Chestnut & Cheer technician organizing commercial-grade Christmas light strands in Utah" },
          { src: ASSETS.professionalPhotos.rooflineClip, alt: "Close-up of professional Christmas light clips secured beneath a Utah home roofline" },
          { src: ASSETS.professionalPhotos.truckLadder, alt: "Chestnut & Cheer technician unloading a ladder from a branded Christmas lighting service truck" },
          { src: ASSETS.professionalPhotos.rooflineInstall, alt: "Professional installer hanging Christmas lights along a two-story Utah home roofline" },
          { src: ASSETS.professionalPhotos.checkingBulb, alt: "Lighting technician checking a commercial-grade Christmas light bulb before installation" },
        ]}
      />
      <BeforeAfter />
      <BookingProcess />
      <BookingPlaceholder />
      <Countdown />
      <Reviews />
      <FAQs />
      <Contact />
      <ServiceAreaMap />
    </>
  );
}
