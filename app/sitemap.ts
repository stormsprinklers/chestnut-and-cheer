import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { LAUNCH_CITY_PAGES, cityPagePath } from "@/lib/cities";
import { SITE_URL } from "@/lib/site";

const SITE_CONTENT_UPDATED = "2026-09-15";

const STATIC_PAGES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/christmas-light-installation", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/christmas-light-installation/residential", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/christmas-light-installation/commercial", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/permanent-lighting", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/service-areas", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/service-areas/utah-county", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/service-areas/salt-lake-county", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/share-the-cheer", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/blog", priority: 0.55, changeFrequency: "monthly" as const },
  { path: "/gutter-cleaning", priority: 0.4, changeFrequency: "yearly" as const },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: page.path ? `${SITE_URL}${page.path}` : SITE_URL,
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const cityEntries: MetadataRoute.Sitemap = LAUNCH_CITY_PAGES.map((city) => ({
    url: `${SITE_URL}${cityPagePath(city)}`,
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...cityEntries, ...blogEntries];
}
