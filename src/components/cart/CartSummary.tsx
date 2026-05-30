"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";

type CartSummaryProps = {
  action?: "cart" | "summary";
  children?: ReactNode;
};

export function CartSummary({ action = "summary", children }: CartSummaryProps) {
  const { totals, closeCart } = useCart();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const hasItems = totals.itemCount > 0;
  const totalSavingsCents = totals.savingsCents + totals.giftValueCents;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-center justify-between gap-4">
        <span>
          <span className="buudy-display block text-xl text-[var(--plum)]">
            Total
          </span>
          <span className="mt-1 block text-xs text-[var(--muted)]">
            Includes all taxes.
          </span>
        </span>
        <span className="text-right">
          <span className="buudy-display block text-4xl text-[var(--plum)]">
            {formatMoney(totals.totalCents)}
          </span>
        </span>
      </div>
      {totalSavingsCents > 0 ? (
        <button
          aria-controls="cart-price-breakdown"
          aria-expanded={detailsOpen}
          className="mt-3 flex w-full items-center justify-between gap-4 rounded-full bg-[rgba(184,149,86,.1)] px-4 py-2.5 text-sm transition hover:bg-[rgba(184,149,86,.18)]"
          onClick={() => setDetailsOpen((current) => !current)}
          type="button"
        >
          <span className="font-semibold text-[var(--plum)]">Total discount</span>
          <span className="flex items-center gap-1.5 font-bold text-[var(--gold)]">
            {formatMoney(totalSavingsCents)}
            <ChevronDown
              className={`transition-transform duration-300 ${
                detailsOpen ? "rotate-180" : ""
              }`}
              size={16}
            />
          </span>
        </button>
      ) : null}

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        id="cart-price-breakdown"
      >
        <div className="overflow-hidden">
          <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[var(--muted)]">Subtotal</span>
              <span className="font-semibold text-[var(--plum)]">
                {formatMoney(totals.subtotalCents)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[var(--muted)]">Compare-at savings</span>
              <span className="font-semibold text-[var(--gold)]">
                -{formatMoney(totals.savingsCents)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[var(--muted)]">Free gift value</span>
              <span className="font-semibold text-[var(--gold)]">
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
        </div>
      </div>

      {children ? <div className="mt-5">{children}</div> : null}

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
