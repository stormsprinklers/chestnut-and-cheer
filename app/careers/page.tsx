import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { CareersApplication } from "@/app/careers/CareersApplication";
import { Breadcrumbs } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllJobs } from "@/lib/careers";
import { ASSETS, COMPANY } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Careers | Join the Chestnut & Cheer Team",
  description:
    "Apply to join the Chestnut & Cheer Christmas lighting team in northern Utah. View open roles and submit your application online.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `Careers at ${COMPANY.name}`,
    description: "Help us make Christmas feel magical for families and businesses across Utah.",
    url: `${SITE_URL}/careers`,
    images: [{
      url: absoluteUrl(ASSETS.professionalPhotos.carryingLadderHero),
      width: 1600,
      height: 1067,
      alt: "Chestnut & Cheer Christmas light installer carrying a ladder",
    }],
  },
};

export default function CareersPage() {
  const jobs = getAllJobs();

  return (
    <>
      <JsonLd data={[
        getOrganizationSchema(),
        getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]),
      ]} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />

      <section className="relative isolate overflow-hidden bg-chestnut">
        <Image
          src={ASSETS.professionalPhotos.carryingLadderHero}
          alt="Chestnut & Cheer Christmas light installer carrying a ladder in Utah"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-chestnut via-chestnut/85 to-primary-red/35" />
        <div className="relative mx-auto grid min-h-[31rem] max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:py-20">
          <div className="max-w-2xl text-warm-white">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-accent-gold">Join the crew</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] sm:text-6xl">Careers at Chestnut &amp; Cheer</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-warm-white/85">
              Help us create the kind of Christmas magic people remember. We&apos;re building a dependable, upbeat team that takes pride in great work and genuine service.
            </p>
          </div>
          <div className="hidden justify-end lg:flex">
            <Image src={ASSETS.mascots.worker} alt="Chestnut & Cheer worker mascot" width={300} height={360} className="h-auto w-64 drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-primary-red">Fast and friendly</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-chestnut">We&apos;d love to meet you.</h2>
            <p className="mt-5 text-lg leading-relaxed text-chestnut/75">
              We appreciate your interest in joining our team. Our application is short, our questions are straightforward, and we work to keep the hiring process moving quickly.
            </p>
            <div className="mt-6 rounded-2xl border border-accent-gold/50 bg-accent-gold/15 p-5">
              <div className="flex gap-3">
                <Sparkles className="mt-0.5 size-5 shrink-0 text-primary-red" aria-hidden />
                <p className="text-sm leading-relaxed text-chestnut/75">
                  We value hard work, integrity, service, personal growth, and people who bring a little cheer to the team.
                </p>
              </div>
            </div>
          </div>
          <CareersApplication jobs={jobs} />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-primary-red">Open positions</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-chestnut">Find your place on the team</h2>
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <article key={job.slug} className="group overflow-hidden rounded-[2rem] border border-chestnut/10 bg-cream shadow-[0_12px_36px_rgba(94,59,40,0.08)]">
                <div className="relative aspect-[16/9] overflow-hidden bg-chestnut">
                  <Image src={job.image} alt={job.imageAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-primary-red">
                    <span className="rounded-full bg-primary-red/8 px-3 py-1.5">{job.employmentType}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold/25 px-3 py-1.5"><MapPin className="size-3.5" aria-hidden />{job.location}</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold text-chestnut">{job.jobTitle}</h3>
                  <p className="mt-3 leading-relaxed text-chestnut/70">{job.shortDescription}</p>
                  <p className="mt-4 text-sm font-semibold text-chestnut/80">{job.payRange}</p>
                  <Link href={`/careers/${job.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-primary-red transition hover:gap-3">
                    View role and apply <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
