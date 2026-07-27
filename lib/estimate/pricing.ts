import type { EstimateFormState, ScopeItem } from "@/lib/estimate/types";

/** Soft range shown to customers — not a binding quote. */
export type SoftEstimate = {
  low: number;
  high: number;
  label: string;
  basis: string;
};

const SCOPE_BASE: Record<ScopeItem, { low: number; high: number }> = {
  roofline: { low: 450, high: 1200 },
  peaks: { low: 200, high: 550 },
  trees: { low: 350, high: 1400 },
  bushes: { low: 150, high: 450 },
  columns: { low: 120, high: 400 },
  walkways: { low: 180, high: 600 },
  wreaths: { low: 100, high: 350 },
  entire: { low: 1200, high: 4500 },
  not_sure: { low: 699, high: 2500 },
};

function roundTo(n: number, step = 25) {
  return Math.max(step, Math.round(n / step) * step);
}

export function computeSoftEstimate(state: EstimateFormState): SoftEstimate {
  const returning = state.need === "returning";
  const service = state.need === "service";
  const commercial = state.need === "commercial";

  if (service) {
    const low = 89;
    const high = 499;
    return {
      low,
      high,
      label: `$${low}–$${high}`,
      basis: "Typical service / mid-season change range",
    };
  }

  let low = 0;
  let high = 0;
  const scope = state.scope.length ? state.scope : (["not_sure"] as ScopeItem[]);

  if (scope.includes("entire")) {
    low = SCOPE_BASE.entire.low;
    high = SCOPE_BASE.entire.high;
  } else {
    for (const item of scope) {
      const band = SCOPE_BASE[item] ?? SCOPE_BASE.not_sure;
      low += band.low;
      high += band.high;
    }
  }

  // Stories multiplier for residential
  if (state.need === "residential" || !state.need) {
    if (state.stories === "two") {
      low *= 1.15;
      high *= 1.25;
    } else if (state.stories === "three_plus") {
      low *= 1.3;
      high *= 1.45;
    }
  }

  if (commercial) {
    low *= 1.4;
    high *= 1.8;
  }

  if (returning) {
    // Year 2+ install-only style discount vs full package
    low = Math.min(low, 299) * (scope.includes("entire") ? 1.2 : 1);
    high *= 0.55;
    low = Math.max(299, low * 0.45);
  }

  // Floor at marketing Year 1 starts-at
  if (!returning) {
    low = Math.max(699, low);
  }

  // Soft-align toward selected budget band when present (non-disqualifying)
  if (state.budget === "under_750") {
    high = Math.min(high, 900);
  } else if (state.budget === "5000_plus") {
    low = Math.max(low, 2500);
    high = Math.max(high, 5500);
  }

  low = roundTo(low);
  high = roundTo(Math.max(low + 100, high));

  return {
    low,
    high,
    label: `$${low.toLocaleString()}–$${high.toLocaleString()}`,
    basis: returning
      ? "Returning-customer install range (final quote after photos)"
      : commercial
        ? "Commercial / HOA ballpark (final quote after site review)"
        : "Preliminary residential design range based on selected areas",
  };
}
