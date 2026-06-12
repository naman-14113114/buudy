export type StoreCurrency = "USD" | "GBP" | "CAD" | "AUD";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatMoney(cents: number, locale: string, currency: StoreCurrency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function percentOff(priceCents: number, compareAtCents?: number | null) {
  if (!compareAtCents || compareAtCents <= priceCents) return 0;
  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}

export function addCalendarDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function formatDayMonth(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}
