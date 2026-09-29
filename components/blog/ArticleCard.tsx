import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { BlogPost } from "@/lib/blog/posts";

export function ArticleCard({
  post,
  headingLevel = "h2",
}: {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-chestnut/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-red/25 hover:shadow-lg">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-chestnut/5"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={post.heroImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary-red">
          <span>{post.tags[0]}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 normal-case tracking-normal text-chestnut/55">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingMinutes} min
          </span>
        </div>
        <Heading className="mt-3 font-display text-2xl font-bold leading-tight text-chestnut">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-primary-red">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-chestnut/70">
          {post.description}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-red"
        >
          Read the guide
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
