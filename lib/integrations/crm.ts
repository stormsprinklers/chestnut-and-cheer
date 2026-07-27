export type CrmLeadPayload = {
  externalId: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  source?: string | null;
  notes?: string | null;
  metadata?: Record<string, unknown>;
  address?: string | null;
  city?: string | null;
};

const CRM_BASE = process.env.CRM_INTEGRATION_URL?.replace(/\/$/, "") ?? "";
const CRM_KEY = process.env.CRM_INTEGRATION_KEY ?? "";

export function isCrmConfigured() {
  return Boolean(CRM_BASE && CRM_KEY);
}

export async function forwardLeadToCrm(payload: CrmLeadPayload) {
  if (!isCrmConfigured()) {
    console.warn(
      "CRM integration skipped: set CRM_INTEGRATION_URL and CRM_INTEGRATION_KEY"
    );
    return { ok: false as const, skipped: true as const };
  }

  const url = `${CRM_BASE}/website/leads`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRM_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("CRM lead forward failed:", res.status, text);
      return { ok: false as const, status: res.status };
    }
    return { ok: true as const };
  } catch (err) {
    console.error("CRM lead forward error:", err);
    return { ok: false as const, error: err };
  }
}

export function buildLeadExternalId(prefix: string, id: string) {
  return `${prefix}:${id}`;
}
