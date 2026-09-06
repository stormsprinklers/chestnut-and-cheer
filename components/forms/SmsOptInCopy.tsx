import Link from "next/link";
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

/** Shared A2P disclosure for SMS opt-in checkboxes. */
export function SmsOptInCopy({ kind = "service" }: { kind?: SmsOptInKind }) {
  const types = kind === "marketing" ? SMS_PROGRAM.marketingTypes : SMS_PROGRAM.serviceTypes;
  const purpose =
    kind === "marketing"
      ? "marketing SMS messages"
      : "SMS messages about appointments and your lighting job";

  return (
    <span>
      I agree to receive {purpose} from {COMPANY.name} at the mobile number I provide.
      Messages include {types}. {SMS_PROGRAM.frequency} {SMS_PROGRAM.rates}{" "}
      {SMS_PROGRAM.helpStop} {SMS_PROGRAM.notRequired} <LegalLinks />
    </span>
  );
}
