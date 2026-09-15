import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  Palette,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Chestnut & Cheer | Christmas Light Installation in Utah",
  description:
    "Meet Chestnut & Cheer, the Utah team creating premium, fully managed Christmas lighting experiences for homes and businesses across Utah County and Salt Lake County.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${COMPANY.name} | Christmas Light Installation in Utah`,
    description:
      "Premium design, installation, service, takedown, and storage—made to help Christmas feel magical again.",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: absoluteUrl(ASSETS.beforeAfter.after),
        width: 1600,
        height: 1067,
        alt: "A Utah home transformed with Chestnut & Cheer Christmas lighting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${COMPANY.name}`,
    description: "Making Christmas feel magical again across Utah.",
    images: [absoluteUrl(ASSETS.beforeAfter.after)],
  },
};

const experienceSteps = [
  {
    title: "A cheerful start",
    description: "A simple quote process and thoughtful guidance from the first hello.",
    icon: Sparkles,
  },
  {
    title: "A design that feels like you",
    description: "We listen to the mood, traditions, and features you want your home to celebrate.",
    icon: Palette,
  },
  {
    title: "The details are handled",
    description: "Installation, responsive in-season service, takedown, and storage all stay with us.",
    icon: Wrench,
  },
] as const;

const values = [
  {
    title: "Magic",
    description: "The kind that makes a drive home feel a little more exciting and a family photo feel worth keeping.",
  },
  {
    title: "Care",
    description: "Thoughtful design, clean craftsmanship, and a team that treats your home and time with real respect.",
  },
  {
    title: "Cheer",
    description: "Warm people, a little personality, and a bigger hope that the season reaches beyond our own customers.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          getOrganizationSchema(),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <PageHero
        eyebrow="A better kind of Christmas light company"
        title="Making Christmas Feel Magical Again."
        description="Chestnut & Cheer creates premium, fully managed Christmas lighting experiences for families and businesses across Utah. You dream it up; we handle the rest."
        ctaHref={LINKS.estimate}
        ctaLabel="Design My Christmas"
        image={ASSETS.beforeAfter.after}
        imageAlt="A Utah home illuminated for Christmas by Chestnut & Cheer"
      />

      <section className="section-pad bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-red">
              Why we exist
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">
              Christmas should still feel like something special is about to happen.
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-chestnut/75">
              <p>
                Chestnut &amp; Cheer started with the Christmases you remember for the
                feeling, not for how much was spent: quieter family traditions, a warm
                home, and the anticipation that built as December arrived.
              </p>
              <p>
                Our founder grew up loving that feeling. His family decorated like so
                many families do, but never had the big exterior display that could
                make an entire home—or a whole street—feel transformed. That small
                wish became the spark for Chestnut &amp; Cheer.
              </p>
              <p>
                We are here to help people create those moments for the people they
                love, with professional Christmas light installation that feels easy,
                personal, and genuinely fun from the first conversation to the last
                strand packed away.
              </p>
            </div>
          </div>
          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-chestnut shadow-xl">
            <Image
              src={ASSETS.photos.hero}
              alt="Chestnut & Cheer technician arriving for a Christmas light installation in Utah"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-chestnut/75 to-transparent px-5 pb-5 pt-16">
              <figcaption className="max-w-sm text-sm leading-relaxed text-warm-white/90">
                A little more anticipation. A little less to-do list.
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section className="section-pad below-fold bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-red">
              More than Christmas lights
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">
              The experience should feel like part of Christmas, too.
            </h2>
            <p className="mt-4 leading-relaxed text-chestnut/70">
              Great lighting is only part of the picture. The process around it should
              leave you excited for the season—not managing another project.
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {experienceSteps.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-chestnut/10 bg-cream p-6 shadow-[0_8px_24px_rgba(94,59,40,0.05)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-gold/25 text-chestnut">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-chestnut">{title}</h3>
                <p className="mt-3 leading-relaxed text-chestnut/70">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-chestnut/65">
            Every temporary installation includes professional design and installation,
            in-season maintenance, takedown, and off-season storage. The goal is
            simple: all the Christmas, without the ladder, tangled lights, or January
            cleanup.
          </p>
        </div>
      </section>

      <section className="section-pad below-fold overflow-hidden bg-chestnut">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <figure className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl border border-warm-white/10 shadow-2xl lg:order-1">
            <Image
              src={ASSETS.professionalPhotos.travenHero}
              alt="A Chestnut & Cheer Christmas lighting technician at a Utah home"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="lazy"
            />
          </figure>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-gold">
              The people at your home
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-warm-white sm:text-4xl">
              People you&apos;re happy to have at your home.
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-warm-white/78">
              <p>
                Inviting a crew to your home is personal. We take that seriously in
                the way we choose, prepare, and support our team.
              </p>
              <p>
                Every Chestnut &amp; Cheer team member is background checked, trained,
                and selected for professionalism, friendliness, and the kind of
                character we would feel good about sending to our own family&apos;s home.
              </p>
              <p>
                You can expect clear communication, care around your property, and a
                crew that is there to make the season easier—not add friction to it.
              </p>
            </div>
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-accent-gold/30 bg-warm-white/5 p-4 text-warm-white/85">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-gold" aria-hidden />
              <p className="text-sm leading-relaxed">
                Licensed and insured in Utah, with commercial-grade materials and a
                trained crew behind every installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad below-fold bg-primary-red">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <HeartHandshake className="mx-auto h-8 w-8 text-accent-gold" aria-hidden />
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-accent-gold">
            More Christmas. More cheer.
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-warm-white sm:text-4xl">
            Your Christmas can brighten another.
          </h2>
          <div className="mx-auto mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-warm-white/85">
            <p>
              Every Christmas season, Chestnut &amp; Cheer plans to create a free,
              complete Christmas experience for five local families who deserve a
              magical season but may not otherwise be able to afford one.
            </p>
            <p>
              It is not a vague promise tucked into the fine print. It is part of why
              this company exists: to put lights on homes, yes, but also to help make
              more Christmas memories possible right here in our community.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-warm-white/65">
            We&apos;re building the details of this program carefully and will share
            nomination information as it becomes available.
          </p>
        </div>
      </section>

      <section className="section-pad below-fold bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-red">
              What we want to be known for
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">
              Not a corporate checklist. Just the things that matter.
            </h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-chestnut/10 bg-white p-7 text-center">
                <p className="font-display text-3xl font-bold text-primary-red">{value.title}</p>
                <p className="mt-4 leading-relaxed text-chestnut/70">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad below-fold bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-red">
            Your season starts here
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">
            Let&apos;s make this Christmas magical.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-chestnut/70">
            Tell us what you want your home, business, or neighborhood to feel like.
            We&apos;ll help turn that feeling into a lighting plan that is all yours.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={LINKS.estimate} variant="primary" className="w-full sm:w-auto">
              Design My Christmas
            </Button>
            <Button href={LINKS.contact} variant="outline" className="w-full sm:w-auto">
              Talk With Our Team
            </Button>
          </div>
          <p className="mt-7 text-sm text-chestnut/60">
            Looking for details first? Explore our{" "}
            <Link href={LINKS.residentialLighting} className="font-semibold text-primary-red hover:underline">
              residential lighting service
            </Link>
            {" "}or{" "}
            <Link href={LINKS.pricing} className="font-semibold text-primary-red hover:underline">
              Christmas light installation pricing
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
