import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/PageChrome";
import { ProfessionalPhotoGallery } from "@/components/sections/ProfessionalPhotoGallery";
import { ASSETS, COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Seasonal Holiday Lighting",
  description:
    "Temporary Christmas light installation in Utah County & Salt Lake County. Custom-fit lights, professional install, takedown, and summer storage included.",
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
        "Custom-fit commercial-grade lights",
        "Rooflines, trees & bushes",
        "In-season maintenance & free bulb replacement",
        "Takedown in January / early February",
        "Off-season storage included",
        "Year 1 from $699 · Year 2+ from $299",
      ]}
      sections={[
        {
          heading: "A full-service holiday display",
          body: "We don’t install customer-owned lights. Every display uses professional strands and clips so your home looks even, bright, and photo-ready — then we take it down and store it until next year.",
        },
        {
          heading: "Pricing that rewards returning customers",
          body: "Year 1 covers parts + installation (starts at $699). Stay with us and Year 2+ drops to installation only (starts at $299) because we already own the lights. Every quote is customized to your property.",
        },
        {
          heading: "Serving Utah County & Salt Lake County",
          body: `From Orem and Provo to Draper and Sandy, our crews install seasonal lighting across ${COMPANY.serviceAreas.join(" and ")}. Get an instant estimate online or book a free Google Meet consultation.`,
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
