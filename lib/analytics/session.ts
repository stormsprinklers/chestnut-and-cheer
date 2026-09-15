const COOKIE_NAME = "cc_analytics_session";
const STORAGE_PREFIX = "cc_analytics_first_touch_";
const SESSION_MAX_AGE_DAYS = 365;

export type Attribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  referrer?: string;
  sourceBucket: string;
  landingPage: string;
};

export type AnalyticsSession = {
  id: string;
  isNew: boolean;
  attribution: Attribution;
};

function randomId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${SESSION_MAX_AGE_DAYS * 24 * 60 * 60};SameSite=Lax`;
}

function sourceBucket(params: URLSearchParams, referrer: string) {
  const source = (params.get("utm_source") ?? "").toLowerCase();
  const medium = (params.get("utm_medium") ?? "").toLowerCase();

  if (params.get("gclid") || (source === "google" && /cpc|ppc|paid/.test(medium))) return "google_ads";
  if (params.get("msclkid") || source === "bing") return "microsoft_ads";
  if (params.get("fbclid") || /facebook|instagram|meta/.test(source)) return "meta_ads";
  if (medium === "email") return "email";
  if (medium === "social" || /linkedin|nextdoor|yelp|thumbtack/.test(source)) return "social";
  if (source || medium) return "campaign";

  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (/google\./.test(host)) return "google_organic";
    if (/bing\.com/.test(host) || /duckduckgo\.com/.test(host)) return "organic";
    if (host) return "referral";
  } catch {
    // A missing or malformed referrer is direct traffic.
  }

  return "direct";
}

function getCurrentAttribution(): Attribution {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const referrer = document.referrer || "";
  const value = (key: string) => params.get(key) || undefined;

  return {
    source: value("utm_source"),
    medium: value("utm_medium"),
    campaign: value("utm_campaign"),
    term: value("utm_term"),
    content: value("utm_content"),
    gclid: value("gclid"),
    fbclid: value("fbclid"),
    msclkid: value("msclkid"),
    referrer: referrer || undefined,
    sourceBucket: sourceBucket(params, referrer),
    landingPage: url.pathname,
  };
}

export function getAnalyticsSession(): AnalyticsSession {
  const existingId = readCookie(COOKIE_NAME);
  const isNew = !existingId;
  const id = existingId ?? randomId();
  if (!existingId) writeCookie(COOKIE_NAME, id);

  const storageKey = `${STORAGE_PREFIX}${id}`;
  let attribution: Attribution | null = null;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) attribution = JSON.parse(stored) as Attribution;
  } catch {
    // Private browsing or disabled storage should not prevent tracking.
  }

  if (!attribution) {
    attribution = getCurrentAttribution();
    try {
      localStorage.setItem(storageKey, JSON.stringify(attribution));
    } catch {
      // The event can still include the current attribution.
    }
  }

  return { id, isNew, attribution };
}
