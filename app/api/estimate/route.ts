import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { buildLeadExternalId, forwardLeadToCrm, isCrmConfigured } from "@/lib/integrations/crm";
import { buildEstimateMetadata, buildEstimateNotes } from "@/lib/estimate/payload";
import type { EstimateFormState } from "@/lib/estimate/types";
import { isDoorHangerAttribution } from "@/lib/estimate/analytics";
import {
  clientIpFromRequest,
  isHoneypotTripped,
  verifyTurnstileToken,
} from "@/lib/turnstile";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  form: EstimateFormState;
  attribution?: Record<string, unknown>;
  turnstileToken?: string;
  "cf-turnstile-response"?: string;
  websiteUrl?: string;
};

function validate(form: EstimateFormState): string | null {
  if (!form.need) return "Please tell us how we can help.";
  if (!form.address.trim() || !form.zip.trim()) return "Property address and ZIP are required.";
  if (!form.firstName.trim() || !form.lastName.trim()) return "Please enter your name.";
  if (!form.phone.trim()) return "Mobile phone is required.";
  if (!form.email.trim() || !form.email.includes("@")) return "A valid email is required.";
  if (!form.quoteConsent) return "Please consent so we can contact you about your quote.";
  if (!form.quoteMethod) return "Please choose how you'd like to receive your quote.";
  return null;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (isHoneypotTripped(body.websiteUrl)) {
    return NextResponse.json({ ok: true, externalId: "honeypot" });
  }

  const turnstileToken =
    (typeof body.turnstileToken === "string" && body.turnstileToken) ||
    (typeof body["cf-turnstile-response"] === "string" && body["cf-turnstile-response"]) ||
    null;
  const turnstile = await verifyTurnstileToken(turnstileToken, clientIpFromRequest(request));
  if (!turnstile.ok) {
    return NextResponse.json({ error: turnstile.error }, { status: turnstile.status });
  }

  const form = body.form;
  if (!form || typeof form !== "object") {
    return NextResponse.json({ error: "Missing form data" }, { status: 400 });
  }

  const error = validate(form);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const attribution = body.attribution ?? {};
  const fromDoorHanger = isDoorHangerAttribution(attribution);
  const leadSource = fromDoorHanger ? "christmas-door-hanger" : "christmas-estimate";
  const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
  const externalId = buildLeadExternalId(leadSource, randomUUID());
  const notes = buildEstimateNotes(form, attribution);
  const metadata = buildEstimateMetadata(form, attribution);

  const crmResult = await forwardLeadToCrm({
    externalId,
    name,
    phone: form.phone.trim(),
    email: form.email.trim(),
    source: leadSource,
    notes,
    metadata,
    address: form.address.trim(),
    city: form.city.trim() || null,
  });

  if ("skipped" in crmResult && crmResult.skipped) {
    console.error("[estimate] CRM not configured — refusing lead");
    return NextResponse.json(
      {
        error:
          "We couldn't save your request right now. Please call or text us and we'll help right away.",
      },
      { status: 503 }
    );
  }

  if (!crmResult.ok) {
    return NextResponse.json(
      {
        error:
          "We couldn't save your request right now. Please call or text us and we'll help right away.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    externalId,
    crmConfigured: isCrmConfigured(),
  });
}
