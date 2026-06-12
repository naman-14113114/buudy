import { formatMoney, percentOff } from "@/lib/money";
import { market, type StoreCurrency } from "@/lib/market";

type PriceProps = {
  priceCents: number;
  compareAtCents?: number;
  currency?: StoreCurrency;
  size?: "sm" | "lg";
  invert?: boolean;
};

export function Price({
  priceCents,
  compareAtCents,
  currency = market.currency,
  size = "lg",
  invert,
}: PriceProps) {
  const off = compareAtCents ? percentOff(priceCents, compareAtCents) : 0;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        className={`buudy-display ${
          invert ? "text-[var(--cream)]" : "text-[var(--plum)]"
        } ${
          size === "lg" ? "text-5xl" : "text-2xl"
        }`}
      >
        {formatMoney(priceCents, currency)}
      </span>
      {compareAtCents ? (
        <span
          className={`buudy-display text-2xl line-through ${
            invert ? "text-[rgba(247,241,232,.58)]" : "text-[var(--muted)]"
          }`}
        >
          {formatMoney(compareAtCents, currency)}
        </span>
      ) : null}
      {off > 0 ? (
        <span
          className={`buudy-mono rounded-full bg-[rgba(184,149,86,.26)] px-3 py-2 ${
            invert ? "text-[var(--cream)]" : "text-[var(--plum)]"
          }`}
        >
          Save {off}%
        </span>
      ) : null}
    </div>
  );
}
