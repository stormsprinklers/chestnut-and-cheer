import { notFound, permanentRedirect } from "next/navigation";
import { CITY_BY_SLUG, LAUNCH_CITY_PAGES, cityPagePath } from "@/lib/cities";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LAUNCH_CITY_PAGES.map((city) => ({ city: city.slug }));
}

export default async function LegacyCityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG.get(slug);
  if (!city) notFound();
  permanentRedirect(cityPagePath(city));
}
