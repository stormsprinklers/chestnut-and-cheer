/** Shared types and option lists for the streamlined instant estimate. */

export type HomeSize = "small" | "medium" | "large";
export type RooflineCoverage = "front" | "front_sides" | "full_perimeter";
export type TreeSize = "none" | "small" | "medium" | "large";

export type ColorPref =
  | "warm_white"
  | "red_warm_white"
  | "red_green"
  | "multicolor"
  | "custom"
  | "not_sure";

export type EstimateFormState = {
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number | null;
  lng: number | null;
  inServiceArea: boolean | null;
  name: string;
  phone: string;
  email: string;
  quoteConsent: boolean;
  marketingConsent: boolean;
  homeSize: HomeSize | null;
  rooflineCoverage: RooflineCoverage | null;
  colorPref: ColorPref | null;
  treeSize: TreeSize | null;
};

export const INITIAL_ESTIMATE_STATE: EstimateFormState = {
  address: "",
  city: "",
  state: "UT",
  zip: "",
  lat: null,
  lng: null,
  inServiceArea: null,
  name: "",
  phone: "",
  email: "",
  quoteConsent: false,
  marketingConsent: false,
  homeSize: null,
  rooflineCoverage: null,
  colorPref: null,
  treeSize: null,
};

export const HOME_SIZE_OPTIONS: { value: HomeSize; label: string; detail: string }[] = [
  { value: "small", label: "Small home", detail: "Compact or straightforward roofline" },
  { value: "medium", label: "Medium home", detail: "Typical single-family home" },
  { value: "large", label: "Large home", detail: "Longer or more complex roofline" },
];

export const ROOFLINE_OPTIONS: { value: RooflineCoverage; label: string; detail: string }[] = [
  { value: "front", label: "Front roofline only", detail: "The roofline visible from the street" },
  { value: "front_sides", label: "Front and sides", detail: "Front roofline plus both visible side runs" },
  { value: "full_perimeter", label: "Full perimeter roofline", detail: "Roofline around the entire home" },
];

export const COLOR_OPTIONS: { value: ColorPref; label: string }[] = [
  { value: "warm_white", label: "Classic warm white" },
  { value: "red_warm_white", label: "Red and warm white" },
  { value: "red_green", label: "Red and green" },
  { value: "multicolor", label: "Multicolor" },
  { value: "custom", label: "Custom color combination" },
  { value: "not_sure", label: "Not sure yet" },
];

export const TREE_SIZE_OPTIONS: { value: TreeSize; label: string; detail: string }[] = [
  { value: "none", label: "No trees", detail: "Roofline estimate only" },
  { value: "small", label: "Small tree", detail: "Usually $100–$250 per tree" },
  { value: "medium", label: "Medium tree", detail: "Usually $500–$750 per tree" },
  { value: "large", label: "Large tree", detail: "Usually $1,000–$2,000 per tree" },
];
