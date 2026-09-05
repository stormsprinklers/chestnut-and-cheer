import { NextResponse } from "next/server";
import {
  createCrmBooking,
  fetchCrmBookingOffer,
  isCrmConfigured,
} from "@/lib/integrations/crm";
import {
  clientIpFromRequest,
  isHoneypotTripped,
  verifyTurnstileToken,
} from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const result = await fetchCrmBookingOffer();
  if ("skipped" in result && result.skipped) {
    return NextResponse.json(
      { error: "Booking is not connected yet. Please call or text us." },
      { status: 503 }
    );
  }
  if (!result.ok) {
    return NextResponse.json(
      { error: "We couldn't load available times. Please call or text us." },
      { status: result.status ?? 502 }
    );
  }
  return NextResponse.json(result.offer);
}

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  startAt?: string;
  endAt?: string;
  smsConsent?: boolean;
  turnstileToken?: string;
  "cf-turnstile-response"?: string;
  websiteUrl?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (isHoneypotTripped(body.websiteUrl)) {
    return NextResponse.json({ ok: true, visitId: "honeypot" });
  }

  const turnstileToken =
    (typeof body.turnstileToken === "string" && body.turnstileToken) ||
    (typeof body["cf-turnstile-response"] === "string" && body["cf-turnstile-response"]) ||
    null;
  const turnstile = await verifyTurnstileToken(turnstileToken, clientIpFromRequest(request));
  if (!turnstile.ok) {
    return NextResponse.json({ error: turnstile.error }, { status: turnstile.status });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const startAt = String(body.startAt ?? "").trim();
  const endAt = String(body.endAt ?? "").trim();
  if (!name || !phone || !email.includes("@") || !startAt || !endAt) {
    return NextResponse.json(
      { error: "Name, phone, email, and a time slot are required." },
      { status: 400 }
    );
  }
  if (body.smsConsent !== true) {
    return NextResponse.json(
      { error: "Please check the box to agree to receive text messages." },
      { status: 400 }
    );
  }

  const result = await createCrmBooking({
    name,
    phone,
    email,
    notes: body.notes?.trim() || null,
    startAt,
    endAt,
  });

  if ("skipped" in result && result.skipped) {
    return NextResponse.json(
      {
        error:
          "We couldn't save your booking right now. Please call or text us and we'll help right away.",
      },
      { status: 503 }
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        error:
          result.error ||
          "We couldn't save your booking right now. Please call or text us and we'll help right away.",
      },
      { status: result.status ?? 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    crmConfigured: isCrmConfigured(),
    ...result.booking,
  });
}
