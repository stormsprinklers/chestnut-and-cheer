import type { Metadata } from "next";
import { DoorHangerLanding } from "@/components/door-hanger/DoorHangerLanding";
import { ASSETS, COMPANY } from "@/lib/constants";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "$100 Off Christmas Lights Installation",
  description: `Redeem your Chestnut & Cheer door hanger offer — $100 off Christmas lights installation in Utah County & Salt Lake County. Limited spots. Licensed ${COMPANY.license}.`,
  alternates: { canonical: "/door-hanger" },
  robots: { index: false, follow: true },
  openGraph: {
    title: `$100 Off Christmas Lights | ${COMPANY.name}`,
    description:
      "Limited-time door hanger offer. Redeem $100 off your Christmas lights installation while seasonal spots last.",
    url: `${SITE_URL}/door-hanger`,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1200,
        alt: "Home with professional Christmas light installation in Utah",
      },
    ],
  },
};

export default function DoorHangerPage() {
  return <DoorHangerLanding />;
}
