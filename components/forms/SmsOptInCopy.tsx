"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { COMPANY, LINKS, SMS_PROGRAM } from "@/lib/constants";

export type SmsOptInKind = "service" | "marketing";

function LegalLinks() {
  return (
    <>
      View our{" "}
      <Link href={LINKS.terms} className="font-medium underline hover:text-primary-red">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href={LINKS.privacy} className="font-medium underline hover:text-primary-red">
        Privacy Policy
      </Link>
      .
    </>
  );
}

/** Shared A2P disclosure for SMS opt-in checkboxes. Collapsed by default. */
export function SmsOptInCopy({
  kind = "service",
  htmlFor,
}: {
  kind?: SmsOptInKind;
  htmlFor?: string;
}) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const types = kind === "marketing" ? SMS_PROGRAM.marketingTypes : SMS_PROGRAM.serviceTypes;
  const purpose =
    kind === "marketing"
      ? "marketing SMS messages"
      : "SMS messages about appointments";
  const summaryText =
    kind === "marketing"
      ? "I consent to receive marketing SMS."
      : "I consent to receive appointment SMS.";

  const summary = (
    <>
      {summaryText}{" "}
      <button
        type="button"
        className="inline-flex items-center gap-0.5 align-baseline font-medium text-chestnut hover:text-primary-red"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        See Details
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
    </>
  );

  return (
    <span className="block">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="cursor-pointer">
          {summary}
        </label>
      ) : (
        <span>{summary}</span>
      )}
      {open ? (
        <span id={detailsId} className="mt-1.5 block text-[13px] leading-relaxed text-chestnut/70">
          I agree to receive {purpose} from {COMPANY.name} at the mobile number I provide.
          Messages include {types}. {SMS_PROGRAM.frequency} {SMS_PROGRAM.rates}{" "}
          {SMS_PROGRAM.helpStop} {SMS_PROGRAM.notRequired} <LegalLinks />
        </span>
      ) : null}
    </span>
  );
}
