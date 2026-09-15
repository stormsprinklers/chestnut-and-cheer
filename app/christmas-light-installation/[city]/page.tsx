import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityChristmasLightsPage } from "@/components/pages/CityChristmasLightsPage";
import {
  CITY_BY_SLUG,
  LAUNCH_CITY_PAGES,
  cityPagePath,
} from "@/lib/cities";
import { ASSETS, COMPANY } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LAUNCH_CITY_PAGES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG.get(slug);
  if (!city) return { title: "Service Area", robots: { index: false, follow: true } };

  const path = cityPagePath(city);
  const title = `Christmas Light Installation in ${city.name}, UT | ${COMPANY.name}`;
  const description = `Professional Christmas light installation in ${city.name}, Utah. Seasonal and permanent lighting with design, maintenance, takedown, and storage. Request a free quote.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: [{
        url: absoluteUrl(ASSETS.professionalPhotos.technicianHero),
        width: 1600,
        height: 1067,
        alt: "Chestnut & Cheer technician installing professional Christmas lights in Utah",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ASSETS.professionalPhotos.technicianHero)],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG.get(slug);
  if (!city) notFound();
  return <CityChristmasLightsPage city={city} />;
}
