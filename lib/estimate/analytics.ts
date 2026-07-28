const ATTRIBUTION_KEY = "cc_estimate_attribution";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  referrer?: string;
  landing_page?: string;
  captured_at?: string;
  promo_code?: string;
  offer?: string;
};

/** Door hanger QR campaign — used for CRM source + estimate promo banner. */
export const DOOR_HANGER_ATTRIBUTION: Attribution = {
  utm_source: "door-hanger",
  utm_medium: "print",
  utm_campaign: "door-hanger-100-off",
  utm_content: "qr",
  landing_page: "/door-hanger",
  promo_code: "DOORHANGER100",
  offer: "$100 OFF Christmas lights installation",
};

export function isDoorHangerAttribution(
  attr: Attribution | Record<string, unknown> | null | undefined
) {
  if (!attr || typeof attr !== "object") return false;
  const source = String((attr as Attribution).utm_source ?? "").toLowerCase();
  const campaign = String((attr as Attribution).utm_campaign ?? "").toLowerCase();
  const promo = String((attr as Attribution).promo_code ?? "").toUpperCase();
  return (
    source === "door-hanger" ||
    source === "doorhanger" ||
    campaign.includes("door-hanger") ||
    promo === "DOORHANGER100"
  );
}

export function captureAttributionFromUrl(search: string, referrer: string, path: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(search);
  const existing = getAttribution();
  const next: Attribution = {
    ...existing,
    referrer: existing.referrer || referrer || undefined,
    landing_page: existing.landing_page || path,
    captured_at: existing.captured_at || new Date().toISOString(),
  };

  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "msclkid",
  ] as const) {
    const val = params.get(key);
    if (val && !next[key]) next[key] = val;
  }

  persistAttribution(next);
}

/** Force-merge campaign fields (door hanger page seeds these even without query params). */
export function seedCampaignAttribution(seed: Attribution, path: string) {
  if (typeof window === "undefined") return;
  const existing = getAttribution();
  const next: Attribution = {
    ...existing,
    ...seed,
    referrer: existing.referrer || document.referrer || undefined,
    landing_page: seed.landing_page || existing.landing_page || path,
    captured_at: existing.captured_at || new Date().toISOString(),
  };
  persistAttribution(next);
}

function persistAttribution(next: Attribution) {
  try {
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Attribution;
  } catch {
    return {};
  }
}

export function trackEstimateEvent(
  event: string,
  payload?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  try {
    const detail = { event, ...payload, ts: Date.now() };
    window.dispatchEvent(new CustomEvent("cc-estimate-event", { detail }));
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", event, payload);
    console.debug("[estimate]", event, payload ?? {});
  } catch {
    /* ignore */
  }
}
