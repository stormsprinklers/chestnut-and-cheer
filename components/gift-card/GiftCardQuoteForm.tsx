"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Gift, MapPin, Phone, UserRound } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { getFormTrackingData } from "@/lib/analytics/form-tracking";
import { track } from "@/lib/analytics/track";
import { COMPANY, LINKS } from "@/lib/constants";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3 text-base text-chestnut shadow-sm placeholder:text-chestnut/40 focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/15";

export function GiftCardQuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const giftCardFrom = String(data.get("giftCardFrom") ?? "").trim();

    if (!name || !phone || !address || !giftCardFrom) {
      setStatus("error");
      setError("Please complete all four fields.");
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
      const response = await fetch("/api/gift-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          giftCardFrom,
          websiteUrl: data.get("websiteUrl"),
          turnstileToken,
          tracking: getFormTrackingData(),
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setError(result.error || "We couldn't send your request. Please call or text us.");
        setTurnstileToken(null);
        setTurnstileReset((value) => value + 1);
        return;
      }

      track("FORM_SUBMIT", { form_name: "gift_card_quote" });
      form.reset();
      setStatus("success");
      setTurnstileToken(null);
      setTurnstileReset((value) => value + 1);
    } catch {
      setStatus("error");
      setError(`We couldn't send your request. Please call or text ${COMPANY.phone}.`);
      setTurnstileToken(null);
      setTurnstileReset((value) => value + 1);
    }
  }

  return (
    <div className="rounded-[2rem] border border-chestnut/10 bg-cream p-5 shadow-2xl shadow-chestnut/20 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-red text-warm-white">
          <Gift className="size-5" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-primary-red">Gift card quote</p>
          <h2 className="font-display text-2xl font-semibold text-chestnut">Tell us where to bring the cheer</h2>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate data-analytics-form="gift_card_quote" className="mt-6">
        <label className="sr-only" aria-hidden="true">
          Website
          <input name="websiteUrl" tabIndex={-1} autoComplete="off" />
        </label>

        <div className="space-y-4">
          <div>
            <label htmlFor="gift-card-name" className="flex items-center gap-2 text-sm font-semibold text-chestnut">
              <UserRound className="size-4 text-primary-red" aria-hidden />
              Name
            </label>
            <input id="gift-card-name" name="name" type="text" required autoComplete="name" maxLength={120} placeholder="Your full name" className={inputClass} />
          </div>

          <div>
            <label htmlFor="gift-card-phone" className="flex items-center gap-2 text-sm font-semibold text-chestnut">
              <Phone className="size-4 text-primary-red" aria-hidden />
              Phone number
            </label>
            <input id="gift-card-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" maxLength={30} placeholder="(385) 555-1234" className={inputClass} />
          </div>

          <div>
            <label htmlFor="gift-card-address" className="flex items-center gap-2 text-sm font-semibold text-chestnut">
              <MapPin className="size-4 text-primary-red" aria-hidden />
              Home address
            </label>
            <input id="gift-card-address" name="address" type="text" required autoComplete="street-address" maxLength={240} placeholder="Street address, city, state, ZIP" className={inputClass} />
          </div>

          <div>
            <label htmlFor="gift-card-from" className="flex items-center gap-2 text-sm font-semibold text-chestnut">
              <Gift className="size-4 text-primary-red" aria-hidden />
              Who gave you the gift card?
            </label>
            <input id="gift-card-from" name="giftCardFrom" type="text" required maxLength={120} placeholder="Their name" className={inputClass} />
          </div>
        </div>

        <div className="mt-5">
          <TurnstileWidget onToken={setTurnstileToken} resetKey={turnstileReset} deferUntilVisible />
        </div>

        <div className="mt-4" aria-live="polite">
          {status === "success" && (
            <div className="rounded-xl border border-accent-gold/60 bg-accent-gold/15 p-4 text-sm leading-relaxed text-chestnut" role="status">
              <p className="font-semibold">Your quote request is in!</p>
              <p className="mt-1">We&apos;ll call or text you soon to talk through your lighting project and $100 gift card.</p>
            </div>
          )}
          {status === "error" && (
            <p className="rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red" role="alert">
              {error}
            </p>
          )}
        </div>

        <button type="submit" disabled={status === "sending"} className="mt-5 min-h-12 w-full rounded-full bg-primary-red px-6 py-3 font-semibold text-warm-white shadow-lg shadow-primary-red/15 transition hover:bg-primary-red/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut disabled:cursor-not-allowed disabled:opacity-50">
          {status === "sending" ? "Sending request…" : "Request My Christmas Lights Quote"}
        </button>

        <p className="mt-3 text-center text-xs leading-relaxed text-chestnut/65">
          By submitting, you agree that Chestnut &amp; Cheer may call or text you about this quote. View our{" "}
          <a href={LINKS.privacy} className="underline underline-offset-2 hover:text-primary-red">Privacy Policy</a>.
        </p>
      </form>

      <details className="group mt-6 rounded-2xl border border-chestnut/15 bg-white px-4 py-3">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-chestnut marker:hidden">
          Gift card terms &amp; conditions
          <ChevronDown className="size-5 shrink-0 text-primary-red transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <ul className="mt-3 space-y-2 border-t border-chestnut/10 pt-3 text-sm leading-relaxed text-chestnut/75">
          <li>• This is a promotional gift card with no cash value.</li>
          <li>• The expiration date is printed on the gift card.</li>
          <li>• The gift card may be used toward seasonal or permanent holiday lighting.</li>
          <li>• Only one gift card may be used per purchase.</li>
          <li>• The gift card applies only to the purchase of new lights.</li>
        </ul>
      </details>
    </div>
  );
}
