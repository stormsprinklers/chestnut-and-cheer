import type { Metadata } from "next";
import { CountyServiceAreaPage } from "@/components/pages/CountyServiceAreaPage";

export const metadata: Metadata = {
  title: "Christmas Light Installation in Mona & Nephi, Juab County",
  description:
    "Professional Christmas light installation in Mona and Nephi, Utah. These are Chestnut & Cheer’s only current Juab County service areas.",
  alternates: { canonical: "/service-areas/juab-county" },
};

export default function JuabCountyPage() {
  return (
    <CountyServiceAreaPage
      content={{
        county: "Juab County",
        eyebrow: "Limited Juab County coverage · Mona & Nephi only",
        description:
          "Chestnut & Cheer currently provides seasonal, commercial, and permanent Christmas lighting in Mona and Nephi only. We do not currently offer countywide Juab County service.",
        context:
          "Mona and Nephi include established neighborhoods, newer homes, local businesses, open valley exposure, and properties with longer setbacks. A clear roofline and one or two selected focal points usually create the strongest result without spreading the design too thin.",
        planning:
          "Juab County appointments are grouped into limited Mona and Nephi routes, so early planning is important. We confirm the address before quoting and do not represent the rest of Juab County as part of the current service area.",
      }}
    />
  );
}
