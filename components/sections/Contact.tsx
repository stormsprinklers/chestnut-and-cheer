"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { COMPANY, LINKS } from "@/lib/constants";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !message || (!email && !phone)) {
      setStatus("error");
      setError("Please enter your name, a message, and an email or phone.");
      return;
    }
    if (!turnstileToken) {
      setStatus("error");
      setError("Please complete the human verification checkbox.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          websiteUrl: fd.get("websiteUrl"),
          turnstileToken,
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error || "Could not send your message. Please call us.");
        setTurnstileToken(null);
        setTurnstileReset((n) => n + 1);
        return;
      }
      setStatus("success");
      form.reset();
      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);
    } catch {
      setStatus("error");
      setError(`Could not send your message. Please call ${COMPANY.phone}.`);
      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);
    }
  }

  return (
    <section id="contact" className="section-pad below-fold bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-chestnut/70 leading-relaxed">
              Ready to light up your property? Call, text, or send a message for a
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
              <Button href={LINKS.estimate} variant="primary" className="w-full sm:w-auto">
                Get Instant Estimate
              </Button>
              <Button href={LINKS.tel} variant="outline" className="w-full sm:w-auto">
                Call Now
              </Button>
            </div>
          </div>

          <Mascot variant="phone" side="right" size={180} className="hidden lg:block" />

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-chestnut/10 bg-white p-5 shadow-sm sm:p-6"
          >
            <h3 className="font-display text-xl font-semibold text-chestnut">
              Send a Message
            </h3>
            <p className="mt-1 text-sm text-chestnut/60">
              We&apos;ll get back to you shortly — usually the same day.
            </p>

            <label
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              Website
              <input type="text" name="websiteUrl" tabIndex={-1} autoComplete="off" />
            </label>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-chestnut">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="mt-1 w-full rounded-lg border border-chestnut/20 bg-white px-4 py-3 text-base text-chestnut"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-chestnut">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(385) 555-1234"
                  className="mt-1 w-full rounded-lg border border-chestnut/20 bg-white px-4 py-3 text-base text-chestnut"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-chestnut">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border border-chestnut/20 bg-white px-4 py-3 text-base text-chestnut"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-chestnut">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your property..."
                  className="mt-1 w-full rounded-lg border border-chestnut/20 bg-white px-4 py-3 text-base text-chestnut"
                />
              </div>

              <TurnstileWidget onToken={setTurnstileToken} resetKey={turnstileReset} />

              {status === "success" && (
                <p className="rounded-xl border border-accent-gold/40 bg-accent-gold/10 px-4 py-3 text-sm text-chestnut">
                  Thanks! Your message is in — we&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p
                  className="rounded-xl border border-primary-red/30 bg-primary-red/5 px-4 py-3 text-sm text-primary-red"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-primary-red px-5 py-3 text-sm font-semibold text-warm-white disabled:opacity-50 touch-manipulation"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
