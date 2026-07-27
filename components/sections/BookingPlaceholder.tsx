import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { LINKS } from "@/lib/constants";

/** Primary conversion band — replaces the old disabled booking form. */
export function BookingPlaceholder() {
  return (
    <section id="estimate" className="section-pad bg-primary-red text-warm-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
        <Mascot variant="phone" size={160} className="shrink-0" />
        <div className="flex-1">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Get Your Instant Estimate
          </h2>
          <p className="mt-3 text-warm-white/80">
            Answer a few questions, upload photos if you have them, and we&apos;ll
            prepare a custom Christmas lighting design &amp; quote — usually
            without an on-site visit.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-start sm:justify-center">
            <Button href={LINKS.estimate} variant="gold" className="w-full sm:w-auto">
              Get Instant Estimate
            </Button>
            <Button
              href={LINKS.tel}
              variant="outline"
              className="w-full border-warm-white/30 text-warm-white hover:bg-warm-white/10 sm:w-auto"
            >
              Prefer to talk? Call us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
