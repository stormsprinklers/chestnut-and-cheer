"use client";

import { useState } from "react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { track } from "@/lib/analytics/track";
import { COMPANY } from "@/lib/constants";

type Service = "temporary" | "permanent";
type Status = "idle" | "sending" | "success" | "error";

const GOOGLE_ADS_LEAD_CONVERSION = "AW-18477697547/h1GjCKi_yIcdEIuU7epE";

function normalizeUsPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function PpcLeadForm({ service }: { service: Service }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const formName = `ppc_${service}_lights`;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const zip = String(data.get("zip") ?? "").trim();

    if (!name || !phone || !zip) {
      setStatus("error");
      setError("Please enter your name, phone number, and ZIP code.");
      return;
    }
    if (!token) {
      setStatus("error");
      setError("Please complete the human verification checkbox.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email,
          message: `${service === "temporary" ? "Temporary Christmas lights" : "Permanent Christmas lights"} PPC quote request. ZIP code: ${zip}.`,
          websiteUrl: data.get("websiteUrl"),
          turnstileToken: token,
          leadSource: formName,
          conversionPage: window.location.pathname,
          service,
          zip,
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string; externalId?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Could not submit your request.");

      const conversion = { event: "ppc_lead_submit", lead_type: service, form_name: formName, transaction_id: result.externalId };
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(conversion);
      const normalizedPhone = normalizeUsPhone(phone);
      window.gtag?.("set", "user_data", {
        ...(email ? { email: email.toLowerCase() } : {}),
        ...(normalizedPhone ? { phone_number: normalizedPhone } : {}),
      });
      window.gtag?.("event", "conversion", {
        send_to: GOOGLE_ADS_LEAD_CONVERSION,
        value: 500,
        currency: "USD",
        transaction_id: result.externalId,
      });
      window.gtag?.("event", "generate_lead", { lead_type: service, form_name: formName, transaction_id: result.externalId });
      track("FORM_SUBMIT", { form_name: formName, lead_type: service });
      form.reset();
      setStatus("success");
      setToken(null);
      setResetKey((value) => value + 1);
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : `Could not submit. Please call ${COMPANY.phone}.`);
      setToken(null);
      setResetKey((value) => value + 1);
    }
  }

  if (status === "success") {
    return <div className="rounded-3xl bg-white p-7 text-center shadow-xl shadow-chestnut/10 sm:p-9" role="status"><p className="font-display text-3xl font-semibold text-chestnut">Thank you!</p><p className="mt-3 text-chestnut/70">Your quote request was received. We&apos;ll contact you soon.</p></div>;
  }

  const fieldClass = "mt-1.5 min-h-12 w-full rounded-xl border border-chestnut/20 bg-white px-4 text-base text-chestnut outline-none transition focus:border-primary-red focus:ring-2 focus:ring-primary-red/15";
  return (
    <form onSubmit={submit} data-analytics-form={formName} className="rounded-3xl bg-white p-6 shadow-xl shadow-chestnut/10 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-chestnut">Get a free quote</h2>
      <p className="mt-1 text-sm text-chestnut/60">We&apos;ll contact you about your property and lighting goals.</p>
      <label className="absolute -left-[10000px] h-px w-px overflow-hidden">Website<input name="websiteUrl" tabIndex={-1} autoComplete="off" /></label>
      <div className="mt-5 space-y-4">
        <label className="block text-sm font-semibold text-chestnut">Name<input name="name" required autoComplete="name" className={fieldClass} /></label>
        <label className="block text-sm font-semibold text-chestnut">Phone<input name="phone" type="tel" required inputMode="tel" autoComplete="tel" className={fieldClass} /></label>
        <label className="block text-sm font-semibold text-chestnut">Email <span className="font-normal text-chestnut/50">(optional)</span><input name="email" type="email" autoComplete="email" className={fieldClass} /></label>
        <label className="block text-sm font-semibold text-chestnut">ZIP code<input name="zip" required inputMode="numeric" autoComplete="postal-code" maxLength={10} className={fieldClass} /></label>
        <TurnstileWidget onToken={setToken} resetKey={resetKey} />
        {status === "error" && <p className="rounded-xl bg-primary-red/5 p-3 text-sm text-primary-red" role="alert">{error}</p>}
        <button type="submit" disabled={status === "sending"} className="min-h-12 w-full rounded-full bg-primary-red px-5 font-semibold text-white transition hover:bg-primary-red/90 disabled:opacity-60">{status === "sending" ? "Sending…" : "Request My Free Quote"}</button>
        <p className="text-center text-xs leading-relaxed text-chestnut/50">By submitting, you agree that {COMPANY.name} may contact you about this request. No marketing text consent is required.</p>
      </div>
    </form>
  );
}
