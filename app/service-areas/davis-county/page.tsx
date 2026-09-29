import type { Metadata } from "next";
import { CountyServiceAreaPage } from "@/components/pages/CountyServiceAreaPage";

export const metadata: Metadata = {
  title: "Christmas Light Installation in Davis County",
  description:
    "Professional Christmas light installation throughout Davis County, including Layton, Bountiful, Clearfield, Farmington, Kaysville, Syracuse, and surrounding cities.",
  alternates: { canonical: "/service-areas/davis-county" },
};

export default function DavisCountyPage() {
  return (
    <CountyServiceAreaPage
      content={{
        county: "Davis County",
        eyebrow: "Layton · Bountiful · Clearfield · Farmington · and every Davis County city",
        description:
          "Seasonal, commercial, and permanent Christmas lighting throughout Davis County, from south-county neighborhoods to Layton, Clearfield, Syracuse, and South Weber.",
        context:
          "Davis County compresses a wide range of properties between the Great Salt Lake and the Wasatch foothills. Valley-floor neighborhoods can have accessible rambler and split-level rooflines, while east-bench homes bring grade, taller peaks, mature trees, and earlier snow. Commercial corridors and HOA-managed communities add access and approval requirements of their own.",
        planning:
          "We group Davis County installations by route while quoting every property individually. Earlier planning is especially valuable for bench homes, tall rooflines, mature trees, commercial properties, and communities that require design approval before installation.",
      }}
    />
  );
}
