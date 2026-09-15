import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Breadcrumbs } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/constants";
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${COMPANY.name} for Christmas light installation quotes in Utah County & Salt Lake County. Call, text, email, or send a message online.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <><JsonLd data={[getOrganizationSchema(), getBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} /><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} /><Contact standalone /></>;
}
