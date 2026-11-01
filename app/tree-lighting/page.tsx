import type { Metadata } from "next";
import Link from "next/link";
import {
  Cable,
  Check,
  Leaf,
  Palette,
  ShieldCheck,
  Sparkles,
  TreePine,
  Users,
} from "lucide-react";
import { Breadcrumbs, PageHero } from "@/components/pages/PageChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { COMPANY, LINKS } from "@/lib/constants";
import { getServicePageSchemas } from "@/lib/structured-data";

const path = "/tree-lighting";
const title = "Outdoor Tree Lighting & Tree Wrapping in Utah";
const description = `Professional outdoor tree lighting with twinkling mini LEDs, custom colors, spiral wraps, and detailed branch wraps across ${COMPANY.serviceAreaSummary}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
};

const specialties = [
  {
    icon: Palette,
    title: "Any color you want",
    body: "Choose classic warm white, multicolor, a holiday palette, or a custom combination. Color does not limit the way we can design the tree.",
  },
  {
    icon: Sparkles,
    title: "Twinkling mini LEDs",
    body: "Mini LED lights create a dense, dimensional glow that follows the trunk, branches, or natural outline of the tree.",
  },
  {
    icon: Users,
    title: "Trained tree-wrapping crew",
    body: "Our team has years of tree-wrapping experience and handles this specialized work directly instead of treating trees as an afterthought.",
  },
  {
    icon: TreePine,
    title: "Small to towering",
    body: "From compact ornamental trees and junipers to large mature trees, we select a wrap style that fits the tree’s shape and scale.",
  },
] as const;

const priceBands = [
  { size: "Small tree", range: "$100–$250", detail: "Compact trees and simpler wraps" },
  { size: "Medium tree", range: "$500–$750", detail: "More height, branching, or coverage" },
  { size: "Large tree", range: "$1,000–$2,000", detail: "Tall, mature, or labor-intensive trees" },
] as const;

export default function TreeLightingPage() {
  return (
    <>
      <JsonLd
        data={getServicePageSchemas({
          path,
          name: title,
          description,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Services", path: LINKS.services },
            { name: "Tree Lighting & Wrapping", path },
          ],
        })}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: LINKS.services },
          { label: "Tree Lighting & Wrapping" },
        ]}
      />
      <PageHero
        eyebrow="Tree wrapping is our specialty"
        title={title}
        description={`Twinkling mini LEDs, any color, and a trained team that loves the detailed work. We wrap trees of every size across ${COMPANY.serviceAreaSummary}.`}
        ctaHref={LINKS.contact}
        ctaLabel="Request a Tree Quote"
      />

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-red">More than an add-on</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-chestnut sm:text-4xl">
                Trees give us room to show our skill and artistry
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-chestnut/75">
                Some lighting companies subcontract tree work or skip it entirely. We love it. The right wrap can turn a single tree into the focal point of a property, and our trained team knows how to work with the tree instead of forcing every shape into the same pattern.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-chestnut p-7 text-warm-white sm:p-9">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent-gold/15 blur-2xl" />
              <TreePine className="relative h-12 w-12 text-accent-gold" strokeWidth={1.5} aria-hidden />
              <p className="relative mt-6 font-display text-2xl font-semibold">No matter the tree, we can build a plan for it.</p>
              <ul className="relative mt-6 space-y-3 text-sm text-warm-white/80">
                {["Ornamental trees", "Junipers and pine trees", "Large deciduous trees", "Single statement trees or full properties"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-accent-gold" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map(({ icon: Icon, title: itemTitle, body }) => (
              <article key={itemTitle} className="rounded-2xl border border-chestnut/10 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-gold/20 text-primary-red">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-chestnut">{itemTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-chestnut/70">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-chestnut text-warm-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-gold">Two wrap styles</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">A technique that fits the tree</h2>
            <p className="mt-4 leading-relaxed text-warm-white/70">
              Tree shape, branch structure, viewing angle, and the look you want determine how we place the lights.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-warm-white/15 bg-warm-white/5 p-7 sm:p-8">
              <Leaf className="h-9 w-9 text-accent-gold" aria-hidden />
              <h3 className="mt-5 font-display text-2xl font-bold">Spiral wraps</h3>
              <p className="mt-3 leading-relaxed text-warm-white/75">
                A spiral wrap follows the outer shape of dense evergreens such as junipers and pine trees. It creates a strong, readable glow without trying to trace every branch inside the canopy.
              </p>
            </article>
            <article className="rounded-3xl border border-warm-white/15 bg-warm-white/5 p-7 sm:p-8">
              <Sparkles className="h-9 w-9 text-accent-gold" aria-hidden />
              <h3 className="mt-5 font-display text-2xl font-bold">Tight branch wraps</h3>
              <p className="mt-3 leading-relaxed text-warm-white/75">
                On larger branching trees, we can wrap trunks and selected limbs closely for a detailed, sculptural look. This style takes more time, but the finished tree has remarkable depth and definition.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-red">Careful power routing</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">The details around the tree matter, too</h2>
            <p className="mt-5 leading-relaxed text-chestnut/70">
              A beautiful wrap still needs a thoughtful path to power. We plan the run around moisture, foot traffic, and the way people move through the property.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-chestnut/10 bg-cream p-6">
              <ShieldCheck className="h-8 w-8 text-primary-red" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-bold text-chestnut">Connections stay off the ground</h3>
              <p className="mt-3 text-sm leading-relaxed text-chestnut/70">
                We keep plugs and connections elevated where practical to reduce exposure to standing water and avoid preventable water damage.
              </p>
            </article>
            <article className="rounded-2xl border border-chestnut/10 bg-cream p-6">
              <Cable className="h-8 w-8 text-primary-red" aria-hidden />
              <h3 className="mt-4 font-display text-xl font-bold text-chestnut">Sidewalk crossings are secured</h3>
              <p className="mt-3 text-sm leading-relaxed text-chestnut/70">
                When an extension cord must cross a sidewalk, we use stakes to keep it controlled and reduce tripping hazards.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-red">Typical tree-lighting ranges</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-chestnut sm:text-4xl">Tree size helps set the starting range</h2>
            <p className="mt-4 leading-relaxed text-chestnut/70">
              Taller trees cost more because the work is highly labor-intensive. Final pricing also depends on canopy density, branch structure, access, light density, and how many trees you want wrapped.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {priceBands.map((band) => (
              <article key={band.size} className="rounded-2xl border border-chestnut/10 bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wider text-primary-red">{band.size}</p>
                <p className="mt-3 font-display text-3xl font-bold text-chestnut">{band.range}</p>
                <p className="mt-2 text-sm text-chestnut/65">{band.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-chestnut/55">Typical range per tree. A property-specific quote confirms the final scope and price.</p>
        </div>
      </section>

      <section className="section-pad bg-accent-gold/15">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <TreePine className="mx-auto h-11 w-11 text-primary-red" aria-hidden />
          <h2 className="mt-4 font-display text-3xl font-bold text-chestnut sm:text-4xl">Tree lighting throughout our full service area</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-chestnut/70">
            Tree-only projects are available across the same area as our roofline service: {COMPANY.serviceAreaSummary}. You do not need to add roofline lighting for us to wrap your trees.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={LINKS.contact} variant="primary" className="w-full sm:w-auto">Request a Tree Quote</Button>
            <Button href={LINKS.serviceAreas} variant="outline" className="w-full sm:w-auto">Browse Service Areas</Button>
          </div>
          <p className="mt-5 text-sm text-chestnut/60">
            Prefer to talk first? <Link href={LINKS.tel} className="font-semibold text-primary-red hover:underline">Call {COMPANY.phone}</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
