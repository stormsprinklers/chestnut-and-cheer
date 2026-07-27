import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  buildLeadExternalId,
  forwardLeadToCrm,
  isCrmConfigured,
} from "@/lib/integrations/crm";
import {
  clientIpFromRequest,
  isHoneypotTripped,
  verifyTurnstileToken,
} from "@/lib/turnstile";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  turnstileToken?: string;
  "cf-turnstile-response"?: string;
  websiteUrl?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (isHoneypotTripped(body.websiteUrl)) {
    return NextResponse.json({ ok: true });
  }

  const turnstileToken =
    (typeof body.turnstileToken === "string" && body.turnstileToken) ||
    (typeof body["cf-turnstile-response"] === "string" && body["cf-turnstile-response"]) ||
    null;
  const turnstile = await verifyTurnstileToken(turnstileToken, clientIpFromRequest(request));
  if (!turnstile.ok) {
    return NextResponse.json(
      { ok: false, error: turnstile.error },
      { status: turnstile.status }
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json(
      { ok: false, error: "Please provide an email or phone number." },
      { status: 400 }
    );
  }
  if (email && !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Please tell us how we can help." },
      { status: 400 }
    );
  }

  if (!isCrmConfigured()) {
    console.error("[contact] CRM not configured");
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your message right now. Please call or text us and we'll help right away.",
      },
      { status: 503 }
    );
  }

  const externalId = buildLeadExternalId("christmas-contact", randomUUID());
  const crmResult = await forwardLeadToCrm({
    externalId,
    name,
    phone: phone || null,
    email: email || null,
    source: "christmas-contact",
    notes: message,
    metadata: {
      form: "christmas-contact",
      message,
      conversion_page: "/#contact",
    },
  });

  if (!crmResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your message right now. Please call or text us and we'll help right away.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, externalId });
}
