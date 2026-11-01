import type { Metadata } from "next";
import Image from "next/image";
import { Check, Gift, Lightbulb, Palette, ShieldCheck, Trophy } from "lucide-react";
import { OfferFooter, OfferHeader } from "@/components/offers/OfferChrome";
import { OfferLeadForm } from "@/components/offers/OfferLeadForm";
import { OfferPixels } from "@/components/offers/OfferPixels";
import { absoluteUrl } from "@/lib/site";

const path = "/offers/permanent-lights-giveaway";
const heroImage = "/images/offers/permanent-lights-color-roofline.webp";

export const metadata: Metadata = {
  title: "Permanent Lights Free Giveaway",
  description:
    "Enter for a premium permanent roofline lighting installation, plus $500 and $250 permanent-lighting gift card prizes.",
  alternates: { canonical: path },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Permanent Lights Free Giveaway | Chestnut & Cheer",
    description:
      "One grand-prize installation plus multiple permanent-lighting gift card winners.",
    url: absoluteUrl(path),
    images: [
      {
        url: absoluteUrl(heroImage),
        width: 1920,
        height: 1438,
        alt: "Home with colorful permanent roofline lighting",
      },
    ],
  },
};

const benefits = [
  "Premium permanent lights across the front roofline",
  "App-adjustable colors and patterns for every season",
  "Professional installation with a lifetime warranty",
];

export default function PermanentLightsGiveawayPage() {
  return (
    <article className="offer-page min-h-screen bg-[#f8f3eb] text-chestnut">
      <OfferPixels offerId="permanent-lights-giveaway" />
      <OfferHeader label="Permanent Lights Giveaway" />

      <main>
        <section className="relative overflow-hidden bg-chestnut text-warm-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(209,164,83,.22),transparent_36%),radial-gradient(circle_at_72%_0%,rgba(176,32,37,.22),transparent_34%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-7 px-4 py-7 sm:px-6 sm:py-9 lg:grid-cols-[1.08fr_.92fr] lg:items-start lg:gap-10 lg:px-8 lg:py-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-accent-gold">
                One grand prize · Multiple gift-card winners
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.02] sm:text-5xl xl:text-6xl">
                Win permanent lights. Installed free.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-warm-white/82 sm:text-lg">
                We&apos;re giving one customer a premium permanent lighting installation across the front roofline of their home—plus awarding multiple $500 and $250 gift cards toward permanent lights.
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

              <div className="mt-6 grid grid-cols-[1.45fr_.75fr] gap-2.5 sm:gap-3">
                <figure className="relative min-h-52 overflow-hidden rounded-[1.5rem] border border-white/10 sm:min-h-64 lg:min-h-56 xl:min-h-64">
                  <Image
                    src={heroImage}
                    alt="Home illuminated with adjustable red, white, and blue permanent roofline lights"
                    fill
                    priority
                    sizes="(max-width: 1024px) 70vw, 44vw"
                    className="object-cover"
                  />
                </figure>
                <figure className="relative min-h-52 overflow-hidden rounded-[1.5rem] border border-white/10 sm:min-h-64 lg:min-h-56 xl:min-h-64">
                  <Image
                    src="/images/offers/permanent-lights-warm-white-home.webp"
                    alt="Home outlined with warm white permanent roofline lights"
                    fill
                    sizes="(max-width: 1024px) 30vw, 20vw"
                    className="object-cover"
                  />
                </figure>
              </div>
            </div>

            <div id="enter" className="scroll-mt-4 lg:pt-1">
              <OfferLeadForm offerId="permanent-lights-giveaway" />
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-red">More ways to win</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                A grand prize—and more names drawn after it
              </h2>
              <p className="mt-4 leading-relaxed text-chestnut/72">
                The grand-prize winner receives the complete front-roofline package. Additional second- and third-place winners receive gift cards that can be applied to their own permanent lighting project.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { icon: Trophy, label: "Grand prize", title: "Free premium installation", text: "Permanent lights installed across the front roofline, with adjustable colors and a lifetime warranty." },
                { icon: Gift, label: "Second-place prizes", title: "$500 gift cards", text: "Multiple winners receive credit toward a permanent lighting installation." },
                { icon: Gift, label: "Third-place prizes", title: "$250 gift cards", text: "Multiple additional winners receive credit toward a permanent lighting installation." },
              ].map(({ icon: Icon, label, title, text }) => (
                <article key={title} className="rounded-3xl border border-chestnut/10 bg-white p-6 shadow-sm">
                  <span className="grid size-11 place-items-center rounded-full bg-accent-gold/25 text-primary-red">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-primary-red">{label}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-chestnut/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-red">The product</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Built in once. Ready for every occasion.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Palette, title: "Your colors", text: "Switch colors and patterns for Christmas, game days, birthdays, or everyday accent lighting." },
                { icon: Lightbulb, title: "Clean roofline", text: "A professional permanent system designed to follow the architecture of the home." },
                { icon: ShieldCheck, title: "Lifetime warranty", text: "The grand-prize installation includes the advertised lifetime product warranty." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl bg-cream p-5">
                  <Icon className="size-6 text-primary-red" aria-hidden />
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-chestnut/68">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-chestnut/10 bg-white p-6 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-primary-red">Giveaway details</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">What the entry covers</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-chestnut/72 sm:text-base">
              <p>The grand prize covers a standard permanent-light installation on the front-facing roofline of one eligible home, including the lighting system, standard installation, basic setup, and the advertised lifetime warranty.</p>
              <p>Final scope is subject to a property review, safe access, compatible roofline conditions, available electrical service, and the current Chestnut &amp; Cheer service area. Electrical upgrades, structural repairs, specialty access equipment, side or rear rooflines, trees, landscaping, and other add-ons are not included unless confirmed in writing.</p>
              <p>Gift-card prizes may be applied toward a permanent-lighting project with Chestnut &amp; Cheer. Entering does not guarantee selection. Drawing timing, winner contact, prize acceptance, and any additional official rules will be communicated as the promotion is finalized.</p>
            </div>
            <a href="#enter" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-primary-red px-6 font-semibold text-white">
              Enter the Drawing
            </a>
          </div>
        </section>
      </main>

      <OfferFooter />
    </article>
  );
}
