/** Shared estimate wizard types & option lists */

export type NeedType =
  | "residential"
  | "commercial"
  | "returning"
  | "service";

export type PropertyType = "single_family" | "townhome" | "other";
export type Stories = "one" | "two" | "three_plus";

export type ScopeItem =
  | "roofline"
  | "peaks"
  | "trees"
  | "bushes"
  | "columns"
  | "walkways"
  | "wreaths"
  | "entire"
  | "not_sure";

export type ColorPref =
  | "warm_white"
  | "red_warm_white"
  | "multicolor"
  | "custom"
  | "recommend"
  | "not_sure";

export type DisplayStyle =
  | "simple"
  | "festive"
  | "premium"
  | "not_sure";

export type InstallTiming =
  | "late_september"
  | "october"
  | "early_november"
  | "before_thanksgiving"
  | "after_thanksgiving"
  | "no_preference";

export type BudgetRange =
  | "under_750"
  | "750_1499"
  | "1500_2499"
  | "2500_4999"
  | "5000_plus"
  | "not_sure";

export type QuoteMethod =
  | "photo"
  | "video"
  | "call"
  | "onsite"
  | "recommend";

export type EstimatePhoto = {
  name: string;
  /** Compressed data URL; omitted server-side if over budget */
  dataUrl?: string;
  size: number;
};

export type EstimateFormState = {
  need: NeedType | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number | null;
  lng: number | null;
  inServiceArea: boolean | null;
  propertyType: PropertyType | null;
  stories: Stories | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  quoteConsent: boolean;
  marketingConsent: boolean;
  scope: ScopeItem[];
  treeCount: string;
  treeCoverage: "trunks" | "trunks_and_branches" | "unsure" | "";
  treeSize: "small" | "medium" | "large" | "unsure" | "";
  wreathPlacement: string;
  serviceNotes: string;
  colorPref: ColorPref | null;
  displayStyle: DisplayStyle | null;
  photos: EstimatePhoto[];
  installTiming: InstallTiming | null;
  budget: BudgetRange | null;
  quoteMethod: QuoteMethod | null;
};

export const INITIAL_ESTIMATE_STATE: EstimateFormState = {
  need: null,
  address: "",
  city: "",
  state: "UT",
  zip: "",
  lat: null,
  lng: null,
  inServiceArea: null,
  propertyType: null,
  stories: null,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  quoteConsent: false,
  marketingConsent: false,
  scope: [],
  treeCount: "",
  treeCoverage: "",
  treeSize: "",
  wreathPlacement: "",
  serviceNotes: "",
  colorPref: null,
  displayStyle: null,
  photos: [],
  installTiming: null,
  budget: null,
  quoteMethod: null,
};

export const NEED_OPTIONS: { value: NeedType; label: string; detail: string }[] = [
  {
    value: "residential",
    label: "New residential lighting quote",
    detail: "First-time or new seasonal display for a home",
  },
  {
    value: "commercial",
    label: "Commercial, HOA, or multifamily quote",
    detail: "Businesses, associations, and multi-unit properties",
  },
  {
    value: "returning",
    label: "Returning customer installation",
    detail: "We lit your property before — ready for this season",
  },
  {
    value: "service",
    label: "Service or changes to an existing display",
    detail: "Repairs, add-ons, or adjustments mid-season",
  },
];

export const SCOPE_OPTIONS: { value: ScopeItem; label: string }[] = [
  { value: "roofline", label: "Roofline" },
  { value: "peaks", label: "Peaks and dormers" },
  { value: "trees", label: "Trees" },
  { value: "bushes", label: "Bushes and hedges" },
  { value: "columns", label: "Columns and railings" },
  { value: "walkways", label: "Walkways or ground lighting" },
  { value: "wreaths", label: "Wreaths and garland" },
  { value: "entire", label: "Entire property" },
  { value: "not_sure", label: "Not sure—design it for me" },
];

export const COLOR_OPTIONS: { value: ColorPref; label: string }[] = [
  { value: "warm_white", label: "Classic warm white" },
  { value: "red_warm_white", label: "Red and warm white" },
  { value: "multicolor", label: "Multicolor" },
  { value: "custom", label: "Custom colors" },
  { value: "recommend", label: "Show me your recommendations" },
  { value: "not_sure", label: "Not sure yet" },
];

export const STYLE_OPTIONS: { value: DisplayStyle; label: string }[] = [
  { value: "simple", label: "Simple and elegant" },
  { value: "festive", label: "Bright and festive" },
  { value: "premium", label: "Premium showcase display" },
  { value: "not_sure", label: "Not sure—design it for me" },
];

export const TIMING_OPTIONS: { value: InstallTiming; label: string }[] = [
  { value: "late_september", label: "Late September" },
  { value: "october", label: "October" },
  { value: "early_november", label: "Early November" },
  { value: "before_thanksgiving", label: "Before Thanksgiving" },
  { value: "after_thanksgiving", label: "After Thanksgiving" },
  { value: "no_preference", label: "No preference" },
];

export const BUDGET_OPTIONS: { value: BudgetRange; label: string }[] = [
  { value: "under_750", label: "Under $750" },
  { value: "750_1499", label: "$750–$1,499" },
  { value: "1500_2499", label: "$1,500–$2,499" },
  { value: "2500_4999", label: "$2,500–$4,999" },
  { value: "5000_plus", label: "$5,000+" },
  { value: "not_sure", label: "I'm not sure yet" },
];

export const QUOTE_METHOD_OPTIONS: { value: QuoteMethod; label: string }[] = [
  { value: "photo", label: "Send me a quote using my photos" },
  { value: "video", label: "Schedule a short video design consultation" },
  { value: "call", label: "Call me to discuss the property" },
  { value: "onsite", label: "Schedule an on-site consultation" },
  { value: "recommend", label: "Recommend the best option" },
];
