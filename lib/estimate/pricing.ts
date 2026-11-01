import type {
  EstimateFormState,
  HomeSize,
  RooflineCoverage,
  TreeSize,
} from "@/lib/estimate/types";

type PriceBand = { low: number; high: number };

const ROOFLINE_PRICES: Record<HomeSize, Record<RooflineCoverage, number>> = {
  small: {
    front: 350,
    front_sides: 350,
    full_perimeter: 350,
  },
  medium: {
    front: 500,
    front_sides: 750,
    full_perimeter: 1000,
  },
  large: {
    front: 750,
    front_sides: 1500,
    full_perimeter: 2500,
  },
};

const TREE_PRICES: Record<TreeSize, PriceBand> = {
  none: { low: 0, high: 0 },
  small: { low: 100, high: 250 },
  medium: { low: 500, high: 750 },
  large: { low: 1000, high: 2000 },
};

export type SoftEstimate = {
  low: number;
  high: number;
  label: string;
  rooflineLow: number;
  rooflineHigh: number;
  rooflineLabel: string;
  treeLow: number;
  treeHigh: number;
  treeLabel: string | null;
  basis: string;
  /** Staff-only breakdown (CRM notes). Do not render as pricing logic. */
  staffSummary: string;
};

function money(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function formatBand({ low, high }: PriceBand) {
  return low === high ? `About ${money(low)}` : `${money(low)}–${money(high)}`;
}

export function computeSoftEstimate(state: EstimateFormState): SoftEstimate {
  const homeSize = state.homeSize ?? "small";
  const coverage = state.rooflineCoverage ?? "front";
  const treeSize = state.treeSize ?? "none";
  const roofline = ROOFLINE_PRICES[homeSize][coverage];
  const tree = TREE_PRICES[treeSize];
  const total = { low: roofline + tree.low, high: roofline + tree.high };

  return {
    low: total.low,
    high: total.high,
    label: formatBand(total),
    rooflineLow: roofline,
    rooflineHigh: roofline,
    rooflineLabel: formatBand({ low: roofline, high: roofline }),
    treeLow: tree.low,
    treeHigh: tree.high,
    treeLabel: treeSize === "none" ? null : formatBand(tree),
    basis:
      "Estimated full-season service with company-provided lights, installation, maintenance, takedown, and storage. Final price follows a property review.",
    staffSummary: [
      `Home size: ${homeSize}`,
      `Roofline: ${coverage} = ${money(roofline)}`,
      treeSize === "none"
        ? "Trees: none"
        : `Tree: ${treeSize} = ${money(tree.low)}–${money(tree.high)} per tree`,
      "Color does not change estimate",
    ].join(" · "),
  };
}
