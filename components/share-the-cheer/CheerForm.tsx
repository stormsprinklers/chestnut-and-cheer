"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import TurnstileWidget from "@/components/TurnstileWidget";
import { track } from "@/lib/analytics/track";
import { COMPANY, LINKS } from "@/lib/constants";
import { type CheerFormKind, type CheerSubmission, nominationFields, partnerFields, validateCheerSubmission } from "@/lib/share-the-cheer";

type Field = { name: string; label: string; type?: "email" | "tel" | "url" | "number" | "textarea"; required?: boolean; hint?: string };
const nomination: Field[] = [
  { name: "nominatorName", label: "Your full name", required: true },
  { name: "nominatorEmail", label: "Your email", type: "email", required: true },
  { name: "nominatorPhone", label: "Your phone", type: "tel", required: true },
  { name: "relationship", label: "Your relationship to the family", required: true },
  { name: "familyName", label: "Family or primary contact name", required: true },
  { name: "familyEmail", label: "Family contact email, if known", type: "email" },
  { name: "familyPhone", label: "Family contact phone, if known", type: "tel" },
  { name: "city", label: "City", required: true },
  { name: "householdSize", label: "Household size", type: "number", required: true },
  { name: "dependents", label: "Number and approximate ages of children or dependents", required: true, hint: "Write ‘none’ if there are no children or dependents." },
  { name: "reason", label: "Why are you nominating this family?", type: "textarea", required: true },
  { name: "needs", label: "Known needs or circumstances", type: "textarea", required: true, hint: "Share only what is helpful for initial review. Please do not include medical records or financial documents." },
  { name: "privacyConsiderations", label: "Privacy or contact considerations", type: "textarea" },
];
const partner: Field[] = [
  { name: "organization", label: "Business or organization name", required: true },
  { name: "contactName", label: "Contact name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "website", label: "Website", type: "url" },
  { name: "contributionType", label: "Type of contribution", required: true },
  { name: "description", label: "What would you like to offer?", type: "textarea", required: true, hint: "Goods, services, experiences, gift cards, volunteer help, or funds are welcome." },
  { name: "quantity", label: "Quantity available", required: true },
  { name: "approximateValue", label: "Approximate value, if known" },
  { name: "restrictions", label: "Geographic or scheduling restrictions", type: "textarea" },
  { name: "delivery", label: "Delivery or pickup availability", required: true },
  { name: "notes", label: "Additional notes", type: "textarea" },
];

export function CheerForm({ kind }: { kind: CheerFormKind }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState<string | null>(null);
  const [reset, setReset] = useState(0);
  const fields = kind === "nomination" ? nomination : partner;
  const title = kind === "nomination" ? "Nominate a family" : "Become a partner";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const data: CheerSubmission = {};
    for (const key of kind === "nomination" ? nominationFields : partnerFields) data[key] = String(fd.get(key) ?? "").trim();
    if (kind === "nomination") data.contactPermission = fd.get("contactPermission") === "on";
    else for (const key of ["supportsEveryFamily", "volunteer", "publicRecognition"]) data[key] = fd.get(key) === null ? undefined : fd.get(key) === "yes";
    data.termsConsent = fd.get("termsConsent") === "on";
    const nextErrors = validateCheerSubmission(kind, data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || !token) {
      setStatus("error");
      setError(!token ? "Please complete the human verification checkbox." : "Please check the highlighted fields.");
      return;
    }
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/share-the-cheer", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, data, websiteUrl: fd.get("websiteUrl"), turnstileToken: token }),
      });
      const result = await response.json() as { ok?: boolean; error?: string; errors?: Record<string, string> };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {}); setError(result.error ?? "Something went wrong. Please try again."); setStatus("error");
        setToken(null); setReset((n) => n + 1); return;
      }
      track("FORM_SUBMIT", { form_name: `share_the_cheer_${kind}` });
      form.reset(); setStatus("success"); setErrors({}); setToken(null); setReset((n) => n + 1);
    } catch {
      setError(`We couldn't send your submission. Please call ${COMPANY.phone}.`); setStatus("error");
      setToken(null); setReset((n) => n + 1);
    }
  }

  return <form onSubmit={submit} noValidate data-analytics-form={`share_the_cheer_${kind}`} className="rounded-3xl border border-chestnut/10 bg-white p-5 shadow-sm sm:p-8" aria-labelledby={`${kind}-title`}>
    <h3 id={`${kind}-title`} className="font-display text-2xl font-semibold text-chestnut">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-chestnut/75">{kind === "nomination" ? "Tell us enough to begin a private review. We will contact selected families directly." : "Tell us what your organization may be able to share. Our office will confirm details before any offer is included in the program."}</p>
    <div className="sr-only" aria-hidden="true"><label>Website<input name="websiteUrl" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {fields.map((field) => <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
        <label htmlFor={`${kind}-${field.name}`} className="block text-sm font-semibold text-chestnut">{field.label}{field.required && <span className="text-primary-red"> *</span>}</label>
        {field.hint && <p id={`${kind}-${field.name}-hint`} className="mt-1 text-sm text-chestnut/70">{field.hint}</p>}
        {field.type === "textarea" ? <textarea id={`${kind}-${field.name}`} name={field.name} rows={4} required={field.required} maxLength={field.name === "reason" || field.name === "description" ? 2000 : 1500} aria-invalid={Boolean(errors[field.name])} aria-describedby={[field.hint && `${kind}-${field.name}-hint`, errors[field.name] && `${kind}-${field.name}-error`].filter(Boolean).join(" ") || undefined} className="mt-1 w-full rounded-xl border border-chestnut/25 bg-cream/30 px-3 py-2.5 text-chestnut focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red" /> :
          <input id={`${kind}-${field.name}`} name={field.name} type={field.type ?? "text"} required={field.required} min={field.type === "number" ? 1 : undefined} max={field.type === "number" ? 30 : undefined} maxLength={field.type === "number" ? undefined : 200} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${kind}-${field.name}-error` : undefined} className="mt-1 w-full rounded-xl border border-chestnut/25 bg-cream/30 px-3 py-2.5 text-chestnut focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red" />}
        {errors[field.name] && <p id={`${kind}-${field.name}-error`} className="mt-1 text-sm text-primary-red">{errors[field.name]}</p>}
      </div>)}
    </div>
    {kind === "partner" && <div className="mt-5 space-y-4">
      {([ ["supportsEveryFamily", "Could this support every selected family?"], ["volunteer", "Interested in volunteering?"], ["publicRecognition", "May we recognize your organization publicly?" ] ] as const).map(([name, label]) => <div key={name}>
        <label htmlFor={`partner-${name}`} className="block text-sm font-semibold text-chestnut">{label}</label>
        <select id={`partner-${name}`} name={name} required defaultValue="" aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `partner-${name}-error` : undefined} className="mt-1 w-full rounded-xl border border-chestnut/25 bg-white px-3 py-2.5 text-chestnut"><option value="" disabled>Choose an answer</option><option value="yes">Yes</option><option value="no">No</option></select>
        {errors[name] && <p id={`partner-${name}-error`} className="mt-1 text-sm text-primary-red">{errors[name]}</p>}
      </div>)}
    </div>}
    {kind === "nomination" && <div className="mt-5"><label className="flex gap-3 text-sm leading-relaxed text-chestnut"><input type="checkbox" name="contactPermission" aria-invalid={Boolean(errors.contactPermission)} aria-describedby={errors.contactPermission ? "nomination-contactPermission-error" : undefined} className="mt-1 size-4 shrink-0 accent-primary-red" />I believe the family may be contacted privately by Chestnut & Cheer.</label>{errors.contactPermission && <p id="nomination-contactPermission-error" className="mt-1 text-sm text-primary-red">{errors.contactPermission}</p>}</div>}
    <div className="mt-5"><label className="flex gap-3 text-sm leading-relaxed text-chestnut"><input type="checkbox" name="termsConsent" aria-invalid={Boolean(errors.termsConsent)} aria-describedby={errors.termsConsent ? `${kind}-termsConsent-error` : undefined} className="mt-1 size-4 shrink-0 accent-primary-red" />I agree to the <Link href={LINKS.privacy} className="underline underline-offset-2">Privacy Policy</Link> and the program terms below.</label>{errors.termsConsent && <p id={`${kind}-termsConsent-error`} className="mt-1 text-sm text-primary-red">{errors.termsConsent}</p>}</div>
    <p className="mt-3 text-xs leading-relaxed text-chestnut/70">Program terms: nominations and offers are reviewed privately; submission does not guarantee selection or acceptance. Specific gifts and timing depend on confirmed partners, property safety, and availability. We may contact you to coordinate. Media participation is optional.</p>
    <div className="mt-5"><TurnstileWidget onToken={setToken} resetKey={reset} deferUntilVisible /></div>
    <div aria-live="polite" className="mt-4">
      {status === "success" && <p className="rounded-xl bg-accent-gold/20 p-4 text-sm text-chestnut" role="status">{kind === "nomination" ? "Thank you. Your nomination was received for private review. Our office will reach out if we need more information." : "Thank you for offering support. Our office will contact you to confirm the details; your offer has not been announced or assigned yet."}</p>}
      {status === "error" && <p className="rounded-xl border border-primary-red/30 bg-primary-red/5 p-4 text-sm text-primary-red" role="alert">{error}</p>}
    </div>
    <button type="submit" disabled={status === "sending"} className="mt-5 min-h-11 w-full rounded-full bg-primary-red px-6 py-3 font-semibold text-warm-white hover:bg-primary-red/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut disabled:opacity-50">{status === "sending" ? "Sending…" : kind === "nomination" ? "Send nomination" : "Offer support"}</button>
  </form>;
}
