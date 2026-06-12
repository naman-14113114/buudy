"use client";

import { useEffect } from "react";

const storageKey = "buudy-attribution-v1";
const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "msclkid",
  "gclid",
  "fbclid",
  "source",
];

export function AttributionCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const next: Record<string, string> = {};

      attributionKeys.forEach((key) => {
        const value = params.get(key);
        if (value) {
          next[key] = value;
        }
      });

      const existing = JSON.parse(
        window.localStorage.getItem(storageKey) ?? "{}",
      ) as Record<string, string>;

      if (Object.keys(next).length || !existing.landing_path) {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({
            ...existing,
            ...next,
            landing_path: existing.landing_path ?? window.location.pathname,
            first_referrer: existing.first_referrer ?? document.referrer,
            last_path: window.location.pathname,
            captured_at: existing.captured_at ?? new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }),
        );
      }
    } catch {
      // Attribution is helpful, not critical to shopping.
    }
  }, []);

  return null;
}

export { storageKey as attributionStorageKey };
