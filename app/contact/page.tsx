import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${COMPANY.name} for Christmas light installation quotes in Utah County & Salt Lake County. Call, text, email, or send a message online.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
