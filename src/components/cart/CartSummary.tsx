"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";

type CartSummaryProps = {
  action?: "cart" | "summary";
};

export function CartSummary({ action = "summary" }: CartSummaryProps) {
  const { totals, closeCart } = useCart();
  const hasItems = totals.itemCount > 0;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">Subtotal</span>
          <span className="font-semibold text-[var(--plum)]">
            {formatMoney(totals.subtotalCents)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">Compare-at savings</span>
          <span className="font-semibold text-[var(--success)]">
            -{formatMoney(totals.savingsCents)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">Free gift value</span>
          <span className="font-semibold text-[var(--success)]">
            {formatMoney(totals.giftValueCents)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">Shipping</span>
          <span className="font-semibold text-[var(--plum)]">
            {hasItems ? "Free" : formatMoney(0)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between border-t border-[var(--border)] pt-5">
        <span className="buudy-display text-xl text-[var(--plum)]">Total</span>
        <span className="buudy-display text-3xl text-[var(--plum)]">
          {formatMoney(totals.totalCents)}
        </span>
      </div>

      {action === "cart" ? (
        <Button asChild className="mt-5 w-full" onClick={closeCart}>
          <Link href="/cart">
            Go to cart
            <ArrowRight size={17} />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
