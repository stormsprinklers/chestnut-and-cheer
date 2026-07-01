/** Production default — override with NEXT_PUBLIC_SITE_URL in .env.local */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://utah.christmas";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
