"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BatteryCharging,
  Gem,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Truck,
  Waves,
  RotateCcw,
} from "lucide-react";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/components/cart/CartProvider";
import { ProductDetailsAccordion } from "./ProductDetailsAccordion";

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

function useDeliveryDate(daysFromToday: number) {
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromToday);

      const weekday = date.toLocaleString("en-US", { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "long" });

      setDateLabel(`${weekday} ${day} ${month}`);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [daysFromToday]);

  return dateLabel;
}

function FaceNeckIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Symmetrical outline of head and neck representing full collar wrap */}
      <path d="M12 2a6.5 6.5 0 0 0-6.5 6.5c0 3 1.5 5 4.5 6v3.5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3.5c3-1 4.5-3 4.5-6A6.5 6.5 0 0 0 12 2z" />
      <path d="M7.5 17.5c2.5 1 6.5 1 9 0" />
      <path d="M6.5 21h11" />
    </svg>
  );
}

const maskHeroBullets = [
  {
    icon: Sparkles,
    text: "Stimulates collagen production",
  },
  {
    icon: Waves,
    text: "Smooths skin & fine lines",
  },
  {
    icon: ScanFace,
    text: "Full face and neck coverage",
  },
  {
    icon: BatteryCharging,
    text: "Cordless, rechargeable ritual",
  },
  {
    icon: ShieldCheck,
    text: "Health Canada approved",
  },
  {
    icon: Gem,
    text: "3 free gifts included today",
  },
];

export function GiftBundle({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const timer = useCountdown(15 * 60 - 1);
  const deliveryDate = useDeliveryDate(4);
  const giftValue = product.gifts.reduce((total, gift) => total + gift.valueCents, 0);
  const hasGifts = product.gifts.length > 0;
  const heroBullets =
    product.template === "mask"
      ? maskHeroBullets
      : product.highlights.map((highlight) => ({
          icon: Sparkles,
          text: highlight,
        }));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="text-lg leading-none text-[var(--gold)]" aria-hidden>
          ★★★★★
        </div>
        <span className="buudy-mono text-[var(--gold)]">
          {product.rating} · TRUSTED BY {product.customerCount} CUSTOMERS
        </span>
      </div>

      <h1 className="font-playfair mt-5 whitespace-nowrap text-[2rem] leading-[1.02] text-[var(--plum)] sm:text-[2.55rem] md:text-[3.25rem] xl:text-[4rem] 2xl:text-[4.45rem]">
        {product.heroTitle}{" "}
        <em className="italic text-[var(--gold)]">{product.heroEmphasis}</em>
      </h1>

      {/* <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {heroBullets.map(({ icon: Icon, text }) => (
          <li
            className="flex items-center gap-2 text-sm font-medium leading-tight text-[var(--plum)]"
            key={text}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--gold)]">
              <Icon size={16} strokeWidth={2.2} />
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ul> */}

      <div className="mt-7 flex flex-col gap-2.5">
        <Price
          compareAtCents={product.compareAtCents}
          currency={product.currency}
          priceCents={product.priceCents}
        />
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <span>or 4 interest-free payments of <strong>{formatMoney(product.priceCents / 4, product.currency)}</strong> with</span>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex h-[18px] items-center justify-center rounded bg-[#FFB3C7] px-1.5 text-[8.5px] font-bold text-black buudy-mono tracking-widest leading-none">
              Klarna.
            </span>
            <span className="inline-flex h-[18px] items-center justify-center rounded bg-[#B2FCE4] px-1.5 text-[8.5px] font-bold text-black buudy-mono tracking-widest leading-none">
              afterpay
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[rgba(58,31,61,.15)] bg-[rgba(247,241,232,.55)] p-5">
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="buudy-eyebrow text-[var(--gold)]">DELIVERY</p>
            <p className="buudy-display mt-1.5 text-xl sm:text-2xl text-[var(--plum)] font-normal leading-none">
              {deliveryDate || "soon"}
            </p>
          </div>
          <div className="text-right">
            <p className="buudy-eyebrow text-[var(--gold)] whitespace-nowrap">
              {hasGifts ? "FREE GIFTS UNLOCK IN" : "ORDER TODAY"}
            </p>
            <p className="buudy-display mt-1.5 text-2xl sm:text-[2.2rem] font-normal text-[var(--plum)] leading-none">
              {timer}
            </p>
          </div>
        </div>
      </div>

      <Button
        className="mt-6 w-full py-4 text-base font-bold tracking-wider uppercase buudy-mono bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--plum)] shadow-md"
        id="hero-cta"
        onClick={() => addProduct(product)}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-[rgba(247,241,232,.75)] [animation:buudy-ping_1.4s_infinite]" />
          <span className="relative h-2 w-2 rounded-full bg-[var(--cream)]" />
        </span>
        ADD TO CART + FREE GIFTS
      </Button>

      {/* 4-Item Benefits Grid Row */}
      <div className="mt-8 grid grid-cols-4 gap-2 border-b border-[rgba(58,31,61,.12)] pb-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(184,149,86,.08)] text-[var(--plum)]">
            <FaceNeckIcon size={22} />
          </span>
          <p className="buudy-mono text-[9px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider">
            Full-Face &<br />Neck Coverage
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(184,149,86,.08)] text-[var(--plum)]">
            <BatteryCharging size={22} strokeWidth={1.5} />
          </span>
          <p className="buudy-mono text-[9px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider">
            Wireless &<br />Rechargeable
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(184,149,86,.08)] text-[var(--plum)]">
            <RotateCcw size={20} strokeWidth={1.5} />
          </span>
          <p className="buudy-mono text-[9px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider">
            90 Days Money<br />Back Guarantee
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(184,149,86,.08)] text-[var(--plum)]">
            <Waves size={22} strokeWidth={1.5} />
          </span>
          <p className="buudy-mono text-[9px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider">
            Science-Backed<br />Light
          </p>
        </div>
      </div>

      {hasGifts ? (
        <section className="mt-8" id="free-gifts">
          <div className="text-center mb-8">
            <h3 className="buudy-display text-3xl font-medium text-[var(--plum)]">
              Special Spring Sale
            </h3>
            <p className="buudy-mono mt-1.5 text-xs text-[var(--gold)] font-bold tracking-widest">
              {formatMoney(giftValue, product.currency)} VALUE OF FREE GIFTS FOR TODAY ONLY
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.gifts.map((gift) => (
              <div
                className="relative rounded-[24px] border border-[rgba(58,31,61,.18)] bg-[var(--card)] p-3 pt-6 text-center flex flex-col justify-between shadow-sm min-h-[220px]"
                key={gift.id}
              >
                {/* Single absolute overlapping badge: FREE (bold & clear) + price strikethrough (no nested container) */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--card)] border border-[rgba(58,31,61,.22)] rounded-full flex items-center gap-1.5 shadow-[0_2px_8px_rgba(58,31,61,0.06)] whitespace-nowrap">
                  <span className="text-black text-xs font-black tracking-widest uppercase buudy-mono">
                    FREE
                  </span>
                  <span className="line-through text-[10px] text-[var(--muted)] buudy-mono leading-none">
                    {formatMoney(gift.valueCents, product.currency)}
                  </span>
                </div>

                {/* Gift Image (No inner box container, directly given standard even border-radius) */}
                <div className="relative mt-2 aspect-square w-full overflow-hidden rounded-[20px] p-1 flex items-center justify-center">
                  <Image
                    alt={gift.name}
                    className="object-contain p-1 rounded-[20px] transition-transform duration-300 hover:scale-105"
                    fill
                    sizes="120px"
                    src={gift.image}
                  />
                </div>

                {/* Gift Label / Title */}
                <p className="buudy-display mt-3.5 text-xs md:text-sm font-semibold text-[var(--plum)] leading-snug">
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

      {product.template === "mask" ? (
        <ProductDetailsAccordion product={product} />
      ) : (
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
      )}
    </div>
  );
}
