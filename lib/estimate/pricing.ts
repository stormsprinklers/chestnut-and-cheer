import type { EstimateFormState, ScopeItem, Stories } from "@/lib/estimate/types";

/**
 * Internal holiday-lighting rate card. Never show these figures in customer UI.
 * Customers only see the resulting dollar estimate.
 */
const RATES = {
  installPartsPerFt: 5.25,
  installPartsMin: 699,
  installOnlyPerFt: 2.99,
  installOnlyMin: 299,
  leasePerFt: 4.49,
  steepRoofPremium: 0.25,
} as const;

/** Soft range shown to customers — not a binding quote. */
export type SoftEstimate = {
  low: number;
  high: number;
  label: string;
  basis: string;
  /** Alternative seasonal-lease range; omitted for returning/service. */
  leaseLabel?: string;
  leaseLow?: number;
  leaseHigh?: number;
  /** Staff-only breakdown (CRM notes). Do not render in the wizard. */
  staffSummary: string;
};

type FeetBand = { low: number; high: number };

function roundMoney(n: number, step = 25) {
  return Math.max(step, Math.round(n / step) * step);
}

function addFeet(a: FeetBand, b: FeetBand): FeetBand {
  return { low: a.low + b.low, high: a.high + b.high };
}

function scaleFeet(band: FeetBand, lowMul: number, highMul = lowMul): FeetBand {
  return { low: band.low * lowMul, high: band.high * highMul };
}

function parseTreeCount(raw: string): number {
  const n = Number.parseInt(raw.trim(), 10);
  if (!Number.isFinite(n) || n <= 0) return 2;
  return Math.min(12, n);
}

function rooflineFeet(stories: Stories | null, commercial: boolean): FeetBand {
  if (commercial) return { low: 280, high: 520 };
  if (stories === "one") return { low: 120, high: 180 };
  if (stories === "two") return { low: 160, high: 240 };
  if (stories === "three_plus") return { low: 200, high: 300 };
  return { low: 140, high: 220 };
}

function treeFeet(state: EstimateFormState, fallbackCount: number): FeetBand {
  const count = state.treeCount.trim() ? parseTreeCount(state.treeCount) : fallbackCount;
  let per: FeetBand;
  switch (state.treeSize) {
    case "small":
      per = { low: 28, high: 42 };
      break;
    case "large":
      per = { low: 90, high: 150 };
      break;
    case "medium":
      per = { low: 50, high: 85 };
      break;
    default:
      per = { low: 40, high: 90 };
  }
  if (state.treeCoverage === "trunks") {
    per = scaleFeet(per, 0.5);
  } else if (state.treeCoverage === "unsure" || !state.treeCoverage) {
    per = { low: per.low * 0.55, high: per.high };
  }
  return scaleFeet(per, count);
}

function styleFeetMultiplier(state: EstimateFormState): { low: number; high: number } {
  switch (state.displayStyle) {
    case "simple":
      return { low: 0.88, high: 0.95 };
    case "festive":
      return { low: 1, high: 1.08 };
    case "premium":
      return { low: 1.18, high: 1.35 };
    default:
      return { low: 1, high: 1.12 };
  }
}

function steepFactors(state: EstimateFormState, commercial: boolean): { low: number; high: number } {
  if (commercial) return { low: 1, high: 1 };
  const premium = 1 + RATES.steepRoofPremium;
  if (state.stories === "three_plus") return { low: premium, high: premium };
  if (state.stories === "two") return { low: 1, high: premium };
  return { low: 1, high: 1 };
}

/** Estimated billed linear feet from wizard answers (not shown to customers). */
export function estimateLinearFeet(state: EstimateFormState): FeetBand {
  const commercial = state.need === "commercial";
  const scope: ScopeItem[] = state.scope.length
    ? state.scope
    : (["not_sure"] as ScopeItem[]);
  const roof = rooflineFeet(state.stories, commercial);
  const townhome = state.propertyType === "townhome" && !commercial;

  let feet: FeetBand = { low: 0, high: 0 };

  if (scope.includes("entire")) {
    feet = roof;
    feet = addFeet(feet, { low: 30, high: 70 }); // peaks
    feet = addFeet(feet, { low: 25, high: 55 }); // bushes
    feet = addFeet(feet, treeFeet(state, 2));
  } else if (scope.includes("not_sure")) {
    feet = addFeet(roof, { low: 20, high: 50 });
  } else {
    if (scope.includes("roofline")) feet = addFeet(feet, roof);
    if (scope.includes("peaks")) feet = addFeet(feet, { low: 30, high: 70 });
    if (scope.includes("trees")) feet = addFeet(feet, treeFeet(state, 2));
    if (scope.includes("bushes")) feet = addFeet(feet, { low: 25, high: 55 });
    if (scope.includes("columns")) feet = addFeet(feet, { low: 20, high: 48 });
    if (scope.includes("walkways")) feet = addFeet(feet, { low: 35, high: 80 });
    if (scope.includes("wreaths")) feet = addFeet(feet, { low: 12, high: 28 });
  }

  if (townhome) feet = scaleFeet(feet, 0.55);
  const style = styleFeetMultiplier(state);
  feet = scaleFeet(feet, style.low, style.high);

  return {
    low: Math.max(40, Math.round(feet.low)),
    high: Math.max(50, Math.round(Math.max(feet.low + 15, feet.high))),
  };
}

function priceBand(
  feet: FeetBand,
  rate: number,
  minimum: number,
  steep: { low: number; high: number }
) {
  const rawLow = Math.max(minimum, feet.low * rate * steep.low);
  const rawHigh = Math.max(minimum, feet.high * rate * steep.high);
  const low = roundMoney(rawLow);
  const high = roundMoney(Math.max(rawLow, rawHigh));
  return {
    low,
    high: Math.max(low, high),
  };
}

function formatRange(low: number, high: number) {
  if (high <= low + 25) return `About $${low.toLocaleString()}`;
  return `$${low.toLocaleString()}–$${high.toLocaleString()}`;
}

export function computeSoftEstimate(state: EstimateFormState): SoftEstimate {
  const returning = state.need === "returning";
  const service = state.need === "service";
  const commercial = state.need === "commercial";

  if (service) {
    return {
      low: 89,
      high: 499,
      label: "$89–$499",
      basis: "Typical service / mid-season change range. Not a final quote.",
      staffSummary: "Service request — not priced on the seasonal per-foot card.",
    };
  }

  const feet = estimateLinearFeet(state);
  const steep = steepFactors(state, commercial);
  const rate = returning ? RATES.installOnlyPerFt : RATES.installPartsPerFt;
  const min = returning ? RATES.installOnlyMin : RATES.installPartsMin;
  const priced = priceBand(feet, rate, min, steep);
  const lease = priceBand(feet, RATES.leasePerFt, 0, steep);

  const steepNote =
    steep.high > 1
      ? steep.low > 1
        ? "steep-roof premium on both ends"
        : "steep-roof premium on high end"
      : "no steep-roof premium";

  const staffSummary = [
    `Internal: ~${feet.low}–${feet.high} ft`,
    returning
      ? `install-only $${RATES.installOnlyPerFt.toFixed(2)}/ft (min $${RATES.installOnlyMin})`
      : `install+parts $${RATES.installPartsPerFt.toFixed(2)}/ft (min $${RATES.installPartsMin})`,
    steepNote,
    `lease $${RATES.leasePerFt.toFixed(2)}/ft → $${lease.low.toLocaleString()}–$${lease.high.toLocaleString()}`,
  ].join(" · ");

  if (returning) {
    return {
      low: priced.low,
      high: priced.high,
      label: formatRange(priced.low, priced.high),
      basis: "Returning-customer installation for this season. Final quote after we confirm your display.",
      staffSummary,
    };
  }

  return {
    low: priced.low,
    high: priced.high,
    label: formatRange(priced.low, priced.high),
    basis: commercial
      ? "Commercial / HOA ballpark after we review the property. Not a final quote."
      : "Includes professional install, lights, takedown, and storage. Final quote after we review your property.",
    leaseLow: lease.low,
    leaseHigh: lease.high,
    leaseLabel: formatRange(lease.low, lease.high),
    staffSummary,
  };
}
