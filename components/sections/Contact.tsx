import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { COMPANY, LINKS } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="section-pad below-fold bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-chestnut/70 leading-relaxed">
              Ready to light up your property? Call, text, or email us for a
              free quote — available via Google Meet or in-person consultation.
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={LINKS.tel}
                  className="flex min-h-11 items-center gap-3 text-chestnut transition-colors hover:text-primary-red touch-manipulation"
                >
                  <Phone className="h-5 w-5 shrink-0 text-primary-red" aria-hidden />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={LINKS.mailto}
                  className="flex min-h-11 items-center gap-3 text-chestnut transition-colors hover:text-primary-red touch-manipulation"
                >
                  <Mail className="h-5 w-5 shrink-0 text-primary-red" aria-hidden />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-chestnut">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-red" aria-hidden />
                {COMPANY.address.full}
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href={LINKS.tel} variant="primary" className="w-full sm:w-auto">
                Call Now
              </Button>
              <Button href={LINKS.sms} variant="outline" className="w-full sm:w-auto">
                Text Us
              </Button>
            </div>
          </div>

          <Mascot variant="cheer" side="right" size={180} className="hidden lg:block" />

          <form
            action="#"
            className="rounded-2xl border border-chestnut/10 bg-white p-5 shadow-sm sm:p-6"
          >
            <h3 className="font-display text-xl font-semibold text-chestnut">
              Send a Message
            </h3>
            <p className="mt-1 text-sm text-chestnut/60">
              Form coming soon — call or email us in the meantime.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-chestnut">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  disabled
                  placeholder="Your name"
                  className="mt-1 w-full rounded-lg border border-chestnut/20 bg-cream/50 px-4 py-3 text-base text-chestnut/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-chestnut">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  disabled
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border border-chestnut/20 bg-cream/50 px-4 py-3 text-base text-chestnut/50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-chestnut">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  disabled
                  placeholder="Tell us about your property..."
                  className="mt-1 w-full rounded-lg border border-chestnut/20 bg-cream/50 px-4 py-3 text-base text-chestnut/50"
                />
              </div>
              <button
                type="submit"
                disabled
                className="w-full cursor-not-allowed rounded-full bg-chestnut/30 px-5 py-3 text-sm font-semibold text-chestnut/50"
              >
                Send Message (Coming Soon)
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
