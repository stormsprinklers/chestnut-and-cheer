export type AnalyticsEventName =
  | "PAGE_VIEW"
  | "VISITOR_HEARTBEAT"
  | "SCROLL_DEPTH_50"
  | "SCROLL_DEPTH_90"
  | "TIME_ON_PAGE"
  | "PAGE_EXIT"
  | "CTA_CLICK"
  | "TEL_CLICK"
  | "SMS_CLICK"
  | "FORM_START"
  | "FORM_SUBMIT"
  | "BOOKING_STARTED"
  | "SLOT_SELECTED"
  | "BOOKING_COMPLETED"
  | "ESTIMATE_EVENT"
  | "ADDRESS_ENTERED"
  | "CONTACT_COMPLETED"
  | "LANDING_VIEW";

export type EventMetadata = Record<string, string | number | boolean | undefined>;
