"use client";

import { useRef, useState } from "react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { getFormTrackingData } from "@/lib/analytics/form-tracking";
import { track } from "@/lib/analytics/track";
import { COMPANY, LINKS } from "@/lib/constants";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3 text-base text-chestnut shadow-sm placeholder:text-chestnut/40 focus:border-primary-red focus:outline-none focus:ring-2 focus:ring-primary-red/15";

export function JobApplicationForm({
  jobTitle,
  jobSlug,
  applicationsOpen,
  prefilled,
}: {
  jobTitle: string;
  jobSlug: string;
  applicationsOpen: boolean;
  prefilled: { first?: string; last?: string; email?: string; phone?: string };
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const formStarted = useRef(false);

  function markStarted() {
    if (formStarted.current) return;
    formStarted.current = true;
    track("FORM_START", { form_name: "job_application", job_slug: jobSlug });
  }

  async function submitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!turnstileToken) {
      setStatus("error");
      setError("Please complete the human verification checkbox.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          jobSlug,
          interest: data.get("interest"),
          hardWorkMeaning: data.get("hardWorkMeaning"),
          integrityMeaning: data.get("integrityMeaning"),
          inconvenientServiceExample: data.get("inconvenientServiceExample"),
          personalGoals: data.get("personalGoals"),
          websiteUrl: data.get("websiteUrl"),
          turnstileToken,
          tracking: getFormTrackingData(),
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setStatus("error");
        setError(result.error || "Something went wrong. Please try again.");
        setTurnstileToken(null);
        setTurnstileReset((value) => value + 1);
        return;
      }

      track("FORM_SUBMIT", { form_name: "job_application", job_slug: jobSlug });
      form.reset();
      setStatus("success");
      setTurnstileToken(null);
      setTurnstileReset((value) => value + 1);
    } catch {
      setStatus("error");
      setError(`Something went wrong. Please try again or call us at ${COMPANY.phone}.`);
      setTurnstileToken(null);
      setTurnstileReset((value) => value + 1);
    }
  }

  if (!applicationsOpen) {
    return (
      <div className="rounded-2xl border border-chestnut/10 bg-white p-6 text-chestnut/75">
        We are not accepting online applications for {jobTitle} right now. Questions? Call us at{" "}
        <a className="font-semibold text-primary-red underline" href={LINKS.tel}>{COMPANY.phone}</a>.
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-[2rem] border border-accent-gold/70 bg-white p-8 text-center shadow-xl shadow-chestnut/10" role="status">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-primary-red">Application received</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-chestnut">Thank you for applying!</h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-chestnut/70">
          Your application is now with the Chestnut &amp; Cheer hiring team. We&apos;ll review it and contact you about next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitApplication}
      onFocus={markStarted}
      onInput={markStarted}
      noValidate
      data-analytics-form="job_application"
      className="rounded-[2rem] border border-chestnut/10 bg-white p-5 shadow-xl shadow-chestnut/10 sm:p-8"
    >
      <label className="sr-only" aria-hidden="true">
        Website
        <input name="websiteUrl" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-chestnut">
          First name *
          <input className={inputClass} name="firstName" type="text" autoComplete="given-name" defaultValue={prefilled.first} required maxLength={80} />
        </label>
        <label className="block text-sm font-semibold text-chestnut">
          Last name *
          <input className={inputClass} name="lastName" type="text" autoComplete="family-name" defaultValue={prefilled.last} required maxLength={80} />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-chestnut">
          Email *
          <input className={inputClass} name="email" type="email" autoComplete="email" defaultValue={prefilled.email} required maxLength={254} />
        </label>
        <label className="block text-sm font-semibold text-chestnut">
          Phone *
          <input className={inputClass} name="phone" type="tel" autoComplete="tel" defaultValue={prefilled.phone} required maxLength={40} />
        </label>
      </div>

      <label className="mt-4 block text-sm font-semibold text-chestnut">
        Why are you interested in this position?
        <textarea className={inputClass} name="interest" rows={4} maxLength={3000} placeholder="Tell us a bit about yourself and why you'd be a great fit..." />
      </label>

      <div className="mt-6 space-y-4">
        <label className="block text-sm font-semibold text-chestnut">
          1. What does hard work mean to you? *
          <textarea className={inputClass} name="hardWorkMeaning" rows={3} required maxLength={3000} />
        </label>
        <label className="block text-sm font-semibold text-chestnut">
          2. What does it mean to have integrity? *
          <textarea className={inputClass} name="integrityMeaning" rows={3} required maxLength={3000} />
        </label>
        <label className="block text-sm font-semibold text-chestnut">
          3. What was a time when you served someone when it was inconvenient? *
          <textarea className={inputClass} name="inconvenientServiceExample" rows={4} required maxLength={4000} />
        </label>
        <label className="block text-sm font-semibold text-chestnut">
          4. What personal goals are you currently working on? *
          <textarea className={inputClass} name="personalGoals" rows={3} required maxLength={3000} />
        </label>
      </div>

      <div className="mt-5">
        <TurnstileWidget onToken={setTurnstileToken} resetKey={turnstileReset} deferUntilVisible />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 min-h-12 w-full rounded-full bg-primary-red px-6 py-3 font-semibold text-warm-white shadow-lg shadow-primary-red/15 transition hover:bg-primary-red/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending application…" : "Submit Application"}
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-chestnut/60">
        By submitting, you agree that {COMPANY.name} may contact you about this application. View our{" "}
        <a href={LINKS.privacy} className="underline underline-offset-2 hover:text-primary-red">Privacy Policy</a>.
      </p>
    </form>
  );
}
