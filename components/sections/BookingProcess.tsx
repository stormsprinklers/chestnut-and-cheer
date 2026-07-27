import { Mascot } from "@/components/ui/Mascot";
import { BOOKING_STEPS } from "@/lib/constants";

export function BookingProcess() {
  return (
    <section className="section-pad bg-cream">
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

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKING_STEPS.map((step) => (
            <div key={step.step} className="relative text-center">
              <div className="mx-auto mb-2 flex justify-center">
                <Mascot variant={step.mascot} size={120} className="mx-auto" />
              </div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-red font-display text-lg font-bold text-warm-white">
                {step.step}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-chestnut">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-chestnut/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
