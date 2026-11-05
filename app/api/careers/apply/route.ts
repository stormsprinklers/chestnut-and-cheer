import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { normalizeFormTrackingData } from "@/lib/analytics/form-tracking";
import { getJobBySlug } from "@/lib/careers";
import {
  buildLeadExternalId,
  forwardCareersApplicationToCrm,
  isCrmConfigured,
} from "@/lib/integrations/crm";
import {
  clientIpFromRequest,
  isHoneypotTripped,
  verifyTurnstileToken,
} from "@/lib/turnstile";

export const runtime = "nodejs";

const MAX_BODY_LENGTH = 24_000;

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) throw new Error();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
    }
  }

  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_LENGTH) {
    return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_LENGTH) {
      return NextResponse.json({ ok: false, error: "Submission is too large." }, { status: 413 });
    }
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (isHoneypotTripped(body.websiteUrl)) return NextResponse.json({ ok: true });

  const firstName = clean(body.firstName, 80);
  const lastName = clean(body.lastName, 80);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const jobSlug = clean(body.jobSlug, 100).toLowerCase();
  const interest = clean(body.interest, 3_000);
  const hardWorkMeaning = clean(body.hardWorkMeaning, 3_000);
  const integrityMeaning = clean(body.integrityMeaning, 3_000);
  const inconvenientServiceExample = clean(body.inconvenientServiceExample, 4_000);
  const personalGoals = clean(body.personalGoals, 3_000);
  const job = getJobBySlug(jobSlug);

  if (!firstName || !lastName || !email || !phone || !job) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!job.applicationsOpen) {
    return NextResponse.json(
      { ok: false, error: "We are not accepting applications for this role right now." },
      { status: 400 },
    );
  }
  if (!hardWorkMeaning || !integrityMeaning || !inconvenientServiceExample || !personalGoals) {
    return NextResponse.json(
      { ok: false, error: "Please answer all four application questions." },
      { status: 400 },
    );
  }

  const ip = clientIpFromRequest(request);
  const turnstile = await verifyTurnstileToken(clean(body.turnstileToken, 2_048), ip);
  if (!turnstile.ok) {
    return NextResponse.json({ ok: false, error: turnstile.error }, { status: turnstile.status });
  }
  if (!isCrmConfigured()) {
    console.error("[careers] CRM integration is not configured");
    return NextResponse.json(
      { ok: false, error: "The application form is temporarily unavailable. Please contact our office." },
      { status: 503 },
    );
  }

  const tracking = normalizeFormTrackingData(body.tracking, request.headers.get("user-agent"));
  const applicantKey = createHash("sha256")
    .update(`${email}:${job.slug}`)
    .digest("hex")
    .slice(0, 32);
  const result = await forwardCareersApplicationToCrm({
    externalId: buildLeadExternalId("chestnut-cheer-careers", applicantKey),
    name: `${firstName} ${lastName}`,
    email,
    phone,
    jobSlug: job.slug,
    jobTitle: job.jobTitle,
    interest: interest || null,
    hardWorkMeaning,
    integrityMeaning,
    inconvenientServiceExample,
    personalGoals,
    metadata: {
      source: "chestnut-cheer-website",
      conversion_page: `/careers/${job.slug}`,
      attribution: tracking,
      tracking,
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We could not save your application. Please try again or contact our office." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
