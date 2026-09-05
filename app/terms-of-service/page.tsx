import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/pages/PageChrome";
import { COMPANY, LINKS, SMS_PROGRAM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${COMPANY.name}. Policies for estimates, services, payments, cancellations, and website use.`,
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <LegalDoc title="Terms of Service" effectiveDate="9/5/2026">
      <h2>1. Introduction</h2>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of the website and
        services provided by {COMPANY.name} (&quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;). By using our website, requesting an estimate, or hiring us, you
        agree to these Terms.
      </p>
      <p>
        Business Name: {COMPANY.name}
        <br />
        Phone: {COMPANY.phone}
        <br />
        Email: {COMPANY.email}
        <br />
        License: {COMPANY.license}
      </p>

      <h2>2. Services Offered</h2>
      <p>
        We provide residential and commercial holiday lighting services, including
        seasonal Christmas light installation, permanent lighting, related maintenance,
        takedown/storage where applicable, and optional gutter cleaning. We are licensed
        through the Utah Department of Occupational and Professional Licensing (DOPL).
      </p>

      <h2>3. Estimates and Pricing</h2>
      <p>
        Online and consultation estimates are informational and may be adjusted after a
        property review. Final pricing is confirmed before work begins. Scope changes may
        affect price.
      </p>

      <h2>4. Payments</h2>
      <p>
        Payment terms are provided with your quote or invoice. Deposits may be required
        for larger projects. Failure to pay may result in suspension of services and
        lawful collection remedies.
      </p>

      <h2>5. Scheduling & Cancellation</h2>
      <p>
        Install dates are subject to weather, crew availability, and access to the
        property. Please provide reasonable notice if you need to reschedule. Late
        cancellations may incur fees as stated in your agreement.
      </p>

      <h2>6. Customer Responsibilities</h2>
      <p>
        You agree to provide safe access to the property, disclose known roof or electrical
        concerns, and ensure pets and obstacles are secured during service.
      </p>

      <h2>7. Warranties</h2>
      <p>
        Permanent lighting products may include manufacturer or installer warranties as
        described in your proposal (including multi-year coverage where offered). Seasonal
        installs include in-season maintenance and bulb replacement as described at the
        time of sale.
      </p>

      <h2>8. Website Use</h2>
      <p>
        Content on this website is for general information. We may update services,
        pricing ranges, and policies without notice. Do not misuse forms, attempt to
        disrupt the site, or submit unlawful content.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {COMPANY.name} is not liable for indirect,
        incidental, or consequential damages arising from use of the website or services,
        except where prohibited by Utah law.
      </p>

      <h2>10. SMS / Text Messaging Program Terms</h2>
      <p>
        <strong>Program name:</strong> {COMPANY.name} SMS alerts.
      </p>
      <p>
        <strong>Product description:</strong> If you opt in by providing your mobile
        number and checking the SMS consent box on our website, you agree to receive
        recurring text messages from {COMPANY.name} at the number you provide. Messages
        include {SMS_PROGRAM.types}.
      </p>
      <p>
        <strong>Message frequency:</strong> {SMS_PROGRAM.frequency}
      </p>
      <p>
        <strong>Cost:</strong> Message and data rates may apply. {COMPANY.name} does not
        charge a separate fee for the SMS program. Your wireless carrier may charge
        standard messaging and data rates. Carriers are not liable for delayed or
        undelivered messages.
      </p>
      <p>
        <strong>Opt-out:</strong> Reply STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, or QUIT
        to any message to unsubscribe. You will receive a confirmation, and no further
        messages will be sent unless you opt in again.
      </p>
      <p>
        <strong>Help:</strong> Reply HELP for help, or contact customer care at{" "}
        <a href={LINKS.tel}>{COMPANY.phone}</a> or{" "}
        <a href={LINKS.mailto}>{COMPANY.email}</a>.
      </p>
      <p>
        {SMS_PROGRAM.notRequired} See our{" "}
        <Link href={LINKS.privacy}>Privacy Policy</Link> for how we collect, use, and
        protect mobile numbers and SMS opt-in data.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href={LINKS.mailto}>{COMPANY.email}</a> or{" "}
        <a href={LINKS.tel}>{COMPANY.phone}</a>. See our{" "}
        <Link href={LINKS.privacy}>Privacy Policy</Link>.
      </p>
    </LegalDoc>
  );
}
