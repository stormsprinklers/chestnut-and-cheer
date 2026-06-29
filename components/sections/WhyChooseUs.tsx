import { Mascot } from "@/components/ui/Mascot";
import { WHY_CHOOSE_US } from "@/lib/constants";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-pad below-fold bg-chestnut text-warm-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
          <Mascot variant="gift" side="left" size={180} className="hidden lg:block" />
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Why Choose Chestnut & Cheer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-warm-white/70">
              We use premium lights, strands, and clips — and back every install
              with licensed, insured craftsmanship you can trust.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-warm-white/10 bg-warm-white/5 p-6"
            >
              <h3 className="font-display text-lg font-semibold text-accent-gold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-white/75">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
