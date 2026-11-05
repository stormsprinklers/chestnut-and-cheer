import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefcaseBusiness, CheckCircle2, Clock3, MapPin } from "lucide-react";
import { JobApplicationForm } from "@/app/careers/JobApplicationForm";
import { Breadcrumbs } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllJobs, getJobBySlug } from "@/lib/careers";
import { COMPANY } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return getAllJobs().map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.jobTitle} | Careers`,
    description: job.shortDescription,
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: {
      title: `${job.jobTitle} at ${COMPANY.name}`,
      description: job.shortDescription,
      url: `${SITE_URL}/careers/${job.slug}`,
      images: [{ url: absoluteUrl(job.image), width: 1600, height: 1067, alt: job.imageAlt }],
    },
  };
}

export default async function CareerDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ first?: string; last?: string; email?: string; phone?: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();
  const prefilled = await searchParams;
  const jobUrl = `${SITE_URL}/careers/${job.slug}`;

  const jobSchema = job.applicationsOpen ? {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.jobTitle,
    description: job.shortDescription,
    url: jobUrl,
    employmentType: "TEMPORARY",
    hiringOrganization: { "@type": "Organization", name: COMPANY.name, sameAs: SITE_URL },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: COMPANY.address.city, addressRegion: COMPANY.address.state, addressCountry: "US" },
    },
  } : null;

  return (
    <>
      <JsonLd data={[
        getOrganizationSchema(),
        getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: job.jobTitle, path: `/careers/${job.slug}` },
        ]),
        ...(jobSchema ? [jobSchema] : []),
      ]} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: job.jobTitle }]} />

      <section className="relative isolate overflow-hidden bg-chestnut">
        <Image src={job.image} alt={job.imageAlt} fill priority sizes="100vw" className="object-cover object-center opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-chestnut via-chestnut/90 to-primary-red/40" />
        <div className="relative mx-auto flex min-h-[28rem] max-w-6xl items-end px-4 py-14 sm:px-6 lg:py-20">
          <div className="max-w-3xl text-warm-white">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-accent-gold">Now hiring</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">{job.jobTitle}</h1>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="inline-flex items-center gap-2 rounded-full bg-warm-white/12 px-4 py-2 backdrop-blur"><BriefcaseBusiness className="size-4 text-accent-gold" aria-hidden />{job.employmentType}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-warm-white/12 px-4 py-2 backdrop-blur"><MapPin className="size-4 text-accent-gold" aria-hidden />{job.location}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-warm-white/12 px-4 py-2 backdrop-blur"><Clock3 className="size-4 text-accent-gold" aria-hidden />{job.schedule}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-xl leading-relaxed text-chestnut/80">{job.shortDescription}</p>
            <h2 className="mt-10 font-display text-3xl font-bold text-chestnut">What you&apos;ll do</h2>
            <ul className="mt-5 space-y-3">
              {job.responsibilities.map((item) => <li key={item} className="flex gap-3 text-chestnut/75"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-red" aria-hidden /><span>{item}</span></li>)}
            </ul>
            <h2 className="mt-10 font-display text-3xl font-bold text-chestnut">What we&apos;re looking for</h2>
            <ul className="mt-5 space-y-3">
              {job.qualifications.map((item) => <li key={item} className="flex gap-3 text-chestnut/75"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-red" aria-hidden /><span>{item}</span></li>)}
            </ul>
            <h2 className="mt-10 font-display text-3xl font-bold text-chestnut">Why join Chestnut &amp; Cheer</h2>
            <ul className="mt-5 space-y-3">
              {job.benefits.map((item) => <li key={item} className="flex gap-3 text-chestnut/75"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-red" aria-hidden /><span>{item}</span></li>)}
            </ul>
          </div>

          <aside className="h-fit rounded-[2rem] border border-chestnut/10 bg-white p-6 shadow-xl shadow-chestnut/10 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-primary-red">Position details</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="font-bold text-chestnut">Department</dt><dd className="mt-1 text-chestnut/70">{job.department}</dd></div>
              <div><dt className="font-bold text-chestnut">Location</dt><dd className="mt-1 text-chestnut/70">{job.location}</dd></div>
              <div><dt className="font-bold text-chestnut">Employment type</dt><dd className="mt-1 text-chestnut/70">{job.employmentType}</dd></div>
              <div><dt className="font-bold text-chestnut">Compensation</dt><dd className="mt-1 text-chestnut/70">{job.payRange}</dd></div>
              <div><dt className="font-bold text-chestnut">Schedule</dt><dd className="mt-1 text-chestnut/70">{job.schedule}</dd></div>
            </dl>
            <a href="#apply" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary-red px-6 py-3 font-semibold text-warm-white transition hover:bg-primary-red/90">Apply Now</a>
            <Link href="/careers" className="mt-4 block text-center text-sm font-semibold text-primary-red hover:underline">← View all openings</Link>
          </aside>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 section-pad bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-primary-red">Take the next step</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-chestnut">Apply for this position</h2>
            <p className="mt-3 text-chestnut/70">Complete our short application and tell us a little about how you work.</p>
          </div>
          <JobApplicationForm jobTitle={job.jobTitle} jobSlug={job.slug} applicationsOpen={job.applicationsOpen} prefilled={prefilled} />
        </div>
      </section>
    </>
  );
}
