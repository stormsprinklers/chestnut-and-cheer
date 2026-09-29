import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Breadcrumbs } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { getAllPosts } from "@/lib/blog/posts";
import { COMPANY, LINKS } from "@/lib/constants";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Christmas Light Installation Guides From Our Utah Crews",
  description:
    "Christmas light installation advice for rooflines, trees, clips, C7 and C9 bulbs, GFCIs, design, storage, and hiring an installer.",
  keywords: [
    "Christmas light installation guide",
    "Christmas light tips",
    "Christmas lights Utah",
    "professional holiday lighting",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Christmas Light Installation Guides | ${COMPANY.name}`,
    description:
      "Practical answers from the people who design, install, maintain, remove, and store holiday lighting in Utah.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [
      {
        url: absoluteUrl(
          "/images/photos/professional/christmas-light-technician-carrying-ladder-utah.avif",
        ),
        width: 1600,
        height: 1067,
        alt: "Chestnut & Cheer Christmas light installer in Utah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Christmas Light Installation Guides | ${COMPANY.name}`,
    description: "Real installation advice from the Chestnut & Cheer team.",
    images: [
      absoluteUrl(
        "/images/photos/professional/christmas-light-technician-carrying-ladder-utah.avif",
      ),
    ],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const hub = posts.find((post) => post.hub)!;
  const spokes = posts.filter((post) => !post.hub);

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Expert Guides", path: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Christmas Light Installation Guides",
            description: metadata.description,
            url: `${SITE_URL}/blog`,
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: post.title,
                url: absoluteUrl(`/blog/${post.slug}`),
              })),
            },
          },
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Expert Guides" }]} />

      <section className="relative overflow-hidden bg-chestnut">
        <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/45" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-9 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-warm-white sm:text-5xl">
              Christmas light installation guides
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-warm-white/80 sm:text-lg">
              Plan rooflines, wrap trees, choose bulbs, route power, prevent weather problems, and prepare every display to come down cleanly.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-warm-white/10 shadow-2xl">
            <Image
              src="/images/photos/professional/chestnut-cheer-lighting-technician-traven.avif"
              alt="Chestnut & Cheer lighting technician beside a Utah home"
              fill
              loading="eager"
              fetchPriority="high"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <article className="group grid overflow-hidden rounded-3xl border border-accent-gold/35 bg-white shadow-md lg:grid-cols-[0.95fr_1.05fr]">
            <Link
              href={`/blog/${hub.slug}`}
              className="relative min-h-64 overflow-hidden lg:min-h-full"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={hub.heroImage}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </Link>
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-red">
                Start here · Pillar guide
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-chestnut sm:text-4xl">
                <Link href={`/blog/${hub.slug}`} className="hover:text-primary-red">
                  {hub.title}
                </Link>
              </h2>
              <p className="mt-4 leading-relaxed text-chestnut/70">{hub.description}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-chestnut/55">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                {hub.readingMinutes} minute read · Updated September 2026
              </p>
              <Link
                href={`/blog/${hub.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-red"
              >
                Read the complete guide
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-red">
              Focused field guides
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-chestnut sm:text-4xl">
              Go straight to the part of the job you&apos;re planning
            </h2>
            <p className="mt-4 leading-relaxed text-chestnut/70">
              Each shorter guide answers one practical question and connects back to the full installation system.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {spokes.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-chestnut text-warm-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-gold">
            Prefer to hand us the ladder?
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Get a custom lighting plan for your property
          </h2>
          <p className="mt-4 max-w-2xl text-warm-white/75">
            We design, install, maintain, remove, and store seasonal displays across {COMPANY.serviceAreaSummary}.
          </p>
          <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href={LINKS.estimate} variant="gold" className="w-full sm:w-auto">
              Get Instant Estimate
            </Button>
            <Button
              href={LINKS.residentialLighting}
              variant="outline"
              className="w-full border-warm-white/30 text-warm-white hover:bg-warm-white/10 sm:w-auto"
            >
              See Residential Service
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
