import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ASSETS } from "@/lib/constants";

export function BeforeAfter() {
  return (
    <section id="before-after" className="section-pad below-fold">
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
            afterSrc={ASSETS.photos.hero}
            beforeAlt="Utah home without holiday lights"
            afterAlt="Utah home with professional Christmas light installation"
          />
        </div>
      </div>
    </section>
  );
}
