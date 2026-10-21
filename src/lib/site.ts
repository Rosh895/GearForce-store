/** Final public origin, or null while the domain is unknown (disables canonical URLs). */
export function getSiteUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  return url ? url : null;
}

export function absoluteUrl(path: string): string | undefined {
  const base = getSiteUrl();
  return base ? `${base}${path}` : undefined;
}
