"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AddressAutocomplete,
  type ParsedPlace,
} from "@/components/estimate/AddressAutocomplete";
import TurnstileWidget from "@/components/TurnstileWidget";
import {
  getFormTrackingData,
  type FormTrackingData,
} from "@/lib/analytics/form-tracking";
import { track } from "@/lib/analytics/track";
import { COMPANY, LINKS } from "@/lib/constants";
import {
  OFFER_MARKETING_CONSENT,
  OFFER_MARKETING_CONSENT_VERSION,
} from "@/lib/offers/consent";

type OfferId = "permanent-lights-giveaway" | "free-christmas-lights";
type Status = "idle" | "sending" | "success" | "error";

const GOOGLE_ADS_LEAD_CONVERSION = "AW-18477697547/h1GjCKi_yIcdEIuU7epE";

const COPY: Record<OfferId, { title: string; intro: string; button: string; success: string }> = {
  "permanent-lights-giveaway": {
    title: "Enter the drawing",
    intro: "Tell us where the winning installation would go.",
    button: "Enter the Giveaway",
    success: "You're entered! Keep an eye on your inbox and phone for winner updates.",
  },
  "free-christmas-lights": {
    title: "Claim the free lights offer",
    intro: "Get availability and a complete seasonal-service quote for your home.",
    button: "Get My Service Quote",
    success: "We received your request and will follow up with availability and your seasonal-service quote.",
  },
};

function normalizeUsPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

function newEventId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function OfferLeadForm({ offerId }: { offerId: OfferId }) {
  const content = COPY[offerId];
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [address, setAddress] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<ParsedPlace | null>(null);
  const [trackingFields, setTrackingFields] = useState<FormTrackingData | null>(null);

  useEffect(() => {
    setTrackingFields(getFormTrackingData());
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const fullAddress = address.trim();

    if (!firstName || !lastName || !email || !phone || !fullAddress) {
      setStatus("error");
      setError("Please complete every field so we can process your submission.");
      return;
    }
    if (!token) {
      setStatus("error");
      setError("Please complete the human verification checkbox.");
      return;
    }

    setStatus("sending");
    setError("");
    const eventId = newEventId();
    const tracking = getFormTrackingData();

    try {
      const response = await fetch("/api/offers/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId,
          firstName,
          lastName,
          email,
          phone,
          address: selectedPlace?.address || fullAddress,
          formattedAddress: fullAddress,
          city: selectedPlace?.city || null,
          state: selectedPlace?.state || null,
          zip: selectedPlace?.zip || null,
          lat: selectedPlace?.lat ?? null,
          lng: selectedPlace?.lng ?? null,
          conversionPage: window.location.pathname,
          eventId,
          marketingConsent: true,
          consentDisclosure: OFFER_MARKETING_CONSENT,
          consentVersion: OFFER_MARKETING_CONSENT_VERSION,
          websiteUrl: data.get("websiteUrl"),
          turnstileToken: token,
          tracking,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        externalId?: string;
        eventId?: string;
      };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Could not submit your request.");
      }

      const conversionEventId = result.eventId || eventId;
      const transactionId = result.externalId || conversionEventId;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "offer_lead_submit",
        offer_id: offerId,
        form_name: offerId,
        transaction_id: transactionId,
        event_id: conversionEventId,
      });

      const normalizedPhone = normalizeUsPhone(phone);
      window.gtag?.("set", "user_data", {
        email: email.toLowerCase(),
        ...(normalizedPhone ? { phone_number: normalizedPhone } : {}),
        address: {
          first_name: firstName,
          last_name: lastName,
          street: selectedPlace?.address || fullAddress,
          city: selectedPlace?.city || undefined,
          region: selectedPlace?.state || undefined,
          postal_code: selectedPlace?.zip || undefined,
          country: "US",
        },
      });
      window.gtag?.("event", "conversion", {
        send_to: GOOGLE_ADS_LEAD_CONVERSION,
        value: offerId === "permanent-lights-giveaway" ? 100 : 500,
        currency: "USD",
        transaction_id: transactionId,
      });
      window.gtag?.("event", "generate_lead", {
        offer_id: offerId,
        form_name: offerId,
        transaction_id: transactionId,
      });
      window.fbq?.(
        "track",
        "Lead",
        { content_name: offerId, content_category: "holiday_lighting_offer" },
        { eventID: conversionEventId }
      );
      track("FORM_SUBMIT", { form_name: offerId, lead_type: offerId });

      form.reset();
      setAddress("");
      setSelectedPlace(null);
      setTrackingFields(getFormTrackingData());
      setStatus("success");
      setToken(null);
      setResetKey((value) => value + 1);
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : `Could not submit. Please call ${COMPANY.phone}.`
      );
      setToken(null);
      setResetKey((value) => value + 1);
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[1.75rem] border border-white/70 bg-white p-7 text-center shadow-2xl shadow-black/15 sm:p-9"
        role="status"
      >
        <p className="font-display text-3xl font-semibold text-chestnut">Thank you!</p>
        <p className="mt-3 leading-relaxed text-chestnut/70">{content.success}</p>
      </div>
    );
  }

  const fieldClass =
    "mt-1 min-h-11 w-full rounded-xl border border-chestnut/20 bg-white px-3.5 text-base text-chestnut outline-none transition focus:border-primary-red focus:ring-2 focus:ring-primary-red/15";

  return (
    <form
      onSubmit={submit}
      data-analytics-form={offerId}
      className="rounded-[1.75rem] border border-white/70 bg-white p-5 shadow-2xl shadow-black/15 sm:p-6"
    >
      <h2 className="font-display text-2xl font-semibold leading-tight text-chestnut">
        {content.title}
      </h2>
      <p className="mt-1 text-sm text-chestnut/60">{content.intro}</p>

      <label className="absolute -left-[10000px] h-px w-px overflow-hidden">
        Website
        <input name="websiteUrl" tabIndex={-1} autoComplete="off" />
      </label>
      {trackingFields
        ? Object.entries(trackingFields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value ?? ""} />
          ))
        : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-chestnut">
          First name
          <input
            name="firstName"
            required
            autoComplete="given-name"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-chestnut">
          Last name
          <input
            name="lastName"
            required
            autoComplete="family-name"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-chestnut sm:col-span-2">
          Email address
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-chestnut sm:col-span-2">
          Mobile phone
          <input
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm font-semibold text-chestnut sm:col-span-2">
          Home address
          <AddressAutocomplete
            value={address}
            onChange={(value) => {
              setAddress(value);
              setSelectedPlace(null);
            }}
            onPlaceSelected={(place) => {
              setAddress(place.formattedAddress);
              setSelectedPlace(place);
            }}
            placeholder="Start typing your full home address"
            required
            deferUntilFocus
          />
        </label>
      </div>

      <TurnstileWidget
        onToken={setToken}
        resetKey={resetKey}
        className="mt-3"
      />
      {status === "error" ? (
        <p
          className="mt-3 rounded-xl bg-primary-red/5 p-3 text-sm text-primary-red"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-3 min-h-12 w-full rounded-full bg-primary-red px-5 font-semibold text-white shadow-lg shadow-primary-red/20 transition hover:bg-primary-red/90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : content.button}
      </button>
      <p className="mt-3 text-[11px] leading-relaxed text-chestnut/58">
        {OFFER_MARKETING_CONSENT} See our{" "}
        <Link className="underline underline-offset-2" href={LINKS.privacy}>Privacy Policy</Link>{" "}
        and{" "}
        <Link className="underline underline-offset-2" href={LINKS.terms}>Terms</Link>.
      </p>
    </form>
  );
}
