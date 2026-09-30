import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Clock3, Quote, ShieldCheck } from "lucide-react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { RichText } from "@/components/blog/RichText";
import { Breadcrumbs } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { ParallaxHeroImage } from "@/components/motion/ParallaxHeroImage";
import { Button } from "@/components/ui/Button";
import {
  BLOG_POSTS,
  getArticleWordCount,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/posts";
import { COMPANY, LINKS } from "@/lib/constants";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { getBreadcrumbSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Expert Guides" };

  const canonical = `/blog/${post.slug}`;
  const image = absoluteUrl(post.heroImage);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: `${COMPANY.name} Installation Team`, url: `${SITE_URL}/about` }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: absoluteUrl(canonical),
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [`${SITE_URL}/about`],
      tags: post.tags,
      images: [{ url: image, width: 1600, height: 1067, alt: post.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const relatedPosts = getRelatedPosts(post);
  const wordCount = getArticleWordCount(post);

  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Expert Guides", path: "/blog" },
            { name: post.shortTitle, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${absoluteUrl(path)}#article`,
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.modified,
            mainEntityOfPage: absoluteUrl(path),
            url: absoluteUrl(path),
            image: [absoluteUrl(post.heroImage)],
            thumbnailUrl: absoluteUrl(post.heroImage),
            author: {
              "@type": "Organization",
              name: `${COMPANY.name} Installation Team`,
              url: `${SITE_URL}/about`,
            },
            publisher: { "@id": `${SITE_URL}/#organization` },
            isPartOf: {
              "@type": "Blog",
              "@id": `${SITE_URL}/blog#blog`,
              name: `${COMPANY.name} Expert Guides`,
              url: `${SITE_URL}/blog`,
            },
            inLanguage: "en-US",
            articleSection: post.tags,
            keywords: post.keywords.join(", "),
            wordCount,
            about: post.tags.map((tag) => ({ "@type": "Thing", name: tag })),
          },
        ]}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Expert Guides", href: "/blog" },
          { label: post.shortTitle },
        ]}
      />

      <header className="relative flex min-h-[min(64vh,620px)] items-center overflow-hidden bg-chestnut text-warm-white">
        <ParallaxHeroImage src={post.heroImage} alt={post.heroAlt} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-gold">
              {post.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-warm-white/80 sm:text-lg">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-warm-white/65">
              <span>By the {COMPANY.name} installation team</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.modified}>Updated September 29, 2026</time>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-14 lg:py-16">
          <article className="min-w-0">
            <aside className="rounded-2xl border border-accent-gold/45 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="takeaways-title">
              <h2 id="takeaways-title" className="font-display text-2xl font-bold text-chestnut">
                What our crews want homeowners to know
              </h2>
              <ul className="mt-4 space-y-3">
                {post.takeaways.map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-3 text-sm leading-relaxed text-chestnut/75 sm:text-base">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-red text-warm-white">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </aside>

            <details className="mt-6 rounded-2xl border border-chestnut/10 bg-white px-5 py-4 lg:hidden">
              <summary className="cursor-pointer font-semibold text-chestnut">On this page</summary>
              <nav aria-label="Article table of contents" className="mt-4">
                <ol className="space-y-2 text-sm text-chestnut/70">
                  {post.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="hover:text-primary-red">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>

            {post.expertQuote ? (
              <blockquote className="relative my-10 overflow-hidden rounded-2xl bg-chestnut px-6 py-7 text-warm-white shadow-sm sm:px-8">
                <Quote className="absolute -right-2 -top-3 h-20 w-20 text-accent-gold/10" aria-hidden="true" />
                <p className="relative font-display text-xl font-semibold leading-relaxed sm:text-2xl">
                  “{post.expertQuote}”
                </p>
                <footer className="relative mt-4 flex items-center gap-2 text-sm text-warm-white/65">
                  <ShieldCheck className="h-4 w-4 text-accent-gold" aria-hidden="true" />
                  From the Chestnut &amp; Cheer installation team
                </footer>
              </blockquote>
            ) : null}

            <div className="space-y-11">
              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-display text-3xl font-bold leading-tight text-chestnut">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-5 text-base leading-8 text-chestnut/78 sm:text-[1.0625rem]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 64)}>
                        <RichText text={paragraph} />
                      </p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-5 space-y-3 rounded-2xl border border-chestnut/10 bg-white p-5 sm:p-6">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 leading-relaxed text-chestnut/78">
                          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary-red" aria-hidden="true" />
                          <RichText text={bullet} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.image ? (
                    <figure className="mt-7 overflow-hidden rounded-2xl border border-chestnut/10 bg-white shadow-sm">
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 740px"
                        />
                      </div>
                      {section.image.caption ? (
                        <figcaption className="px-4 py-3 text-sm leading-relaxed text-chestnut/60">
                          {section.image.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : null}
                </section>
              ))}
            </div>

          </article>

          <aside className="sticky top-28 hidden rounded-2xl border border-chestnut/10 bg-white p-5 shadow-sm lg:block" aria-label="Article navigation">
            <p className="font-display text-lg font-bold text-chestnut">On this page</p>
            <nav className="mt-4">
              <ol className="space-y-3 border-l border-chestnut/10 pl-4 text-sm leading-snug text-chestnut/65">
                {post.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="transition-colors hover:text-primary-red">
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <Link href="/blog" className="mt-6 inline-flex text-sm font-semibold text-primary-red hover:underline">
              All expert guides
            </Link>
          </aside>
        </div>

        <section className="border-y border-chestnut/10 bg-white py-12 sm:py-16" aria-labelledby="service-links-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="service-links-title" className="font-display text-3xl font-bold text-chestnut">
              Put the advice to work
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {post.serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-2xl border border-chestnut/10 bg-cream p-5 transition hover:-translate-y-0.5 hover:border-primary-red/30 hover:shadow-md"
                >
                  <h3 className="font-display text-xl font-bold text-chestnut group-hover:text-primary-red">
                    {link.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-chestnut/65">{link.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-red">
                    Continue <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-cream" aria-labelledby="related-guides-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-red">Keep planning</p>
                <h2 id="related-guides-title" className="mt-2 font-display text-3xl font-bold text-chestnut">
                  Related field guides
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-primary-red hover:underline">
                Browse all guides
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <ArticleCard key={related.slug} post={related} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary-red py-12 text-warm-white sm:py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to skip the ladder?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-warm-white/80">
              {COMPANY.name} serves {COMPANY.serviceAreaSummary} with custom seasonal lighting, in-season maintenance, takedown, and storage.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={LINKS.estimate} variant="gold" className="w-full sm:w-auto">
                Get Instant Estimate
              </Button>
              <Button
                href={LINKS.tel}
                variant="outline"
                className="w-full border-warm-white/30 text-warm-white hover:bg-warm-white/10 sm:w-auto"
              >
                Call {COMPANY.phone}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
