import type { AnalyticsEventName, EventMetadata } from "@/lib/analytics/events";
import { getAnalyticsSession } from "@/lib/analytics/session";

const TRACKING_ENDPOINT = "/api/analytics/track";

function eventId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function send(payload: unknown, immediate = false) {
  const body = JSON.stringify(payload);
  const transmit = () => {
    if (immediate && typeof navigator !== "undefined" && navigator.sendBeacon) {
      const sent = navigator.sendBeacon(TRACKING_ENDPOINT, new Blob([body], { type: "application/json" }));
      if (sent) return;
    }

    fetch(TRACKING_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  };

  const browserWindow = window as Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  };
  if (immediate) transmit();
  else if (typeof browserWindow.requestIdleCallback === "function") {
    browserWindow.requestIdleCallback(transmit, { timeout: 2000 });
  } else {
    window.setTimeout(transmit, 0);
  }
}

export function track(eventType: AnalyticsEventName, metadata: EventMetadata = {}, immediate = false, pagePath?: string) {
  if (typeof window === "undefined") return;
  const session = getAnalyticsSession();
  const path = pagePath ?? window.location.pathname ?? "/";

  send(
    {
      eventId: eventId(),
      eventType,
      sessionId: session.id,
      pagePath: path,
      occurredAt: new Date().toISOString(),
      attribution: session.attribution,
      metadata: {
        ...metadata,
        ...(eventType === "PAGE_VIEW" ? { is_new_session: session.isNew } : {}),
      },
    },
    immediate,
  );
}

export function trackTelClick(href: string, label = "Phone") {
  track("TEL_CLICK", { cta_destination: href, phone_href: href, button_label: label }, true);
}

export function trackSmsClick(href: string, label = "Text") {
  track("SMS_CLICK", { cta_destination: href, sms_href: href, button_label: label }, true);
}
