import type { CheerSubmission } from "./share-the-cheer";

export const nomination: CheerSubmission = {
  nominatorName: "Taylor Neighbor", nominatorEmail: "taylor@example.com", nominatorPhone: "3855550100",
  relationship: "Neighbor", familyName: "Jordan Family", familyEmail: "", familyPhone: "", city: "Lehi",
  householdSize: "4", dependents: "Two children, about 8 and 12", reason: "A difficult year",
  needs: "A meal would help", privacyConsiderations: "Please call first", contactPermission: true, termsConsent: true,
};
export const partner: CheerSubmission = {
  organization: "Local Shop", contactName: "Casey Owner", email: "casey@example.com", phone: "3855550101",
  website: "https://example.com", contributionType: "Gift cards", description: "Grocery cards", quantity: "Several",
  approximateValue: "", restrictions: "", delivery: "Can deliver", notes: "", supportsEveryFamily: false,
  volunteer: true, publicRecognition: false, termsConsent: true,
};
