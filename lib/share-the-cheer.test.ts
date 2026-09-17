import test from "node:test";
import assert from "node:assert/strict";
import { validateCheerSubmission } from "./share-the-cheer";
import { checkCheerRateLimit } from "./share-the-cheer-rate-limit";
import { nomination, partner } from "./share-the-cheer-fixtures";

test("valid nomination and partner offer pass", () => {
  assert.deepEqual(validateCheerSubmission("nomination", nomination), {});
  assert.deepEqual(validateCheerSubmission("partner", partner), {});
});
test("rejects missing consent, invalid contact information, and unreasonable household size", () => {
  const errors = validateCheerSubmission("nomination", { ...nomination, nominatorEmail: "bad", familyPhone: "2", householdSize: "100", contactPermission: false, termsConsent: false });
  for (const field of ["nominatorEmail", "familyPhone", "householdSize", "contactPermission", "termsConsent"]) assert.ok(errors[field]);
});
test("partner choices must be explicit and website must be safe", () => {
  const errors = validateCheerSubmission("partner", { ...partner, website: "javascript:alert(1)", publicRecognition: undefined });
  assert.ok(errors.website); assert.ok(errors.publicRecognition);
});
test("per-instance throttle limits repeated requests", () => {
  const key = `test-${Date.now()}`;
  for (let i = 0; i < 5; i++) assert.equal(checkCheerRateLimit(key, 1000), true);
  assert.equal(checkCheerRateLimit(key, 1000), false);
  assert.equal(checkCheerRateLimit(key, 901001), true);
});
