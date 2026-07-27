"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Camera, Loader2 } from "lucide-react";
import {
  AddressAutocomplete,
  streetViewUrl,
  type ParsedPlace,
} from "@/components/estimate/AddressAutocomplete";
import { EstimateProgress } from "@/components/estimate/EstimateProgress";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { LINKS } from "@/lib/constants";
import {
  captureAttributionFromUrl,
  getAttribution,
  trackEstimateEvent,
} from "@/lib/estimate/analytics";
import {
  checkServiceArea,
  extractZipFromAddress,
  normalizeZip,
} from "@/lib/estimate/service-area";
import {
  BUDGET_OPTIONS,
  COLOR_OPTIONS,
  INITIAL_ESTIMATE_STATE,
  NEED_OPTIONS,
  QUOTE_METHOD_OPTIONS,
  SCOPE_OPTIONS,
  STYLE_OPTIONS,
  TIMING_OPTIONS,
  type EstimateFormState,
  type ScopeItem,
} from "@/lib/estimate/types";
import { computeSoftEstimate } from "@/lib/estimate/pricing";

type Phase = "intro" | "steps" | "done";

function optionCardClass(selected: boolean) {
  return `w-full rounded-2xl border px-4 py-3 text-left transition-colors touch-manipulation min-h-12 ${
    selected
      ? "border-primary-red bg-primary-red/5 ring-1 ring-primary-red/30"
      : "border-chestnut/15 bg-white hover:border-chestnut/30"
  }`;
}

async function compressImage(file: File, maxEdge = 1280, quality = 0.72): Promise<{
  name: string;
  dataUrl: string;
  size: number;
}> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");
  ctx.drawImage(bitmap, 0, 0, w, h);
  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  return { name: file.name || "photo.jpg", dataUrl, size: dataUrl.length };
}

export function EstimateWizard() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<EstimateFormState>(INITIAL_ESTIMATE_STATE);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    captureAttributionFromUrl(
      window.location.search,
      document.referrer,
      window.location.pathname
    );
  }, []);

  const steps = useMemo(() => {
    const base = ["need", "property", "contact"] as const;
    if (form.need === "service") {
      return [...base, "serviceScope", "timing", "method"] as const;
    }
    if (form.need === "returning") {
      return [...base, "scope", "photos", "timing", "method"] as const;
    }
    return [...base, "scope", "style", "photos", "timing", "method"] as const;
  }, [form.need]);

  const totalSteps = steps.length;
  const currentKey = steps[stepIndex] ?? "need";
  const softEstimate = useMemo(() => computeSoftEstimate(form), [form]);

  const patch = (partial: Partial<EstimateFormState>) =>
    setForm((prev) => ({ ...prev, ...partial }));

  const start = () => {
    trackEstimateEvent("form_started");
    setPhase("steps");
    setStepIndex(0);
  };

  const validateStep = (): string | null => {
    switch (currentKey) {
      case "need":
        return form.need ? null : "Select how we can help.";
      case "property": {
        if (!form.address.trim()) return "Enter your property address.";
        const zip = normalizeZip(form.zip || extractZipFromAddress(form.address) || "");
        if (zip.length !== 5) return "Enter a valid 5-digit ZIP code.";
        if (form.need === "residential") {
          if (!form.propertyType) return "Select a property type.";
          if (!form.stories) return "Select number of stories.";
        }
        return null;
      }
      case "contact":
        if (!form.firstName.trim() || !form.lastName.trim()) return "Enter your first and last name.";
        if (!form.phone.trim()) return "Mobile phone is required.";
        if (!form.email.trim() || !form.email.includes("@")) return "Enter a valid email.";
        if (!form.quoteConsent) return "Please agree so we can contact you about your quote.";
        return null;
      case "scope":
        return form.scope.length ? null : "Select at least one area to decorate.";
      case "serviceScope":
        return form.serviceNotes.trim() ? null : "Tell us briefly what you need.";
      case "style":
        if (!form.colorPref) return "Pick a lighting look.";
        if (!form.displayStyle) return "Pick a display style.";
        return null;
      case "photos":
        return null;
      case "timing":
        if (!form.installTiming) return "Select an install window.";
        if (!form.budget) return "Select an investment range (or “not sure”).";
        return null;
      case "method":
        return form.quoteMethod ? null : "Choose how you'd like to receive your quote.";
      default:
        return null;
    }
  };

  const goNext = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);

    if (currentKey === "property") {
      const zip = normalizeZip(form.zip || extractZipFromAddress(form.address) || "");
      const inArea = checkServiceArea(zip, form.city);
      patch({ zip, inServiceArea: inArea });
      trackEstimateEvent("address_entered", { zip, inServiceArea: inArea });
    }
    if (currentKey === "contact") trackEstimateEvent("contact_completed");
    if (currentKey === "photos") {
      trackEstimateEvent(form.photos.length ? "photos_uploaded" : "photos_skipped", {
        count: form.photos.length,
      });
    }

    if (stepIndex >= totalSteps - 1) {
      void submit();
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    setError(null);
    if (stepIndex === 0) {
      setPhase("intro");
      return;
    }
    setStepIndex((i) => i - 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, attribution: getAttribution() }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      trackEstimateEvent("form_submitted", { need: form.need });
      setPhase("done");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const onPlaceSelected = (place: ParsedPlace) => {
    const zip = place.zip || normalizeZip(extractZipFromAddress(place.formattedAddress) || "");
    patch({
      address: place.address || place.formattedAddress,
      city: place.city,
      state: place.state || "UT",
      zip,
      lat: place.lat,
      lng: place.lng,
      inServiceArea: checkServiceArea(zip, place.city),
    });
  };

  const toggleScope = (value: ScopeItem) => {
    setForm((prev) => {
      const has = prev.scope.includes(value);
      let scope = has ? prev.scope.filter((s) => s !== value) : [...prev.scope, value];
      if (value === "entire" && !has) scope = ["entire"];
      if (value !== "entire" && scope.includes("entire")) {
        scope = scope.filter((s) => s !== "entire");
      }
      return { ...prev, scope };
    });
  };

  const onPhotos = async (files: FileList | null) => {
    if (!files?.length) return;
    const next = [...form.photos];
    for (const file of Array.from(files).slice(0, 8 - next.length)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const compressed = await compressImage(file);
        next.push(compressed);
      } catch {
        /* skip bad file */
      }
    }
    patch({ photos: next.slice(0, 8) });
  };

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="text-center">
          <Mascot variant="phone" size={140} className="mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
            Get Your Free Christmas Lighting Design &amp; Quote
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
            Tell us about your property and upload a few photos. Most quotes can
            be completed remotely in just a few minutes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-chestnut/60">
            <span className="rounded-full bg-white px-3 py-1 border border-chestnut/10">
              Takes about 2 minutes
            </span>
            <span className="rounded-full bg-white px-3 py-1 border border-chestnut/10">
              No obligation
            </span>
          </div>
          <button
            type="button"
            onClick={start}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent-gold px-6 text-sm font-semibold text-chestnut touch-manipulation sm:w-auto"
          >
            Start My Quote
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
          Your request has been received.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
          We&apos;ll review your property and contact you shortly. Based on what
          you shared, a typical project lands around{" "}
          <span className="font-semibold text-chestnut">{softEstimate.label}</span>
          {" "}
          — your final design quote may differ.
          {LINKS.bookConsultation
            ? " You can also book a free consultation below."
            : " For the fastest start, call or text us now."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {LINKS.bookConsultation ? (
            <Button
              href={LINKS.bookConsultation}
              variant="gold"
              className="w-full sm:w-auto"
              external={LINKS.bookConsultation.startsWith("http")}
            >
              Book a free consultation
            </Button>
          ) : null}
          <Button href={LINKS.tel} variant="primary" className="w-full sm:w-auto">
            Call us
          </Button>
          <Button href={LINKS.sms} variant="outline" className="w-full sm:w-auto">
            Text us
          </Button>
        </div>
        <p className="mt-6 text-sm text-chestnut/50">
          <a href="/" className="underline-offset-2 hover:underline">
            Back to home
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <EstimateProgress current={stepIndex + 1} total={totalSteps} />

      <div className="mt-8 space-y-6">
        {currentKey === "need" && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-chestnut">How can we help?</h2>
            <div className="space-y-3">
              {NEED_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={optionCardClass(form.need === opt.value)}
                  onClick={() => patch({ need: opt.value })}
                >
                  <div className="font-semibold text-chestnut">{opt.label}</div>
                  <div className="mt-1 text-sm text-chestnut/60">{opt.detail}</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {currentKey === "property" && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-chestnut">Property information</h2>
            <label className="block text-sm font-medium text-chestnut">
              Property address
              <AddressAutocomplete
                value={form.address}
                onChange={(address) => patch({ address })}
                onPlaceSelected={onPlaceSelected}
              />
            </label>
            {form.lat != null && form.lng != null && streetViewUrl(form.lat, form.lng) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={streetViewUrl(form.lat, form.lng)!}
                alt="Street View of your property"
                className="w-full rounded-2xl border border-chestnut/10 object-cover aspect-[16/9]"
              />
            ) : null}
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block text-sm font-medium text-chestnut sm:col-span-1">
                City
                <input
                  className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                  value={form.city}
                  onChange={(e) => patch({ city: e.target.value })}
                  autoComplete="address-level2"
                />
              </label>
              <label className="block text-sm font-medium text-chestnut">
                State
                <input
                  className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                  value={form.state}
                  onChange={(e) => patch({ state: e.target.value })}
                  autoComplete="address-level1"
                />
              </label>
              <label className="block text-sm font-medium text-chestnut">
                ZIP
                <input
                  className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                  value={form.zip}
                  onChange={(e) => {
                    const zip = normalizeZip(e.target.value);
                    patch({
                      zip,
                      inServiceArea:
                        zip.length === 5 ? checkServiceArea(zip, form.city) : null,
                    });
                  }}
                  inputMode="numeric"
                  autoComplete="postal-code"
                />
              </label>
            </div>
            {form.zip.length === 5 && (
              <p
                className={`text-sm ${
                  checkServiceArea(form.zip, form.city)
                    ? "text-green-700"
                    : "text-primary-red"
                }`}
              >
                {checkServiceArea(form.zip, form.city)
                  ? "Great — you're in our Utah County / Salt Lake County service area."
                  : "This ZIP may be outside our usual area. Submit anyway and we'll confirm coverage."}
              </p>
            )}
            {form.need === "residential" && (
              <>
                <fieldset>
                  <legend className="text-sm font-medium text-chestnut">Property type</legend>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {(
                      [
                        ["single_family", "Single-family home"],
                        ["townhome", "Townhome"],
                        ["other", "Other"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={optionCardClass(form.propertyType === value)}
                        onClick={() => patch({ propertyType: value })}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-medium text-chestnut">Number of stories</legend>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {(
                      [
                        ["one", "One"],
                        ["two", "Two"],
                        ["three_plus", "Three or more"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={optionCardClass(form.stories === value)}
                        onClick={() => patch({ stories: value })}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </>
            )}
          </section>
        )}

        {currentKey === "contact" && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-chestnut">
              Where should we send your design and quote?
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium text-chestnut">
                First name
                <input
                  className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                  value={form.firstName}
                  onChange={(e) => patch({ firstName: e.target.value })}
                  autoComplete="given-name"
                />
              </label>
              <label className="block text-sm font-medium text-chestnut">
                Last name
                <input
                  className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                  value={form.lastName}
                  onChange={(e) => patch({ lastName: e.target.value })}
                  autoComplete="family-name"
                />
              </label>
            </div>
            <label className="block text-sm font-medium text-chestnut">
              Mobile phone
              <input
                className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                value={form.phone}
                onChange={(e) => patch({ phone: e.target.value })}
                inputMode="tel"
                autoComplete="tel"
              />
            </label>
            <label className="block text-sm font-medium text-chestnut">
              Email
              <input
                className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                value={form.email}
                onChange={(e) => patch({ email: e.target.value })}
                type="email"
                autoComplete="email"
              />
            </label>
            <label className="flex items-start gap-3 text-sm text-chestnut/80">
              <input
                type="checkbox"
                className="mt-1"
                checked={form.quoteConsent}
                onChange={(e) => patch({ quoteConsent: e.target.checked })}
              />
              <span>
                I agree that Chestnut &amp; Cheer may contact me by phone, text, or
                email about this Christmas lighting quote. Message/data rates may
                apply. Reply STOP to opt out of texts.
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-chestnut/80">
              <input
                type="checkbox"
                className="mt-1"
                checked={form.marketingConsent}
                onChange={(e) => patch({ marketingConsent: e.target.checked })}
              />
              <span>
                Optional: send me seasonal tips and offers (separate from quote
                messages).
              </span>
            </label>
          </section>
        )}

        {currentKey === "scope" && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-chestnut">
              What would you like decorated?
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {SCOPE_OPTIONS.map((opt) => {
                const selected = form.scope.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={optionCardClass(selected)}
                    onClick={() => toggleScope(opt.value)}
                  >
                    <span className="inline-flex items-center gap-2 font-medium text-chestnut">
                      {selected ? <Check className="h-4 w-4 text-primary-red" /> : null}
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {form.scope.includes("trees") && (
              <div className="space-y-3 rounded-2xl border border-chestnut/10 bg-cream p-4">
                <label className="block text-sm font-medium text-chestnut">
                  How many trees?
                  <input
                    className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                    value={form.treeCount}
                    onChange={(e) => patch({ treeCount: e.target.value })}
                    inputMode="numeric"
                  />
                </label>
                <fieldset>
                  <legend className="text-sm font-medium text-chestnut">Coverage</legend>
                  <div className="mt-2 space-y-2">
                    {(
                      [
                        ["trunks", "Trunks only"],
                        ["trunks_and_branches", "Trunks and branches"],
                        ["unsure", "Unsure"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={optionCardClass(form.treeCoverage === value)}
                        onClick={() => patch({ treeCoverage: value })}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-medium text-chestnut">Tree size</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(
                      [
                        ["small", "Small"],
                        ["medium", "Medium"],
                        ["large", "Large"],
                        ["unsure", "Unsure"],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className={optionCardClass(form.treeSize === value)}
                        onClick={() => patch({ treeSize: value })}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}
            {form.scope.includes("wreaths") && (
              <label className="block text-sm font-medium text-chestnut">
                Where should wreaths and garland go?
                <input
                  className="mt-1 w-full rounded-xl border border-chestnut/20 bg-white px-4 py-3"
                  value={form.wreathPlacement}
                  onChange={(e) => patch({ wreathPlacement: e.target.value })}
                  placeholder="Front door, porch rail, garage, etc."
                />
              </label>
            )}
          </section>
        )}

        {currentKey === "serviceScope" && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-chestnut">
              What do you need help with?
            </h2>
            <textarea
              className="min-h-32 w-full rounded-2xl border border-chestnut/20 bg-white px-4 py-3 text-chestnut"
              value={form.serviceNotes}
              onChange={(e) => patch({ serviceNotes: e.target.value })}
              placeholder="Bulbs out, add a tree, move a strand, etc."
            />
          </section>
        )}

        {currentKey === "style" && (
          <section className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-chestnut">
                Which look do you prefer?
              </h2>
              <div className="mt-3 space-y-2">
                {COLOR_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={optionCardClass(form.colorPref === opt.value)}
                    onClick={() => patch({ colorPref: opt.value })}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-chestnut">
                How would you describe the display you want?
              </h3>
              <div className="mt-3 space-y-2">
                {STYLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={optionCardClass(form.displayStyle === opt.value)}
                    onClick={() => patch({ displayStyle: opt.value })}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentKey === "photos" && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-chestnut">
              Upload photos of the areas you want decorated
            </h2>
            <p className="text-sm text-chestnut/70">
              Photos help us prepare your quote faster. You can skip this step and
              show us the property during a video consultation.
            </p>
            <p className="text-xs text-chestnut/50">
              Helpful shots: front of the property, left side, right side, trees or
              special features, and an inspiration photo if you have one.
            </p>
            <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-chestnut/25 bg-white px-4 py-6 text-sm font-semibold text-chestnut touch-manipulation">
              <Camera className="h-6 w-6 text-primary-red" />
              Take or upload photos
              <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                className="hidden"
                onChange={(e) => void onPhotos(e.target.files)}
              />
            </label>
            {form.photos.length > 0 && (
              <ul className="space-y-1 text-sm text-chestnut/70">
                {form.photos.map((p) => (
                  <li key={p.name + p.size}>{p.name}</li>
                ))}
              </ul>
            )}
          </section>
        )}

        {currentKey === "timing" && (
          <section className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-chestnut">
                When would you ideally like your lights installed?
              </h2>
              <div className="mt-3 space-y-2">
                {TIMING_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={optionCardClass(form.installTiming === opt.value)}
                    onClick={() => patch({ installTiming: opt.value })}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-chestnut">
                What investment range are you considering?
              </h3>
              <p className="mt-1 text-sm text-chestnut/60">
                This never disqualifies you — it helps us prepare the right package.
              </p>
              <div className="mt-3 space-y-2">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={optionCardClass(form.budget === opt.value)}
                    onClick={() => patch({ budget: opt.value })}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentKey === "method" && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-chestnut">
              How would you prefer to receive your quote?
            </h2>
            <div className="rounded-2xl border border-accent-gold/40 bg-accent-gold/10 px-4 py-3 text-left">
              <p className="text-sm font-medium text-chestnut">Preliminary range</p>
              <p className="mt-1 font-display text-2xl font-bold text-chestnut">
                {softEstimate.label}
              </p>
              <p className="mt-1 text-xs text-chestnut/60">{softEstimate.basis}. Not a final quote.</p>
            </div>
            <div className="space-y-2">
              {QUOTE_METHOD_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={optionCardClass(form.quoteMethod === opt.value)}
                  onClick={() => patch({ quoteMethod: opt.value })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {error && (
          <p className="rounded-xl border border-primary-red/30 bg-primary-red/5 px-4 py-3 text-sm text-primary-red" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3 pb-8">
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-chestnut/20 bg-white px-5 text-sm font-semibold text-chestnut touch-manipulation"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={submitting}
            className="inline-flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-primary-red px-5 text-sm font-semibold text-warm-white touch-manipulation disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : stepIndex >= totalSteps - 1 ? (
              "Submit request"
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
