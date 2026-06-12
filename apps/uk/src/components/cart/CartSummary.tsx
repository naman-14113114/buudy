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
      {/* 1. Total discount Dropdown */}
      {totalSavingsCents > 0 ? (
        <>
          <button
            aria-controls="cart-price-breakdown"
            aria-expanded={detailsOpen}
            className="flex w-full items-center justify-between gap-4 py-2 text-sm transition"
            onClick={() => setDetailsOpen((current) => !current)}
            type="button"
          >
            <span className="flex items-center gap-2 font-medium text-[var(--plum)]">
              Total discount
              <ChevronDown
                className={`transition-transform duration-300 ${
                  detailsOpen ? "rotate-180" : ""
                }`}
                size={14}
              />
            </span>
            <span className="font-bold text-[var(--plum)]">
              -{formatMoney(7000)}
            </span>
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
            id="cart-price-breakdown"
          >
            <div className="overflow-hidden">
              <div className="space-y-3 pb-3 pt-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="flex items-center gap-1.5 uppercase text-[var(--muted)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--muted)]"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    FREE TORCH
                  </span>
                  <span className="font-semibold text-[var(--muted)]">
                    -{formatMoney(7000)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* 2. Link */}
      <div className="mb-6 mt-1 text-sm">
        <button 
          type="button"
          onClick={() => {
            const btn = document.querySelector('.proxy-bundle-btn') as HTMLButtonElement;
            if (btn) btn.click();
          }}
          className="text-[var(--plum)] hover:underline font-medium transition-colors"
        >
          + Wanna add more discount? Move to checkout
        </button>
      </div>

      {/* 3. SUBTOTAL */}
      <div className="flex items-center justify-between gap-4 mt-4 border-t border-[var(--border)] pt-5">
        <span>
          <span className="buudy-display block text-xl uppercase text-[var(--plum)]">
            SUBTOTAL
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

      {/* 4. Checkout Button */}
      {children ? <div className="mt-4">{children}</div> : null}

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
