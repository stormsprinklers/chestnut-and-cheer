import type { Metadata } from "next";
import { CountyServiceAreaPage } from "@/components/pages/CountyServiceAreaPage";

export const metadata: Metadata = {
  title: "Christmas Light Installation in Salt Lake County",
  description: "Professional residential and commercial Christmas light installation across priority Salt Lake County cities, including Draper, Sandy, Salt Lake City, Murray, Riverton, and Bluffdale.",
  alternates: { canonical: "/service-areas/salt-lake-county" },
};

export default function SaltLakeCountyPage() {
  return <CountyServiceAreaPage content={{
    county: "Salt Lake County",
    eyebrow: "Draper · Sandy · Salt Lake City · Murray · Riverton · Bluffdale",
    description: "Custom residential, commercial, and permanent Christmas lighting for priority Salt Lake County communities, served from Chestnut & Cheer’s Lehi base.",
    context: "Salt Lake County projects range from compact valley-floor homes and established tree-lined streets to foothill properties, retail corridors, HOAs, and large public-facing commercial buildings. Roof height, grade, traffic, operating hours, shared-property approvals, power, and weather can all change the appropriate scope.",
    planning: "We group installations into efficient service routes while quoting each property individually. Commercial and HOA projects should begin earlier when approvals, multiple buildings, public access, or coordinated install windows are involved; foothill homes also benefit from scheduling before snow and ice limit access.",
  }} />;
}
