import { formatMoney, type StoreCurrency } from "@buudy/shared";

export function Price({
  cents,
  compareAtCents,
  locale,
  currency,
}: {
  cents: number;
  compareAtCents?: number | null;
  locale: string;
  currency: StoreCurrency;
}) {
  return (
    <span className="buudy-ui-price">
      <span>{formatMoney(cents, locale, currency)}</span>
      {compareAtCents ? <s>{formatMoney(compareAtCents, locale, currency)}</s> : null}
    </span>
  );
}
