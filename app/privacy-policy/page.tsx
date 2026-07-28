import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/pages/PageChrome";
import { COMPANY, LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${COMPANY.name}. How we collect, use, and protect personal information for Christmas lighting customers in Utah.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDoc title="Privacy Policy" effectiveDate="7/27/2026">
      <h2>Introduction</h2>
      <p>
        {COMPANY.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to
        protecting your privacy. This Privacy Policy explains how we collect, use, and
        protect personal information when you visit our website, request estimates,
        communicate with us, or opt in to receive text messages. This policy applies to
        customers and website visitors in {COMPANY.serviceAreas.join(" and ")}, Utah, and
        other areas we service.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information necessary to provide holiday lighting services and support, including:</p>
      <p>
        <strong>Contact Information</strong> — Name, service address, phone number, and
        email address.
      </p>
      <p>
        <strong>Service Information</strong> — Details related to property features,
        lighting preferences, photos you upload, scheduling needs, and estimate requests.
      </p>
      <p>
        <strong>Website Usage Information</strong> — Information automatically collected
        when visiting our website, such as IP address, browser type, device information,
        and pages visited, collected through cookies or similar technologies.
      </p>
      <p>
        <strong>Human verification</strong> — We may use Cloudflare Turnstile or similar
        tools to protect forms from automated abuse. These tools may process limited
        technical data as described in their own privacy policies.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Providing estimates, design consultations, installation, and maintenance</li>
        <li>Scheduling appointments and responding to inquiries</li>
        <li>Communicating service updates, confirmations, and customer support</li>
        <li>Improving our website and services</li>
        <li>Sending marketing messages only when you have opted in</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>
        We do not sell your personal information. We may share information with trusted
        service providers who help us operate (for example CRM, hosting, messaging, or
        payment processors), strictly as needed to deliver services. We may also disclose
        information when required by law.
      </p>

      <h2>4. SMS / Text Messaging</h2>
      <p>
        If you consent to receive texts about your quote or services, message frequency
        varies. Message and data rates may apply. Reply STOP to opt out. Consent is not a
        condition of purchase.
      </p>

      <h2>5. Data Security & Retention</h2>
      <p>
        We take reasonable measures to protect personal information. We retain information
        only as long as needed for business, legal, or operational purposes.
      </p>

      <h2>6. Your Choices</h2>
      <p>
        You may request access, correction, or deletion of your personal information by
        contacting us using the details below.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        Email: <a href={LINKS.mailto}>{COMPANY.email}</a>
        <br />
        Phone: <a href={LINKS.tel}>{COMPANY.phone}</a>
        <br />
        Address: {COMPANY.address.full}
      </p>
      <p>
        See also our <Link href={LINKS.terms}>Terms of Service</Link> and{" "}
        <Link href={LINKS.accessibility}>Accessibility Statement</Link>.
      </p>
    </LegalDoc>
  );
}
