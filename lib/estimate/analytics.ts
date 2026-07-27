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
};

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
    // Optional gtag if present
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", event, payload);
    console.debug("[estimate]", event, payload ?? {});
  } catch {
    /* ignore */
  }
}
