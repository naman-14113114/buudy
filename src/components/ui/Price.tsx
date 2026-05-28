import { formatMoney, percentOff } from "@/lib/money";

type PriceProps = {
  priceCents: number;
  compareAtCents?: number;
  currency?: string;
  size?: "sm" | "lg";
};

export function Price({
  priceCents,
  compareAtCents,
  currency = "USD",
  size = "lg",
}: PriceProps) {
  const off = compareAtCents ? percentOff(priceCents, compareAtCents) : 0;

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span
        className={`buudy-display text-[var(--plum)] ${
          size === "lg" ? "text-5xl" : "text-2xl"
        }`}
      >
        {formatMoney(priceCents, currency)}
      </span>
      {compareAtCents ? (
        <span className="buudy-display text-2xl text-[var(--muted)] line-through">
          {formatMoney(compareAtCents, currency)}
        </span>
      ) : null}
      {off > 0 ? (
        <span className="buudy-mono rounded-full bg-[rgba(184,149,86,.26)] px-3 py-2 text-[var(--plum)]">
          Save {off}%
        </span>
      ) : null}
    </div>
  );
}
