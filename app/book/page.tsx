import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { COMPANY, ASSETS } from "@/lib/constants";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Virtual Consultation",
  description:
    "Schedule a free 30-minute Google Meet lighting consultation with Chestnut & Cheer. Pick a time and we send the invite automatically.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: `Book a Virtual Consultation | ${COMPANY.name}`,
    description:
      "Free 30-minute Google Meet consult for Christmas lighting in Utah County and Salt Lake County.",
    url: `${SITE_URL}/book`,
    images: [
      {
        url: absoluteUrl(ASSETS.photos.hero),
        width: 1600,
        height: 1200,
        alt: "Virtual Christmas lighting consultation",
      },
    ],
  },
};

export default function BookPage() {
  return (
    <div className="bg-cream">
      <BookingWizard />
    </div>
  );
}
