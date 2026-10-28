import type { Metadata } from "next";
import Image from "next/image";
import { Check, Clock3, PackageCheck, ShieldCheck } from "lucide-react";
import { OfferFooter, OfferHeader } from "@/components/offers/OfferChrome";
import { OfferLeadForm } from "@/components/offers/OfferLeadForm";
import { OfferPixels } from "@/components/offers/OfferPixels";
import { absoluteUrl } from "@/lib/site";

const path = "/offers/free-christmas-lights";
const heroImage = "/images/offers/christmas-lights-white-roofline.webp";

export const metadata: Metadata = {
  title: "Free Commercial-Grade Christmas Lights",
  description:
    "Chestnut & Cheer buys the commercial-grade LED lights and clips. You pay for professional installation, with lifetime bulb and clip coverage.",
  alternates: { canonical: path },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Free Christmas Lights—Pay Only for Installation | Chestnut & Cheer",
    description:
      "Commercial-grade LEDs and clips included, plus lifetime bulb and clip coverage and fast in-season repairs.",
    url: absoluteUrl(path),
    images: [
      {
        url: absoluteUrl(heroImage),
        width: 1521,
        height: 670,
        alt: "Home outlined with commercial-grade warm white Christmas lights",
      },
    ],
  },
};

const benefits = [
  "Commercial-grade LED bulbs and clips included",
  "You pay for professional installation",
  "Lifetime bulb-and-clip coverage with 2-business-day service",
];

export default function FreeChristmasLightsPage() {
  return (
    <article className="offer-page min-h-screen bg-[#f8f3eb] text-chestnut">
      <OfferPixels offerId="free-christmas-lights" />
      <OfferHeader label="Free Christmas Lights Offer" />

      <main>
        <section className="relative overflow-hidden bg-[#17372f] text-warm-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(209,164,83,.24),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(176,32,37,.2),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-7 px-4 py-7 sm:px-6 sm:py-9 lg:grid-cols-[1.08fr_.92fr] lg:items-start lg:gap-10 lg:px-8 lg:py-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-accent-gold">
                Commercial-grade lights included
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl xl:text-6xl">
                The Christmas lights are free. You pay for installation.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-warm-white/82 sm:text-lg">
                We buy the professional LED bulbs and clips for your custom display. You get the polished roofline without paying separately for the light package.
              </p>

              <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2.5 text-sm leading-snug text-warm-white/88">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-gold text-chestnut">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-[1.3fr_.7fr] grid-rows-2 gap-2.5 sm:gap-3">
                <figure className="relative row-span-2 min-h-64 overflow-hidden rounded-[1.5rem] border border-white/10 sm:min-h-72 lg:min-h-64 xl:min-h-72">
                  <Image
                    src={heroImage}
                    alt="White home with a crisp warm-white commercial-grade Christmas light roofline"
                    fill
                    priority
                    sizes="(max-width: 1024px) 68vw, 40vw"
                    className="object-cover"
                  />
                </figure>
                <figure className="relative min-h-0 overflow-hidden rounded-[1.25rem] border border-white/10">
                  <Image
                    src="/images/offers/christmas-lights-red-green-home.webp"
                    alt="Two-car garage home outlined with red, green, and white Christmas lights at dusk"
                    fill
                    sizes="(max-width: 1024px) 32vw, 18vw"
                    className="object-cover object-[center_58%]"
                  />
                </figure>
                <figure className="relative min-h-0 overflow-hidden rounded-[1.25rem] border border-white/10">
                  <Image
                    src="/images/offers/christmas-lights-warm-white-home.webp"
                    alt="White home and garage outlined with warm-white Christmas lights under a tree"
                    fill
                    sizes="(max-width: 1024px) 32vw, 18vw"
                    className="object-cover"
                  />
                </figure>
              </div>
            </div>

            <div id="claim" className="scroll-mt-4 lg:pt-1">
              <OfferLeadForm offerId="free-christmas-lights" />
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-red">A simpler first season</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                We cover the light package. You cover the skilled work.
              </h2>
              <p className="mt-4 leading-relaxed text-chestnut/72">
                Your quote is built around the installation itself: measuring, custom fitting, safely attaching, testing, and presenting a clean professional display.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { icon: PackageCheck, title: "Lights and clips included", text: "Commercial-grade LED bulbs and the standard clips for the approved design are provided by Chestnut & Cheer." },
                { icon: ShieldCheck, title: "Lifetime product coverage", text: "Bulbs and clips stay covered for their lifetime within the Chestnut & Cheer lighting program." },
                { icon: Clock3, title: "Fast in-season fixes", text: "Report a bulb or clip problem and we will repair it at no charge within two business days, subject to safe weather and access." },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-3xl border border-chestnut/10 bg-white p-6 shadow-sm">
                  <span className="grid size-11 place-items-center rounded-full bg-accent-gold/25 text-primary-red">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-chestnut/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-red">Offer terms &amp; ownership</p>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold sm:text-4xl">
              The lights stay our property. The worry stays ours, too.
            </h2>

            <div className="mt-7 rounded-3xl border-2 border-primary-red/25 bg-primary-red/[.035] p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-primary-red">Chestnut &amp; Cheer owns the lights.</h3>
              <p className="mt-3 text-base leading-relaxed text-chestnut/78 sm:text-lg">
                All bulbs, clips, wire, and related lighting materials supplied through this offer remain the sole property of Chestnut &amp; Cheer. They are provided as part of our installation and service program and are not sold, gifted, or transferred to the customer. Paying the installation charge does not give the customer ownership of the lights or materials.
              </p>
            </div>

            <div className="mt-8 grid gap-7 text-sm leading-relaxed text-chestnut/72 md:grid-cols-2 md:text-base">
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-chestnut">What is included</h3>
                <p>The offer includes the commercial-grade LED bulbs and standard clips needed for the roofline design approved in your written quote. The customer pays the quoted installation labor and any applicable taxes.</p>
                <p>Bulbs and clips carry the advertised lifetime coverage. If a covered bulb or clip fails, Chestnut &amp; Cheer will repair or replace it at no charge within two business days after notice, weather and safe roof access permitting.</p>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-chestnut">Scope and availability</h3>
                <p>Installation pricing depends on roofline length, height, pitch, access, design complexity, and site conditions. Trees, bushes, specialty features, electrical upgrades, structural repairs, and nonstandard access are excluded unless they appear in the written quote.</p>
                <p>Homes must be within the current service area and safe for our crew to service. Offer availability may be limited by schedule, property fit, and material availability. Chestnut &amp; Cheer may remove, store, service, replace, or retire company-owned materials as part of the program.</p>
              </div>
            </div>

            <a href="#claim" className="mt-9 inline-flex min-h-11 items-center justify-center rounded-full bg-primary-red px-6 font-semibold text-white">
              Check My Home &amp; Get a Quote
            </a>
          </div>
        </section>
      </main>

      <OfferFooter />
    </article>
  );
}
