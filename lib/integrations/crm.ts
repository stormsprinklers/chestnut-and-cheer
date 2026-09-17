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

function crmCredentials() {
  return {
    base: process.env.CRM_INTEGRATION_URL?.replace(/\/$/, "") ?? "",
    key: process.env.CRM_INTEGRATION_KEY ?? "",
  };
}

export function isCrmConfigured() {
  const { base, key } = crmCredentials();
  return Boolean(base && key);
}

export async function forwardLeadToCrm(payload: CrmLeadPayload) {
  if (!isCrmConfigured()) {
    console.warn(
      "CRM integration skipped: set CRM_INTEGRATION_URL and CRM_INTEGRATION_KEY"
    );
    return { ok: false as const, skipped: true as const };
  }

  const { base, key } = crmCredentials();
  const url = `${base}/website/leads`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
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

export type CrmMarketingEventPayload = {
  externalId: string;
  eventType: string;
  sessionId?: string | null;
  pagePath?: string | null;
  metadata?: Record<string, unknown>;
  occurredAt?: string;
};

/** Forward anonymous first-party website activity to the CRM SEO dashboard. */
export function forwardMarketingEventToCrm(payload: CrmMarketingEventPayload) {
  return crmFetch("/website/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type CrmBookingSlot = {
  startAt: string;
  endAt: string;
};

export type CrmBookingOffer = {
  company: {
    name: string;
    phone: string | null;
    supportEmail: string | null;
    timezone: string | null;
  };
  virtual: boolean;
  slotMinutes: number;
  requireEmail: boolean;
  googleMeetReady: boolean;
  setupRequired: boolean;
  slots: CrmBookingSlot[];
};

export type CrmBookingInput = {
  name: string;
  phone: string;
  email: string;
  notes?: string | null;
  startAt: string;
  endAt: string;
};

async function crmFetch(path: string, init?: RequestInit) {
  if (!isCrmConfigured()) {
    return { ok: false as const, skipped: true as const, status: 503 };
  }
  const { base, key } = crmCredentials();
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        ...(init?.headers ?? {}),
      },
    });
    const text = await res.text();
    let json: unknown = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = { error: text };
    }
    if (!res.ok) {
      console.error("CRM request failed:", path, res.status, text);
      return { ok: false as const, status: res.status, json };
    }
    return { ok: true as const, status: res.status, json };
  } catch (err) {
    console.error("CRM request error:", path, err);
    return { ok: false as const, error: err };
  }
}

export async function fetchCrmBookingOffer() {
  const result = await crmFetch("/website/booking");
  if ("skipped" in result && result.skipped) {
    return { ok: false as const, skipped: true as const };
  }
  if (!result.ok) {
    return { ok: false as const, status: "status" in result ? result.status : 502 };
  }
  return { ok: true as const, offer: result.json as CrmBookingOffer };
}

export async function createCrmBooking(input: CrmBookingInput) {
  const result = await crmFetch("/website/booking", {
    method: "POST",
    body: JSON.stringify(input),
  });
  if ("skipped" in result && result.skipped) {
    return { ok: false as const, skipped: true as const };
  }
  if (!result.ok) {
    const json = "json" in result ? (result.json as { error?: string } | null) : null;
    return {
      ok: false as const,
      status: "status" in result ? result.status : 502,
      error: json?.error ?? "Booking failed",
    };
  }
  return {
    ok: true as const,
    booking: result.json as {
      visitId: string;
      startAt: string;
      endAt: string;
      virtual: boolean;
      meetingUrl: string | null;
      calendarWarning: string | null;
    },
  };
}
