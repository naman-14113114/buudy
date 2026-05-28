export function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
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
