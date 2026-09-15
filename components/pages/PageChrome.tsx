import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LINKS } from "@/lib/constants";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-chestnut/10 bg-cream">
      <ol className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3 text-sm text-chestnut/65 sm:px-6">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary-red">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-chestnut">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  ctaHref = LINKS.estimate,
  ctaLabel = "Get Instant Estimate",
  image,
  imageAlt = "Chestnut & Cheer Christmas light installation technician in Utah",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-chestnut">
      <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/40" />
      <div className={`relative mx-auto px-4 py-12 sm:px-6 sm:py-16 ${image ? "grid max-w-6xl items-center gap-8 text-left lg:grid-cols-[1fr_0.9fr]" : "max-w-3xl text-center"}`}>
        <div>
        {eyebrow ? (
          <p className="mb-3 inline-block rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold text-accent-gold sm:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-bold leading-tight text-warm-white sm:text-5xl">
          {title}
        </h1>
        <p className={`${image ? "" : "mx-auto"} mt-4 max-w-2xl text-base leading-relaxed text-warm-white/80 sm:text-lg`}>
          {description}
        </p>
        <div className={`mt-8 flex flex-col items-center gap-3 sm:flex-row ${image ? "justify-start" : "justify-center"}`}>
          <Button href={ctaHref} variant="gold" className="w-full sm:w-auto">
            {ctaLabel}
          </Button>
          <Button
            href={LINKS.tel}
            variant="outline"
            className="w-full border-warm-white/30 text-warm-white hover:bg-warm-white/10 sm:w-auto"
          >
            Call Us
          </Button>
        </div>
        </div>
        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-warm-white/10 shadow-2xl">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
              fetchPriority="high"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

type ContentSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function ContentSection({ children, className = "" }: ContentSectionProps) {
  return (
    <section className={`section-pad bg-cream ${className}`.trim()}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

type LegalDocProps = {
  title: string;
  effectiveDate?: string;
  children: React.ReactNode;
};

export function LegalDoc({ title, effectiveDate, children }: LegalDocProps) {
  return (
    <>
      <section className="bg-chestnut">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="font-display text-3xl font-bold text-warm-white sm:text-4xl">{title}</h1>
          {effectiveDate ? (
            <p className="mt-3 text-sm text-warm-white/70">Effective Date: {effectiveDate}</p>
          ) : null}
        </div>
      </section>
      <section className="section-pad bg-cream">
        <div className="prose-legal mx-auto max-w-3xl space-y-5 px-4 text-chestnut/85 sm:px-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-chestnut [&_h2]:pt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-primary-red [&_a]:underline">
          {children}
        </div>
      </section>
    </>
  );
}

type ServicePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  sections: { heading: string; body: string }[];
  heroImage?: string;
  heroImageAlt?: string;
  breadcrumbs?: BreadcrumbItem[];
  relatedLinks?: { label: string; href: string }[];
};

export function ServicePage({
  eyebrow,
  title,
  description,
  highlights,
  sections,
  heroImage,
  heroImageAlt,
  breadcrumbs,
  relatedLinks = [],
}: ServicePageProps) {
  return (
    <>
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      <PageHero eyebrow={eyebrow} title={title} description={description} image={heroImage} imageAlt={heroImageAlt} />
      <ContentSection>
        <ul className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-chestnut/10 bg-white px-4 py-3 text-sm text-chestnut/85"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-2xl font-bold text-chestnut">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-chestnut/75">{section.body}</p>
            </div>
          ))}
        </div>
        {relatedLinks.length > 0 ? (
          <div className="mt-10 border-t border-chestnut/10 pt-8">
            <h2 className="font-display text-2xl font-bold text-chestnut">Continue planning your lighting</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-chestnut/15 bg-white px-4 py-2 text-sm font-semibold text-chestnut hover:border-primary-red hover:text-primary-red">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-10 rounded-2xl border border-accent-gold/40 bg-accent-gold/10 px-5 py-6 text-center">
          <p className="font-display text-xl font-semibold text-chestnut">
            Ready for a custom quote?
          </p>
          <p className="mt-2 text-sm text-chestnut/70">
            Most quotes can be completed remotely in just a few minutes.
          </p>
          <div className="mt-4">
            <Button href={LINKS.estimate} variant="primary">
              Get Instant Estimate
            </Button>
          </div>
          <p className="mt-4 text-xs text-chestnut/50">
            Looking for something else?{" "}
            <Link href="/contact" className="underline hover:text-primary-red">
              Contact us
            </Link>
            .
          </p>
        </div>
      </ContentSection>
    </>
  );
}
