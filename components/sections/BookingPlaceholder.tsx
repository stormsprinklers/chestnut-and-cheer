import { Calendar, Phone, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { COMPANY, LINKS } from "@/lib/constants";

export function BookingPlaceholder() {
  return (
    <section id="booking" className="section-pad bg-primary-red text-warm-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <Mascot variant="gift" side="left" size={200} className="hidden shrink-0 lg:block" />

          <div className="flex-1">
            <div className="text-center lg:text-left">
              <Calendar className="mx-auto h-12 w-12 text-accent-gold lg:mx-0" aria-hidden />
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Book Online
              </h2>
              <p className="mt-4 text-warm-white/80">
                Online scheduling is coming soon. In the meantime, reach out for a
                free quote — we&apos;re happy to meet over Google Meet or in person.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-warm-white/20 bg-warm-white/5 p-6 backdrop-blur-sm">
              <p className="mb-6 text-center text-sm font-medium text-accent-gold lg:text-left">
                Online booking coming soon
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="service-type" className="block text-sm font-medium">
                    Service Type
                  </label>
                  <select
                    id="service-type"
                    disabled
                    className="mt-1 w-full rounded-lg border border-warm-white/20 bg-warm-white/10 px-4 py-2.5 text-warm-white/50"
                  >
                    <option>Temporary Lighting</option>
                    <option>Permanent Lighting</option>
                    <option>Commercial Lighting</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium">
                    Property Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    disabled
                    placeholder="123 Main St, Orem UT"
                    className="mt-1 w-full rounded-lg border border-warm-white/20 bg-warm-white/10 px-4 py-2.5 text-warm-white/50 placeholder:text-warm-white/30"
                  />
                </div>
                <div>
                  <label htmlFor="preferred-date" className="block text-sm font-medium">
                    Preferred Install Date
                  </label>
                  <input
                    id="preferred-date"
                    type="date"
                    disabled
                    className="mt-1 w-full rounded-lg border border-warm-white/20 bg-warm-white/10 px-4 py-2.5 text-warm-white/50"
                  />
                </div>
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-full bg-warm-white/20 px-5 py-3 text-sm font-semibold text-warm-white/50"
                >
                  Schedule Install (Coming Soon)
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
              <Button href={LINKS.tel} variant="gold" className="w-full sm:w-auto">
                <Phone className="h-4 w-4" />
                Call {COMPANY.phone}
              </Button>
              <a
                href={LINKS.sms}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-warm-white/30 px-5 py-2.5 text-sm font-semibold text-warm-white transition-colors hover:bg-warm-white/10 sm:w-auto touch-manipulation"
              >
                <MessageSquare className="h-4 w-4" />
                Text Us
              </a>
              <a
                href={LINKS.mailto}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-warm-white/30 px-5 py-2.5 text-sm font-semibold text-warm-white transition-colors hover:bg-warm-white/10 sm:w-auto touch-manipulation"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
