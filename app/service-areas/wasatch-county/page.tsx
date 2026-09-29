import type { Metadata } from "next";
import { CountyServiceAreaPage } from "@/components/pages/CountyServiceAreaPage";

export const metadata: Metadata = {
  title: "Christmas Light Installation in Wasatch County",
  description:
    "Professional Christmas light installation throughout Wasatch County, including Heber City, Midway, Charleston, Daniel, Hideout, Interlaken, and Wallsburg.",
  alternates: { canonical: "/service-areas/wasatch-county" },
};

export default function WasatchCountyPage() {
  return (
    <CountyServiceAreaPage
      content={{
        county: "Wasatch County",
        eyebrow: "Heber City · Midway · Charleston · Daniel · Wallsburg",
        description:
          "Residential, commercial, and permanent Christmas lighting throughout Wasatch County, from Heber Valley neighborhoods to resort and mountain communities.",
        context:
          "Wasatch County combines established Heber Valley neighborhoods, custom homes, resort communities, open rural properties, and high-elevation towns. Snow, wind, grade, deeper setbacks, HOA rules, and property-management coordination can all influence the design and installation window.",
        planning:
          "Earlier reservations provide the most flexibility before snow and ice restrict roofs, ladders, and driveways. We quote the visible features selected for each property and confirm approval, access, power, and service contacts for managed or shared properties.",
      }}
    />
  );
}
