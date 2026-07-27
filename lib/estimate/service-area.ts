/** Utah County + Salt Lake County ZIPs (same coverage as Storm Sprinklers). */

import {
  SALT_LAKE_COUNTY_CITIES,
  UTAH_COUNTY_CITIES,
} from "@/lib/constants";

const UTAH_COUNTY_ZIPS = [
  "84003", "84004", "84005", "84013", "84020", "84042", "84043", "84045",
  "84048", "84057", "84058", "84059", "84062", "84065", "84097",
  "84601", "84602", "84603", "84604", "84605", "84606", "84626", "84633",
  "84651", "84653", "84655", "84660", "84663", "84664",
];

const SALT_LAKE_COUNTY_ZIPS = [
  "84006", "84009", "84020", "84044", "84047", "84065", "84070", "84081",
  "84084", "84088", "84090", "84091", "84092", "84093", "84094", "84095",
  "84096", "84101", "84102", "84103", "84104", "84105", "84106", "84107",
  "84108", "84109", "84110", "84111", "84112", "84113", "84114", "84115",
  "84116", "84117", "84118", "84119", "84120", "84121", "84122", "84123",
  "84124", "84125", "84126", "84127", "84128", "84129", "84130", "84131",
  "84132", "84133", "84134", "84138", "84139", "84143", "84145", "84147",
  "84148", "84150", "84151", "84152", "84157", "84158", "84165", "84170",
  "84171", "84180", "84190", "84199",
];

const SERVICE_ZIPS = new Set([...UTAH_COUNTY_ZIPS, ...SALT_LAKE_COUNTY_ZIPS]);

export function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5);
}

export function isInServiceArea(zip: string): boolean {
  const z = normalizeZip(zip);
  return z.length === 5 && SERVICE_ZIPS.has(z);
}

const SERVICE_CITIES = new Set(
  [...UTAH_COUNTY_CITIES, ...SALT_LAKE_COUNTY_CITIES].map((c) =>
    c.trim().toLowerCase()
  )
);

export function isCityInServiceArea(city: string): boolean {
  const normalized = city.trim().toLowerCase();
  return Boolean(normalized) && SERVICE_CITIES.has(normalized);
}

/** Prefer ZIP match; fall back to known city list when ZIP is missing/unknown. */
export function checkServiceArea(zip: string, city?: string): boolean {
  if (isInServiceArea(zip)) return true;
  if (city && isCityInServiceArea(city)) return true;
  return false;
}

export function extractZipFromAddress(address: string): string | null {
  const match = address.match(/\b(\d{5})(?:-\d{4})?\b/);
  return match?.[1] ?? null;
}
