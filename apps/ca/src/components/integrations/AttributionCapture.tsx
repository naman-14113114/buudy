"use client";

import { useEffect } from "react";
import { attributionKeys } from "@/lib/conversions/attribution";

const storageKey = "buudy-attribution-v1";

function createJourneyId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `journey-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function AttributionCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const next: Record<string, string> = {};
      attributionKeys.forEach((key) => {
        const value = params.get(key);
        if (value) next[key] = value;
      });
      const existing = JSON.parse(
        window.localStorage.getItem(storageKey) ?? "{}",
      ) as Record<string, string>;
      const journeyId =
        next.journey_id || existing.journey_id || createJourneyId();
      if (
        Object.keys(next).length ||
        !existing.landing_path ||
        !existing.journey_id
      ) {
        window.localStorage.setItem(
          storageKey,
          JSON.stringify({
            ...existing,
            ...next,
            journey_id: journeyId,
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
