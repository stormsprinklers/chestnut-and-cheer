"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Home, Loader2, Palette, TreePine } from "lucide-react";
import {
  AddressAutocomplete,
  type ParsedPlace,
} from "@/components/estimate/AddressAutocomplete";
import { EstimateProgress } from "@/components/estimate/EstimateProgress";
import TurnstileWidget from "@/components/TurnstileWidget";
import { SmsOptInCopy } from "@/components/forms/SmsOptInCopy";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { LINKS } from "@/lib/constants";
import {
  captureAttributionFromUrl,
  getAttribution,
  isDoorHangerAttribution,
  trackEstimateEvent,
} from "@/lib/estimate/analytics";
import { getFormTrackingData } from "@/lib/analytics/form-tracking";
import { checkServiceArea } from "@/lib/estimate/service-area";
import {
  COLOR_OPTIONS,
  HOME_SIZE_OPTIONS,
  INITIAL_ESTIMATE_STATE,
  ROOFLINE_OPTIONS,
  TREE_SIZE_OPTIONS,
  type EstimateFormState,
} from "@/lib/estimate/types";
import { computeSoftEstimate } from "@/lib/estimate/pricing";

type Phase = "intro" | "steps" | "done";
type StepKey = "contact" | "roofline" | "design" | "estimate";

const STEPS: StepKey[] = ["contact", "roofline", "design", "estimate"];

function optionCardClass(selected: boolean) {
  return `min-h-14 w-full rounded-2xl border px-4 py-3 text-left transition-colors touch-manipulation ${
    selected
      ? "border-primary-red bg-primary-red/5 ring-1 ring-primary-red/30"
      : "border-chestnut/15 bg-white hover:border-chestnut/30"
  }`;
}

function fieldClass() {
  return "mt-1 min-h-12 w-full rounded-xl border border-chestnut/20 bg-white px-4 text-base text-chestnut outline-none transition focus:border-primary-red focus:ring-2 focus:ring-primary-red/15";
}

export function EstimateWizard() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<EstimateFormState>(INITIAL_ESTIMATE_STATE);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [doorHangerOffer] = useState(() => {
    if (typeof window === "undefined") return false;
    const currentCampaign = Object.fromEntries(new URLSearchParams(window.location.search));
    return isDoorHangerAttribution({ ...getAttribution(), ...currentCampaign });
  });

  useEffect(() => {
    captureAttributionFromUrl(
      window.location.search,
      document.referrer,
      window.location.pathname
    );
  }, []);

  const currentStep = STEPS[stepIndex] ?? "contact";
  const estimate = useMemo(() => computeSoftEstimate(form), [form]);

  const patch = (partial: Partial<EstimateFormState>) =>
    setForm((previous) => ({ ...previous, ...partial }));

  const start = () => {
    trackEstimateEvent("form_started");
    setPhase("steps");
    setStepIndex(0);
  };

  const validateStep = (): string | null => {
    if (currentStep === "contact") {
      if (!form.address.trim()) return "Enter your property address.";
      if (!form.name.trim()) return "Enter your name.";
      if (!form.phone.trim()) return "Enter your mobile phone number.";
      if (!form.email.trim() || !form.email.includes("@")) return "Enter a valid email address.";
      if (!form.quoteConsent) return "Please agree so we can contact you about your estimate.";
    }
    if (currentStep === "roofline") {
      if (!form.homeSize) return "Choose the size of your home.";
      if (!form.rooflineCoverage) return "Choose the roofline coverage you want.";
    }
    if (currentStep === "design") {
      if (!form.colorPref) return "Choose a color preference.";
      if (!form.treeSize) return "Tell us whether you want any trees lit.";
    }
    if (currentStep === "estimate" && !turnstileToken) {
      return "Please complete the human verification checkbox.";
    }
    return null;
  };

  const goNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    if (currentStep === "contact") {
      trackEstimateEvent("address_entered", {
        zip: form.zip,
        inServiceArea: form.inServiceArea ?? "unknown",
      });
      trackEstimateEvent("contact_completed");
    }

    if (currentStep === "estimate") {
      void submit();
      return;
    }

    setStepIndex((index) => index + 1);
  };

  const goBack = () => {
    setError(null);
    if (stepIndex === 0) {
      setPhase("intro");
      return;
    }
    setStepIndex((index) => index - 1);
  };

  const submit = async () => {
    if (!turnstileToken) {
      setError("Please complete the human verification checkbox.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          attribution: getAttribution(),
          tracking: getFormTrackingData(),
          turnstileToken,
          websiteUrl: honeypot,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setTurnstileToken(null);
        setTurnstileReset((value) => value + 1);
        return;
      }
      trackEstimateEvent("form_submitted", {
        homeSize: form.homeSize ?? "",
        rooflineCoverage: form.rooflineCoverage ?? "",
        treeSize: form.treeSize ?? "",
      });
      setPhase("done");
    } catch {
      setError("Network error. Check your connection and try again.");
      setTurnstileToken(null);
      setTurnstileReset((value) => value + 1);
    } finally {
      setSubmitting(false);
    }
  };

  const onPlaceSelected = (place: ParsedPlace) => {
    patch({
      address: place.formattedAddress,
      city: place.city,
      state: place.state || "UT",
      zip: place.zip,
      lat: place.lat,
      lng: place.lng,
      inServiceArea: checkServiceArea(place.zip, place.city),
    });
  };

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-center">
          <Mascot variant="phone" size={140} className="mx-auto mb-4" />
          {doorHangerOffer ? (
            <div className="mx-auto mb-5 max-w-md rounded-2xl border border-accent-gold/50 bg-accent-gold/15 px-4 py-3">
              <p className="font-display text-2xl font-bold text-primary-red">$100 OFF</p>
              <p className="mt-1 text-sm font-semibold text-chestnut">
                Door hanger offer applied to your quote
              </p>
              <p className="mt-1 text-xs text-chestnut/60">Code DOORHANGER100 · Limited time</p>
            </div>
          ) : null}
          <h1 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            Get Your Instant Christmas Lighting Estimate
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
            Share a few property details and see a realistic roofline and tree-lighting range—no photos, budget questions, or lengthy consultation required.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-chestnut/60">
            <span className="rounded-full border border-chestnut/10 bg-white px-3 py-1">
              Takes about 60 seconds
            </span>
            <span className="rounded-full border border-chestnut/10 bg-white px-3 py-1">
              No obligation
            </span>
          </div>
          <button
            type="button"
            onClick={start}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent-gold px-6 text-sm font-semibold text-chestnut touch-manipulation sm:w-auto"
          >
            Get My Estimate
          </button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center sm:px-6 sm:py-14">
        <Mascot variant="cheer" size={140} className="mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
          Your estimate request is in.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
          Based on what you shared, your project is typically around{" "}
          <span className="font-semibold text-chestnut">{estimate.label}</span>.
          We&apos;ll review the property and contact you with the final design quote.
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-chestnut/10 bg-white p-5 text-left">
          <p className="flex justify-between gap-4 text-sm text-chestnut/75">
            <span>Roofline</span>
            <strong className="text-chestnut">{estimate.rooflineLabel}</strong>
          </p>
          {estimate.treeLabel ? (
            <p className="mt-3 flex justify-between gap-4 border-t border-chestnut/10 pt-3 text-sm text-chestnut/75">
              <span>Tree lighting</span>
              <strong className="text-right text-chestnut">{estimate.treeLabel} per tree</strong>
            </p>
          ) : null}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href={LINKS.tel} variant="primary" className="w-full sm:w-auto">Call us</Button>
          <Button href={LINKS.sms} variant="outline" className="w-full sm:w-auto">Text us</Button>
        </div>
        <p className="mt-6 text-sm text-chestnut/50">
          <Link href="/" className="underline-offset-2 hover:underline">Back to home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <EstimateProgress current={stepIndex + 1} total={STEPS.length} />

      <div className="mt-7 rounded-3xl border border-chestnut/10 bg-white p-5 shadow-sm sm:p-8">
        {currentStep === "contact" ? (
          <section className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-red">Property &amp; contact</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-chestnut sm:text-3xl">Where is the display going?</h2>
              <p className="mt-2 text-sm text-chestnut/65">We only need the basics to prepare and follow up on your estimate.</p>
            </div>

            <label className="block text-sm font-semibold text-chestnut">
              Property address
              <AddressAutocomplete
                value={form.address}
                onChange={(address) => patch({
                  address,
                  city: "",
                  zip: "",
                  lat: null,
                  lng: null,
                  inServiceArea: null,
                })}
                onPlaceSelected={onPlaceSelected}
                placeholder="Start typing your full address"
                required
                deferUntilFocus
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-chestnut sm:col-span-2">
                Name
                <input
                  className={fieldClass()}
                  value={form.name}
                  onChange={(event) => patch({ name: event.target.value })}
                  autoComplete="name"
                  placeholder="Your full name"
                />
              </label>
              <label className="block text-sm font-semibold text-chestnut">
                Mobile phone
                <input
                  className={fieldClass()}
                  value={form.phone}
                  onChange={(event) => patch({ phone: event.target.value })}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(385) 555-0123"
                />
              </label>
              <label className="block text-sm font-semibold text-chestnut">
                Email
                <input
                  className={fieldClass()}
                  value={form.email}
                  onChange={(event) => patch({ email: event.target.value })}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <div className="space-y-3 rounded-2xl bg-cream p-4 text-sm text-chestnut/80">
              <div className="flex items-start gap-3">
                <input
                  id="estimate-sms-service"
                  type="checkbox"
                  checked={form.quoteConsent}
                  onChange={(event) => patch({ quoteConsent: event.target.checked })}
                  className="mt-1 h-4 w-4 accent-primary-red"
                />
                <SmsOptInCopy kind="service" htmlFor="estimate-sms-service" />
              </div>
              <div className="flex items-start gap-3">
                <input
                  id="estimate-sms-marketing"
                  type="checkbox"
                  checked={form.marketingConsent}
                  onChange={(event) => patch({ marketingConsent: event.target.checked })}
                  className="mt-1 h-4 w-4 accent-primary-red"
                />
                <SmsOptInCopy kind="marketing" htmlFor="estimate-sms-marketing" />
              </div>
            </div>
          </section>
        ) : null}

        {currentStep === "roofline" ? (
          <section className="space-y-7">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-red">Roofline</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-chestnut sm:text-3xl">Tell us about your home</h2>
              <p className="mt-2 text-sm text-chestnut/65">Home size and roofline coverage determine the roofline estimate.</p>
            </div>

            <fieldset>
              <legend className="flex items-center gap-2 font-semibold text-chestnut">
                <Home className="h-5 w-5 text-primary-red" aria-hidden /> Home size
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {HOME_SIZE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={optionCardClass(form.homeSize === option.value)}
                    onClick={() => patch({ homeSize: option.value })}
                  >
                    <span className="font-semibold text-chestnut">{option.label}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-chestnut/60">{option.detail}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-semibold text-chestnut">Roofline coverage</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {ROOFLINE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={optionCardClass(form.rooflineCoverage === option.value)}
                    onClick={() => patch({ rooflineCoverage: option.value })}
                  >
                    <span className="font-semibold text-chestnut">{option.label}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-chestnut/60">{option.detail}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </section>
        ) : null}

        {currentStep === "design" ? (
          <section className="space-y-7">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-red">Colors &amp; trees</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-chestnut sm:text-3xl">Choose the look you want</h2>
              <p className="mt-2 text-sm text-chestnut/65">Your color choice does not change the price.</p>
            </div>

            <fieldset>
              <legend className="flex items-center gap-2 font-semibold text-chestnut">
                <Palette className="h-5 w-5 text-primary-red" aria-hidden /> Color preference
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {COLOR_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={optionCardClass(form.colorPref === option.value)}
                    onClick={() => patch({ colorPref: option.value })}
                  >
                    <span className="font-semibold text-chestnut">{option.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="flex items-center gap-2 font-semibold text-chestnut">
                <TreePine className="h-5 w-5 text-primary-red" aria-hidden /> Trees to light
              </legend>
              <p className="mt-1 text-xs text-chestnut/55">Select the size that best matches the tree or trees you want wrapped.</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {TREE_SIZE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={optionCardClass(form.treeSize === option.value)}
                    onClick={() => patch({ treeSize: option.value })}
                  >
                    <span className="font-semibold text-chestnut">{option.label}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-chestnut/60">{option.detail}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </section>
        ) : null}

        {currentStep === "estimate" ? (
          <section className="space-y-6">
            <div className="text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-gold/25 text-primary-red">
                <Check className="h-6 w-6" aria-hidden />
              </span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-red">Your instant estimate</p>
              <h2 className="mt-2 font-display text-4xl font-bold text-chestnut">{estimate.label}</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-chestnut/65">{estimate.basis}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-chestnut/10 bg-cream p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-red">Roofline</p>
                <p className="mt-2 font-display text-2xl font-bold text-chestnut">{estimate.rooflineLabel}</p>
                <p className="mt-2 text-sm text-chestnut/65">Based on your home size and selected coverage.</p>
              </article>
              <article className="rounded-2xl border border-chestnut/10 bg-cream p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-red">Trees</p>
                <p className="mt-2 font-display text-2xl font-bold text-chestnut">{estimate.treeLabel ?? "None selected"}</p>
                <p className="mt-2 text-sm text-chestnut/65">
                  {estimate.treeLabel ? "Tree range is per tree; final price depends on count and shape." : "No tree lighting included in this estimate."}
                </p>
              </article>
            </div>

            <input
              aria-hidden="true"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              name="websiteUrl"
            />

            <TurnstileWidget
              onToken={setTurnstileToken}
              resetKey={turnstileReset}
              className="flex justify-center"
            />
          </section>
        ) : null}

        {error ? (
          <p className="mt-6 rounded-xl bg-primary-red/5 p-3 text-sm text-primary-red" role="alert">{error}</p>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            className="min-h-12 rounded-full border border-chestnut/15 px-6 font-semibold text-chestnut hover:bg-cream"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={submitting}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-red px-7 font-semibold text-white transition hover:bg-primary-red/90 disabled:opacity-60"
          >
            {submitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> Sending…</>
            ) : currentStep === "estimate" ? (
              "Send My Estimate Request"
            ) : currentStep === "design" ? (
              "See My Estimate"
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
