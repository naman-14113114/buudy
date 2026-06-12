"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { getDisplayLines } from "@/lib/cart";

export function CartDrawer() {
  const { lines, isHydrated, isOpen, closeCart, totals } = useCart();
  const visibleLines = getDisplayLines(lines);
  const hasItems = totals.itemCount > 0;

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        aria-label="Close cart overlay"
        className={`absolute inset-0 bg-[rgba(24,15,24,.42)] transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
        type="button"
      />
      <aside
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[450px] flex-col bg-[var(--cream)] shadow-[-24px_0_60px_-35px_rgba(0,0,0,.42)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div>
            <p className="buudy-mono text-[var(--gold)]">Cart</p>
            <h2 className="buudy-display text-2xl text-[var(--plum)]">
              Your Buudy bag
            </h2>
          </div>
          <button
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--plum)]"
            onClick={closeCart}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {!isHydrated ? (
            <div
              aria-busy="true"
              aria-live="polite"
              className="flex h-full flex-col items-center justify-center text-center"
            >
              <p className="buudy-display text-3xl text-[var(--plum)]">
                Restoring your bag...
              </p>
              <p className="buudy-copy mt-3 max-w-xs text-sm">
                Bringing your Buudy selections back into view.
              </p>
            </div>
          ) : hasItems ? (
            <>
              {visibleLines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="buudy-display text-3xl text-[var(--plum)]">
                Your bag is waiting.
              </p>
              <p className="buudy-copy mt-3 max-w-xs text-sm">
                Add the Buudy LED Mask or Red Torch to unlock current offers
                and free shipping.
              </p>
              <Button asChild className="mt-6" onClick={closeCart}>
                <Link href="/">Shop Buudy</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="border-t border-[var(--border)] p-5">
          {isHydrated ? <CartSummary action="cart" /> : null}
        </div>
      </aside>
    </div>
  );
}
