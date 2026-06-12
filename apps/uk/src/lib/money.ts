import { market, type StoreCurrency } from "@/lib/market";

export function formatMoney(cents: number, currency: StoreCurrency = market.currency) {
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function percentOff(priceCents: number, compareAtCents: number) {
  if (!compareAtCents) {
    return 0;
  }

  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}
