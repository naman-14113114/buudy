import { market } from "@/lib/market";

export const defaultSiteUrl = market.siteUrl;
export const plusbaseStoreUrl = "https://buudy.com";

export function getSiteUrl() {
  // This app's public canonical host is fixed. An old deployment environment
  // value must not send sitemap, feed or schema URLs back to the retired host.
  return defaultSiteUrl;
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
