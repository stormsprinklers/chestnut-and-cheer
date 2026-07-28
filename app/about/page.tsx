import type { Metadata } from "next";
import Link from "next/link";
import { ContentSection, PageHero } from "@/components/pages/PageChrome";
import { Button } from "@/components/ui/Button";
import { COMPANY, LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${COMPANY.name} — professional Christmas light installation for homes and businesses in Utah County and Salt Lake County. Licensed ${COMPANY.license}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={COMPANY.tagline}
        title={`About ${COMPANY.name}`}
        description="Premium holiday lighting for residential and commercial properties — custom design, professional install, and service you can trust."
      />
      <ContentSection>
        <div className="space-y-6 text-chestnut/80 leading-relaxed">
          <p>
            {COMPANY.name} installs temporary and permanent Christmas lighting for
            homes and businesses across {COMPANY.serviceAreas.join(" and ")}. We&apos;re
            based in {COMPANY.address.city}, Utah, and we&apos;re serious about
            displays that look sharp, hold up all season, and come down clean when
            the holidays are over.
          </p>
          <p>
            Whether you want a classic seasonal install with storage, permanent
            architectural LEDs, commercial storefront lighting, or gutter cleaning
            while we&apos;re on the roof — our team handles design, install, and
            follow-through.
          </p>
          <h2 className="font-display text-2xl font-bold text-chestnut pt-2">
            What we stand for
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Commercial-grade materials — we don&apos;t install customer-owned lights</li>
            <li>Free consultations via Google Meet or in person</li>
            <li>In-season maintenance and free bulb replacement</li>
            <li>Licensed &amp; insured — Utah DOPL license {COMPANY.license}</li>
          </ul>
          <h2 className="font-display text-2xl font-bold text-chestnut pt-2">
            Visit or reach us
          </h2>
          <p>
            {COMPANY.address.full}
            <br />
            <a href={LINKS.tel} className="text-primary-red underline">
              {COMPANY.phone}
            </a>
            {" · "}
            <a href={LINKS.mailto} className="text-primary-red underline">
              {COMPANY.email}
            </a>
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={LINKS.estimate} variant="primary">
            Get Instant Estimate
          </Button>
          <Button href={LINKS.contact} variant="outline">
            Contact Us
          </Button>
        </div>
        <p className="mt-6 text-sm text-chestnut/60">
          Explore{" "}
          <Link href={LINKS.seasonalLighting} className="underline hover:text-primary-red">
            seasonal lighting
          </Link>
          ,{" "}
          <Link href={LINKS.permanentLighting} className="underline hover:text-primary-red">
            permanent lighting
          </Link>
          , or our{" "}
          <Link href={LINKS.blog} className="underline hover:text-primary-red">
            blog
          </Link>
          .
        </p>
      </ContentSection>
    </>
  );
}
