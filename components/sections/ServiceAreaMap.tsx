import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  COMPANY,
  LINKS,
  MAP_EMBED_URL,
} from "@/lib/constants";
import {
  cityPagePath,
  cityServesCounty,
  countyPagePath,
  getCountyCityNames,
  LAUNCH_CITY_BY_NAME,
  type ServiceCounty,
} from "@/lib/cities";
import { LazyMap } from "@/components/ui/LazyMap";
import { Button } from "@/components/ui/Button";

const COUNTIES = [
  {
    name: "Utah County" as const,
    preview: "Provo, Lehi, Spanish Fork, Payson, American Fork…",
  },
  {
    name: "Salt Lake County" as const,
    preview: "Salt Lake City, Sandy, Draper, West Jordan, Murray…",
  },
  {
    name: "Davis County" as const,
    preview: "Layton, Bountiful, Clearfield, Farmington, Kaysville…",
  },
  {
    name: "Weber County" as const,
    preview: "Ogden, Roy, West Haven, North Ogden, Riverdale…",
  },
  {
    name: "Summit County" as const,
    preview: "Park City, Summit Park, Kamas, Coalville, Oakley…",
  },
  {
    name: "Wasatch County" as const,
    preview: "Heber City, Midway, Daniel, Charleston, Wallsburg…",
  },
  {
    name: "Juab County" as const,
    preview: "Mona and Nephi only",
  },
];

function CountyCities({ county }: { county: ServiceCounty }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 text-sm leading-relaxed text-chestnut/80 sm:mt-3 sm:block">
      {getCountyCityNames(county).map((cityName) => {
        const city = LAUNCH_CITY_BY_NAME.get(cityName);
        const localPage = city && cityServesCounty(city, county) ? city : undefined;
        return (
          <li key={cityName} className="py-1 sm:py-0.5">
            {localPage ? (
              <Link href={cityPagePath(localPage)} className="hover:text-primary-red hover:underline">
                {cityName}
              </Link>
            ) : cityName}
          </li>
        );
      })}
    </ul>
  );
}

export function ServiceAreaMap() {
  return (
    <section id="service-area" className="section-pad below-fold">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            Service Area
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
            We install Christmas lights across {COMPANY.serviceAreaSummary}.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          <div className="grid gap-3 sm:grid-cols-2">
            {COUNTIES.map(({ name, preview }) => (
              <details key={name} className="group rounded-2xl border border-chestnut/10 bg-cream/60 px-4 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="font-display text-lg font-semibold text-primary-red">{name}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-chestnut/70 group-open:hidden">{preview}</span>
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-primary-red transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="mt-4 border-t border-chestnut/10 pt-3">
                    <CountyCities county={name} />
                    <Link href={countyPagePath(name)} className="mt-3 inline-block text-sm font-semibold text-primary-red hover:underline">
                      View {name} details
                    </Link>
                  </div>
              </details>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-chestnut/10 shadow-sm">
            <LazyMap
              src={MAP_EMBED_URL}
              title={`${COMPANY.name} service area map`}
            />
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-chestnut/60">
          Serving {COMPANY.serviceAreaSummary}.
          Not sure if we cover your neighborhood? Reach out — we&apos;re happy
          to check. <Link href="/service-areas" className="font-semibold text-primary-red hover:underline">Browse all service areas</Link>.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href={LINKS.estimate} variant="primary">
            Ask About Your Area
          </Button>
        </div>
      </div>
    </section>
  );
}
