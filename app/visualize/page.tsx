import type { Metadata } from "next";
import { VisualizerTool } from "@/components/visualize/VisualizerTool";
import { COMPANY, ASSETS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visualize Christmas Lights on Your Home",
  description:
    "Upload a photo of your house, paint where you want lights, and see an AI preview of professional Christmas light installation. Free inspiration — then get a custom quote.",
  alternates: {
    canonical: "/visualize",
  },
  openGraph: {
    title: `Visualize Your Lights | ${COMPANY.name}`,
    description:
      "See what your home could look like with professional Christmas lights. Upload a photo, mark the areas, get an AI preview.",
    url: `${SITE_URL}/visualize`,
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
    title: `Visualize Your Lights | ${COMPANY.name}`,
    description:
      "Upload a house photo, paint where you want lights, and preview a professional install.",
    images: [absoluteUrl(ASSETS.photos.hero)],
  },
};

export default function VisualizePage() {
  return <VisualizerTool />;
}
