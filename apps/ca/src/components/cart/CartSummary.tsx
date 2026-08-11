"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Tag } from "lucide-react";
import { useState, type ReactNode } from "react";
import { formatMoney } from "@/lib/money";
import { getDisplayLines } from "@/lib/cart";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";
import { PromoCodeBox } from "./PromoCodeBox";

type CartSummaryProps = {
  action?: "cart" | "summary";
  children?: ReactNode;
};

export function CartSummary({ action = "summary", children }: CartSummaryProps) {
  const { lines, totals, closeCart, manualPromoCode } = useCart();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const giftLines = getDisplayLines(lines).filter(
    (line) =>
      line.type === "gift" &&
      line.quantity > 0 &&
      (line.compareAtCents ?? 0) > 0,
  );
  const giftOfferDiscountCents = giftLines.reduce(
    (total, line) => total + (line.compareAtCents ?? 0) * line.quantity,
    0,
  );
  const totalSavingsCents = giftOfferDiscountCents + totals.promoDiscountCents;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
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
                aria-hidden="true"
                className={`transition-transform duration-300 ${
                  detailsOpen ? "rotate-180" : ""
                }`}
                size={14}
              />
            </span>
            <span className="font-bold text-[var(--plum)]">
              -{formatMoney(totalSavingsCents)}
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
                {giftLines.map((line) => (
                  <div className="flex justify-between gap-4" key={line.id}>
                    <span className="flex items-center gap-1.5 uppercase text-[var(--muted)]">
                      <Tag aria-hidden="true" size={14} />
                      Free {line.title}
                    </span>
                    <span className="font-semibold text-[var(--muted)]">
                      -{formatMoney((line.compareAtCents ?? 0) * line.quantity)}
                    </span>
                  </div>
                ))}
                {totals.promoDiscountCents > 0 ? (
                  <div className="flex justify-between gap-4">
                    <span className="flex items-center gap-1.5 uppercase text-[var(--muted)]">
                      <Tag aria-hidden="true" size={14} />
                      {manualPromoCode}
                    </span>
                    <span className="font-semibold text-[var(--muted)]">
                      -{formatMoney(totals.promoDiscountCents)}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="mb-6 mt-1 text-sm">
        <button
          className="font-medium text-[var(--plum)] transition-colors hover:underline"
          onClick={() => {
            const button = document.querySelector(
              ".proxy-bundle-btn",
            ) as HTMLButtonElement | null;
            button?.click();
          }}
          type="button"
        >
          + Wanna add more discount? Move to checkout
        </button>
      </div>

      {action === "summary" ? (
        <div className="mt-4">
          <PromoCodeBox key={totals.itemCount > 0 ? "active" : "empty"} />
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
        <span>
          <span className="buudy-display block text-xl uppercase text-[var(--plum)]">
            Subtotal
          </span>
          <span className="mt-1 block text-xs text-[var(--muted)]">
            Includes all taxes.
          </span>
        </span>
        <span className="buudy-display block text-right text-4xl text-[var(--plum)]">
          {formatMoney(totals.totalCents)}
        </span>
      </div>

      {children ? <div className="mt-4">{children}</div> : null}

      {action === "cart" ? (
        <Button asChild className="mt-5 w-full" onClick={closeCart}>
          <Link href="/cart">
            Go to cart
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
