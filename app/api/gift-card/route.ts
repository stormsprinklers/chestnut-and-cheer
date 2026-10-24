import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { normalizeFormTrackingData } from "@/lib/analytics/form-tracking";
import { buildLeadExternalId, forwardLeadToCrm, isCrmConfigured } from "@/lib/integrations/crm";
import { checkCheerRateLimit } from "@/lib/share-the-cheer-rate-limit";
import { clientIpFromRequest, isHoneypotTripped, verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";
export const maxDuration = 60;

type GiftCardRequest = {
  name?: unknown;
  phone?: unknown;
  address?: unknown;
  giftCardFrom?: unknown;
  websiteUrl?: unknown;
  turnstileToken?: unknown;
  tracking?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) throw new Error("Origin mismatch");
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
    }
  }

  if (Number(request.headers.get("content-length") || 0) > 12_000) {
    return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
  }

  let body: GiftCardRequest;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
    body = JSON.parse(raw) as GiftCardRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (isHoneypotTripped(body.websiteUrl)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 30);
  const address = clean(body.address, 240);
  const giftCardFrom = clean(body.giftCardFrom, 120);
  if (!name || !phone || !address || !giftCardFrom) {
    return NextResponse.json({ ok: false, error: "Please complete all four fields." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false, error: "Please enter a valid phone number." }, { status: 400 });
  }

  const ip = clientIpFromRequest(request) ?? "unknown";
  const rateLimitKey = createHash("sha256").update(`gift-card:${ip}`).digest("hex");
  if (!checkCheerRateLimit(rateLimitKey)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const verification = await verifyTurnstileToken(clean(body.turnstileToken, 2048), ip);
  if (!verification.ok) {
    return NextResponse.json({ ok: false, error: verification.error }, { status: verification.status });
  }

  if (!isCrmConfigured()) {
    console.error("[gift-card] CRM not configured");
    return NextResponse.json(
      { ok: false, error: "We couldn't save your request right now. Please call or text us and we'll help right away." },
      { status: 503 },
    );
  }

  const tracking = normalizeFormTrackingData(body.tracking, request.headers.get("user-agent"));
  const source = "christmas-gift-card";
  const result = await forwardLeadToCrm({
    externalId: buildLeadExternalId(source, randomUUID()),
    name,
    phone,
    email: null,
    source,
    address,
    notes: [
      "$100 promotional Christmas lights gift card quote request",
      `Gift card given by: ${giftCardFrom}`,
      `Property address: ${address}`,
      "Customer requested contact about a quote by call or text.",
    ].join("\n"),
    metadata: {
      form: "gift_card_quote",
      promotion: "100-dollar-gift-card",
      giftCardValue: 100,
      giftCardFrom,
      conversion_page: "/gift-card",
      attribution: tracking,
      tracking,
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't save your request right now. Please call or text us and we'll help right away." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
