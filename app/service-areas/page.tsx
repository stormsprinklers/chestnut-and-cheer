import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  cityPagePath,
  cityServesCounty,
  countyPagePath,
  getCountyCityNames,
  LAUNCH_CITY_BY_NAME,
  SERVICE_COUNTIES,
} from "@/lib/cities";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Christmas Light Installation Service Areas in Utah",
  description: `Browse ${COMPANY.name} Christmas light installation coverage across ${COMPANY.serviceAreaSummary}.`,
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={[
        getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Service Areas", path: LINKS.serviceAreas }]),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${absoluteUrl(LINKS.serviceAreas)}#service-areas`,
          name: "Christmas Light Installation Service Areas",
          description: `Christmas light installation coverage across ${COMPANY.serviceAreaSummary}.`,
          url: absoluteUrl(LINKS.serviceAreas),
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: SERVICE_COUNTIES.map((county, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: county,
              url: absoluteUrl(countyPagePath(county)),
            })),
          },
        },
      ]} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
      <PageHero
        eyebrow="Northern Utah & the Wasatch Back"
        title="Christmas Light Installation Service Areas"
        description={`Chestnut & Cheer provides professional Christmas light installation across ${COMPANY.serviceAreaSummary}. Explore coverage by county below.`}
        image={ASSETS.professionalPhotos.serviceTruck}
        imageAlt="Chestnut & Cheer Christmas lighting service truck serving northern Utah"
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
            {SERVICE_COUNTIES.map((county) => {
              const cities = getCountyCityNames(county);
              return (
                <section key={county} className="rounded-2xl border border-chestnut/10 bg-white p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-bold text-chestnut">
                    <Link href={countyPagePath(county)} className="hover:text-primary-red">{county}</Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-chestnut/65">We serve every city listed below. Linked cities include detailed local service information.</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {cities.map((cityName) => {
                      const city = LAUNCH_CITY_BY_NAME.get(cityName);
                      const localPage = city && cityServesCounty(city, county) ? city : undefined;
                      const className = "rounded-lg border border-chestnut/10 bg-cream px-4 py-3 font-semibold text-chestnut";
                      return localPage ? (
                        <Link key={cityName} href={cityPagePath(localPage)} className={`${className} transition-colors hover:border-primary-red hover:text-primary-red`}>
                          Christmas lights in {cityName}
                        </Link>
                      ) : (
                        <span key={cityName} className={className}>Christmas lights in {cityName}</span>
                      );
                    })}
                  </div>
                  <Link href={countyPagePath(county)} className="mt-6 inline-block font-semibold text-primary-red hover:underline">View the complete {county} hub</Link>
                </section>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href={LINKS.contact} className="inline-block font-semibold text-primary-red hover:underline">Questions about your property? Contact our team</Link>
          </div>
        </div>
      </section>
    </>
  );
}
