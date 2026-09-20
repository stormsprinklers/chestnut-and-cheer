import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  COMPANY,
  LINKS,
  MAP_EMBED_URL,
} from "@/lib/constants";
import { cityPagePath, getCountyCityNames, LAUNCH_CITY_BY_NAME } from "@/lib/cities";
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
];

function CountyCities({ county }: { county: (typeof COUNTIES)[number]["name"] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 text-sm leading-relaxed text-chestnut/80 sm:mt-3 sm:block">
      {getCountyCityNames(county).map((cityName) => {
        const city = LAUNCH_CITY_BY_NAME.get(cityName);
        return (
          <li key={cityName} className="py-1 sm:py-0.5">
            {city ? (
              <Link href={cityPagePath(city)} className="hover:text-primary-red hover:underline">
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
            We install Christmas lights throughout Utah County and Salt Lake
            County.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-8">
            {COUNTIES.map(({ name, preview }) => (
              <div key={name}>
                <details className="group rounded-2xl border border-chestnut/10 bg-cream/60 px-4 py-4 sm:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="font-display text-lg font-semibold text-primary-red">{name}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-chestnut/70 group-open:hidden">{preview}</span>
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-primary-red transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="mt-4 border-t border-chestnut/10 pt-3">
                    <CountyCities county={name} />
                  </div>
                </details>
                <div className="hidden sm:block">
                  <h3 className="font-display text-lg font-semibold text-primary-red">{name}</h3>
                  <CountyCities county={name} />
                </div>
              </div>
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
          Proudly serving priority routes in {COMPANY.serviceAreas.join(" and ")}.
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
