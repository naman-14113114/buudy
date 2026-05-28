"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/components/cart/CartProvider";

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining((current) => (current <= 0 ? seconds : current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [seconds]);

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function GiftBundle({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const timer = useCountdown(15 * 60 - 1);
  const giftValue = product.gifts.reduce((total, gift) => total + gift.valueCents, 0);
  const hasGifts = product.gifts.length > 0;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-lg text-[var(--gold)]" aria-hidden>
          ★★★★★
        </div>
        <span className="buudy-mono text-[var(--muted)]">
          {product.rating} · Trusted by {product.customerCount} customers
        </span>
      </div>

      <h1 className="buudy-display mt-5 text-[3rem] leading-[1.02] text-[var(--plum)] md:text-[4.5rem]">
        {product.heroTitle} <em className="buudy-italic">{product.heroEmphasis}</em>
      </h1>
      <p className="buudy-copy mt-4 max-w-xl">{product.shortDescription}</p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {product.highlights.map((highlight) => (
          <li
            className="flex items-start gap-2 text-sm leading-6 text-[var(--plum)]"
            key={highlight}
          >
            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--gold)]" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <Price
          compareAtCents={product.compareAtCents}
          currency={product.currency}
          priceCents={product.priceCents}
        />
        <p className="mt-2 text-sm text-[var(--muted)]">
          or 4 interest-free payments of{" "}
          <strong className="text-[var(--plum)]">
            {formatMoney(product.priceCents / 4, product.currency)}
          </strong>
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[rgba(58,31,61,.15)] bg-[rgba(247,241,232,.55)] p-4">
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="buudy-eyebrow">Delivery</p>
            <p className="buudy-display mt-1 text-lg text-[var(--plum)]">In 4 days</p>
          </div>
          <div className="text-right">
            <p className="buudy-eyebrow">
              {hasGifts ? "Free gifts unlock in" : "Order today"}
            </p>
            <p className="buudy-mono mt-1 text-2xl text-[var(--plum)]">{timer}</p>
          </div>
        </div>
      </div>

      <Button
        className="mt-6 w-full text-base"
        id="hero-cta"
        onClick={() => addProduct(product)}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-[rgba(247,241,232,.75)] [animation:buudy-ping_1.4s_infinite]" />
          <span className="relative h-2 w-2 rounded-full bg-[var(--cream)]" />
        </span>
        Add to cart · {formatMoney(product.priceCents, product.currency)}
      </Button>

      {hasGifts ? (
        <section className="mt-8" id="free-gifts">
          <div className="flex items-center justify-between gap-4">
            <p className="buudy-eyebrow">+ Free gifts today</p>
            <p className="buudy-mono text-[var(--gold)]">{formatMoney(giftValue)} value</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gifts.map((gift) => (
              <div
                className="rounded-xl border border-[rgba(58,31,61,.15)] bg-[var(--card)] p-3 text-center"
                key={gift.id}
              >
                <p className="buudy-mono text-[var(--gold)]">Free</p>
                <div className="relative mt-2 aspect-square overflow-hidden rounded-lg bg-[rgba(241,223,210,.5)]">
                  <Image
                    alt={gift.name}
                    className="object-contain p-2 mix-blend-multiply"
                    fill
                    sizes="120px"
                    src={gift.image}
                  />
                </div>
                <p className="buudy-display mt-2 text-lg text-[var(--plum)]">
                  {formatMoney(gift.valueCents)}
                </p>
                <p className="text-[0.7rem] leading-4 text-[var(--muted)]">
                  {gift.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section
          className="mt-8 rounded-2xl border border-[rgba(58,31,61,.15)] bg-[var(--card)] p-5"
          id="torch-offer"
        >
          <p className="buudy-eyebrow">{product.promoLabel}</p>
          <p className="buudy-display mt-2 text-2xl text-[var(--plum)]">
            60% off, free shipping, and a rechargeable wellness kit.
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Includes the torch, rechargeable battery, charger, USB cable,
            glasses, and user manual for a complete targeted light therapy
            routine.
          </p>
        </section>
      )}

      <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--border)] pt-6">
        {product.badges.map((badge, index) => (
          <span
            className="buudy-mono inline-flex items-center gap-2 text-[var(--plum)] opacity-80"
            key={badge}
          >
            {index % 2 === 0 ? <ShieldCheck size={15} /> : <Truck size={15} />}
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
