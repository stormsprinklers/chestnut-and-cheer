import test from "node:test";
import assert from "node:assert/strict";
import { INITIAL_ESTIMATE_STATE, type EstimateFormState } from "./types";
import { computeSoftEstimate, estimateLinearFeet } from "./pricing";

function form(partial: Partial<EstimateFormState>): EstimateFormState {
  return { ...INITIAL_ESTIMATE_STATE, ...partial };
}

const RATE_LEAK = /5\.25|\/ft|25%|\$299 minimum/i;

test("small one-story roofline hits the seasonal service floor without leaking rates", () => {
  const estimate = computeSoftEstimate(
    form({
      need: "residential",
      propertyType: "townhome",
      stories: "one",
      scope: ["roofline"],
      displayStyle: "simple",
    })
  );
  assert.equal(estimate.low, 299);
  assert.ok(estimate.high >= estimate.low);
  assert.doesNotMatch(estimate.label, RATE_LEAK);
  assert.doesNotMatch(estimate.basis, RATE_LEAK);
  assert.match(estimate.staffSummary, /\$5\.25\/ft/);
});

test("returning customers use the same full seasonal service model", () => {
  const estimate = computeSoftEstimate(
    form({
      need: "returning",
      propertyType: "townhome",
      stories: "one",
      scope: ["roofline"],
      displayStyle: "simple",
    })
  );
  assert.equal(estimate.low, 299);
  assert.match(estimate.staffSummary, /seasonal service/);
});

test("two-story full property is above the parts minimum and applies steep on the high end", () => {
  const estimate = computeSoftEstimate(
    form({
      need: "residential",
      propertyType: "single_family",
      stories: "two",
      scope: ["entire"],
      treeCount: "3",
      treeSize: "large",
      treeCoverage: "trunks_and_branches",
      displayStyle: "premium",
    })
  );
  assert.ok(estimate.low > 299, `expected low > 299, got ${estimate.low}`);
  assert.ok(estimate.high > estimate.low);
  assert.match(estimate.staffSummary, /steep-roof premium on high end/);
  const feet = estimateLinearFeet(
    form({
      need: "residential",
      propertyType: "single_family",
      stories: "two",
      scope: ["entire"],
      treeCount: "3",
      treeSize: "large",
      treeCoverage: "trunks_and_branches",
      displayStyle: "premium",
    })
  );
  assert.ok(feet.high > feet.low);
  assert.ok(feet.low > 200);
});

test("service work is not priced on the seasonal foot card", () => {
  const estimate = computeSoftEstimate(form({ need: "service", serviceNotes: "bulb out" }));
  assert.equal(estimate.label, "$89–$499");
});
