import type { EstimateFormState } from "@/lib/estimate/types";
import {
  BUDGET_OPTIONS,
  COLOR_OPTIONS,
  NEED_OPTIONS,
  QUOTE_METHOD_OPTIONS,
  SCOPE_OPTIONS,
  STYLE_OPTIONS,
  TIMING_OPTIONS,
} from "@/lib/estimate/types";
import { computeSoftEstimate } from "@/lib/estimate/pricing";

function labelOf<T extends string>(
  options: { value: T; label: string }[],
  value: T | null | undefined
) {
  if (!value) return "—";
  return options.find((o) => o.value === value)?.label ?? value;
}

export function buildEstimateNotes(state: EstimateFormState): string {
  const soft = computeSoftEstimate(state);
  const lines: string[] = [
    `Need: ${labelOf(NEED_OPTIONS, state.need)}`,
    `Address: ${[state.address, state.city, state.state, state.zip].filter(Boolean).join(", ")}`,
    `In service area: ${state.inServiceArea === null ? "unknown" : state.inServiceArea ? "yes" : "no"}`,
    `Soft estimate range: ${soft.label} (${soft.basis})`,
  ];

  if (state.need === "residential") {
    lines.push(
      `Property type: ${state.propertyType ?? "—"}`,
      `Stories: ${state.stories ?? "—"}`
    );
  }

  if (state.need === "service" || state.need === "returning") {
    if (state.serviceNotes) lines.push(`Notes: ${state.serviceNotes}`);
  }

  if (state.scope.length) {
    lines.push(
      `Scope: ${state.scope.map((s) => SCOPE_OPTIONS.find((o) => o.value === s)?.label ?? s).join(", ")}`
    );
  }
  if (state.scope.includes("trees")) {
    lines.push(
      `Trees: count=${state.treeCount || "—"}, coverage=${state.treeCoverage || "—"}, size=${state.treeSize || "—"}`
    );
  }
  if (state.scope.includes("wreaths") && state.wreathPlacement) {
    lines.push(`Wreath/garland placement: ${state.wreathPlacement}`);
  }

  lines.push(
    `Color: ${labelOf(COLOR_OPTIONS, state.colorPref)}`,
    `Style: ${labelOf(STYLE_OPTIONS, state.displayStyle)}`,
    `Photos uploaded: ${state.photos.length}`,
    `Install timing: ${labelOf(TIMING_OPTIONS, state.installTiming)}`,
    `Budget: ${labelOf(BUDGET_OPTIONS, state.budget)}`,
    `Quote method: ${labelOf(QUOTE_METHOD_OPTIONS, state.quoteMethod)}`,
    `Quote consent: ${state.quoteConsent ? "yes" : "no"}`,
    `Marketing consent: ${state.marketingConsent ? "yes" : "no"}`
  );

  return lines.join("\n");
}

export function buildEstimateMetadata(
  state: EstimateFormState,
  attribution: Record<string, unknown>
) {
  const soft = computeSoftEstimate(state);
  return {
    form: "christmas-estimate",
    need: state.need,
    tag:
      state.need === "commercial"
        ? "commercial"
        : state.need === "returning"
          ? "returning"
          : state.need === "service"
            ? "service"
            : "residential",
    softEstimate: soft,
    property: {
      address: state.address,
      city: state.city,
      state: state.state,
      zip: state.zip,
      lat: state.lat,
      lng: state.lng,
      inServiceArea: state.inServiceArea,
      propertyType: state.propertyType,
      stories: state.stories,
    },
    scope: state.scope,
    trees: state.scope.includes("trees")
      ? {
          count: state.treeCount,
          coverage: state.treeCoverage,
          size: state.treeSize,
        }
      : null,
    wreathPlacement: state.wreathPlacement || null,
    serviceNotes: state.serviceNotes || null,
    colorPref: state.colorPref,
    displayStyle: state.displayStyle,
    photoCount: state.photos.length,
    photoNames: state.photos.map((p) => p.name),
    // Keep compressed data URLs for CRM blob persistence (stripped after upload)
    photos: state.photos
      .filter((p) => p.dataUrl && p.dataUrl.length < 700_000)
      .slice(0, 8)
      .map((p) => ({ name: p.name, dataUrl: p.dataUrl })),
    installTiming: state.installTiming,
    budget: state.budget,
    quoteMethod: state.quoteMethod,
    consents: {
      quote: state.quoteConsent,
      marketing: state.marketingConsent,
    },
    attribution,
  };
}
