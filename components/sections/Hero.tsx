import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { ASSETS, LINKS } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-chestnut">
      <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/40" />
      <Image
        src={ASSETS.brand.sparkle}
        alt=""
        width={48}
        height={50}
        className="pointer-events-none absolute right-[12%] top-8 hidden opacity-70 sm:block"
        aria-hidden
        priority
      />
      <Image
        src={ASSETS.brand.sparkle}
        alt=""
        width={32}
        height={33}
        className="pointer-events-none absolute left-[18%] top-16 hidden opacity-50 lg:block"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr_1fr] lg:gap-10">
          <Mascot
            variant="worker"
            side="left"
            size={200}
            className="hidden self-end lg:block"
            priority
          />

          <div className="order-2 lg:order-none">
            <p className="mb-3 inline-block rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold text-accent-gold sm:mb-4 sm:px-4 sm:text-sm">
              Utah County & Salt Lake County
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-warm-white sm:text-5xl lg:text-6xl">
              Christmas Light Installation in Utah &amp; Salt Lake County
            </h1>
            <Image
              src={ASSETS.brand.tagline}
              alt="We're nuts about Christmas lights!"
              width={360}
              height={122}
              className="mt-4 h-auto w-56 object-contain object-left sm:mt-5 sm:w-72"
              priority
            />
            <p className="mt-4 text-base leading-relaxed text-warm-white/80 sm:mt-6 sm:text-lg">
              Chestnut & Cheer installs high-quality temporary and permanent
              Christmas lights on roofs, trees, and bushes — plus gutter cleaning
              while we&apos;re on the roof. Free quotes via Google Meet or
              in-person.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href={LINKS.booking} variant="gold" className="w-full sm:w-auto">
                Book Online
              </Button>
              <Button
                href={LINKS.contact}
                variant="outline"
                className="w-full border-warm-white/30 text-warm-white hover:bg-warm-white/10 sm:w-auto"
              >
                Get a Free Quote
              </Button>
            </div>
          </div>

          <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl border border-warm-white/10 shadow-2xl lg:order-none">
            <Image
              src={ASSETS.photos.hero}
              alt="Christmas light installation on a home in Utah County"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-4 sm:px-6 sm:pb-6">
        <Image
          src={ASSETS.brand.stringLights}
          alt=""
          width={1200}
          height={268}
          className="mx-auto h-auto w-full max-w-3xl object-contain opacity-90"
          aria-hidden
          priority
        />
      </div>
    </section>
  );
}
