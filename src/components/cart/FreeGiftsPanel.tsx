"use client";

import Image from "next/image";
import { Check, Gift } from "lucide-react";
import { buudyMask } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";

export function FreeGiftsPanel({ compact = false }: { compact?: boolean }) {
  const { totals } = useCart();
  const unlocked = totals.itemCount > 0;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="buudy-mono text-[var(--plum)]">Free Rewards</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {unlocked ? "3/3 gifts unlocked" : "Add a mask to unlock gifts"}
          </p>
        </div>
        <span className="rounded-full bg-[var(--plum)] px-3 py-1.5 text-xs font-semibold text-[var(--cream)]">
          {unlocked ? "3/3 Unlocked" : "$128 value"}
        </span>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-3">
        <div className="absolute left-6 right-6 top-4 h-0.5 bg-[var(--border)]" />
        <div
          className={`absolute left-6 top-4 h-0.5 bg-[var(--success)] transition-all ${
            unlocked ? "right-6" : "right-[calc(100%-1.5rem)]"
          }`}
        />
        {buudyMask.gifts.map((gift) => (
          <div className="relative text-center" key={gift.id}>
            <span
              className={`mx-auto grid h-8 w-8 place-items-center rounded-full shadow-[0_0_0_5px_var(--card)] ${
                unlocked
                  ? "bg-[var(--success)] text-white"
                  : "bg-[var(--border)] text-[var(--muted)]"
              }`}
            >
              {unlocked ? <Check size={16} /> : <Gift size={15} />}
            </span>
            <p className="mt-3 text-[0.64rem] font-semibold uppercase tracking-[.16em] text-[var(--plum)]">
              {gift.name}
            </p>
          </div>
        ))}
      </div>

      {!compact ? (
        <div className="mt-6 grid gap-3">
          {buudyMask.gifts.map((gift) => (
            <div
              className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--cream)] p-3"
              key={gift.id}
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-[var(--blush)]">
                <Image alt={gift.name} className="object-contain p-1" fill sizes="56px" src={gift.image} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[var(--plum)]">{gift.name}</p>
                <p className="text-sm text-[var(--muted)]">{gift.label} · Unlocked</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[var(--success)]">Free</p>
                <p className="text-xs text-[var(--muted)] line-through">
                  {formatMoney(gift.valueCents)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
