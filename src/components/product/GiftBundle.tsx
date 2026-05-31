"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import {
  BatteryCharging,
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

export function GiftBundle({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const router = useRouter();
  const timer = useCountdown(15 * 60 - 1);
  const deliveryDate = useDeliveryDate(4);
  const [deliveryIconData, setDeliveryIconData] = useState<Record<string, unknown> | null>(null);
  
  useEffect(() => {
    fetch("/media/products/buudy-led-mask/images/lottieflow-ecommerce-14-19-aa8e50-easey.json")
      .then((res) => res.json())
      .then((data) => setDeliveryIconData(data))
      .catch((err) => console.error("Error loading delivery lottie", err));
  }, []);

  const giftValue = product.gifts.reduce((total, gift) => total + gift.valueCents, 0);
  const hasGifts = product.gifts.length > 0;
  return (
    <div>
      <a href="#reviews" className="flex flex-wrap items-center gap-3 no-underline hover:no-underline cursor-pointer">
        <div className="text-xl sm:text-2xl leading-none text-[var(--gold)]" aria-hidden>
          ★★★★★
        </div>
        <span className="font-sans text-sm sm:text-base font-medium text-[var(--gold)]">
          {product.rating} · TRUSTED BY {product.customerCount} CUSTOMERS
        </span>
      </a>

      <h1 className="font-playfair mt-3 whitespace-nowrap text-[2rem] leading-[1.02] text-[var(--plum)] sm:text-[2.55rem] md:text-[3.25rem] xl:text-[4rem] 2xl:text-[4.45rem]">
        {product.heroTitle}{" "}
        <em className="italic text-[var(--gold)]">{product.heroEmphasis}</em>
      </h1>

      {/* Clinically Proven Badges */}
      <div className="mt-3 flex flex-nowrap items-center gap-1 sm:gap-2">
        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[rgba(58,31,61,.15)] bg-[var(--card)] px-1.5 sm:px-3 py-1 sm:py-1.5">
          <ShieldCheck size={14} strokeWidth={2} className="hidden sm:block shrink-0 text-[var(--gold)]" />
          <span className="whitespace-nowrap buudy-display text-[8px] sm:text-[10.5px] font-bold uppercase tracking-[0.02em] sm:tracking-[0.05em] text-[var(--plum)]">Clinically Proven</span>
        </span>
        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[rgba(58,31,61,.15)] bg-[var(--card)] px-1.5 sm:px-3 py-1 sm:py-1.5">
          <RotateCcw size={13} strokeWidth={2} className="hidden sm:block shrink-0 text-[var(--gold)]" />
          <span className="whitespace-nowrap buudy-display text-[8px] sm:text-[10.5px] font-bold uppercase tracking-[0.02em] sm:tracking-[0.05em] text-[var(--plum)]">90-Day Returns</span>
        </span>
        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[rgba(58,31,61,.15)] bg-[var(--card)] px-1.5 sm:px-3 py-1 sm:py-1.5">
          <Sparkles size={14} strokeWidth={2} className="hidden sm:block shrink-0 text-[var(--gold)]" />
          <span className="whitespace-nowrap buudy-display text-[8px] sm:text-[10.5px] font-bold uppercase tracking-[0.02em] sm:tracking-[0.05em] text-[var(--plum)]">Dermatologist Approved</span>
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        <Price
          compareAtCents={product.compareAtCents}
          currency={product.currency}
          priceCents={product.priceCents}
        />
        <div className="flex flex-nowrap items-center gap-x-1 sm:gap-x-1.5 text-[9.5px] sm:text-[13px] text-[var(--muted)]">
          <span className="whitespace-nowrap tracking-tight sm:tracking-normal">
            or <strong className="buudy-display text-[10px] sm:text-[14px] font-medium text-[var(--plum)]">4</strong> interest-free payments of{" "}
            <strong className="buudy-display text-[10px] sm:text-[14px] font-semibold text-[var(--plum)]">
              {formatMoney(product.priceCents / 4, product.currency)}
            </strong>{" "}
            with
          </span>
          <div className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Klarna Badge Container */}
            <div className="relative w-[50px] sm:w-[58px] h-[15px] sm:h-[18px] overflow-hidden rounded-[3px] bg-[#FFB3C7] flex items-center justify-center shrink-0">
              <img
                src="/media/products/buudy-led-mask/images/klarna_badge.png"
                alt="Klarna"
                className="w-[85%] h-auto object-contain"
              />
            </div>
            {/* Afterpay Badge Container */}
            <div className="relative w-[56px] sm:w-[68px] h-[15px] sm:h-[18px] overflow-hidden rounded-[3px] bg-[#B2FCE4] flex items-center justify-center shrink-0">
              <img
                src="/media/products/buudy-led-mask/images/afterpay_badge.png"
                alt="Afterpay"
                className="w-[88%] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Compact Bullet Points List */}
      <ul className="mt-4 mb-4 flex flex-col gap-1.5 pl-1.5">
        <li className="flex items-center gap-3 text-[14.5px] font-normal leading-normal text-[var(--plum)] buudy-display">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)]">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          <span>Stimulate collagen production</span>
        </li>
        <li className="flex items-center gap-3 text-[14.5px] font-normal leading-normal text-[var(--plum)] buudy-display">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)]">
              <path d="M5 2h14M5 22h14M19 2v4c0 4-3 6-7 6s-7-2-7-6V2M5 22v-4c0-4 3-6 7-6s7 2 7 6v4" />
              <path d="M12 12v4" />
            </svg>
          </span>
          <span>Assist with anti-aging</span>
        </li>
        <li className="flex items-center gap-3 text-[14.5px] font-normal leading-normal text-[var(--plum)] buudy-display">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)]">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          <span>Reduce acne</span>
        </li>
        <li className="flex items-center gap-3 text-[14.5px] font-normal leading-normal text-[var(--plum)] buudy-display">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)]">
              <rect x="2" y="7" width="20" height="10" rx="2" transform="rotate(-45 12 12)" />
              <circle cx="9" cy="9" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="15" cy="15" r="1" />
            </svg>
          </span>
          <span>Aid in healing</span>
        </li>
        <li className="flex items-center gap-3 text-[14.5px] font-normal leading-normal text-[var(--plum)] buudy-display">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)]">
              <path d="M12 2v10M12 12a3 3 0 0 1-3-3M22 12A10 10 0 0 0 2 12z" />
              <path d="M12 12v6a2 2 0 0 0 4 0" />
            </svg>
          </span>
          <span>Address sun damage</span>
        </li>
        <li className="flex items-center gap-3 text-[14.5px] font-normal leading-normal text-[var(--plum)] buudy-display">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)]">
              <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
              <path d="M12 10a4 4 0 0 1 4 4" />
            </svg>
          </span>
          <span>Cleanse your skin</span>
        </li>
        <li className="flex items-center gap-3 text-[14.5px] font-normal leading-normal text-[var(--plum)] buudy-display">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)]">
              <path d="M2 8c4-2 6-2 10 0s6 2 10 0M2 12c4-2 6-2 10 0s6 2 10 0M2 16c4-2 6-2 10 0s6 2 10 0" />
            </svg>
          </span>
          <span>Minimize wrinkles and lines</span>
        </li>
      </ul>

      <div className="mt-4 rounded-2xl border border-[rgba(58,31,61,.15)] bg-[rgba(247,241,232,.55)] p-5">
        <div className="flex items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              {deliveryIconData && (
                <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                  <Lottie animationData={deliveryIconData} loop={true} />
                </div>
              )}
              <p className="buudy-eyebrow text-[var(--gold)] m-0 leading-none flex items-center h-7 font-bold">DELIVERY</p>
            </div>
            <p className="buudy-display mt-1.5 text-lg sm:text-2xl text-[var(--plum)] font-normal leading-none whitespace-nowrap">
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
        className="buudy-cart-wipe mt-5 w-full rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] hover:bg-[var(--ink)] active:scale-[0.98] sm:text-[22px]"
        id="hero-cta"
        onClick={() => {
          addProduct(product);
          router.push("/cart");
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="buudy-cart-pulse-ring absolute inset-0 rounded-full bg-[rgba(247,241,232,.75)] [animation:buudy-ping_1.4s_infinite]" />
          <span className="buudy-cart-pulse relative h-2 w-2 rounded-full bg-[var(--cream)]" />
        </span>
        <span>ADD TO CART + FREE GIFTS</span>
      </Button>

      {/* 4-Item Benefits Grid Row */}
      <div className="mt-8 grid grid-cols-4 gap-2 border-b border-[rgba(58,31,61,.12)] pb-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(184,149,86,.08)] text-[var(--plum)]">
            <FaceNeckIcon size={22} />
          </span>
          <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
            Full-Face &<br />Neck Coverage
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(184,149,86,.08)] text-[var(--plum)]">
            <BatteryCharging size={22} strokeWidth={1.5} />
          </span>
          <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
            Wireless &<br />Rechargeable
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(184,149,86,.08)] text-[var(--plum)]">
            <RotateCcw size={20} strokeWidth={1.5} />
          </span>
          <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
            90 Days Money<br />Back Guarantee
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(184,149,86,.08)] text-[var(--plum)]">
            <Waves size={22} strokeWidth={1.5} />
          </span>
          <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
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
            <p className="buudy-mono mt-1.5 text-xs text-[var(--gold)] font-bold tracking-widest flex items-center justify-center gap-1 flex-wrap">
              <span className="buudy-display text-sm font-semibold text-[var(--gold)] normal-case">{formatMoney(giftValue, product.currency)}</span>
              <span>VALUE OF FREE GIFTS FOR TODAY ONLY</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {product.gifts.map((gift) => (
              <div
                className="relative rounded-[24px] border border-[rgba(58,31,61,.18)] bg-[var(--card)] p-2 pt-5 md:p-3 md:pt-6 text-center flex flex-col justify-between shadow-sm min-h-[180px] md:min-h-[220px]"
                key={gift.id}
              >
                {/* Single absolute overlapping badge: FREE (bold & clear) + price strikethrough (no nested container) */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-[var(--card)] border border-[rgba(58,31,61,.22)] rounded-full flex items-center gap-1 sm:gap-1.5 shadow-[0_2px_8px_rgba(58,31,61,0.06)] whitespace-nowrap">
                  <span className="text-black text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase font-sans">
                    FREE
                  </span>
                  <span className="line-through text-[9px] sm:text-[10.5px] text-[var(--muted)] buudy-display font-semibold leading-none">
                    {formatMoney(gift.valueCents, product.currency)}
                  </span>
                </div>

                {/* Gift Image (No inner box container, directly given standard even border-radius) */}
                <div className="relative mt-1 md:mt-2 aspect-square w-full overflow-hidden rounded-[20px] p-0.5 md:p-1 flex items-center justify-center">
                  <Image
                    alt={gift.name}
                    className="object-contain p-0.5 md:p-1 rounded-[20px] transition-transform duration-300 hover:scale-105"
                    fill
                    sizes="120px"
                    src={gift.image}
                  />
                </div>

                {/* Gift Label / Title */}
                <p className="buudy-display mt-0.5 md:mt-3.5 text-[10px] md:text-sm font-semibold text-[var(--plum)] leading-snug">
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
