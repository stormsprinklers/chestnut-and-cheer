import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  cityPagePath,
  countyPagePath,
  getCountyCities,
} from "@/lib/cities";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Christmas Light Installation Service Areas in Utah",
  description: `Browse ${COMPANY.name} Christmas light installation service areas in Utah County and Salt Lake County. View local service details for 14 priority cities.`,
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service Areas", path: LINKS.serviceAreas }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
      <PageHero
        eyebrow="Utah County & Salt Lake County"
        title="Christmas Light Installation Service Areas"
        description="Explore the Utah communities currently included in our local service-page launch. Chestnut & Cheer operates from Lehi and serves every listed city as a service-area business—not as separate offices."
        image={ASSETS.professionalPhotos.serviceTruck}
        imageAlt="Chestnut & Cheer Christmas lighting service truck serving Utah County and Salt Lake County"
      />
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-chestnut/75">
            We install seasonal residential and commercial Christmas lighting,
            provide in-season service, remove temporary displays, and store the
            lighting for returning customers. Permanent roofline lighting is also
            available. Start with a county hub or choose your city below.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {(["Utah County", "Salt Lake County"] as const).map((county) => {
              const cities = getCountyCities(county);
              return (
                <section key={county} className="rounded-2xl border border-chestnut/10 bg-white p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-bold text-chestnut">
                    <Link href={countyPagePath(county)} className="hover:text-primary-red">{county}</Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-chestnut/65">Local coverage, planning context, and links to {cities.length} priority city pages.</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {cities.map((city) => (
                      <Link key={city.slug} href={cityPagePath(city)} className="rounded-lg border border-chestnut/10 bg-cream px-4 py-3 font-semibold text-chestnut transition-colors hover:border-primary-red hover:text-primary-red">
                        Christmas lights in {city.name}
                      </Link>
                    ))}
                  </div>
                  <Link href={countyPagePath(county)} className="mt-6 inline-block font-semibold text-primary-red hover:underline">View the complete {county} hub</Link>
                </section>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <p className="text-chestnut/70">Outside a listed city but within Utah County or Salt Lake County?</p>
            <Link href={LINKS.contact} className="mt-2 inline-block font-semibold text-primary-red hover:underline">Contact us to confirm current route availability</Link>
          </div>
        </div>
      </section>
    </>
  );
}
