import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ASSETS, COMPANY, LINKS } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-chestnut">
      <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/40" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="order-2 min-w-0 lg:order-none">
            <p className="mb-3 inline-block rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold text-accent-gold sm:mb-4 sm:px-4 sm:text-sm">
              Utah County & Salt Lake County
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-warm-white sm:text-5xl lg:text-6xl">
              Professional Christmas Light Installation in Utah
            </h1>
            <p className="mt-4 text-base leading-relaxed text-warm-white/80 sm:mt-6 sm:text-lg">
              Chestnut &amp; Cheer designs, installs, maintains, removes, and stores
              professional Christmas lights for homes and businesses across Utah
              County and Salt Lake County.
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

          <div className="relative order-1 aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl border border-warm-white/10 shadow-2xl lg:order-none">
            <Image
              src={ASSETS.photos.hero}
              alt="Chestnut & Cheer Christmas light technician carrying a ladder to a Utah installation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
