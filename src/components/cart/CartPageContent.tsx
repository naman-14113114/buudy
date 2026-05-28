"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { FreeGiftsPanel } from "./FreeGiftsPanel";
import { PromoCodeBox } from "./PromoCodeBox";

export function CartPageContent() {
  const { lines, totals, giftMessage, setGiftMessage } = useCart();
  const hasItems = totals.itemCount > 0;

  if (!hasItems) {
    return (
      <section className="buudy-section bg-[var(--cream)] py-28">
        <div className="buudy-wrap max-w-2xl text-center">
          <ShoppingBag className="mx-auto text-[var(--gold)]" size={42} />
          <h1 className="buudy-heading mt-5">Your cart is empty.</h1>
          <p className="buudy-copy mx-auto mt-5 max-w-lg">
            Add the Buudy LED Mask to unlock the GLOWKIT promo, 3 free gifts,
            and free shipping.
          </p>
          <Button asChild className="mt-8">
            <Link href="/products/buudy-led-mask">Shop Buudy LED Mask</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-wrap">
        <div className="mb-10">
          <p className="buudy-eyebrow">Cart</p>
          <h1 className="buudy-heading mt-3">Your glow kit.</h1>
          <p className="buudy-copy mt-4 max-w-2xl">
            Review your mask, unlocked free gifts, promo code, and optional gift
            message before checkout.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5">
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </div>

          <aside className="space-y-5">
            <FreeGiftsPanel />
            <PromoCodeBox />
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="buudy-mono text-[var(--plum)]">Add Gift Message</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Price will be hidden on packing slip.
                  </p>
                </div>
                <span className="buudy-mono text-[var(--gold)]">
                  {giftMessage.length}/300
                </span>
              </div>
              <textarea
                className="mt-4 min-h-28 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--cream)] p-3 text-sm text-[var(--plum)] outline-none transition focus:border-[var(--plum)]"
                maxLength={300}
                onChange={(event) => setGiftMessage(event.target.value)}
                placeholder="Write your warm wish..."
                value={giftMessage}
              />
            </div>
            <CartSummary />
          </aside>
        </div>
      </div>
    </section>
  );
}
