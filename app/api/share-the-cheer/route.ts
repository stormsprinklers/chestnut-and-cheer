import { randomUUID, createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { buildLeadExternalId, forwardLeadToCrm, isCrmConfigured } from "@/lib/integrations/crm";
import { checkCheerRateLimit } from "@/lib/share-the-cheer-rate-limit";
import { nominationsOpen, type CheerFormKind, type CheerSubmission, validateCheerSubmission } from "@/lib/share-the-cheer";
import { clientIpFromRequest, isHoneypotTripped, verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try { if (new URL(origin).host !== request.headers.get("host")) throw new Error(); }
    catch { return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 }); }
  }
  if (Number(request.headers.get("content-length") || 0) > 16000) return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });

  let body: { kind?: CheerFormKind; data?: CheerSubmission; websiteUrl?: string; turnstileToken?: string };
  try {
    const raw = await request.text();
    if (raw.length > 16000) return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
    body = JSON.parse(raw);
  }
  catch { return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  if (isHoneypotTripped(body.websiteUrl)) return NextResponse.json({ ok: true });
  if (body.kind !== "nomination" && body.kind !== "partner") return NextResponse.json({ ok: false, error: "Choose a form." }, { status: 400 });
  if (body.kind === "nomination" && !nominationsOpen()) return NextResponse.json({ ok: false, error: "Nominations are not open right now. Please contact our office with questions." }, { status: 403 });
  const ip = clientIpFromRequest(request) ?? "unknown";
  const key = createHash("sha256").update(`${body.kind}:${ip}`).digest("hex");
  if (!checkCheerRateLimit(key)) return NextResponse.json({ ok: false, error: "Too many attempts. Please try again later." }, { status: 429, headers: { "Retry-After": "900" } });
  const verified = await verifyTurnstileToken(body.turnstileToken, ip);
  if (!verified.ok) return NextResponse.json({ ok: false, error: verified.error }, { status: verified.status });
  if (!body.data || typeof body.data !== "object" || Array.isArray(body.data)) return NextResponse.json({ ok: false, error: "Missing form details." }, { status: 400 });
  const errors = validateCheerSubmission(body.kind, body.data);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 400 });
  if (!isCrmConfigured()) return NextResponse.json({ ok: false, error: "The form is temporarily unavailable. Please contact our office." }, { status: 503 });

  const data = body.data;
  const source = body.kind === "nomination" ? "share-the-cheer-nomination" : "share-the-cheer-partner";
  const name = String(body.kind === "nomination" ? data.nominatorName : data.contactName).trim();
  const email = String(body.kind === "nomination" ? data.nominatorEmail : data.email).trim();
  const phone = String(body.kind === "nomination" ? data.nominatorPhone : data.phone).trim();
  const notes = body.kind === "nomination"
    ? [
        `Family: ${data.familyName}`, `Family email: ${data.familyEmail || "Not known"}`, `Family phone: ${data.familyPhone || "Not known"}`,
        `Relationship: ${data.relationship}`, `Household size: ${data.householdSize}`, `Children/dependents: ${data.dependents}`,
        `Why nominated: ${data.reason}`, `Known needs/circumstances: ${data.needs}`, `Privacy/contact considerations: ${data.privacyConsiderations || "None provided"}`,
        "Nominator confirmed belief family may be contacted. Privacy policy and program terms accepted.",
      ].join("\n")
    : [
        `Organization: ${data.organization}`, `Website: ${data.website || "Not provided"}`, `Contribution type: ${data.contributionType}`,
        `Offer: ${data.description}`, `Quantity: ${data.quantity}`, `Approximate value: ${data.approximateValue || "Not provided"}`,
        `Can support every selected family: ${data.supportsEveryFamily ? "Yes" : "No"}`, `Restrictions: ${data.restrictions || "None provided"}`,
        `Delivery/pickup: ${data.delivery}`, `Interested in volunteering: ${data.volunteer ? "Yes" : "No"}`,
        `Public recognition allowed: ${data.publicRecognition ? "Yes" : "No"}`, `Additional notes: ${data.notes || "None provided"}`,
        "Offer pending office confirmation. Privacy policy and program terms accepted.",
      ].join("\n");
  const result = await forwardLeadToCrm({
    externalId: buildLeadExternalId(source, randomUUID()), name, email, phone, source, notes,
    city: body.kind === "nomination" ? String(data.city).trim() : null,
    metadata: { form: source, program: "Share the Cheer", reviewStatus: "pending", privacyConsent: true, contactPermission: body.kind === "nomination" ? true : undefined, consents: { quote: false } },
  });
  if (!result.ok) return NextResponse.json({ ok: false, error: "We could not save this submission. Please contact our office." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
