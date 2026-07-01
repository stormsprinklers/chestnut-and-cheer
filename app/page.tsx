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
  title: `Christmas Light Installation in Utah & Salt Lake County | ${COMPANY.name}`,
  description:
    "Professional Christmas light installation in Utah County & Salt Lake County. Temporary & permanent holiday lighting for homes and businesses. Free quotes — licensed S330 contractor.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `Christmas Light Installation | ${COMPANY.name}`,
    description: `${COMPANY.tagline} Serving Orem, Provo, Lehi, Sandy, and surrounding Utah communities.`,
    url: SITE_URL,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1200,
        alt: "Home with professional Christmas light installation in Utah",
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
