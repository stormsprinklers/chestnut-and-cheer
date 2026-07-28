import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LINKS } from "@/lib/constants";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  ctaHref = LINKS.estimate,
  ctaLabel = "Get Instant Estimate",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-chestnut">
      <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/40" />
      <div className="relative mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
        {eyebrow ? (
          <p className="mb-3 inline-block rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold text-accent-gold sm:text-sm">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl font-bold leading-tight text-warm-white sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-warm-white/80 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
};

export function ServicePage({
  eyebrow,
  title,
  description,
  highlights,
  sections,
}: ServicePageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
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
