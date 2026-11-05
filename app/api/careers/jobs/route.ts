import { NextResponse } from "next/server";
import { getAllJobs } from "@/lib/careers";

export const dynamic = "force-dynamic";

/** Public role catalog consumed by Radar's Hiring setup. */
export async function GET() {
  return NextResponse.json({
    jobs: getAllJobs().map((job) => ({
      slug: job.slug,
      jobTitle: job.jobTitle,
      department: job.department,
      location: job.location,
      employmentType: job.employmentType,
      applicationsOpen: job.applicationsOpen,
    })),
  });
}
