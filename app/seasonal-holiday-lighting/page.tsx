import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { ProfessionalPhotoGallery } from "@/components/sections/ProfessionalPhotoGallery";
import { ASSETS, COMPANY, PRICING } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Seasonal Holiday Lighting",
  description:
    "Temporary Christmas light installation across northern Utah and the Wasatch Back, with custom-fit lights, installation, takedown, and storage.",
  alternates: { canonical: "/seasonal-holiday-lighting" },
};

export default function SeasonalHolidayLightingPage() {
  return (
    <>
      <ServicePage
      eyebrow="Install · Enjoy · We store"
      title="Seasonal Holiday Lighting"
      description={`Classic Christmas magic without the ladder. ${COMPANY.name} designs and installs temporary holiday lighting on roofs, trees, and bushes — then removes and stores everything after the season.`}
      heroImage={ASSETS.professionalPhotos.technicianHero}
      heroImageAlt="Licensed Chestnut & Cheer Christmas lighting technician working from a ladder in Utah"
      highlights={[
        `Full seasonal service from $${PRICING.service.startsAt}`,
        "Custom-fit commercial-grade lights",
        "Background-checked employees",
        "Rooflines, trees & bushes",
        "In-season maintenance & free bulb replacement",
        "Takedown in January / early February",
        "Off-season storage included",
        "Free color changes each season",
        "Lifetime warranty",
      ]}
      sections={[
        {
          heading: "A full-service holiday display",
          body: "We don’t install customer-owned lights. Every display uses professional strands and clips so your home looks even, bright, and photo-ready — then we take it down and store it until next year.",
        },
        {
          heading: "One upfront service price",
          body: "We provide and pay for the lights and materials. Your property-specific quote covers the complete service: installation, in-season maintenance, takedown, and storage. There are no separate ownership tiers.",
        },
        {
          heading: "More colors, without the extra charge",
          body: "Choose from a wide variety of colors and patterns, including custom combinations. You can change your colors in a future season at no additional color-change cost.",
        },
        {
          heading: "Materials when service ends",
          body: "If you cancel seasonal service, you pay the retail cost of the materials used on your home. We then leave the bulbs, strands, clips, and timer with you.",
        },
        {
          heading: "Serving northern Utah & the Wasatch Back",
          body: `Our crews install seasonal lighting across ${COMPANY.serviceAreaSummary}. Get an instant estimate online or book a free Google Meet consultation.`,
        },
      ]}
      />
      <ProfessionalPhotoGallery
        eyebrow="From prep to takedown"
        title="A careful install from start to finish"
        description="We prepare and test each strand, install it to fit your home, maintain it through the season, then return for takedown and storage."
        photos={[
          { src: ASSETS.professionalPhotos.closeInstall, alt: "Chestnut & Cheer technician fastening Christmas lights beneath a residential roofline" },
          { src: ASSETS.professionalPhotos.closeLighting, alt: "Close-up of a professional installer placing a Christmas light on a roof edge" },
          { src: ASSETS.professionalPhotos.unloadingLadder, alt: "Christmas light technician unloading installation equipment from a Chestnut & Cheer truck" },
          { src: ASSETS.professionalPhotos.preparingLadder, alt: "Chestnut & Cheer technician preparing a ladder for a residential holiday light installation" },
          { src: ASSETS.professionalPhotos.lightBundle, alt: "Bundle of commercial-grade C9 Christmas lights prepared for a custom Utah home installation" },
          { src: ASSETS.professionalPhotos.roofInstall, alt: "Professional Christmas light installer securing a roofline strand on a two-story Utah home" },
        ]}
      />
    </>
  );
}
