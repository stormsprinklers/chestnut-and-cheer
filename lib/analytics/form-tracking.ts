import { getAnalyticsSession } from "@/lib/analytics/session";

export type FormTrackingData = {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbc: string | null;
  fbp: string | null;
  user_agent: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

function cookieValue(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function text(value: unknown, maxLength = 2048) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

/** Read first-touch campaign values plus Meta browser cookies at submit time. */
export function getFormTrackingData(): FormTrackingData {
  const attribution = getAnalyticsSession().attribution;
  return {
    gclid: attribution.gclid ?? null,
    gbraid: attribution.gbraid ?? null,
    wbraid: attribution.wbraid ?? null,
    fbc: cookieValue("_fbc"),
    fbp: cookieValue("_fbp"),
    user_agent: typeof navigator === "undefined" ? null : navigator.userAgent,
    utm_source: attribution.source ?? null,
    utm_medium: attribution.medium ?? null,
    utm_campaign: attribution.campaign ?? null,
    utm_content: attribution.content ?? null,
    utm_term: attribution.term ?? null,
  };
}

/** Bound untrusted tracking values before forwarding them to the CRM. */
export function normalizeFormTrackingData(
  value: unknown,
  fallbackUserAgent?: string | null
): FormTrackingData {
  const input = value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
  return {
    gclid: text(input.gclid),
    gbraid: text(input.gbraid),
    wbraid: text(input.wbraid),
    fbc: text(input.fbc),
    fbp: text(input.fbp),
    user_agent: text(input.user_agent, 1024) ?? text(fallbackUserAgent, 1024),
    utm_source: text(input.utm_source),
    utm_medium: text(input.utm_medium),
    utm_campaign: text(input.utm_campaign),
    utm_content: text(input.utm_content),
    utm_term: text(input.utm_term),
  };
}
