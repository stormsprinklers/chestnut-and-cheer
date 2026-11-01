import test from "node:test";
import assert from "node:assert/strict";
import { INITIAL_ESTIMATE_STATE, type EstimateFormState } from "./types";
import { computeSoftEstimate } from "./pricing";

function form(partial: Partial<EstimateFormState>): EstimateFormState {
  return { ...INITIAL_ESTIMATE_STATE, ...partial };
}

test("small home rooflines are about $350 for every coverage choice", () => {
  for (const rooflineCoverage of ["front", "front_sides", "full_perimeter"] as const) {
    const estimate = computeSoftEstimate(form({ homeSize: "small", rooflineCoverage, treeSize: "none" }));
    assert.equal(estimate.low, 350);
    assert.equal(estimate.high, 350);
    assert.equal(estimate.label, "About $350");
  }
});

test("medium home roofline prices match the requested table", () => {
  const expected = { front: 500, front_sides: 750, full_perimeter: 1000 } as const;
  for (const [rooflineCoverage, price] of Object.entries(expected)) {
    const estimate = computeSoftEstimate(
      form({ homeSize: "medium", rooflineCoverage: rooflineCoverage as keyof typeof expected, treeSize: "none" })
    );
    assert.equal(estimate.low, price);
    assert.equal(estimate.high, price);
  }
});

test("large home roofline prices match the requested table", () => {
  const expected = { front: 750, front_sides: 1500, full_perimeter: 2500 } as const;
  for (const [rooflineCoverage, price] of Object.entries(expected)) {
    const estimate = computeSoftEstimate(
      form({ homeSize: "large", rooflineCoverage: rooflineCoverage as keyof typeof expected, treeSize: "none" })
    );
    assert.equal(estimate.low, price);
    assert.equal(estimate.high, price);
  }
});

test("tree ranges are added to the roofline estimate", () => {
  const smallTree = computeSoftEstimate(
    form({ homeSize: "medium", rooflineCoverage: "front", treeSize: "small" })
  );
  assert.equal(smallTree.treeLabel, "$100–$250");
  assert.equal(smallTree.label, "$600–$750");

  const mediumTree = computeSoftEstimate(
    form({ homeSize: "medium", rooflineCoverage: "front", treeSize: "medium" })
  );
  assert.equal(mediumTree.treeLabel, "$500–$750");
  assert.equal(mediumTree.label, "$1,000–$1,250");

  const largeTree = computeSoftEstimate(
    form({ homeSize: "large", rooflineCoverage: "full_perimeter", treeSize: "large" })
  );
  assert.equal(largeTree.treeLabel, "$1,000–$2,000");
  assert.equal(largeTree.label, "$3,500–$4,500");
});

test("color preference does not change the estimate", () => {
  const warmWhite = computeSoftEstimate(
    form({ homeSize: "medium", rooflineCoverage: "front_sides", treeSize: "none", colorPref: "warm_white" })
  );
  const multicolor = computeSoftEstimate(
    form({ homeSize: "medium", rooflineCoverage: "front_sides", treeSize: "none", colorPref: "multicolor" })
  );
  assert.equal(warmWhite.label, multicolor.label);
});
