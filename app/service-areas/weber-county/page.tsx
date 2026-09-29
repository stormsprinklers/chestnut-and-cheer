import type { Metadata } from "next";
import { CountyServiceAreaPage } from "@/components/pages/CountyServiceAreaPage";

export const metadata: Metadata = {
  title: "Christmas Light Installation in Weber County",
  description:
    "Professional Christmas light installation throughout Weber County, including Ogden, Roy, West Haven, North Ogden, Riverdale, Hooper, and surrounding cities.",
  alternates: { canonical: "/service-areas/weber-county" },
};

export default function WeberCountyPage() {
  return (
    <CountyServiceAreaPage
      content={{
        county: "Weber County",
        eyebrow: "Ogden · Roy · West Haven · North Ogden · and every Weber County city",
        description:
          "Custom residential, commercial, and permanent Christmas lighting across Weber County, including Ogden, Roy, West Haven, the east bench, and western valley communities.",
        context:
          "Weber County spans Ogden’s historic and commercial core, established suburban neighborhoods, open western communities, and foothill properties below the Wasatch. Roof materials, working height, wind, mountain weather, mature trees, parking, and street access vary significantly across the county.",
        planning:
          "A useful proposal starts with the visible architecture and a safe access plan. Foothill and Ogden Valley work benefits from early scheduling, while commercial sites, multifamily properties, and public-facing buildings need clear approval, power, and maintenance contacts.",
      }}
    />
  );
}
