import Image from "next/image";
import {
  Check,
  Home,
  TreePine,
  Mountain,
  Ruler,
  Sparkles,
  ShieldCheck,
  Palette,
  RefreshCw,
  PackageCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { ASSETS, LINKS, PRICING } from "@/lib/constants";
import Link from "next/link";

const FACTOR_ICONS = [TreePine, Mountain, Home, Ruler, Sparkles];

function formatStartsAt(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-chestnut">
        <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/40" />
        <Image
          src={ASSETS.brand.sparkle}
          alt=""
          width={40}
          height={42}
          className="pointer-events-none absolute right-[14%] top-10 hidden opacity-70 sm:block"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 inline-block rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold text-accent-gold sm:mb-4 sm:px-4 sm:text-sm">
              Transparent holiday lighting pricing
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-warm-white sm:text-5xl">
              Christmas Light Installation Cost in Utah
            </h1>
            <p className="mt-4 text-base leading-relaxed text-warm-white/80 sm:mt-5 sm:text-lg">
              One custom price covers the complete seasonal service. We provide
              the lights and materials; you enjoy professional installation,
              maintenance, takedown, and storage without separate ownership tiers.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Button href={LINKS.estimate} variant="gold" className="w-full sm:w-auto">
                Get Instant Estimate
              </Button>
              <Button
                href={LINKS.tel}
                variant="outline"
                className="w-full border-warm-white/30 text-warm-white hover:bg-warm-white/10 sm:w-auto"
              >
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-8">
            <Mascot variant="pointing" side="left" size={160} className="mx-auto lg:mx-0" />
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
                One quote. The whole season handled.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-chestnut/70">
                Chestnut &amp; Cheer buys and provides the materials. You pay one
                upfront service price built around your property and chosen design.
              </p>
            </div>
            <Mascot variant="pointing" side="right" size={160} className="hidden lg:block" />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="flex flex-col rounded-2xl border border-accent-gold/40 bg-chestnut p-6 text-warm-white shadow-md sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent-gold">
                {PRICING.service.label}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                {PRICING.service.title}
              </h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold sm:text-5xl">
                  {formatStartsAt(PRICING.service.startsAt)}
                </span>
                <span className="text-sm text-warm-white/70">starting at</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-warm-white/75">
                {PRICING.service.summary}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {PRICING.service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" aria-hidden />
                    <span className="text-warm-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <Button href={LINKS.estimate} variant="gold" className="mt-8 w-full">
                Get Instant Estimate
              </Button>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Background-checked employees", body: "Every employee who comes to your property is background checked, trained, and selected for professionalism." },
                { icon: Palette, title: "Any color combination", body: "Choose from a wide variety of colors and patterns instead of being limited to a few preset displays." },
                { icon: RefreshCw, title: "Change colors for free", body: "Warm white this season and multicolor next season? Change your display colors without an added color-change fee." },
                { icon: PackageCheck, title: "Lifetime warranty", body: "Our lighting is backed by a lifetime warranty, with in-season maintenance included in the service." },
              ].map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-2xl border border-chestnut/10 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-chestnut">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-chestnut/70">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-chestnut/10 bg-accent-gold/10 p-5 sm:p-6">
            <h3 className="font-display text-xl font-bold text-chestnut">What happens if you cancel service?</h3>
            <p className="mt-2 leading-relaxed text-chestnut/75">
              If you decide to end seasonal service, you pay the retail cost of the materials used on your home. We then leave the bulbs, strands, clips, and timer with you.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">Examples of what changes the quote</h2>
            <p className="mt-4 text-chestnut/70">These are scope examples, not flat packages. We measure the selected design before confirming a price.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { title: "Focused single-story outline", body: "A front eave or garage line with straightforward ladder access can stay close to the starting scope when no trees or upper peaks are added." },
              { title: "Multi-peak two-story home", body: "Upper peaks, long garage runs, roof transitions, and taller working heights add footage, setup, equipment, and installation time." },
              { title: "Trees or commercial property", body: "Tree size and canopy density, multiple buildings, operating-hour coordination, pedestrian areas, approvals, and service access can materially change the project." },
            ].map((example) => (
              <article key={example.title} className="rounded-2xl border border-chestnut/10 bg-white p-6">
                <h3 className="font-display text-xl font-bold text-chestnut">{example.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chestnut/70">{example.body}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-chestnut/65">Starting prices apply to qualifying scopes. Your written quote should identify the planned coverage and what is included. Ask before approving if you want a feature priced as an optional line item.</p>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl flex-1 text-center lg:text-left">
              <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
                What&apos;s Always Included
              </h2>
              <p className="mt-4 text-chestnut/70">
                Your custom quote covers the full-season experience—not just
                hanging lights once.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {PRICING.includedEveryYear.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-chestnut/10 bg-white px-4 py-3 text-left text-sm text-chestnut/85"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-red" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Mascot variant="pointing" side="right" size={200} className="hidden shrink-0 lg:block" />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
              Every Job Is Custom-Quoted
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-chestnut/70">
              Starting prices give you a ballpark. Your final quote reflects the
              real work of lighting <em>your</em> home or business.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRICING.quoteFactors.map((factor, index) => {
              const Icon = FACTOR_ICONS[index] ?? Sparkles;
              return (
                <div
                  key={factor.label}
                  className="rounded-2xl border border-chestnut/10 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-chestnut">
                    {factor.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-chestnut/70">
                    {factor.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-primary-red text-warm-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <Mascot variant="phone" size={140} className="mb-4" />
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready for a free quote?
          </h2>
          <p className="mt-4 text-warm-white/80">
            Tell us about your property and we&apos;ll build a custom proposal —
            no surprises, no pressure.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Button href={LINKS.estimate} variant="gold" className="w-full sm:w-auto">
              Get Instant Estimate
            </Button>
            <Button
              href={LINKS.tel}
              variant="outline"
              className="w-full border-warm-white/30 text-warm-white hover:bg-warm-white/10 sm:w-auto"
            >
              Call Us
            </Button>
          </div>
        </div>
      </section>
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-chestnut">Christmas light pricing FAQs</h2>
          <div className="mt-7 space-y-3">
            {[
              { q: "Who provides the lights?", a: "Chestnut & Cheer provides and pays for the materials while you are an active seasonal-service customer. You receive one custom price for the service: design, installation, maintenance, takedown, and storage." },
              { q: "Does the price include maintenance and takedown?", a: "Seasonal pricing includes in-season service for normal bulb failures on the display we installed, takedown in January or early February, and organized off-season storage." },
              { q: "Can I change colors next season?", a: "Yes. You can choose a different color combination each season at no additional color-change cost, subject to the design and materials available for your display." },
              { q: "What happens to the lights if I cancel?", a: "If you cancel seasonal service, you pay the retail cost of the materials used on your home and we leave the bulbs, strands, clips, and timer with you." },
              { q: "Can I reduce the scope to fit a budget?", a: "Yes. Ask us to separate the main roofline from optional peaks, garages, trees, bushes, wreaths, or other accents. Prioritizing the most visible lines is often better than spreading a budget across every feature." },
              { q: "Do commercial projects use the same starting price?", a: "Commercial work is quoted for its actual scope, access, scheduling, approvals, buildings, public areas, and maintenance needs. Contact us for a property-specific proposal rather than relying on a residential starting price." },
            ].map((faq) => (
              <details key={faq.q} className="rounded-xl border border-chestnut/10 bg-white px-5 py-4"><summary className="cursor-pointer font-semibold text-chestnut">{faq.q}</summary><p className="mt-3 leading-relaxed text-chestnut/70">{faq.a}</p></details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-chestnut/65">Compare <Link href={LINKS.residentialLighting} className="font-semibold text-primary-red hover:underline">residential installation</Link>, <Link href={LINKS.commercialLighting} className="font-semibold text-primary-red hover:underline">commercial lighting</Link>, or <Link href={LINKS.serviceAreas} className="font-semibold text-primary-red hover:underline">local service areas</Link>. Before comparing proposals, use our team&apos;s <Link href="/blog/how-to-choose-christmas-light-installer" className="font-semibold text-primary-red hover:underline">12-question installer checklist</Link>.</p>
        </div>
      </section>
    </>
  );
}
