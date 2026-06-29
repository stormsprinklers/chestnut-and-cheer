import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export function BeforeAfter() {
  return (
    <section id="before-after" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            See the Difference
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
            Drag the slider to compare a home before and after our premium
            holiday lighting installation.
          </p>
        </div>

        <div className="mt-10">
          <BeforeAfterSlider
            beforeSrc="/images/before-after/before.svg"
            afterSrc="/images/before-after/after.svg"
            beforeAlt="Home without holiday lights"
            afterAlt="Home with holiday lights"
          />
        </div>
      </div>
    </section>
  );
}
