import type { EstimateFormState } from "@/lib/estimate/types";
import {
  COLOR_OPTIONS,
  HOME_SIZE_OPTIONS,
  ROOFLINE_OPTIONS,
  TREE_SIZE_OPTIONS,
} from "@/lib/estimate/types";
import { computeSoftEstimate } from "@/lib/estimate/pricing";
import { isDoorHangerAttribution } from "@/lib/estimate/analytics";

function labelOf<T extends string>(
  options: { value: T; label: string }[],
  value: T | null | undefined
) {
  if (!value) return "—";
  return options.find((option) => option.value === value)?.label ?? value;
}

export function buildEstimateNotes(
  state: EstimateFormState,
  attribution?: Record<string, unknown>
): string {
  const estimate = computeSoftEstimate(state);
  const lines: string[] = [
    `Address: ${[state.address, state.city, state.state, state.zip].filter(Boolean).join(", ")}`,
    `In service area: ${state.inServiceArea === null ? "unknown" : state.inServiceArea ? "yes" : "no"}`,
    `Home size: ${labelOf(HOME_SIZE_OPTIONS, state.homeSize)}`,
    `Roofline coverage: ${labelOf(ROOFLINE_OPTIONS, state.rooflineCoverage)}`,
    `Color preference: ${labelOf(COLOR_OPTIONS, state.colorPref)}`,
    `Tree size: ${labelOf(TREE_SIZE_OPTIONS, state.treeSize)}`,
    `Roofline estimate: ${estimate.rooflineLabel}`,
    ...(estimate.treeLabel ? [`Tree estimate: ${estimate.treeLabel} per tree`] : []),
    `Combined estimate: ${estimate.label}`,
    estimate.staffSummary,
    `Quote consent: ${state.quoteConsent ? "yes" : "no"}`,
    `Marketing consent: ${state.marketingConsent ? "yes" : "no"}`,
  ];

  if (attribution && isDoorHangerAttribution(attribution)) {
    lines.unshift(
      "PROMO: $100 OFF door hanger offer (DOORHANGER100) — apply to Christmas lights installation"
    );
  }

  return lines.join("\n");
}

export function buildEstimateMetadata(
  state: EstimateFormState,
  attribution: Record<string, unknown>
) {
  const estimate = computeSoftEstimate(state);
  return {
    form: isDoorHangerAttribution(attribution) ? "christmas-door-hanger" : "christmas-estimate",
    tag: "residential",
    softEstimate: {
      low: estimate.low,
      high: estimate.high,
      label: estimate.label,
      rooflineLow: estimate.rooflineLow,
      rooflineHigh: estimate.rooflineHigh,
      rooflineLabel: estimate.rooflineLabel,
      treeLow: estimate.treeLow,
      treeHigh: estimate.treeHigh,
      treeLabel: estimate.treeLabel,
      basis: estimate.basis,
    },
    property: {
      address: state.address,
      city: state.city,
      state: state.state,
      zip: state.zip,
      lat: state.lat,
      lng: state.lng,
      inServiceArea: state.inServiceArea,
      homeSize: state.homeSize,
    },
    rooflineCoverage: state.rooflineCoverage,
    colorPref: state.colorPref,
    treeSize: state.treeSize,
    consents: {
      quote: state.quoteConsent,
      marketing: state.marketingConsent,
    },
    attribution,
  };
}
