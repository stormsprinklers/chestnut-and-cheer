import Image from "next/image";
import { Check, Home, TreePine, Mountain, Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { ASSETS, LINKS, PRICING } from "@/lib/constants";

const FACTOR_ICONS = [TreePine, Mountain, Home, Ruler, Sparkles];

function formatStartsAt(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function PricingPage() {
  const tiers = [PRICING.yearOne, PRICING.renewal] as const;

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
              How Our Pricing Works
            </h1>
            <p className="mt-4 text-base leading-relaxed text-warm-white/80 sm:mt-5 sm:text-lg">
              Year 1 costs more because it includes your lights, timer, and custom
              design — not just the install. Stay with us and Year 2+ drops to
              installation only. Every job is custom-quoted for your property.
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
            <Mascot variant="pointing" side="left" size={160} className="hidden lg:block" />
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
                Year 1 vs. Year 2+
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-chestnut/70">
                Your first season builds the display. Every season after that, you
                only pay for us to put it back up.
              </p>
            </div>
            <Mascot variant="pointing" side="right" size={160} className="hidden lg:block" />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {tiers.map((tier, index) => {
              const featured = index === 1;
              return (
                <article
                  key={tier.label}
                  className={`flex flex-col rounded-2xl border p-6 sm:p-8 ${
                    featured
                      ? "border-accent-gold/40 bg-chestnut text-warm-white shadow-md"
                      : "border-chestnut/10 bg-white text-chestnut shadow-sm"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold uppercase tracking-wide ${
                      featured ? "text-accent-gold" : "text-primary-red"
                    }`}
                  >
                    {tier.label}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                    {tier.title}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold sm:text-5xl">
                      {formatStartsAt(tier.startsAt)}
                    </span>
                    <span
                      className={`text-sm ${featured ? "text-warm-white/70" : "text-chestnut/60"}`}
                    >
                      starting at
                    </span>
                  </p>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${
                      featured ? "text-warm-white/75" : "text-chestnut/70"
                    }`}
                  >
                    {tier.summary}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            featured ? "text-accent-gold" : "text-primary-red"
                          }`}
                          aria-hidden
                        />
                        <span className={featured ? "text-warm-white/90" : "text-chestnut/80"}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      href={LINKS.estimate}
                      variant={featured ? "gold" : "primary"}
                      className="w-full"
                    >
                      Get Instant Estimate
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
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
                Whether it&apos;s Year 1 or Year 10, your quote covers the full
                season experience — not just hanging lights once.
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
    </>
  );
}
