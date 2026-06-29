import Image from "next/image";
import { Mascot } from "@/components/ui/Mascot";
import { ASSETS, BOOKING_STEPS } from "@/lib/constants";

export function BookingProcess() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-chestnut/70">
            From your first call to takedown in January — we make holiday
            lighting effortless.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BOOKING_STEPS.map((step) => (
              <div key={step.step} className="relative text-center">
                {step.step === 2 ? (
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-primary-red/20 bg-white">
                    <Image
                      src={ASSETS.photos.virtualQuote}
                      alt="Virtual quote consultation"
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-red font-display text-2xl font-bold text-warm-white">
                    {step.step}
                  </div>
                )}
                <h3 className="mt-4 font-display text-lg font-semibold text-chestnut">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-chestnut/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <Mascot
            variant="cheer"
            side="right"
            size={200}
            className="hidden shrink-0 lg:block"
          />
        </div>

        <Mascot variant="cheer" side="left" size={140} className="mx-auto mt-8 lg:hidden" />
      </div>
    </section>
  );
}
