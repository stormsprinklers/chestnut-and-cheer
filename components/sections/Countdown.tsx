import { Mascot } from "@/components/ui/Mascot";
import { CountdownTimer } from "@/components/ui/CountdownTimer";

export function Countdown() {
  return (
    <section className="section-pad below-fold">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center">
          <Mascot variant="light" side="left" size={180} className="hidden lg:block" />

          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
              Countdown to Christmas
            </h2>
            <p className="mt-4 text-chestnut/70">
              Don&apos;t wait — the best install dates book up fast. Schedule your
              free quote today.
            </p>
            <div className="mt-10">
              <CountdownTimer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
