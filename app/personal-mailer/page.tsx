import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Check, Heart, MapPin, Sparkles } from "lucide-react";
import { MailerQuoteForm } from "@/components/mailer/MailerQuoteForm";
import { COMPANY } from "@/lib/constants";
import { absoluteUrl } from "@/lib/site";

const description =
  "Meet Austin Green and request a personalized Christmas lighting quote from Chestnut & Cheer using the offer on your postcard.";

const photos = {
  austin: "/images/postcards/austin-green.webp",
  family: "/images/postcards/austin-emma.webp",
  warmWhite: "/images/postcards/project-warm-white-panorama.webp",
  warmWhiteTree: "/images/postcards/project-warm-white-tree.webp",
  redGreen: "/images/postcards/project-red-green.webp",
} as const;

export const metadata: Metadata = {
  title: "A Personal Note from Chestnut & Cheer",
  description,
  alternates: { canonical: "/personal-mailer" },
  robots: { index: false, follow: true },
  openGraph: {
    title: `A Personal Note from Austin | ${COMPANY.name}`,
    description,
    url: absoluteUrl("/personal-mailer"),
    images: [{ url: absoluteUrl(photos.family), alt: "Austin and Emma Green" }],
  },
};

const recentProjects = [
  {
    src: photos.warmWhite,
    alt: "Warm white Christmas lights outlining a Utah home at night",
    label: "Warm white rooflines",
  },
  {
    src: photos.redGreen,
    alt: "Red and green Christmas lights outlining a two-story home at dusk",
    label: "Classic red & green",
  },
  {
    src: photos.warmWhiteTree,
    alt: "Warm white Christmas lights on a home beneath a large tree",
    label: "Clean, custom-fit installs",
  },
] as const;

export default function PersonalMailerPage() {
  return (
    <div className="overflow-hidden bg-[#f2eadf]">
      <section className="relative isolate border-b border-chestnut/10">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,#fffaf0_0%,#f7efdf_58%,#ead6b9_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(#8b1e3f_0.7px,transparent_0.7px)] [background-size:18px_18px]" />

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_.9fr] lg:items-start lg:gap-16 lg:py-20">
          <div className="lg:sticky lg:top-8">
            <div className="inline-flex -rotate-1 items-center gap-2 border-2 border-primary-red bg-cream px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-primary-red shadow-[4px_4px_0_#e6c27a]">
              <Heart className="size-4 fill-current" aria-hidden />
              A note from your local installer
            </div>

            <div className="mt-8 flex items-center gap-5 sm:gap-7">
              <div className="rotate-[-3deg] bg-white p-2 pb-7 shadow-xl shadow-chestnut/15">
                <Image
                  src={photos.austin}
                  alt="Austin Green, owner of Chestnut & Cheer"
                  width={200}
                  height={200}
                  priority
                  className="size-28 object-cover sm:size-36"
                />
                <p className="mt-2 text-center text-sm font-semibold text-chestnut">Hi, I&apos;m Austin!</p>
              </div>
              <div className="max-w-48 text-sm leading-relaxed text-chestnut/75 sm:text-base">
                <MapPin className="mb-2 size-5 text-primary-red" aria-hidden />
                BYU grad, local business owner, and very excited to make Utah homes shine.
              </div>
            </div>

            <h1 className="mt-9 max-w-2xl font-display text-5xl font-semibold leading-[1.02] text-chestnut sm:text-6xl lg:text-7xl">
              Let&apos;s make your home the one everyone slows down to see.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-chestnut/80 sm:text-xl">
              Send me the details from your postcard and I&apos;ll put together a Christmas lighting quote for your home.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Rooflines", "Tree wraps", "Permanent lights"].map((service) => (
                <span key={service} className="inline-flex items-center gap-2 rounded-full border border-chestnut/15 bg-white/70 px-4 py-2 text-sm font-semibold text-chestnut shadow-sm">
                  <Check className="size-4 text-primary-red" strokeWidth={3} aria-hidden />
                  {service}
                </span>
              ))}
            </div>

            <a href="#personal-mailer-form" className="mt-9 inline-flex items-center gap-2 font-semibold text-primary-red underline decoration-accent-gold decoration-4 underline-offset-4 lg:hidden">
              Get my quote
              <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>

          <MailerQuoteForm
            endpoint="/api/personal-mailer"
            analyticsForm="personal_mailer_quote"
            formId="personal-mailer"
            eyebrow="Your postcard"
            title="Tell me where to bring the cheer"
          />
        </div>
      </section>

      <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">
          <div className="relative">
            <div className="absolute -left-3 -top-3 z-10 h-10 w-24 -rotate-6 bg-accent-gold/80 shadow-sm" aria-hidden />
            <div className="rotate-[-1deg] border border-chestnut/10 bg-white p-3 pb-12 shadow-2xl shadow-chestnut/15">
              <div className="relative aspect-[16/11] overflow-hidden bg-chestnut/5">
                <Image src={photos.family} alt="Austin and Emma Green sharing their pregnancy announcement" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-4 text-center font-display text-xl font-semibold text-chestnut">Austin + Emma, with one more arriving in January</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[.2em] text-primary-red">The person behind the postcard</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-chestnut sm:text-5xl">A little about me</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-chestnut/80">
              <p>
                My name is Austin Green. I graduated from BYU this year, and my wife Emma and I are expecting our first baby in January.
              </p>
              <p>
                I love learning languages, helping people, and running my business. I never had Christmas lights growing up, so I&apos;m especially excited to be installing them around the area now.
              </p>
              <p>
                We can take care of a classic roofline, wrap your trees, or help with permanent lighting too. I&apos;d love to hear what you have in mind.
              </p>
            </div>
            <a href="#personal-mailer-form" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primary-red px-7 py-3 font-semibold text-warm-white shadow-lg shadow-primary-red/20 transition hover:bg-primary-red/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut">
              Get a quote from Austin
            </a>
          </div>
        </div>
      </section>

      <section className="bg-chestnut px-4 py-16 text-warm-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[.2em] text-accent-gold">
                <Sparkles className="size-4" aria-hidden />
                Recent work
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">A few homes we&apos;ve lit lately</h2>
            </div>
            <p className="max-w-md text-warm-white/70">Real installs, custom-fit to each home and photographed right here after the lights came on.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {recentProjects.map((project, index) => (
              <figure key={project.src} className={`${index === 1 ? "md:-translate-y-3" : ""} overflow-hidden rounded-sm bg-cream p-2 pb-5 shadow-2xl shadow-black/25`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-chestnut/20">
                  <Image src={project.src} alt={project.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 hover:scale-[1.03]" />
                </div>
                <figcaption className="px-2 pt-4 text-center font-display text-xl font-semibold text-chestnut">{project.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent-gold px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-3xl font-semibold text-chestnut">Ready to make your home merry &amp; bright?</p>
            <p className="mt-2 text-chestnut/75">Use the postcard form and I&apos;ll be in touch.</p>
          </div>
          <a href="#personal-mailer-form" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-chestnut px-7 py-3 font-semibold text-warm-white transition hover:bg-primary-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut">
            Request my quote
          </a>
        </div>
      </section>
    </div>
  );
}
