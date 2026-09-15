"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { SmsOptInCopy } from "@/components/forms/SmsOptInCopy";
import { Button } from "@/components/ui/Button";
import { Mascot } from "@/components/ui/Mascot";
import { COMPANY, LINKS } from "@/lib/constants";
import { track } from "@/lib/analytics/track";
import type { CrmBookingOffer, CrmBookingSlot } from "@/lib/integrations/crm";

function formatInZone(
  iso: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
) {
  return new Intl.DateTimeFormat("en-US", { timeZone, ...options }).format(new Date(iso));
}

function dayKey(iso: string, timeZone: string) {
  return formatInZone(iso, timeZone, { year: "numeric", month: "2-digit", day: "2-digit" });
}

export function BookingWizard() {
  const [offer, setOffer] = useState<CrmBookingOffer | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [slot, setSlot] = useState<CrmBookingSlot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [result, setResult] = useState<{
    startAt: string;
    meetingUrl: string | null;
    calendarWarning: string | null;
  } | null>(null);

  useEffect(() => {
    track("BOOKING_STARTED", { form_name: "virtual_consultation" });
    let cancelled = false;
    fetch("/api/book")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load times");
        if (!cancelled) setOffer(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Failed to load times");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const timeZone = offer?.company.timezone || "America/Denver";
  const groupedSlots = useMemo(() => {
    const groups = new Map<string, CrmBookingSlot[]>();
    for (const item of offer?.slots ?? []) {
      const key = dayKey(item.startAt, timeZone);
      const list = groups.get(key) ?? [];
      list.push(item);
      groups.set(key, list);
    }
    return [...groups.entries()];
  }, [offer?.slots, timeZone]);

  async function submit() {
    setError(null);
    if (!name.trim() || !phone.trim() || !email.includes("@") || !slot) {
      setError("Name, phone, email, and a time are required.");
      return;
    }
    if (!smsConsent) {
      setError("Please check the box to agree to receive text messages.");
      return;
    }
    if (!turnstileToken) {
      setError("Please complete the human verification checkbox.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          notes: notes.trim() || undefined,
          startAt: slot.startAt,
          endAt: slot.endAt,
          smsConsent: true,
          turnstileToken,
          websiteUrl: honeypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
      setResult({
        startAt: data.startAt ?? slot.startAt,
        meetingUrl: data.meetingUrl ?? null,
        calendarWarning: data.calendarWarning ?? null,
      });
      track("BOOKING_COMPLETED", { form_name: "virtual_consultation" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
      setTurnstileReset((n) => n + 1);
      setTurnstileToken(null);
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    const when = formatInZone(result.startAt, timeZone, {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center sm:px-6 sm:py-14">
        <Mascot variant="cheer" size={140} className="mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-chestnut sm:text-4xl">
          You&apos;re booked.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-chestnut/70">
          Your virtual lighting consultation is set for{" "}
          <span className="font-semibold text-chestnut">{when}</span>.
        </p>
        {result.meetingUrl ? (
          <p className="mt-4 text-sm text-chestnut/80">
            Google Meet:{" "}
            <a
              href={result.meetingUrl}
              className="font-semibold text-primary-red underline"
              target="_blank"
              rel="noreferrer"
            >
              Join meeting
            </a>
          </p>
        ) : (
          <p className="mt-4 text-sm text-chestnut/70">
            We&apos;ll email your Google Meet invite to {email}.
          </p>
        )}
        {result.calendarWarning ? (
          <p className="mt-2 text-sm text-chestnut/60">{result.calendarWarning}</p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href={LINKS.tel} variant="primary" className="w-full sm:w-auto">
            Call us
          </Button>
          <Button href="/" variant="outline" className="w-full sm:w-auto">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-red">
        Free consultation
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-chestnut sm:text-4xl">
        Book a virtual lighting consult
      </h1>
      <p className="mt-3 text-chestnut/70">
        30 minutes on Google Meet with {COMPANY.name}. We&apos;ll walk through your property,
        answer questions, and help you plan the install — no on-site visit required for this
        call.
      </p>

      {loading ? (
        <p className="mt-8 flex items-center gap-2 text-sm text-chestnut/60">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading available times…
        </p>
      ) : loadError ? (
        <div className="mt-8 rounded-2xl border border-chestnut/15 bg-white p-5 text-sm text-chestnut/80">
          <p>{loadError}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button href={LINKS.tel} variant="primary" className="w-full sm:w-auto">
              Call {COMPANY.phone}
            </Button>
            <Button href={LINKS.sms} variant="outline" className="w-full sm:w-auto">
              Text us
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-chestnut/80">
              Name *
              <input
                className="mt-1 w-full rounded-xl border border-chestnut/15 bg-white px-3 py-2.5 text-chestnut outline-none ring-primary-red/30 focus:ring-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
            <label className="block text-sm text-chestnut/80">
              Phone *
              <input
                className="mt-1 w-full rounded-xl border border-chestnut/15 bg-white px-3 py-2.5 text-chestnut outline-none ring-primary-red/30 focus:ring-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                autoComplete="tel"
              />
            </label>
            <label className="block text-sm text-chestnut/80 sm:col-span-2">
              Email *
              <input
                className="mt-1 w-full rounded-xl border border-chestnut/15 bg-white px-3 py-2.5 text-chestnut outline-none ring-primary-red/30 focus:ring-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
              />
              <span className="mt-1 block text-xs text-chestnut/50">
                Required so we can send your Google Meet invite.
              </span>
            </label>
            <label className="block text-sm text-chestnut/80 sm:col-span-2">
              Notes (optional)
              <textarea
                className="mt-1 min-h-20 w-full rounded-xl border border-chestnut/15 bg-white px-3 py-2.5 text-chestnut outline-none ring-primary-red/30 focus:ring-2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know before the call"
              />
            </label>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-chestnut">Choose a time</h2>
            {offer?.setupRequired ? (
              <p className="mt-2 text-sm text-chestnut/70">
                Online times aren&apos;t open yet. Call or text us and we&apos;ll get you scheduled.
              </p>
            ) : groupedSlots.length === 0 ? (
              <p className="mt-2 text-sm text-chestnut/70">
                No times in the next two weeks. Call or text us and we&apos;ll find a spot.
              </p>
            ) : (
              <div className="mt-3 max-h-[28rem] space-y-4 overflow-y-auto pr-1">
                {groupedSlots.map(([key, items]) => (
                  <div key={key}>
                    <p className="mb-2 text-sm font-semibold text-chestnut">
                      {formatInZone(items[0].startAt, timeZone, {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {items.map((item) => {
                        const selected = slot?.startAt === item.startAt;
                        return (
                          <button
                            key={item.startAt}
                            type="button"
                            onClick={() => {
                              setSlot(item);
                              track("SLOT_SELECTED", { form_name: "virtual_consultation" });
                            }}
                            className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                              selected
                                ? "border-primary-red bg-primary-red/5 text-primary-red ring-1 ring-primary-red/30"
                                : "border-chestnut/15 bg-white text-chestnut hover:border-chestnut/30"
                            }`}
                          >
                            {formatInZone(item.startAt, timeZone, {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 text-sm leading-relaxed text-chestnut/80">
            <input
              id="book-sms-consent"
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 rounded border-chestnut/30"
              checked={smsConsent}
              onChange={(e) => setSmsConsent(e.target.checked)}
            />
            <SmsOptInCopy htmlFor="book-sms-consent" />
          </div>

          <div>
            <TurnstileWidget
              resetKey={turnstileReset}
              onToken={setTurnstileToken}
            />
          </div>

          <input
            type="text"
            name="websiteUrl"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {error ? <p className="text-sm text-primary-red">{error}</p> : null}

          <button
            type="button"
            onClick={submit}
            disabled={submitting || Boolean(offer?.setupRequired)}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent-gold px-5 py-2.5 text-sm font-semibold text-chestnut transition-colors hover:bg-accent-gold/90 disabled:opacity-60 sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Booking…
              </>
            ) : (
              "Book consultation"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
