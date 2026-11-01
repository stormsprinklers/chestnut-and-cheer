"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import TurnstileWidget from "@/components/TurnstileWidget";
import { track } from "@/lib/analytics/track";
import { getFormTrackingData } from "@/lib/analytics/form-tracking";
import { COMPANY, LINKS } from "@/lib/constants";
import {
  type CheerFormKind,
  type CheerSubmission,
  nominationFields,
  supportFields,
  validateCheerSubmission,
} from "@/lib/share-the-cheer";

type Field = {
  name: string;
  label: string;
  type?: "email" | "tel" | "number" | "textarea";
  required?: boolean;
  hint?: string;
};

const submitterFields: Field[] = [
  { name: "submitterName", label: "Your full name", required: true },
  { name: "submitterEmail", label: "Your email", type: "email", required: true },
  { name: "submitterPhone", label: "Your phone", type: "tel", required: true },
  { name: "relationship", label: "Your relationship to the family" },
];

const familyFields: Field[] = [
  { name: "familyName", label: "Family or primary contact name", required: true },
  { name: "familyCity", label: "City", required: true },
  { name: "familyEmail", label: "Family contact email", type: "email", hint: "Please provide an email, phone number, or both." },
  { name: "familyPhone", label: "Family contact phone", type: "tel" },
  { name: "householdSize", label: "How many people are in their household?", type: "number", required: true },
  { name: "reason", label: "Why does this family deserve a free and magical Christmas?", type: "textarea", required: true, hint: "Share the story that would help us understand their season. Please do not include medical records, financial documents, or identification numbers." },
];

const supporterFields: Field[] = [
  { name: "supporterName", label: "Your full name", required: true },
  { name: "organization", label: "Business or organization, if applicable" },
  { name: "supporterEmail", label: "Your email", type: "email", required: true },
  { name: "supporterPhone", label: "Your phone", type: "tel", required: true },
  { name: "contributionNotes", label: "What would you be able to contribute?", type: "textarea", required: true, hint: "Funds, gifts, professional services, experiences, or other useful support are all welcome." },
];

export function CheerForm({ kind }: { kind: CheerFormKind }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState<string | null>(null);
  const [reset, setReset] = useState(0);
  const isNomination = kind === "nomination";

  function renderField(field: Field) {
    const id = `${kind}-${field.name}`;
    const describedBy = [field.hint && `${id}-hint`, errors[field.name] && `${id}-error`].filter(Boolean).join(" ") || undefined;
    const controlClass = "mt-1 w-full rounded-xl border border-chestnut/25 bg-cream/30 px-3 py-2.5 text-chestnut focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red";
    return <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="block text-sm font-semibold text-chestnut">{field.label}{field.required && <span className="text-primary-red"> *</span>}</label>
      {field.hint && <p id={`${id}-hint`} className="mt-1 text-sm leading-relaxed text-chestnut/70">{field.hint}</p>}
      {field.type === "textarea" ?
        <textarea id={id} name={field.name} rows={5} required={field.required} maxLength={2500} aria-invalid={Boolean(errors[field.name])} aria-describedby={describedBy} className={controlClass} /> :
        <input id={id} name={field.name} type={field.type ?? "text"} required={field.required} min={field.type === "number" ? 1 : undefined} max={field.type === "number" ? 30 : undefined} maxLength={field.type === "number" ? undefined : 200} aria-invalid={Boolean(errors[field.name])} aria-describedby={describedBy} className={controlClass} />}
      {errors[field.name] && <p id={`${id}-error`} className="mt-1 text-sm text-primary-red">{errors[field.name]}</p>}
    </div>;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const data: CheerSubmission = {};
    for (const key of isNomination ? nominationFields : supportFields) data[key] = String(fd.get(key) ?? "").trim();
    if (isNomination) data.contactPermission = fd.get("contactPermission") === "on";
    data.termsConsent = fd.get("termsConsent") === "on";
    const nextErrors = validateCheerSubmission(kind, data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || !token) {
      setStatus("error");
      setError(!token ? "Please complete the human verification checkbox." : "Please check the highlighted fields.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/share-the-cheer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, data, websiteUrl: fd.get("websiteUrl"), turnstileToken: token, tracking: getFormTrackingData() }),
      });
      const result = await response.json() as { ok?: boolean; error?: string; errors?: Record<string, string> };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setError(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        setToken(null);
        setReset((number) => number + 1);
        return;
      }
      track("FORM_SUBMIT", { form_name: `share_the_cheer_${kind}` });
      form.reset();
      setStatus("success");
      setErrors({});
      setToken(null);
      setReset((number) => number + 1);
    } catch {
      setError(`We couldn't send your submission. Please call ${COMPANY.phone}.`);
      setStatus("error");
      setToken(null);
      setReset((number) => number + 1);
    }
  }

  return <form onSubmit={submit} noValidate data-analytics-form={`share_the_cheer_${kind}`} className="rounded-3xl border border-chestnut/10 bg-white p-5 shadow-sm sm:p-8" aria-labelledby={`${kind}-title`}>
    <h3 id={`${kind}-title`} className="font-display text-2xl font-semibold text-chestnut">{isNomination ? "Nominate a family" : "Support the cause"}</h3>
    <p className="mt-2 text-sm leading-relaxed text-chestnut/75">{isNomination ? "Your information and the family's information are kept separate and clearly labeled for our private review." : "Leave your contact information and a short note about the funds, gifts, or services you may be able to contribute."}</p>
    <div className="sr-only" aria-hidden="true"><label>Website<input name="websiteUrl" tabIndex={-1} autoComplete="off" /></label></div>

    {isNomination ? <>
      <fieldset className="mt-7"><legend className="font-display text-xl font-semibold text-chestnut">Your information</legend><p className="mt-1 text-sm text-chestnut/70">You are the person submitting this nomination.</p><div className="mt-4 grid gap-4 sm:grid-cols-2">{submitterFields.map(renderField)}</div></fieldset>
      <fieldset className="mt-8 border-t border-chestnut/10 pt-7"><legend className="font-display text-xl font-semibold text-chestnut">Nominated family</legend><p className="mt-1 text-sm text-chestnut/70">Tell us who the family is and how we can contact them privately.</p><div className="mt-4 grid gap-4 sm:grid-cols-2">{familyFields.map(renderField)}</div></fieldset>
      <fieldset className="mt-8 border-t border-chestnut/10 pt-7"><legend className="font-display text-xl font-semibold text-chestnut">Could you sponsor this family at cost?</legend><p id="nomination-sponsorAtCost-hint" className="mt-2 text-sm leading-relaxed text-chestnut/75">The family receives everything free. If you choose yes, you would cover the actual cost of the gifts or services provided—none of our partners add markup or make a profit. This helps us serve more families.</p><label htmlFor="nomination-sponsorAtCost" className="mt-4 block text-sm font-semibold text-chestnut">Are you willing to discuss sponsoring this family? <span className="text-primary-red">*</span></label><select id="nomination-sponsorAtCost" name="sponsorAtCost" required defaultValue="" aria-invalid={Boolean(errors.sponsorAtCost)} aria-describedby={`nomination-sponsorAtCost-hint${errors.sponsorAtCost ? " nomination-sponsorAtCost-error" : ""}`} className="mt-1 w-full rounded-xl border border-chestnut/25 bg-white px-3 py-2.5 text-chestnut"><option value="" disabled>Choose an answer</option><option value="yes">Yes, I am open to sponsoring them at cost</option><option value="no">No, I am only submitting the nomination</option></select>{errors.sponsorAtCost && <p id="nomination-sponsorAtCost-error" className="mt-1 text-sm text-primary-red">{errors.sponsorAtCost}</p>}</fieldset>
      <div className="mt-5"><label className="flex gap-3 text-sm leading-relaxed text-chestnut"><input type="checkbox" name="contactPermission" aria-invalid={Boolean(errors.contactPermission)} aria-describedby={errors.contactPermission ? "nomination-contactPermission-error" : undefined} className="mt-1 size-4 shrink-0 accent-primary-red" />I believe the nominated family may be contacted privately by Chestnut &amp; Cheer.</label>{errors.contactPermission && <p id="nomination-contactPermission-error" className="mt-1 text-sm text-primary-red">{errors.contactPermission}</p>}</div>
    </> : <fieldset className="mt-7"><legend className="sr-only">Supporter contact and contribution</legend><div className="grid gap-4 sm:grid-cols-2">{supporterFields.map(renderField)}</div></fieldset>}

    <div className="mt-5"><label className="flex gap-3 text-sm leading-relaxed text-chestnut"><input type="checkbox" name="termsConsent" aria-invalid={Boolean(errors.termsConsent)} aria-describedby={errors.termsConsent ? `${kind}-termsConsent-error` : undefined} className="mt-1 size-4 shrink-0 accent-primary-red" />I agree to the <Link href={LINKS.privacy} className="underline underline-offset-2">Privacy Policy</Link> and the program terms below.</label>{errors.termsConsent && <p id={`${kind}-termsConsent-error`} className="mt-1 text-sm text-primary-red">{errors.termsConsent}</p>}</div>
    <p className="mt-3 text-xs leading-relaxed text-chestnut/70">Program terms: nominations and offers are reviewed privately; submission does not guarantee selection or acceptance. Gifts, services, and timing depend on availability and coordination. We may contact you to follow up. Media participation is always optional.</p>
    <div className="mt-5"><TurnstileWidget onToken={setToken} resetKey={reset} deferUntilVisible /></div>
    <div aria-live="polite" className="mt-4">
      {status === "success" && <p className="rounded-xl bg-accent-gold/20 p-4 text-sm text-chestnut" role="status">{isNomination ? "Thank you. Your nomination was received for private review. Our office will reach out if we need more information." : "Thank you for offering support. Our office will contact you to discuss the details."}</p>}
      {status === "error" && <p className="rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red" role="alert">{error}</p>}
    </div>
    <button type="submit" disabled={status === "sending"} className="mt-5 min-h-11 w-full rounded-full bg-primary-red px-6 py-3 font-semibold text-warm-white hover:bg-primary-red/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut disabled:opacity-50">{status === "sending" ? "Sending…" : isNomination ? "Nominate a family" : "Support the cause"}</button>
  </form>;
}
