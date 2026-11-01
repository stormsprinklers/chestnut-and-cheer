import { randomUUID, createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { buildLeadExternalId, forwardLeadToCrm, isCrmConfigured } from "@/lib/integrations/crm";
import { checkCheerRateLimit } from "@/lib/share-the-cheer-rate-limit";
import { nominationsOpen, type CheerFormKind, type CheerSubmission, validateCheerSubmission } from "@/lib/share-the-cheer";
import { clientIpFromRequest, isHoneypotTripped, verifyTurnstileToken } from "@/lib/turnstile";
import { normalizeFormTrackingData } from "@/lib/analytics/form-tracking";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try { if (new URL(origin).host !== request.headers.get("host")) throw new Error(); }
    catch { return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 }); }
  }
  if (Number(request.headers.get("content-length") || 0) > 16000) return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });

  let body: { kind?: CheerFormKind; data?: CheerSubmission; websiteUrl?: string; turnstileToken?: string; tracking?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 16000) return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
    body = JSON.parse(raw);
  }
  catch { return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  if (isHoneypotTripped(body.websiteUrl)) return NextResponse.json({ ok: true });
  if (body.kind !== "nomination" && body.kind !== "support") return NextResponse.json({ ok: false, error: "Choose a form." }, { status: 400 });
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
  const tracking = normalizeFormTrackingData(
    body.tracking,
    request.headers.get("user-agent")
  );
  const source = body.kind === "nomination" ? "share-the-cheer-nomination" : "share-the-cheer-support";
  const name = String(body.kind === "nomination" ? data.submitterName : data.supporterName).trim();
  const email = String(body.kind === "nomination" ? data.submitterEmail : data.supporterEmail).trim();
  const phone = String(body.kind === "nomination" ? data.submitterPhone : data.supporterPhone).trim();
  const notes = body.kind === "nomination"
    ? [
        "=== SUBMITTER / NOMINATOR ===",
        `Submitter name: ${data.submitterName}`,
        `Submitter email: ${data.submitterEmail}`,
        `Submitter phone: ${data.submitterPhone}`,
        `Relationship to family: ${data.relationship || "Not provided"}`,
        "",
        "=== NOMINATED FAMILY ===",
        `Family or primary contact: ${data.familyName}`,
        `Family email: ${data.familyEmail || "Not provided"}`,
        `Family phone: ${data.familyPhone || "Not provided"}`,
        `Family city: ${data.familyCity}`,
        `Household size: ${data.householdSize}`,
        "",
        "=== WHY THEY WERE NOMINATED ===",
        String(data.reason),
        "",
        "=== AT-COST SPONSORSHIP ===",
        `Submitter willing to discuss sponsoring this family at cost: ${data.sponsorAtCost === "yes" ? "YES" : "NO"}`,
        "The nominated family pays nothing. Partners add no markup and make no profit from this campaign.",
        "",
        "Submitter confirmed the family may be contacted privately. Privacy policy and program terms accepted.",
      ].join("\n")
    : [
        "=== SUPPORTER CONTACT ===",
        `Supporter name: ${data.supporterName}`,
        `Supporter email: ${data.supporterEmail}`,
        `Supporter phone: ${data.supporterPhone}`,
        `Business or organization: ${data.organization || "Not provided"}`,
        "",
        "=== POSSIBLE CONTRIBUTION ===",
        String(data.contributionNotes),
        "",
        "Support offer is pending office confirmation. Privacy policy and program terms accepted.",
      ].join("\n");
  const result = await forwardLeadToCrm({
    externalId: buildLeadExternalId(source, randomUUID()), name, email, phone, source, notes,
    city: body.kind === "nomination" ? String(data.familyCity).trim() : null,
    metadata: {
      form: source,
      program: "Share the Cheer",
      reviewStatus: "pending",
      privacyConsent: true,
      submissionRole: body.kind === "nomination" ? "nominator" : "supporter",
      nominatedFamilyName: body.kind === "nomination" ? String(data.familyName) : undefined,
      householdSize: body.kind === "nomination" ? Number(data.householdSize) : undefined,
      sponsorAtCost: body.kind === "nomination" ? data.sponsorAtCost === "yes" : undefined,
      contactPermission: body.kind === "nomination" ? true : undefined,
      consents: { quote: false },
      attribution: tracking,
      tracking,
    },
  });
  if (!result.ok) return NextResponse.json({ ok: false, error: "We could not save this submission. Please contact our office." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
