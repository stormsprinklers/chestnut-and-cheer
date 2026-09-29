import type { Metadata } from "next";
import { CountyServiceAreaPage } from "@/components/pages/CountyServiceAreaPage";

export const metadata: Metadata = {
  title: "Christmas Light Installation in Summit County",
  description:
    "Professional Christmas light installation across Summit County, including Park City, Summit Park, Coalville, Kamas, Oakley, Francis, and Henefer.",
  alternates: { canonical: "/service-areas/summit-county" },
};

export default function SummitCountyPage() {
  return (
    <CountyServiceAreaPage
      content={{
        county: "Summit County",
        eyebrow: "Park City · Summit Park · Kamas · Coalville · Oakley",
        description:
          "Seasonal, commercial, and permanent Christmas lighting for Summit County homes, vacation properties, businesses, HOAs, and community spaces.",
        context:
          "Summit County lighting work is shaped by elevation, heavy snow, steep streets, resort schedules, vacation-property management, wooded lots, and mountain architecture. Park City and Summit Park often require detailed access coordination, while eastern county communities may involve longer routes and open weather exposure.",
        planning:
          "Reserve mountain projects early. Safe roof and driveway access can narrow quickly after storms, and managed, resort, HOA, or multi-unit properties should identify the approving party, service contact, display dates, and access rules before installation is scheduled.",
      }}
    />
  );
}
