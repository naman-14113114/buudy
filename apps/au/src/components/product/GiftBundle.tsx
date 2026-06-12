"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import {
  BatteryCharging,
  ShieldCheck,
  Sparkles,
  Truck,
  Waves,
  RotateCcw,
  Sun,
  Hourglass,
  CircleDot,
  Bandage,
  Umbrella,
  Droplets,
} from "lucide-react";
import type { Product } from "@/data/products";
import { market } from "@/lib/market";
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

      const weekday = date.toLocaleString(market.locale, { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString(market.locale, { month: "long" });

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

const keyBenefitIcons = [
  Sun,
  Hourglass,
  CircleDot,
  Bandage,
  Umbrella,
  Droplets,
  Waves,
];

export function GiftBundle({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const router = useRouter();
  const timer = useCountdown(15 * 60 - 1);
  const deliveryDate = useDeliveryDate(3);
  const [deliveryIconData, setDeliveryIconData] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    fetch(
      "/media/products/buudy-led-mask/images/lottieflow-ecommerce-14-19-aa8e50-easey.json",
    )
      .then((res) => res.json())
      .then((data) => setDeliveryIconData(data))
      .catch((err) => console.error("Error loading delivery lottie", err));
  }, []);

  const giftValue = product.gifts.reduce(
    (total, gift) => total + gift.valueCents,
    0,
  );
  const hasGifts = product.gifts.length > 0;
  return (
    <div>
      <a
        href="#reviews"
        className="flex flex-wrap items-center gap-3 no-underline hover:no-underline cursor-pointer"
      >
        <div
          className="text-xl sm:text-2xl leading-none text-[var(--gold)]"
          aria-hidden
        >
          ★★★★★
        </div>
        <span className="font-sans text-sm sm:text-base font-medium text-[var(--plum)] bg-[rgba(184,149,86,.18)] px-2.5 py-0.5 rounded-md">
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
          <ShieldCheck
            size={14}
            strokeWidth={2}
            className="hidden sm:block shrink-0 text-[var(--gold)]"
          />
          <span className="whitespace-nowrap buudy-display text-[8px] sm:text-[10.5px] font-bold uppercase tracking-[0.02em] sm:tracking-[0.05em] text-[var(--plum)]">
            Clinically Proven
          </span>
        </span>
        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[rgba(58,31,61,.15)] bg-[var(--card)] px-1.5 sm:px-3 py-1 sm:py-1.5">
          <RotateCcw
            size={13}
            strokeWidth={2}
            className="hidden sm:block shrink-0 text-[var(--gold)]"
          />
          <span className="whitespace-nowrap buudy-display text-[8px] sm:text-[10.5px] font-bold uppercase tracking-[0.02em] sm:tracking-[0.05em] text-[var(--plum)]">
            90-Day Returns
          </span>
        </span>
        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[rgba(58,31,61,.15)] bg-[var(--card)] px-1.5 sm:px-3 py-1 sm:py-1.5">
          <Sparkles
            size={14}
            strokeWidth={2}
            className="hidden sm:block shrink-0 text-[var(--gold)]"
          />
          <span className="whitespace-nowrap buudy-display text-[8px] sm:text-[10.5px] font-bold uppercase tracking-[0.02em] sm:tracking-[0.05em] text-[var(--plum)]">
            Dermatologist Approved
          </span>
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
            or{" "}
            <strong className="buudy-display text-[10px] sm:text-[14px] font-medium text-[var(--plum)]">
              4
            </strong>{" "}
            interest-free payments of{" "}
            <strong className="buudy-display text-[10px] sm:text-[14px] font-semibold text-[var(--plum)]">
              {formatMoney(product.priceCents / 4, product.currency)}
            </strong>
          </span>
        </div>
      </div>

      {/* Premium Compact Bullet Points List */}
      <ul className="mt-4 mb-4 flex flex-col gap-1.5 pl-1.5">
        {(product.keyBenefits ?? product.highlights).map((benefit, index) => {
          const Icon = keyBenefitIcons[index % keyBenefitIcons.length];
          return (
            <li
              className="flex items-center gap-3 text-[14.5px] font-normal leading-normal text-[var(--plum)] buudy-display"
              key={benefit}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--gold)]">
                <Icon size={18} strokeWidth={1.5} />
              </span>
              <span>{benefit}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-2xl border border-[rgba(58,31,61,.15)] bg-[rgba(247,241,232,.55)] p-3 sm:p-5">
        <div className="flex items-center justify-between gap-2 sm:gap-5">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {deliveryIconData && (
                <div className="w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0 flex items-center justify-center">
                  <Lottie animationData={deliveryIconData} loop={true} />
                </div>
              )}
              <p className="buudy-eyebrow text-[var(--gold)] m-0 leading-none flex items-center h-5 sm:h-7 font-bold text-[10px] sm:text-xs">
                FREE DELIVERY
              </p>
            </div>
            <p className="buudy-display mt-1.5 text-base sm:text-2xl text-[var(--plum)] font-normal leading-none whitespace-nowrap">
              {deliveryDate || "soon"}
            </p>
          </div>
          <div className="text-right">
            <p className="buudy-eyebrow text-[var(--gold)] whitespace-nowrap text-[9px] sm:text-[11px] tracking-tight sm:tracking-normal">
              {hasGifts ? "ORDER WITHIN" : "ORDER TODAY"}
            </p>
            <p className="buudy-display mt-1.5 text-xl sm:text-[2.2rem] font-normal text-[var(--plum)] leading-none">
              {timer}
            </p>
          </div>
        </div>
      </div>

      <Button
        className="proxy-bundle-btn mt-5 w-full rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] hover:bg-[var(--ink)] active:scale-[0.98] sm:text-[22px]"
        id="hero-cta"
        onClick={() => {
          addProduct(product);
          router.push("/cart");
        }}
      >
        <span className="relative z-20 whitespace-nowrap">
          {hasGifts
            ? "ADD TO CART + FREE GIFTS"
            : "ADD TO CART + FREE SHIPPING"}
        </span>
      </Button>

      {/* Benefits Grid Row (Mask Only) */}
      {product.id === "buudy-led-mask" && (
        <div className="mt-8 grid grid-cols-4 gap-2 border-b border-[rgba(58,31,61,.12)] pb-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Image src="/media/products/buudy-led-mask/images/i5.png" alt="Full-Face & Neck Coverage" width={60} height={60} className="object-contain" />
            <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
              Full-Face &<br />
              Neck Coverage
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src="/media/products/buudy-led-mask/images/i6.png" alt="Wireless & Rechargeable" width={60} height={60} className="object-contain" />
            <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
              Wireless &<br />
              Rechargeable
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src="/media/products/buudy-led-mask/images/i7.png" alt="90 Days Money Back Guarantee" width={60} height={60} className="object-contain" />
            <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
              90 Days Money
              <br />
              Back Guarantee
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src="/media/products/buudy-led-mask/images/i8.png" alt="Science-Backed Light" width={60} height={60} className="object-contain" />
            <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
              Science-Backed
              <br />
              Light
            </p>
          </div>
        </div>
      )}

      {hasGifts ? (
        <section className="mt-8" id="free-gifts">
          <div className="text-center mb-8 flex flex-col items-center">
            <h3 className="buudy-display text-3xl font-medium text-[var(--plum)]">
              Special Spring Sale
            </h3>
            <p className="buudy-mono mt-2 inline-flex items-center justify-center gap-1.5 flex-wrap rounded bg-[rgba(184,149,86,.15)] px-3 py-1 text-xs sm:text-sm font-bold tracking-widest text-[var(--plum)]">
              <span className="buudy-display text-sm sm:text-base font-extrabold normal-case text-[var(--plum)]">
                {formatMoney(giftValue, product.currency)}
              </span>
              <span>VALUE OF FREE GIFTS FOR TODAY ONLY</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {product.gifts.map((gift) => (
              <Link
                aria-label={`Learn more about ${gift.name}`}
                className="group relative flex min-h-[180px] flex-col justify-start rounded-[24px] border border-[rgba(58,31,61,.18)] bg-[var(--card)] p-2 pt-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[rgba(184,149,86,.72)] hover:shadow-[0_18px_32px_-24px_rgba(58,31,61,.62)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] md:min-h-[220px] md:p-3 md:pt-6"
                href={gift.href}
                key={gift.id}
              >
                {/* Single absolute overlapping badge: FREE (bold & clear) + price strikethrough (no nested container) */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 bg-[var(--card)] border border-[rgba(58,31,61,.22)] rounded-full flex items-center gap-1 sm:gap-1.5 shadow-[0_2px_8px_rgba(58,31,61,0.06)] whitespace-nowrap">
                  <span className="text-black text-[11px] sm:text-[13px] font-bold tracking-wider uppercase font-sans">
                    FREE
                  </span>
                  <span className="line-through text-xs sm:text-sm text-[var(--muted)] buudy-display font-semibold leading-none">
                    {formatMoney(gift.valueCents, product.currency)}
                  </span>
                </div>

                {/* Gift Image (No inner box container, directly given standard even border-radius) */}
                <div className="relative mt-1 md:mt-2 aspect-square w-full overflow-hidden rounded-[20px] p-0.5 md:p-1 flex items-center justify-center">
                  <Image
                    alt={gift.name}
                    className="rounded-[20px] object-contain p-0.5 transition-transform duration-300 group-hover:scale-105 md:p-1"
                    fill
                    sizes="120px"
                    src={gift.image}
                  />
                </div>

                {/* Gift Label / Title */}
                <p className="buudy-display mt-0.5 md:mt-1 text-base md:text-lg font-semibold text-[var(--plum)] leading-snug">
                  {gift.name}
                </p>
              </Link>
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

      <ProductDetailsAccordion product={product} />
    </div>
  );
}
