import Link from "next/link";
import { COMPANY, LINKS, SMS_PROGRAM } from "@/lib/constants";

/** Shared A2P disclosure for SMS opt-in checkboxes. */
export function SmsOptInCopy() {
  return (
    <span>
      I agree to receive SMS messages from {COMPANY.name} at the mobile number I
      provide. Messages include {SMS_PROGRAM.types}. {SMS_PROGRAM.frequency}{" "}
      {SMS_PROGRAM.rates} {SMS_PROGRAM.helpStop} {SMS_PROGRAM.notRequired} View
      our{" "}
      <Link href={LINKS.terms} className="font-medium underline hover:text-primary-red">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href={LINKS.privacy} className="font-medium underline hover:text-primary-red">
        Privacy Policy
      </Link>
      .
    </span>
  );
}
