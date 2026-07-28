import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/pricing",
  "/visualize",
  "/estimate",
  "/contact",
  "/about",
  "/blog",
  "/permanent-lighting",
  "/seasonal-holiday-lighting",
  "/commercial-holiday-lighting",
  "/gutter-cleaning",
  "/privacy-policy",
  "/terms-of-service",
  "/accessibility",
  "/door-hanger",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: path ? `${SITE_URL}${path}` : SITE_URL,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/estimate" ? 0.9 : 0.7,
  }));

  const blogEntries = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
