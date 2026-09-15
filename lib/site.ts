/**
 * The public site resolves on the www host. Keep every canonical, schema URL,
 * sitemap entry and social URL on the same origin.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.utah.christmas"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
