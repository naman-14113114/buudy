"use client";

/**
 * HalloweenOverlay – visual decorative elements:
 * - Bat & Pumpkin removed per user directive.
 */
export function HalloweenOverlay() {
  return null;
}

/**
 * HalloweenSaleBadge – clean luxury discount badge.
 */
export function HalloweenSaleBadge() {
  return (
    <span className="buudy-mono inline-flex items-center rounded-full bg-[rgba(184,149,86,.26)] px-3.5 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--plum)]">
      60% OFF
    </span>
  );
}
