import { ASSETS } from "@/lib/constants";

export type CareerJob = {
  slug: string;
  jobTitle: string;
  department: string;
  location: string;
  employmentType: string;
  payRange: string;
  schedule: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  responsibilities: readonly string[];
  qualifications: readonly string[];
  benefits: readonly string[];
  applicationsOpen: boolean;
};

const jobs: readonly CareerJob[] = [
  {
    slug: "christmas-light-installer",
    jobTitle: "Christmas Light Installer",
    department: "Installation",
    location: "Northern Utah",
    employmentType: "Seasonal",
    payRange: "Compensation details shared during the hiring process",
    schedule: "Seasonal work, primarily September through January",
    shortDescription:
      "Help us create Christmas magic across Utah by installing and servicing premium holiday lighting for homes and businesses.",
    image: ASSETS.professionalPhotos.technicianHero,
    imageAlt: "Chestnut & Cheer Christmas light installer working on a Utah home",
    responsibilities: [
      "Install, service, remove, and organize professional holiday lighting.",
      "Work safely from ladders and around roofs, trees, bushes, and building exteriors.",
      "Prepare lighting materials and keep trucks, tools, and work areas organized.",
      "Treat every customer, property, and teammate with care and respect.",
      "Communicate clearly with the crew lead and help the team finish each project well.",
    ],
    qualifications: [
      "Comfort working outdoors, at heights, and in changing fall and winter weather.",
      "Able to lift and carry ladders, lighting materials, and equipment throughout the day.",
      "Reliable transportation and dependable attendance.",
      "A positive attitude, strong work ethic, and willingness to learn our installation standards.",
      "Previous lighting, roofing, construction, landscaping, or ladder experience is helpful, but not required.",
    ],
    benefits: [
      "Hands-on training and clear installation standards.",
      "A supportive local team and satisfying, highly visible work.",
      "Opportunities to learn, grow, and take on additional responsibility.",
      "The chance to help families and businesses make Christmas feel magical.",
    ],
    applicationsOpen: true,
  },
] as const;

export function getAllJobs(): CareerJob[] {
  return [...jobs];
}

export function getJobBySlug(slug: string): CareerJob | null {
  const normalized = slug.trim().toLowerCase();
  return jobs.find((job) => job.slug === normalized) ?? null;
}
