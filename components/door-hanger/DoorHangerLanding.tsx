"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Home,
  ShieldCheck,
  Snowflake,
  TreePine,
} from "lucide-react";
import { Mascot } from "@/components/ui/Mascot";
import { Button } from "@/components/ui/Button";
import {
  DOOR_HANGER_ATTRIBUTION,
  seedCampaignAttribution,
  trackEstimateEvent,
} from "@/lib/estimate/analytics";
import {
  ASSETS,
  COMPANY,
  LINKS,
  TESTIMONIALS,
  TRUST_BADGES,
} from "@/lib/constants";

const ESTIMATE_HREF = `${LINKS.estimate}?utm_source=door-hanger&utm_medium=print&utm_campaign=door-hanger-100-off&utm_content=qr`;

const PILLARS = [
  {
    title: "Professional Installation",
    detail: "Licensed crews install custom-fit lights on roofs, trees, and bushes.",
    icon: Home,
  },
  {
    title: "Premium Quality",
    detail: "Commercial-grade strands and clips — we don’t install customer-owned lights.",
    icon: ShieldCheck,
  },
  {
    title: "Custom Designs",
    detail: "Every display is designed for your property, not a one-size-fits-all kit.",
    icon: TreePine,
  },
  {
    title: "Takedown Included",
    detail: "We remove temporary lights after the holidays and store them for next year.",
    icon: Snowflake,
  },
] as const;

export function DoorHangerLanding() {
  useEffect(() => {
    seedCampaignAttribution(DOOR_HANGER_ATTRIBUTION, "/door-hanger");
    trackEstimateEvent("door_hanger_landing_view", {
      campaign: DOOR_HANGER_ATTRIBUTION.utm_campaign,
    });
  }, []);

  return (
    <div className="bg-cream">
      {/* Hero — brand + offer + one CTA */}
      <section className="relative overflow-hidden bg-chestnut">
        <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/45" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-12 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-14">
          <Image
            src={ASSETS.brand.logoPrimary}
            alt={COMPANY.name}
            width={220}
            height={147}
            className="h-16 w-auto object-contain sm:h-20"
            priority
          />
          <Mascot variant="holdingLights" size={140} className="mt-4 sm:mt-5" priority />
          <p className="mt-4 inline-block rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-gold sm:text-sm">
            Limited time offer
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-none text-warm-white sm:text-6xl">
            $100 OFF
          </h1>
          <p className="mt-3 max-w-xl font-display text-xl font-semibold uppercase tracking-wide text-accent-gold sm:text-2xl">
            Your Christmas lights installation
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-warm-white/80 sm:text-base">
            Scan brought you to the right place — redeem your door hanger savings
            before seasonal spots fill up across {COMPANY.serviceAreas.join(" & ")}.
          </p>
          <div className="mt-8 w-full max-w-md">
            <Button href={ESTIMATE_HREF} variant="gold" className="w-full text-base sm:text-lg">
              Redeem Your $100 Off — While Spots Last
            </Button>
            <p className="mt-3 text-xs text-warm-white/55">
              Takes about 2 minutes · Free custom quote
            </p>
          </div>
        </div>
      </section>

      {/* Trust pillars from door hanger */}
      <section className="section-pad">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-chestnut sm:text-4xl">
            Why Utah homeowners choose us
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-chestnut/70">
            The same promises on your door hanger — delivered by a licensed local crew.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ title, detail, icon: Icon }) => (
              <li
                key={title}
                className="rounded-2xl border border-chestnut/10 bg-white px-5 py-6 text-center shadow-sm"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-chestnut text-accent-gold">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-base font-bold uppercase tracking-wide text-chestnut">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-chestnut/70">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Social proof */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-chestnut/70">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full border border-chestnut/10 bg-cream px-3 py-1.5"
              >
                <Check className="h-3.5 w-3.5 text-primary-red" aria-hidden />
                <span className="font-semibold text-chestnut">{badge.label}</span>
              </span>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.author}
                className="rounded-2xl border border-chestnut/10 bg-cream p-5"
              >
                <Image
                  src={t.starsImage}
                  alt="5 star rating"
                  width={160}
                  height={32}
                  className="h-7 w-auto object-contain"
                  loading="lazy"
                />
                <p className="mt-3 text-sm leading-relaxed text-chestnut/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-3 text-sm font-semibold text-chestnut">
                  {t.author}
                  <span className="block font-normal text-chestnut/60">{t.location}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + CTA */}
      <section className="section-pad">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Mascot variant="jump" size={120} className="mx-auto" />
          <h2 className="mt-4 font-display text-3xl font-bold text-chestnut">
            Redeem in three easy steps
          </h2>
          <ol className="mt-8 space-y-4 text-left">
            {[
              "Start your free estimate and tell us about your property.",
              "We’ll confirm your $100 door hanger discount on your custom quote.",
              "Lock in your install date before seasonal spots are gone.",
            ].map((step, i) => (
              <li
                key={step}
                className="flex gap-3 rounded-xl border border-chestnut/10 bg-white px-4 py-3 text-sm text-chestnut/80"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-red text-xs font-bold text-warm-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Button href={ESTIMATE_HREF} variant="primary" className="w-full sm:w-auto">
              Redeem Your $100 Off — While Spots Last
            </Button>
          </div>
          <p className="mt-4 text-sm text-chestnut/60">
            Prefer to talk?{" "}
            <a href={LINKS.tel} className="font-semibold text-primary-red hover:underline">
              Call {COMPANY.phone}
            </a>
            {" · "}
            <Link href={LINKS.contact} className="font-semibold text-primary-red hover:underline">
              Contact us
            </Link>
          </p>
          <p className="mt-6 text-xs text-chestnut/45">
            Offer applies to new Christmas lights installation quotes from this door hanger
            campaign. Mention code DOORHANGER100 if asked. Licensed &amp; insured ·{" "}
            {COMPANY.license}.
          </p>
        </div>
      </section>
    </div>
  );
}
