import type { CheerSubmission } from "./share-the-cheer";

export const nomination: CheerSubmission = {
  submitterName: "Taylor Neighbor",
  submitterEmail: "taylor@example.com",
  submitterPhone: "3855550100",
  relationship: "Neighbor",
  familyName: "Jordan Family",
  familyEmail: "jordan@example.com",
  familyPhone: "",
  familyCity: "Lehi",
  householdSize: "4",
  reason: "They have carried a lot this year and deserve a magical Christmas.",
  sponsorAtCost: "yes",
  contactPermission: true,
  termsConsent: true,
};

export const support: CheerSubmission = {
  supporterName: "Casey Owner",
  supporterEmail: "casey@example.com",
  supporterPhone: "3855550101",
  organization: "Local Shop",
  contributionNotes: "We may be able to provide grocery gift cards and delivery help.",
  termsConsent: true,
};
