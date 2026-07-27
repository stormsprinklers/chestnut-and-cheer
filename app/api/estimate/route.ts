import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { buildLeadExternalId, forwardLeadToCrm, isCrmConfigured } from "@/lib/integrations/crm";
import { buildEstimateMetadata, buildEstimateNotes } from "@/lib/estimate/payload";
import type { EstimateFormState } from "@/lib/estimate/types";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  form: EstimateFormState;
  attribution?: Record<string, unknown>;
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

  const form = body.form;
  if (!form || typeof form !== "object") {
    return NextResponse.json({ error: "Missing form data" }, { status: 400 });
  }

  const error = validate(form);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
  const externalId = buildLeadExternalId("christmas-estimate", randomUUID());
  const attribution = body.attribution ?? {};
  const notes = buildEstimateNotes(form);
  const metadata = buildEstimateMetadata(form, attribution);

  const crmResult = await forwardLeadToCrm({
    externalId,
    name,
    phone: form.phone.trim(),
    email: form.email.trim(),
    source: "christmas-estimate",
    notes,
    metadata,
    address: form.address.trim(),
    city: form.city.trim() || null,
  });

  if (!crmResult.ok && !("skipped" in crmResult && crmResult.skipped)) {
    return NextResponse.json(
      {
        error:
          "We couldn't save your request right now. Please call or text us and we'll help right away.",
      },
      { status: 502 }
    );
  }

  if ("skipped" in crmResult && crmResult.skipped) {
    // Dev-friendly: accept submission locally when CRM isn't configured
    console.warn("[estimate] CRM not configured — lead accepted locally only", {
      externalId,
      name,
      email: form.email,
    });
  }

  return NextResponse.json({
    ok: true,
    externalId,
    crmConfigured: isCrmConfigured(),
  });
}
