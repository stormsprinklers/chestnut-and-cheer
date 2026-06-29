import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { ASSETS, LINKS } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-chestnut">
      <div className="absolute inset-0 bg-gradient-to-br from-chestnut via-chestnut to-primary-red/40" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr_1fr]">
          <Mascot
            variant="light"
            side="left"
            size={200}
            className="hidden self-end lg:block"
            priority
          />

          <div>
            <p className="mb-4 inline-block rounded-full bg-accent-gold/20 px-4 py-1 text-sm font-semibold text-accent-gold">
              Utah County & Salt Lake County
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-warm-white sm:text-5xl lg:text-6xl">
              Premium Holiday Lighting for Your Home & Business
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-warm-white/80">
              Chestnut & Cheer installs high-quality temporary and permanent
              Christmas lights on roofs, trees, and bushes — plus gutter cleaning
              while we&apos;re on the roof. Free quotes via Google Meet or
              in-person.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={LINKS.booking} variant="gold">
                Book Online
              </Button>
              <Button
                href={LINKS.contact}
                variant="outline"
                className="border-warm-white/30 text-warm-white hover:bg-warm-white/10"
              >
                Get a Free Quote
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-warm-white/10 shadow-2xl">
            <Image
              src={ASSETS.photos.hero}
              alt="Beautiful home decorated with premium holiday lights"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        <Mascot
          variant="light"
          side="left"
          size={140}
          className="mx-auto mt-6 lg:hidden"
          priority
        />
      </div>
    </section>
  );
}
