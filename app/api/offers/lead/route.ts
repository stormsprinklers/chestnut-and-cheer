import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { normalizeFormTrackingData } from "@/lib/analytics/form-tracking";
import {
  buildLeadExternalId,
  forwardLeadToCrm,
  isCrmConfigured,
} from "@/lib/integrations/crm";
import {
  OFFER_MARKETING_CONSENT,
  OFFER_MARKETING_CONSENT_VERSION,
} from "@/lib/offers/consent";
import {
  clientIpFromRequest,
  isHoneypotTripped,
  verifyTurnstileToken,
} from "@/lib/turnstile";

export const runtime = "nodejs";
export const maxDuration = 60;

const OFFERS = {
  "permanent-lights-giveaway": {
    source: "permanent-lights-giveaway",
    label: "Permanent Lights Free Giveaway",
  },
  "free-christmas-lights": {
    source: "free-christmas-lights-offer",
    label: "Free Christmas Lights",
  },
} as const;

type OfferId = keyof typeof OFFERS;

type Body = {
  offerId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  formattedAddress?: string;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  lat?: number | null;
  lng?: number | null;
  conversionPage?: string;
  eventId?: string;
  marketingConsent?: boolean;
  consentDisclosure?: string;
  consentVersion?: string;
  turnstileToken?: string;
  "cf-turnstile-response"?: string;
  websiteUrl?: string;
  tracking?: unknown;
};

function text(value: unknown, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (isHoneypotTripped(body.websiteUrl)) {
    return NextResponse.json({ ok: true, externalId: "honeypot" });
  }

  const turnstileToken =
    (typeof body.turnstileToken === "string" && body.turnstileToken) ||
    (typeof body["cf-turnstile-response"] === "string" &&
      body["cf-turnstile-response"]) ||
    null;
  const turnstile = await verifyTurnstileToken(
    turnstileToken,
    clientIpFromRequest(request)
  );
  if (!turnstile.ok) {
    return NextResponse.json(
      { ok: false, error: turnstile.error },
      { status: turnstile.status }
    );
  }

  const offerId = text(body.offerId, 80) as OfferId;
  const offer = OFFERS[offerId];
  if (!offer) {
    return NextResponse.json({ ok: false, error: "Unknown offer." }, { status: 400 });
  }

  const firstName = text(body.firstName, 100);
  const lastName = text(body.lastName, 100);
  const email = text(body.email, 320).toLowerCase();
  const phone = text(body.phone, 50);
  const formattedAddress = text(body.formattedAddress || body.address, 500);
  const address = text(body.address || body.formattedAddress, 300);

  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "Please enter your first and last name." },
      { status: 400 }
    );
  }
  if (!validEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!validPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid mobile phone number." },
      { status: 400 }
    );
  }
  if (!formattedAddress) {
    return NextResponse.json(
      { ok: false, error: "Please enter your home address." },
      { status: 400 }
    );
  }
  if (
    body.marketingConsent !== true ||
    body.consentVersion !== OFFER_MARKETING_CONSENT_VERSION ||
    body.consentDisclosure !== OFFER_MARKETING_CONSENT
  ) {
    return NextResponse.json(
      { ok: false, error: "The marketing consent disclosure was not recorded." },
      { status: 400 }
    );
  }

  if (!isCrmConfigured()) {
    console.error("[offers] CRM not configured");
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your request right now. Please call or text us and we'll help right away.",
      },
      { status: 503 }
    );
  }

  const tracking = normalizeFormTrackingData(
    body.tracking,
    request.headers.get("user-agent")
  );
  const conversionPage = /^\/offers\/(permanent-lights-giveaway|free-christmas-lights)$/.test(
    String(body.conversionPage)
  )
    ? String(body.conversionPage)
    : `/offers/${offerId}`;
  const eventId = /^[A-Za-z0-9_-]{8,100}$/.test(text(body.eventId, 100))
    ? text(body.eventId, 100)
    : randomUUID();
  const externalId = buildLeadExternalId(offer.source, randomUUID());
  const city = text(body.city, 120) || null;
  const state = text(body.state, 30) || null;
  const zip = text(body.zip, 20) || null;
  const consentedAt = new Date().toISOString();

  const crmResult = await forwardLeadToCrm({
    externalId,
    name: `${firstName} ${lastName}`,
    phone,
    email,
    source: offer.source,
    notes: `${offer.label} submission. Home: ${formattedAddress}. Marketing communications consent recorded on submission.`,
    address,
    city,
    metadata: {
      form: offer.source,
      offer_id: offerId,
      offer_name: offer.label,
      conversion_page: conversionPage,
      event_id: eventId,
      property: {
        formattedAddress,
        address,
        city,
        state,
        zip,
        lat: typeof body.lat === "number" ? body.lat : null,
        lng: typeof body.lng === "number" ? body.lng : null,
      },
      consent: {
        marketingEmail: true,
        marketingSms: true,
        marketingCalls: true,
        method: "form_submit",
        disclosure: OFFER_MARKETING_CONSENT,
        version: OFFER_MARKETING_CONSENT_VERSION,
        consentedAt,
        page: conversionPage,
      },
      attribution: tracking,
      tracking,
    },
  });

  if (!crmResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your request right now. Please call or text us and we'll help right away.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, externalId, eventId });
}
