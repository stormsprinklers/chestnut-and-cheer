import { Mascot } from "@/components/ui/Mascot";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS } from "@/lib/constants";

export function FAQs() {
  return (
    <section id="faq" className="section-pad below-fold">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-chestnut/70">
            Everything you need to know about our holiday lighting services.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <div className="w-full flex-1">
            <Accordion items={FAQS} />
          </div>
          <Mascot variant="cheer" side="right" size={180} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
