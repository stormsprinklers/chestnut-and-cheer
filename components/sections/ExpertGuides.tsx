import Link from "next/link";
import { ArrowRight, BookOpen, Cable, Lightbulb, Ruler } from "lucide-react";

const GUIDES = [
  {
    href: "/blog/christmas-light-installation-mistakes",
    title: "7 DIY Christmas Light Mistakes to Avoid",
    description: "Seven details that separate a clean roofline from a visibly improvised one.",
    icon: Ruler,
  },
  {
    href: "/blog/c7-vs-c9-vs-mini-christmas-lights",
    title: "What are C9 and C7 LED Lights?",
    description: "Choose the right bulb scale for rooflines, branches, bushes, and landscape edges.",
    icon: Lightbulb,
  },
  {
    href: "/blog/why-christmas-lights-trip-gfci",
    title: "Electrical Issues when Installing Christmas Lights",
    description: "How water, exposed ends, plug placement, and long runs affect reliability.",
    icon: Cable,
  },
] as const;

export function ExpertGuides() {
  return (
    <section className="section-pad bg-cream" aria-labelledby="expert-guides-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary-red">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Installation guides
            </p>
            <h2 id="expert-guides-title" className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">
              The details behind a professional display
            </h2>
            <p className="mt-4 leading-relaxed text-chestnut/70">
              Plan the design, materials, power, maintenance, removal, and storage before the first strand goes up.
            </p>
            <Link
              href="/blog/professional-christmas-light-installation-guide"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-red hover:underline"
            >
              Read the complete installation guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {GUIDES.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-2xl border border-chestnut/10 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary-red/25 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-chestnut group-hover:text-primary-red">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-chestnut/65">{guide.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
