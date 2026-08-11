export const attributionStorageKey = "buudy-attribution-v1";

export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "msclkid",
  "gclid",
  "fbclid",
  "source",
] as const;

export type AttributionKey = (typeof attributionKeys)[number];
export type AttributionPayload = Partial<Record<AttributionKey | string, string>>;

export function pickAttributionFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const attribution: AttributionPayload = {};

  attributionKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      attribution[key] = value;
    }
  });

  return attribution;
}

export function appendAttributionToPath(
  path: string,
  attribution: AttributionPayload,
) {
  const url = new URL(path, "https://buudy.local");

  attributionKeys.forEach((key) => {
    const value = attribution[key];
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return `${url.pathname}${url.search}${url.hash}`;
}

export function appendAttributionToAbsoluteUrl(
  href: string,
  attribution: AttributionPayload,
) {
  const url = new URL(href);

  attributionKeys.forEach((key) => {
    const value = attribution[key];
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}
