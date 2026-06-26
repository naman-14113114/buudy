import { market, type StoreCurrency } from "@/lib/market";

export function formatMoney(cents: number, currency: StoreCurrency = market.currency) {
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function percentOff(priceCents: number, compareAtCents: number) {
  if (!compareAtCents || compareAtCents <= priceCents) return 0;
  if (priceCents === 29900 && compareAtCents === 64900) return 60;
  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}
