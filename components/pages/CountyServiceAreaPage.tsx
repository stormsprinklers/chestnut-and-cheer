import Link from "next/link";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import {
  cityPagePath,
  countyPagePath,
  getCountyCities,
  type CityPageData,
} from "@/lib/cities";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site";
import { getBreadcrumbSchema } from "@/lib/structured-data";

type CountyContent = {
  county: CityPageData["county"];
  eyebrow: string;
  description: string;
  context: string;
  planning: string;
};

export function CountyServiceAreaPage({ content }: { content: CountyContent }) {
  const cities = getCountyCities(content.county);
  const path = countyPagePath(content.county);
  const schema = [
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Service Areas", path: LINKS.serviceAreas },
      { name: content.county, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": absoluteUrl(path),
      name: `Christmas Light Installation in ${content.county}`,
      description: content.description,
      url: absoluteUrl(path),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: cities.map((city, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: city.name,
          url: absoluteUrl(cityPagePath(city)),
        })),
      },
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas", href: LINKS.serviceAreas }, { label: content.county }]} />
      <PageHero eyebrow={content.eyebrow} title={`Christmas Light Installation in ${content.county}`} description={content.description} image={ASSETS.professionalPhotos.serviceTruck} imageAlt="Chestnut & Cheer Christmas lighting service truck and technician in Utah" />
      <section className="section-pad bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-chestnut">Professional holiday lighting across {content.county}</h2>
            <p className="mt-4 text-lg leading-relaxed text-chestnut/75">{content.context}</p>
            <p className="mt-4 text-lg leading-relaxed text-chestnut/75">{content.planning}</p>
            <p className="mt-4 text-sm leading-relaxed text-chestnut/60">{COMPANY.name} operates from Lehi as a service-area business. The city pages below describe places our crews serve; they do not represent separate offices.</p>
          </div>
          <aside className="rounded-2xl border border-chestnut/10 bg-white p-6">
            <h2 className="font-display text-2xl font-bold text-chestnut">What seasonal service includes</h2>
            <ul className="mt-4 space-y-3 text-chestnut/75">
              <li>Custom design and commercial-grade lights</li>
              <li>Professional installation and testing</li>
              <li>In-season service for normal bulb failures</li>
              <li>Takedown in January or early February</li>
              <li>Organized off-season storage</li>
            </ul>
            <Link href={LINKS.christmasLightInstallation} className="mt-5 inline-block font-semibold text-primary-red hover:underline">Learn how installation works</Link>
          </aside>
        </div>
      </section>
      <section className="section-pad below-fold bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-chestnut">Priority cities in {content.county}</h2>
          <p className="mt-3 max-w-3xl text-chestnut/70">Each page explains property types, access and weather considerations, pricing variables, nearby coverage, and the lighting services available in that community.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <Link key={city.slug} href={cityPagePath(city)} className="rounded-2xl border border-chestnut/10 bg-cream p-5 transition-colors hover:border-primary-red">
                <h3 className="font-display text-xl font-bold text-chestnut">{city.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-chestnut/65">Professional seasonal and permanent Christmas lighting in {city.name}, Utah.</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary-red">View {city.name} service details</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-primary-red text-warm-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold">Request a {content.county} Christmas lighting quote</h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-white/80">Send the property address, desired features, and timing. We will confirm service coverage and prepare the next step.</p>
          <div className="mt-7"><Button href={LINKS.estimate} variant="gold">Get an Instant Estimate</Button></div>
        </div>
      </section>
    </>
  );
}
