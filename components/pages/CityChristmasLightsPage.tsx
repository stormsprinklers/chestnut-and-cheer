import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProfessionalPhotoGallery } from "@/components/sections/ProfessionalPhotoGallery";
import { Button } from "@/components/ui/Button";
import { ASSETS, COMPANY, LINKS, PRICING } from "@/lib/constants";
import {
  CITY_BY_SLUG,
  cityPagePath,
  countyPagePath,
  getCityFaqs,
  type CityPageData,
} from "@/lib/cities";
import { getCityPageSchemas } from "@/lib/structured-data";

const PROCESS = [
  { title: "Measure and design", text: "We review visible rooflines, working height, power, preferred colors, and the features you want to emphasize." },
  { title: "Prepare the display", text: "Commercial-grade strands are cut and organized for the approved design rather than stretched from a one-size-fits-all kit." },
  { title: "Install and test", text: "The crew installs with purpose-built clips, routes power carefully, and tests every section before leaving." },
  { title: "Maintain it in season", text: "If a normal bulb failure affects a display we installed, contact us and we will arrange included in-season service." },
  { title: "Remove and store", text: "Seasonal displays are taken down in January or early February and stored for the next season." },
] as const;

export function CityChristmasLightsPage({ city }: { city: CityPageData }) {
  const faqs = getCityFaqs(city);
  const countyPath = countyPagePath(city.county);
  const estimateHref = `${LINKS.estimate}?city=${encodeURIComponent(city.name)}`;
  const nearbyCities = city.nearby
    .map((slug) => CITY_BY_SLUG.get(slug))
    .filter((entry): entry is CityPageData => Boolean(entry));

  return (
    <>
      <JsonLd data={getCityPageSchemas(city, faqs)} />
      <nav aria-label="Breadcrumb" className="border-b border-chestnut/10 bg-cream">
        <ol className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3 text-sm text-chestnut/65 sm:px-6">
          <li><Link href="/" className="hover:text-primary-red">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={LINKS.serviceAreas} className="hover:text-primary-red">Service Areas</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={countyPath} className="hover:text-primary-red">{city.county}</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-chestnut">{city.name}</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden bg-chestnut">
        <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/40" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="text-sm font-semibold text-accent-gold">Professional holiday lighting</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-warm-white sm:text-5xl">
              Christmas Light Installation in {city.name}, Utah
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-warm-white/80">
              Professional seasonal and permanent lighting for {city.name} homes,
              businesses, and community properties—with design, installation,
              in-season support, and seasonal takedown available from one team.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={estimateHref} variant="gold">Get a {city.name} Estimate</Button>
              <Button href={LINKS.tel} variant="outline" className="border-warm-white/30 text-warm-white hover:bg-warm-white/10">Call {COMPANY.phone}</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-warm-white/10">
            <Image
              src={ASSETS.professionalPhotos.technicianHero}
              alt="Chestnut & Cheer technician installing professional Christmas lights in Utah"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-red">Local planning context</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-chestnut">Lighting designed around {city.name} properties</h2>
            <p className="mt-5 text-lg leading-relaxed text-chestnut/75">{city.setting}</p>
            <p className="mt-4 text-lg leading-relaxed text-chestnut/75">{city.design}</p>
          </div>
          <aside className="rounded-2xl border border-chestnut/10 bg-white p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-chestnut">Areas we serve in {city.name}</h2>
            <p className="mt-3 leading-relaxed text-chestnut/70">
              We quote properties throughout the city, including homes and businesses
              around {city.areas.slice(0, -1).join(", ")}, and {city.areas.at(-1)}.
            </p>
          </aside>
        </div>
      </section>

      <ProfessionalPhotoGallery
        eyebrow="Professional installation work"
        title="The details behind a polished holiday display"
        description="A look at the commercial-grade lighting, careful preparation, and installation work Chestnut & Cheer brings to every project."
        photos={[
          { src: ASSETS.professionalPhotos.bundlingLights, alt: "Technician organizing commercial-grade Christmas light strands before installation" },
          { src: ASSETS.professionalPhotos.rooflineClip, alt: "Professional Christmas light clip secured beneath a roof edge" },
          { src: ASSETS.professionalPhotos.closeInstall, alt: "Technician fastening Christmas lights along a residential roofline" },
          { src: ASSETS.professionalPhotos.truckLadder, alt: "Chestnut & Cheer technician unloading a ladder from the service truck" },
          { src: ASSETS.professionalPhotos.preparingLadder, alt: "Technician preparing a ladder for professional Christmas light installation" },
          { src: ASSETS.professionalPhotos.checkingBulb, alt: "Technician checking a commercial-grade Christmas light bulb" },
        ]}
      />

      <section className="section-pad below-fold bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-red">Choose the right service</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-chestnut">Residential, commercial, and permanent lighting</h2>
            <p className="mt-4 leading-relaxed text-chestnut/70">
              The same city can contain a straightforward home roofline, a multi-building HOA,
              and a storefront with strict operating hours. Start with the service that matches
              the property and we will shape the design around the actual scope.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { title: "Residential Christmas lights", text: "Custom-fit rooflines, peaks, garages, entries, trees, and bushes with maintenance, takedown, and storage included for seasonal displays.", href: LINKS.residentialLighting },
              { title: "Commercial holiday lighting", text: "Planned installation for storefronts, offices, HOAs, multifamily common areas, and public-facing properties with coordinated timing and service.", href: LINKS.commercialLighting },
              { title: "Permanent roofline lighting", text: "A discreet app-controlled system for Christmas, other holidays, game days, and year-round architectural accent lighting.", href: LINKS.permanentLighting },
            ].map((service) => (
              <article key={service.href} className="rounded-2xl border border-chestnut/10 bg-cream p-6">
                <h3 className="font-display text-xl font-bold text-chestnut">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chestnut/70">{service.text}</p>
                <Link href={service.href} className="mt-5 inline-block font-semibold text-primary-red hover:underline">Explore {service.title.toLowerCase()}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad below-fold bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-red">Full-season service</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-chestnut">What happens after you request a quote</h2>
          </div>
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {PROCESS.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-chestnut/10 bg-white p-5">
                <p className="text-sm font-semibold text-primary-red">Step {index + 1}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-chestnut">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-chestnut/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad below-fold bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-chestnut">Christmas light pricing in {city.name}</h2>
            <p className="mt-4 leading-relaxed text-chestnut/75">{city.pricing}</p>
            <p className="mt-3 text-sm leading-relaxed text-chestnut/65">
              Every quote uses measured coverage, working height, access, trees,
              power routing, and the selected design. Starting prices are not a
              flat package or a citywide average.
            </p>
            <Link href={LINKS.pricing} className="mt-5 inline-block font-semibold text-primary-red hover:underline">See Christmas light installation pricing and examples</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[PRICING.yearOne, PRICING.renewal].map((tier) => (
              <article key={tier.label} className="rounded-2xl border border-chestnut/10 bg-cream p-6">
                <p className="text-sm font-semibold text-primary-red">{tier.label}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-chestnut">{tier.title}</h3>
                <p className="mt-3 text-3xl font-bold text-chestnut">From ${tier.startsAt}</p>
                <p className="mt-3 text-sm leading-relaxed text-chestnut/70">{tier.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad below-fold bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-chestnut">{city.name} Christmas lighting FAQs</h2>
          <div className="mt-7 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-chestnut/10 bg-white px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-chestnut">{faq.question}</summary>
                <p className="mt-3 leading-relaxed text-chestnut/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad below-fold bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-chestnut">Continue planning your display</h2>
          <p className="mt-3 text-chestnut/70">Compare nearby coverage, review the parent county hub, or learn how our professional installation service works statewide.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {nearbyCities.map((nearby) => (
              <Link key={nearby.slug} href={cityPagePath(nearby)} className="rounded-full border border-chestnut/15 bg-cream px-4 py-2 text-sm font-semibold text-chestnut hover:border-primary-red hover:text-primary-red">Christmas light installation in {nearby.name}</Link>
            ))}
            <Link href={countyPath} className="rounded-full border border-primary-red/20 bg-primary-red/5 px-4 py-2 text-sm font-semibold text-primary-red">{city.county} service areas</Link>
            <Link href={LINKS.christmasLightInstallation} className="rounded-full border border-primary-red/20 bg-primary-red/5 px-4 py-2 text-sm font-semibold text-primary-red">Christmas light installation services</Link>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-chestnut/10 bg-primary-red text-warm-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-gold">Free custom quote</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Plan Christmas lighting for your {city.name} property</h2>
          <p className="mx-auto mt-4 max-w-2xl text-warm-white/80">Share the property, preferred design, and timing. Most quote preparation can begin remotely, and you can also call or text the crew directly.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={estimateHref} variant="gold">Get a {city.name} Estimate</Button>
            <Button href={LINKS.tel} variant="outline" className="border-warm-white/30 text-warm-white hover:bg-warm-white/10">Call {COMPANY.phone}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
