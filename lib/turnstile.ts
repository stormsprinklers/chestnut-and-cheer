/**
 * Cloudflare Turnstile server-side verification (Spin canonical siteverify).
 * Secret must be provided as process.env.TURNSTILE_SECRET (never hard-coded).
 */

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteip?: string | null
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET?.trim();
  if (!secret) {
    console.error("[turnstile] TURNSTILE_SECRET is not configured");
    return {
      ok: false,
      error: "Human verification is not configured. Please call us.",
      status: 503,
    };
  }

  const response = String(token ?? "").trim();
  if (!response) {
    return {
      ok: false,
      error: "Please complete the human verification checkbox.",
      status: 403,
    };
  }

  let result: { success?: boolean; "error-codes"?: string[] };
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response,
        ...(remoteip ? { remoteip } : {}),
      }),
    });
    if (!r.ok) throw new Error(`siteverify ${r.status}`);
    result = (await r.json()) as { success?: boolean; "error-codes"?: string[] };
  } catch (err) {
    console.error("[turnstile] siteverify error", err);
    return { ok: false, error: "forbidden", status: 403 };
  }

  if (!result.success) {
    console.warn("[turnstile] verification failed", result["error-codes"]);
    return { ok: false, error: "forbidden", status: 403 };
  }

  return { ok: true };
}

/** Returns true if bots filled the honeypot field. */
export function isHoneypotTripped(value: unknown) {
  return Boolean(String(value ?? "").trim());
}

export function clientIpFromRequest(request: Request): string | null {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null
  );
}
