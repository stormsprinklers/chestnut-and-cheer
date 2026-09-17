export const SHARE_THE_CHEER = {
  year: 2026,
  nominationOpens: null as string | null,
  nominationCloses: null as string | null,
  selectionContactBy: "2026-12-01",
  needs: [
    { name: "Christmas dinner partner", status: "Needed" },
    { name: "Real Christmas trees", status: "Needed" },
    { name: "Toys and children's gifts", status: "Needed" },
    { name: "Winter clothing", status: "Needed" },
    { name: "Blankets and bedding", status: "Needed" },
    { name: "Grocery or fuel gift cards", status: "Needed" },
    { name: "Family activities and experiences", status: "Needed" },
    { name: "Photography", status: "Needed" },
    { name: "Delivery assistance", status: "Needed" },
    { name: "Additional goods, services, or funding", status: "Needed" },
  ] as { name: string; status: "Needed" | "Partially committed" | "Confirmed" }[],
  // Offer these choices privately to selected families later. No media consent is sought on nomination.
  selectedFamilyConsentChoices: ["No publicity", "Anonymous story only", "Approved story", "Approved photos and story"],
  recaps: [] as {
    year: number;
    familiesServed: number;
    participatingBusinesses: string[];
    contributions: string[];
    estimatedCommunityValue?: string;
    approvedPhotos?: { src: string; alt: string }[];
    approvedStories?: string[];
    anonymousSummaries?: string[];
    thankYou: string;
  }[],
};

export type CheerFormKind = "nomination" | "partner";

export const nominationFields = [
  "nominatorName", "nominatorEmail", "nominatorPhone", "relationship", "familyName",
  "familyEmail", "familyPhone", "city", "householdSize", "dependents",
  "reason", "needs", "privacyConsiderations",
] as const;

export const partnerFields = [
  "organization", "contactName", "email", "phone", "website", "contributionType",
  "description", "quantity", "approximateValue", "restrictions", "delivery", "notes",
] as const;

export type CheerSubmission = Record<string, string | boolean | undefined>;

export function nominationsOpen(now = new Date()) {
  const day = now.toISOString().slice(0, 10);
  return (!SHARE_THE_CHEER.nominationOpens || day >= SHARE_THE_CHEER.nominationOpens) &&
    (!SHARE_THE_CHEER.nominationCloses || day <= SHARE_THE_CHEER.nominationCloses);
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d.\s-]{7,25}$/;
const limits: Record<string, number> = { reason: 2000, needs: 1500, privacyConsiderations: 1000, description: 2000, restrictions: 1000, notes: 1000 };

export function validateCheerSubmission(kind: CheerFormKind, data: CheerSubmission) {
  const errors: Record<string, string> = {};
  const fields = kind === "nomination" ? nominationFields : partnerFields;
  for (const field of fields) {
    const value = data[field];
    if (typeof value !== "string") { errors[field] = "Please enter a valid value."; continue; }
    const max = limits[field] ?? 200;
    if (value.length > max) errors[field] = `Please use ${max} characters or fewer.`;
  }
  const required = kind === "nomination"
    ? ["nominatorName", "nominatorEmail", "nominatorPhone", "relationship", "familyName", "city", "householdSize", "dependents", "reason", "needs"]
    : ["organization", "contactName", "email", "phone", "contributionType", "description", "quantity", "delivery"];
  for (const field of required) if (!String(data[field] ?? "").trim()) errors[field] = "This field is required.";
  const emails = kind === "nomination" ? ["nominatorEmail", "familyEmail"] : ["email"];
  for (const field of emails) if (data[field] && !emailPattern.test(String(data[field]))) errors[field] = "Enter a valid email address.";
  const phones = kind === "nomination" ? ["nominatorPhone", "familyPhone"] : ["phone"];
  for (const field of phones) if (data[field] && !phonePattern.test(String(data[field]))) errors[field] = "Enter a valid phone number.";
  if (kind === "nomination") {
    const size = Number(data.householdSize);
    if (!Number.isInteger(size) || size < 1 || size > 30) errors.householdSize = "Enter a household size from 1 to 30.";
    if (data.contactPermission !== true) errors.contactPermission = "Please confirm the family may be contacted.";
  }
  if (kind === "partner") {
    if (data.website) {
      try { const url = new URL(String(data.website)); if (!["http:", "https:"].includes(url.protocol)) throw new Error(); }
      catch { errors.website = "Enter a complete website URL beginning with https://."; }
    }
    for (const field of ["supportsEveryFamily", "volunteer", "publicRecognition"]) {
      if (typeof data[field] !== "boolean") errors[field] = "Please choose yes or no.";
    }
  }
  if (data.termsConsent !== true) errors.termsConsent = "Please accept the privacy policy and program terms.";
  return errors;
}
