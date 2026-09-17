import test from "node:test";
import assert from "node:assert/strict";
import { nomination, partner } from "../../../lib/share-the-cheer-fixtures";
import { POST } from "./route";

process.env.CRM_INTEGRATION_URL = "https://crm.example.test/api/integrations";
process.env.CRM_INTEGRATION_KEY = "test-key";
process.env.TURNSTILE_SECRET = "test-secret";

const originalFetch = globalThis.fetch;

function request(kind: string, data: unknown, websiteUrl = "", ip = `203.0.113.${Math.floor(Math.random() * 200) + 1}`) {
  return new Request("https://www.utah.christmas/api/share-the-cheer", {
    method: "POST", headers: { "content-type": "application/json", host: "www.utah.christmas", origin: "https://www.utah.christmas", "x-forwarded-for": ip },
    body: JSON.stringify({ kind, data, websiteUrl, turnstileToken: "test-token" }),
  });
}

test("nomination saves to CRM without putting personal details in analytics", async () => {
  const calls: { url: string; body: string }[] = [];
  globalThis.fetch = async (input, init) => {
    calls.push({ url: String(input), body: String(init?.body ?? "") });
    return Response.json(String(input).includes("siteverify") ? { success: true } : { leadId: "lead-1" }, { status: String(input).includes("siteverify") ? 200 : 201 });
  };
  try {
    const response = await POST(request("nomination", nomination));
    assert.equal(response.status, 200);
    assert.equal(calls.length, 2);
    const lead = JSON.parse(calls[1].body);
    assert.equal(lead.source, "share-the-cheer-nomination");
    assert.match(lead.notes, /Jordan Family/);
    assert.equal(lead.metadata.reviewStatus, "pending");
    assert.equal(lead.metadata.consents.quote, false);
  } finally { globalThis.fetch = originalFetch; }
});

test("partner offer saves separately as pending", async () => {
  globalThis.fetch = async (input) => Response.json(String(input).includes("siteverify") ? { success: true } : { leadId: "lead-2" }, { status: String(input).includes("siteverify") ? 200 : 201 });
  try { assert.equal((await POST(request("partner", partner))).status, 200); }
  finally { globalThis.fetch = originalFetch; }
});

test("failed CRM save reports failure, never success", async () => {
  globalThis.fetch = async (input) => Response.json(String(input).includes("siteverify") ? { success: true } : { error: "offline" }, { status: String(input).includes("siteverify") ? 200 : 503 });
  try { assert.equal((await POST(request("partner", partner))).status, 502); }
  finally { globalThis.fetch = originalFetch; }
});

test("honeypot submission does not call verification or CRM", async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json({ success: true }); };
  try { assert.equal((await POST(request("nomination", nomination, "spam.example"))).status, 200); assert.equal(calls, 0); }
  finally { globalThis.fetch = originalFetch; }
});

test("server rejects invalid details and missing human verification", async () => {
  globalThis.fetch = async (input) => Response.json(String(input).includes("siteverify") ? { success: true } : { leadId: "bad" });
  try {
    const bad = await POST(request("nomination", { ...nomination, termsConsent: false }));
    assert.equal(bad.status, 400);
    assert.ok((await bad.json()).errors.termsConsent);
  } finally { globalThis.fetch = originalFetch; }
  const noToken = new Request("https://www.utah.christmas/api/share-the-cheer", { method: "POST", headers: { host: "www.utah.christmas", "x-forwarded-for": "203.0.113.220" }, body: JSON.stringify({ kind: "partner", data: partner }) });
  assert.equal((await POST(noToken)).status, 403);
});

test("repeated requests are rate limited before reaching CRM", async () => {
  let crmCalls = 0;
  globalThis.fetch = async (input) => {
    if (!String(input).includes("siteverify")) crmCalls++;
    return Response.json(String(input).includes("siteverify") ? { success: true } : { leadId: "lead" }, { status: String(input).includes("siteverify") ? 200 : 201 });
  };
  try {
    const ip = "203.0.113.222";
    for (let i = 0; i < 5; i++) assert.equal((await POST(request("partner", partner, "", ip))).status, 200);
    assert.equal((await POST(request("partner", partner, "", ip))).status, 429);
    assert.equal(crmCalls, 5);
  } finally { globalThis.fetch = originalFetch; }
});
