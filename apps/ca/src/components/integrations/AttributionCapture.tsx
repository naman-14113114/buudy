"use client";

import { useEffect } from "react";
import {
  attributionStorageKey,
  pickAttributionFromSearch,
} from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    try {
      const next = pickAttributionFromSearch(window.location.search);

      const existing = JSON.parse(
        window.localStorage.getItem(attributionStorageKey) ?? "{}",
      ) as Record<string, string>;

      if (Object.keys(next).length || !existing.landing_path) {
        window.localStorage.setItem(
          attributionStorageKey,
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
