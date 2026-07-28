import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentSection } from "@/components/pages/PageChrome";
import { Button } from "@/components/ui/Button";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog/posts";
import { COMPANY, LINKS } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-chestnut">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm text-accent-gold">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            {" · "}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" · "}
            {post.readingMinutes} min read
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-warm-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-warm-white/75">{post.description}</p>
        </div>
      </section>
      <ContentSection>
        <article className="space-y-5 text-base leading-relaxed text-chestnut/80">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </article>
        <div className="mt-10 rounded-2xl border border-accent-gold/40 bg-accent-gold/10 px-5 py-6 text-center">
          <p className="font-display text-xl font-semibold text-chestnut">
            Ready to light up your property?
          </p>
          <p className="mt-2 text-sm text-chestnut/70">
            {COMPANY.name} serves {COMPANY.serviceAreas.join(" and ")}.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={LINKS.estimate} variant="primary">
              Get Instant Estimate
            </Button>
            <Button href="/blog" variant="outline">
              More articles
            </Button>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
