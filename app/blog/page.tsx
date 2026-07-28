import type { Metadata } from "next";
import Link from "next/link";
import { ContentSection, PageHero } from "@/components/pages/PageChrome";
import { getAllPosts } from "@/lib/blog/posts";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: `Holiday lighting tips from ${COMPANY.name} — permanent vs seasonal lights, booking timelines, gutter cleaning, and more for Utah homeowners.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Tips & guides"
        title="Chestnut & Cheer Blog"
        description="Practical advice on seasonal lighting, permanent LEDs, commercial displays, and getting ready for winter in Utah."
        ctaHref="/estimate"
        ctaLabel="Get Instant Estimate"
      />
      <ContentSection>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="rounded-2xl border border-chestnut/10 bg-white p-5 shadow-sm sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-red">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {post.readingMinutes} min read
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-chestnut">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary-red">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-chestnut/70">{post.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-chestnut/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-primary-red hover:underline"
              >
                Read article
              </Link>
            </li>
          ))}
        </ul>
      </ContentSection>
    </>
  );
}
