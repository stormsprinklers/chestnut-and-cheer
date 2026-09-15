import { NextRequest, NextResponse } from "next/server";
import { forwardMarketingEventToCrm } from "@/lib/integrations/crm";

export const dynamic = "force-dynamic";

const ALLOWED_EVENTS = new Set([
  "PAGE_VIEW",
  "VISITOR_HEARTBEAT",
  "SCROLL_DEPTH_50",
  "SCROLL_DEPTH_90",
  "TIME_ON_PAGE",
  "PAGE_EXIT",
  "CTA_CLICK",
  "TEL_CLICK",
  "SMS_CLICK",
  "FORM_START",
  "FORM_SUBMIT",
  "BOOKING_STARTED",
  "SLOT_SELECTED",
  "BOOKING_COMPLETED",
  "ESTIMATE_EVENT",
  "ADDRESS_ENTERED",
  "CONTACT_COMPLETED",
  "LANDING_VIEW",
]);

function text(value: unknown, maxLength = 500) {
  if (value == null) return null;
  const result = String(value).trim();
  return result ? result.slice(0, maxLength) : null;
}

function metadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: Record<string, string | number | boolean> = {};
  for (const [key, item] of Object.entries(value).slice(0, 20)) {
    if (typeof item === "string") result[key] = item.slice(0, 500);
    else if (typeof item === "number" || typeof item === "boolean") result[key] = item;
  }
  return result;
}

function attributionMetadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const attribution = value as Record<string, unknown>;
  const result: Record<string, string | number | boolean> = {};
  const fields: Record<string, string> = {
    source: "utm_source",
    medium: "utm_medium",
    campaign: "utm_campaign",
    term: "utm_term",
    content: "utm_content",
    gclid: "gclid",
    fbclid: "fbclid",
    msclkid: "msclkid",
    sourceBucket: "source_bucket",
    referrer: "referrer",
    landingPage: "landing_page",
  };
  for (const [sourceKey, destinationKey] of Object.entries(fields)) {
    const item = text(attribution[sourceKey]);
    if (item) result[destinationKey] = item;
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const eventType = text(body.eventType, 80);
    const externalId = text(body.eventId, 120);
    const sessionId = text(body.sessionId, 160);
    const pagePath = text(body.pagePath, 500);

    if (!eventType || !externalId || !ALLOWED_EVENTS.has(eventType)) {
      return NextResponse.json({ ok: false, error: "Invalid analytics event" }, { status: 400 });
    }

    const eventMetadata = {
      ...attributionMetadata(body.attribution),
      ...metadata(body.metadata),
    };
    const occurredAt = text(body.occurredAt, 64);
    const result = await forwardMarketingEventToCrm({
      externalId: `cc:${externalId}`,
      eventType,
      sessionId,
      pagePath,
      metadata: eventMetadata,
      ...(occurredAt ? { occurredAt } : {}),
    });

    if (!result.ok && !("skipped" in result && result.skipped)) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true, forwarded: result.ok });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid analytics payload" }, { status: 400 });
  }
}
