import { Button } from "@/components/ui/Button";
import { ParallaxHeroImage } from "@/components/motion/ParallaxHeroImage";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-[min(82vh,720px)] items-center overflow-hidden bg-chestnut">
      <ParallaxHeroImage
        src={ASSETS.photos.hero}
        alt="Chestnut & Cheer Christmas light technician carrying a ladder to a Utah installation"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
            <p className="mb-3 inline-block rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold text-accent-gold sm:mb-4 sm:px-4 sm:text-sm">
              Northern Utah &amp; the Wasatch Back
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-warm-white sm:text-5xl lg:text-6xl">
              Professional Christmas Light Installation in Utah
            </h1>
            <p className="mt-4 text-base leading-relaxed text-warm-white/80 sm:mt-6 sm:text-lg">
              Chestnut &amp; Cheer designs, installs, maintains, removes, and stores
              professional Christmas lights for homes and businesses across {COMPANY.serviceAreaSummary}.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href={LINKS.estimate} variant="gold" className="w-full sm:w-auto">
                Get Instant Estimate
              </Button>
              <Button
                href={LINKS.tel}
                variant="outline"
                className="w-full border-warm-white/30 text-warm-white hover:bg-warm-white/10 sm:w-auto"
              >
                Call {COMPANY.phone}
              </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
