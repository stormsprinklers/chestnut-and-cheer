import {
  COMPANY,
  LINKS,
  MAP_EMBED_URL,
  SALT_LAKE_COUNTY_CITIES,
  UTAH_COUNTY_CITIES,
} from "@/lib/constants";
import { LazyMap } from "@/components/ui/LazyMap";
import { Button } from "@/components/ui/Button";

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
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-primary-red">
                Utah County
              </h3>
              <ul className="mt-3 text-sm leading-relaxed text-chestnut/80">
                {UTAH_COUNTY_CITIES.map((city) => (
                  <li key={city} className="py-0.5">
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-primary-red">
                Salt Lake County
              </h3>
              <ul className="mt-3 text-sm leading-relaxed text-chestnut/80">
                {SALT_LAKE_COUNTY_CITIES.map((city) => (
                  <li key={city} className="py-0.5">
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-chestnut/10 shadow-sm">
            <LazyMap
              src={MAP_EMBED_URL}
              title={`${COMPANY.name} service area map`}
            />
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-chestnut/60">
          Proudly serving all cities in {COMPANY.serviceAreas.join(" and ")}.
          Not sure if we cover your neighborhood? Reach out — we&apos;re happy
          to check.
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
