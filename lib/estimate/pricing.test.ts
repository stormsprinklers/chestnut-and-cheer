import test from "node:test";
import assert from "node:assert/strict";
import { INITIAL_ESTIMATE_STATE, type EstimateFormState } from "./types";
import { computeSoftEstimate, estimateLinearFeet } from "./pricing";

function form(partial: Partial<EstimateFormState>): EstimateFormState {
  return { ...INITIAL_ESTIMATE_STATE, ...partial };
}

const RATE_LEAK = /5\.25|2\.99|4\.49|\/ft|25%|\$699 minimum|\$299 minimum/i;

test("small one-story roofline hits install+parts floor without leaking rates", () => {
  const estimate = computeSoftEstimate(
    form({
      need: "residential",
      propertyType: "townhome",
      stories: "one",
      scope: ["roofline"],
      displayStyle: "simple",
    })
  );
  assert.equal(estimate.low, 700);
  assert.ok(estimate.high >= estimate.low);
  assert.doesNotMatch(estimate.label, RATE_LEAK);
  assert.doesNotMatch(estimate.basis, RATE_LEAK);
  assert.match(estimate.staffSummary, /\$5\.25\/ft/);
  assert.ok(estimate.leaseLabel);
});

test("returning customers use install-only floor", () => {
  const estimate = computeSoftEstimate(
    form({
      need: "returning",
      propertyType: "townhome",
      stories: "one",
      scope: ["roofline"],
      displayStyle: "simple",
    })
  );
  assert.equal(estimate.low, 300);
  assert.equal(estimate.leaseLabel, undefined);
  assert.match(estimate.staffSummary, /install-only/);
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
  assert.ok(estimate.low > 699, `expected low > 699, got ${estimate.low}`);
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
  assert.equal(estimate.leaseLabel, undefined);
});
