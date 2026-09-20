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
  smsServiceConsent?: boolean;
  smsMarketingConsent?: boolean;
  turnstileToken?: string;
  "cf-turnstile-response"?: string;
  websiteUrl?: string;
  leadSource?: string;
  conversionPage?: string;
  service?: string;
  zip?: string;
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
  const allowedLeadSources = new Set(["ppc_temporary_lights", "ppc_permanent_lights"]);
  const leadSource = allowedLeadSources.has(String(body.leadSource))
    ? String(body.leadSource)
    : "christmas-contact";
  const conversionPage = /^\/ppc\/(christmas-light-installation|permanent-christmas-light-installation)$/.test(String(body.conversionPage))
    ? String(body.conversionPage)
    : "/contact";

  if (!name) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Please enter your mobile phone number." },
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

  const externalId = buildLeadExternalId(leadSource, randomUUID());
  const crmResult = await forwardLeadToCrm({
    externalId,
    name,
    phone: phone || null,
    email: email || null,
    source: leadSource,
    notes: message,
    metadata: {
      form: leadSource,
      message,
      conversion_page: conversionPage,
      service: String(body.service ?? "").slice(0, 30),
      zip: String(body.zip ?? "").slice(0, 10),
      smsServiceConsent: body.smsServiceConsent === true,
      smsMarketingConsent: body.smsMarketingConsent === true,
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
