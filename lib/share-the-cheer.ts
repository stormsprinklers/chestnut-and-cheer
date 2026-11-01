export const SHARE_THE_CHEER = {
  year: 2026,
  familiesSupported: 5,
  nominationOpens: null as string | null,
  nominationCloses: null as string | null,
  selectionContactBy: "2026-12-01",
  selectedFamilyConsentChoices: ["No publicity", "Anonymous story only", "Approved story", "Approved photos and story"],
} as const;

export type CheerFormKind = "nomination" | "support";

export const nominationFields = [
  "submitterName", "submitterEmail", "submitterPhone", "relationship",
  "familyName", "familyEmail", "familyPhone", "familyCity", "householdSize",
  "reason", "sponsorAtCost",
] as const;

export const supportFields = [
  "supporterName", "supporterEmail", "supporterPhone", "organization", "contributionNotes",
] as const;

export type CheerSubmission = Record<string, string | boolean | undefined>;

export function nominationsOpen(now = new Date()) {
  const day = now.toISOString().slice(0, 10);
  return (!SHARE_THE_CHEER.nominationOpens || day >= SHARE_THE_CHEER.nominationOpens) &&
    (!SHARE_THE_CHEER.nominationCloses || day <= SHARE_THE_CHEER.nominationCloses);
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d.\s-]{7,25}$/;
const limits: Record<string, number> = { reason: 2500, contributionNotes: 2500 };

export function validateCheerSubmission(kind: CheerFormKind, data: CheerSubmission) {
  const errors: Record<string, string> = {};
  const fields = kind === "nomination" ? nominationFields : supportFields;
  for (const field of fields) {
    const value = data[field];
    if (typeof value !== "string") {
      errors[field] = "Please enter a valid value.";
      continue;
    }
    const max = limits[field] ?? 200;
    if (value.length > max) errors[field] = `Please use ${max} characters or fewer.`;
  }

  const required = kind === "nomination"
    ? ["submitterName", "submitterEmail", "submitterPhone", "familyName", "familyCity", "householdSize", "reason", "sponsorAtCost"]
    : ["supporterName", "supporterEmail", "supporterPhone", "contributionNotes"];
  for (const field of required) {
    if (!String(data[field] ?? "").trim()) errors[field] = "This field is required.";
  }

  const emails = kind === "nomination" ? ["submitterEmail", "familyEmail"] : ["supporterEmail"];
  for (const field of emails) {
    if (data[field] && !emailPattern.test(String(data[field]))) errors[field] = "Enter a valid email address.";
  }
  const phones = kind === "nomination" ? ["submitterPhone", "familyPhone"] : ["supporterPhone"];
  for (const field of phones) {
    if (data[field] && !phonePattern.test(String(data[field]))) errors[field] = "Enter a valid phone number.";
  }

  if (kind === "nomination") {
    const size = Number(data.householdSize);
    if (!Number.isInteger(size) || size < 1 || size > 30) errors.householdSize = "Enter a household size from 1 to 30.";
    if (!String(data.familyEmail ?? "").trim() && !String(data.familyPhone ?? "").trim()) {
      errors.familyPhone = "Please provide at least one way to contact the nominated family.";
    }
    if (!["yes", "no"].includes(String(data.sponsorAtCost ?? ""))) errors.sponsorAtCost = "Please choose yes or no.";
    if (data.contactPermission !== true) errors.contactPermission = "Please confirm the family may be contacted.";
  }
  if (data.termsConsent !== true) errors.termsConsent = "Please accept the privacy policy and program terms.";
  return errors;
}
