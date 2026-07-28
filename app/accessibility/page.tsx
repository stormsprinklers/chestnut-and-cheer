import type { Metadata } from "next";
import { LegalDoc } from "@/components/pages/PageChrome";
import { COMPANY, LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `${COMPANY.name} accessibility commitment for utah.christmas — WCAG-minded design for customers across Utah County and Salt Lake County.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalDoc title="Accessibility Statement">
      <p>
        {COMPANY.name} is committed to providing an accessible online experience for all
        customers, including individuals with disabilities. We want every homeowner,
        property manager, and business we serve to be able to learn about our services,
        request an estimate, and communicate with our team.
      </p>

      <h2>Our Commitment</h2>
      <p>
        We strive to follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA,
        and we continue improving our site. Our efforts include:
      </p>
      <ul>
        <li>Clear page structure, readable text, and consistent navigation</li>
        <li>Alt text for meaningful images and labels for interactive elements</li>
        <li>Compatibility with modern browsers, screen readers, and mobile devices</li>
        <li>Keyboard-friendly navigation throughout the site</li>
      </ul>

      <h2>Ongoing Improvements</h2>
      <p>
        Accessibility is an ongoing effort. We welcome feedback from anyone who encounters
        challenges using utah.christmas.
      </p>

      <h2>Need Assistance?</h2>
      <p>
        If you experience difficulty accessing content, or need information in another
        format, please contact us:
      </p>
      <p>
        <strong>Email:</strong> <a href={LINKS.mailto}>{COMPANY.email}</a>
        <br />
        <strong>Phone:</strong> <a href={LINKS.tel}>{COMPANY.phone}</a>
        <br />
        <strong>Address:</strong> {COMPANY.address.full}
      </p>
    </LegalDoc>
  );
}
