"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";

export function FreeGiftsPanel({ compact = false }: { compact?: boolean }) {
  const { lines, totals } = useCart();
  const giftLines = lines
    .filter((line) => line.type === "gift")
    .sort((first, second) => {
      const order = ["skincare-ebook", "buudy-led-torch", "premium-travel-box"];
      const firstIndex = order.findIndex((id) => first.id.includes(id));
      const secondIndex = order.findIndex((id) => second.id.includes(id));

      return (firstIndex === -1 ? 99 : firstIndex) - (secondIndex === -1 ? 99 : secondIndex);
    });
  const unlocked = giftLines.length > 0;

  if (!unlocked) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="buudy-mono text-[var(--plum)]">Free Rewards</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {giftLines.length}/{giftLines.length} gifts unlocked
          </p>
        </div>
        <span className="rounded-full bg-[var(--plum)] px-3 py-1.5 text-xs font-semibold text-[var(--cream)]">
          {formatMoney(totals.giftValueCents)} value
        </span>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-3">
        <div className="absolute left-6 right-6 top-4 h-0.5 bg-[var(--border)]" />
        <div className="absolute left-6 right-6 top-4 h-0.5 bg-[var(--gold)] transition-all" />
        {giftLines.map((giftLine) => (
          <div className="relative text-center" key={giftLine.id}>
            <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[var(--gold)] text-white shadow-[0_0_0_5px_var(--card)]">
              <Check size={16} />
            </span>
            <p className="mt-3 text-[0.64rem] font-semibold uppercase tracking-[.16em] text-[var(--plum)]">
              {giftLine.id.includes("skincare-ebook")
                ? "Skincare guide"
                : giftLine.title}
            </p>
          </div>
        ))}
      </div>

      {!compact ? (
        <div className="mt-6 grid gap-3">
          {giftLines.map((giftLine) => (
            <div
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--cream)] p-3"
              key={giftLine.id}
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-[var(--blush)]">
                <Image
                  alt={giftLine.title}
                  className="object-contain p-1"
                  fill
                  sizes="56px"
                  src={giftLine.image}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[var(--plum)]">{giftLine.title}</p>
                <p className="text-sm text-[var(--muted)]">{giftLine.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[var(--gold)]">Free</p>
                <p className="text-xs text-[var(--muted)] line-through">
                  {formatMoney(giftLine.compareAtCents ?? 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
