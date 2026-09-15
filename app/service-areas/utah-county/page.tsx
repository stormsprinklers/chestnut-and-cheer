import type { Metadata } from "next";
import { CountyServiceAreaPage } from "@/components/pages/CountyServiceAreaPage";

export const metadata: Metadata = {
  title: "Christmas Light Installation in Utah County",
  description: "Professional residential and commercial Christmas light installation across priority Utah County cities, with seasonal maintenance, takedown, and storage.",
  alternates: { canonical: "/service-areas/utah-county" },
};

export default function UtahCountyPage() {
  return <CountyServiceAreaPage content={{
    county: "Utah County",
    eyebrow: "Lehi · Provo · Alpine · Spanish Fork · and nearby cities",
    description: "Residential, commercial, and permanent Christmas lighting for communities throughout Utah County, planned and installed by a Lehi-based licensed and insured team.",
    context: "Utah County spans compact historic neighborhoods, rapid-growth master-planned communities, lake and valley exposure, and foothill properties with tall peaks or sloped access. A useful design must respond to the building and the features visible from the street rather than repeat the same package everywhere.",
    planning: "Our priority coverage includes northern and central Utah Valley as well as selected south-valley communities. Earlier scheduling is especially helpful for tall homes, mature-tree work, complex access, HOA approvals, and foothill properties where snow can narrow safe installation windows.",
  }} />;
}
