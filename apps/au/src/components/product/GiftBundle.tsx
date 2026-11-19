"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import loadingLottie from "@/components/cart/loading-lottie.json";
import {
  BatteryCharging,
  Clock,
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
  Leaf,
  Layers,
  Heart,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "@/data/products";
import { market } from "@/lib/market";
import { formatMoney, percentOff } from "@/lib/money";
import {
  appendAttributionToPath,
  pickAttributionFromSearch,
} from "@/lib/attribution";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/components/cart/CartProvider";
import { ProductDetailsAccordion } from "./ProductDetailsAccordion";
import { HalloweenSaleBadge } from "./HalloweenOverlay";
import { EarlyBlackFridaySaleBadge } from "./EarlyBlackFridayElements";

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

const luxuryFallbackRing: LucideIcon[] = [
  Droplets,
  ShieldCheck,
  Sun,
  Leaf,
  Sparkles,
  Waves,
  Layers,
  Heart,
  Hourglass,
  CircleDot,
  Bandage,
];

function getBenefitIcon(
  text: string,
  index: number,
  seenIcons?: Set<LucideIcon>,
): LucideIcon {
  const norm = text.toLowerCase();
  const candidates: LucideIcon[] = [];

  // 1. Organic, botanical, natural certified, botanicals (Leaf)
  if (
    norm.includes("ecocert") ||
    norm.includes("certified") ||
    norm.includes("organic") ||
    norm.includes("botanical") ||
    norm.includes("natural") ||
    norm.includes("aloe") ||
    norm.includes("tea") ||
    norm.includes("sage") ||
    norm.includes("butter") ||
    norm.includes("mango") ||
    norm.includes("blueberry") ||
    norm.includes("rosehip") ||
    norm.includes("seed")
  ) {
    candidates.push(Leaf);
  }

  // 2. Firming, peptides, collagen, cellular turnover, glow, smoothing (Sparkles)
  if (
    norm.includes("peptide") ||
    norm.includes("firm") ||
    norm.includes("contour") ||
    norm.includes("elasticity") ||
    norm.includes("hydroxyproline") ||
    norm.includes("collagen") ||
    norm.includes("glow") ||
    norm.includes("turnover") ||
    norm.includes("retinol") ||
    norm.includes("exfoliat") ||
    norm.includes("lactic")
  ) {
    candidates.push(Sparkles);
  }

  // 3. Optical hydrogel / LED phototherapy / Light synergy / Sun / AM/PM (Sun)
  if (
    norm.includes("phototherapy") ||
    norm.includes("optical") ||
    norm.includes("light therapy") ||
    norm.includes("wavelength") ||
    norm.includes("630nm") ||
    norm.includes("830nm") ||
    norm.includes("led") ||
    norm.includes("sun") ||
    norm.includes("am/pm")
  ) {
    candidates.push(Sun);
  }

  // 4. Moisture reservoir / B5 lock-in / barrier protection (ShieldCheck / Waves / Layers)
  if (
    norm.includes("reservoir") ||
    norm.includes("72-hour") ||
    norm.includes("72h") ||
    norm.includes("72 hour") ||
    norm.includes("lock in") ||
    norm.includes("lock") ||
    norm.includes("b5") ||
    norm.includes("barrier") ||
    norm.includes("lipid") ||
    norm.includes("shield") ||
    norm.includes("defence") ||
    norm.includes("defend")
  ) {
    candidates.push(ShieldCheck, Waves, Layers);
  }

  // 5. Hyaluronic, deep hydration, moisture, hydrogel, water (Droplets)
  if (
    norm.includes("hyaluronic") ||
    norm.includes("hydration") ||
    norm.includes("hydrate") ||
    norm.includes("moisture") ||
    norm.includes("water") ||
    norm.includes("hydrogel") ||
    norm.includes("plump") ||
    norm.includes("quench") ||
    norm.includes("pca")
  ) {
    candidates.push(Droplets);
  }

  // 6. Soothing, micro-circulation, calming, redness (Waves / Heart)
  if (
    norm.includes("circulation") ||
    norm.includes("puffiness") ||
    norm.includes("calm") ||
    norm.includes("sooth") ||
    norm.includes("redness") ||
    norm.includes("healing") ||
    norm.includes("pore")
  ) {
    candidates.push(Waves, Heart);
  }

  // 7. Time / age / wrinkles (Hourglass / Sparkles)
  if (
    norm.includes("age") ||
    norm.includes("wrinkle") ||
    norm.includes("line") ||
    norm.includes("time")
  ) {
    candidates.push(Hourglass, Sparkles);
  }

  // Pick first candidate that hasn't been used yet
  let chosen = seenIcons
    ? candidates.find((icon) => !seenIcons.has(icon))
    : candidates[0];

  // If all matched candidates are already used or no candidate matched, find next unused icon in luxuryFallbackRing
  if (!chosen) {
    if (seenIcons) {
      for (let offset = 0; offset < luxuryFallbackRing.length; offset++) {
        const ringIcon =
          luxuryFallbackRing[(index + offset) % luxuryFallbackRing.length];
        if (!seenIcons.has(ringIcon)) {
          chosen = ringIcon;
          break;
        }
      }
    }
  }

  // Fallback if ring is exhausted or no seenIcons provided
  if (!chosen) {
    chosen = luxuryFallbackRing[index % luxuryFallbackRing.length];
  }

  if (seenIcons) {
    seenIcons.add(chosen);
  }

  return chosen;
}

function getDistinctBenefitIcons(items: string[]): LucideIcon[] {
  const seenIcons = new Set<LucideIcon>();
  return items.map((item, index) => getBenefitIcon(item, index, seenIcons));
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

export function GiftBundle({
  product,
  isHalloween = false,
  isEarlyBlackFriday = true,
}: {
  product: Product;
  isHalloween?: boolean;
  isEarlyBlackFriday?: boolean;
}) {
  const { addProduct } = useCart();
  const router = useRouter();
  const timer = useCountdown(15 * 60 - 1);
  const deliveryDate = useDeliveryDate(5);
  const [isAdding, setIsAdding] = useState(false);
  const [deliveryIconData, setDeliveryIconData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const shippingTooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        shippingTooltipRef.current &&
        !shippingTooltipRef.current.contains(event.target as Node)
      ) {
        setShowShippingInfo(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowShippingInfo(false);
      }
    }

    if (showShippingInfo) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showShippingInfo]);

  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        setIsAdding(false);
      }
    }

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

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
  const isSimplifiedProduct =
    product.template === "serum" ||
    product.template === "cleanser" ||
    product.slug === "double-hydration-boost-gel" ||
    product.slug === "buudy-double-hydration-boost-gel" ||
    product.id === "buudy-light-activating-hyaluronic-serum" ||
    product.slug === "the-ultimate-renewal-collection-box" ||
    product.id === "the-ultimate-renewal-collection-box" ||
    product.slug.includes("aha") ||
    product.id.includes("aha") ||
    product.id.includes("peptide") ||
    product.slug.includes("peptide") ||
    product.slug.includes("eye") ||
    product.id.includes("eye") ||
    product.slug.includes("collagen");

  const giftButtonLabel = product.template === "mask" && hasGifts
    ? `ADD TO CART + ${product.gifts.length} FREE GIFTS`
    : "Add to cart";

  const benefitList = product.keyBenefits ?? product.highlights;
  const benefitIcons =
    product.template === "mask"
      ? benefitList.map((_, i) => keyBenefitIcons[i % keyBenefitIcons.length])
      : getDistinctBenefitIcons(benefitList);
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

      <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <h1 className="font-playfair text-[1.85rem] leading-[1.05] text-[var(--plum)] sm:text-[2.2rem] md:text-[2.4rem] lg:text-[2.5rem] xl:text-[2.85rem] inline">
          {product.heroTitle || product.name}
          {product.heroEmphasis ? (
            <>
              {" "}
              <em className="italic text-[var(--gold)]">{product.heroEmphasis}</em>
            </>
          ) : null}
        </h1>

        {/* Cleopatra Edition subtitle placed right beside heading aligned to text baseline */}
        {product.template === "mask" && (
          <span className="font-sans text-[11px] sm:text-xs font-normal text-[var(--plum)]/70 bg-[rgba(58,31,61,.05)] border border-[rgba(58,31,61,.12)] px-2 py-0.5 rounded tracking-wide inline-flex items-center align-baseline">
            Cleopatra Edition
          </span>
        )}
      </div>

      {/* Clinically Proven Badges */}
      {!isSimplifiedProduct && (
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
              Easy Returns
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
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Price
          compareAtCents={product.compareAtCents}
          currency={product.currency}
          priceCents={product.priceCents}
          hideDiscount={isHalloween || isEarlyBlackFriday}
        />
        {isHalloween && <HalloweenSaleBadge />}
        {isEarlyBlackFriday && (
          <EarlyBlackFridaySaleBadge
            discountText={
              product.compareAtCents && (product.template === "serum" || product.template === "cleanser")
                ? `${percentOff(product.priceCents, product.compareAtCents)}% OFF`
                : undefined
            }
          />
        )}
      </div>


      {/* Premium Compact Bullet Points List */}
      <ul className="mt-4 mb-4 flex flex-col gap-1.5 pl-1.5">
        {benefitList.map((benefit, index) => {
          const Icon = benefitIcons[index] ?? getBenefitIcon(benefit, index);
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

      <div className="relative mt-4 flex items-center justify-between gap-2.5 rounded-xl border border-[rgba(58,31,61,.15)] bg-[rgba(247,241,232,.55)] px-3.5 py-2.5 text-xs sm:text-[13.5px] text-[var(--plum)]">
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="h-4 w-4 shrink-0 text-[var(--gold)]" />
          <p className="m-0 leading-snug">
            Free delivery: Order within <span className="font-semibold text-[var(--plum)]">{timer}</span> to get as fast as <span className="font-semibold text-[var(--plum)]">{deliveryDate || "soon"}</span>
          </p>
        </div>

        {/* Question mark info button */}
        <div className="relative shrink-0" ref={shippingTooltipRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowShippingInfo((prev) => !prev);
            }}
            aria-label="Shipping information"
            aria-expanded={showShippingInfo}
            className="flex h-4 w-4 items-center justify-center rounded-full border border-[var(--gold)] bg-transparent text-[9.5px] font-medium text-[var(--gold)] transition hover:opacity-80 active:scale-95 cursor-pointer"
          >
            ?
          </button>

          {showShippingInfo && (
            <div
              className="absolute right-0 bottom-full mb-2 z-40 w-64 sm:w-72 rounded-xl border border-[rgba(58,31,61,.16)] bg-[var(--card)] p-3.5 shadow-xl text-left text-xs leading-relaxed text-[var(--plum)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-semibold text-[var(--plum)] text-xs">Delivery Estimate</span>
                <button
                  type="button"
                  onClick={() => setShowShippingInfo(false)}
                  className="text-[var(--muted)] hover:text-[var(--plum)] text-sm leading-none p-0.5 cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <p className="text-[11.5px] leading-relaxed text-[var(--plum)]/90 m-0">
                This is the earliest date you can receive your order, but standard delivery transit is 7–20 business days. For more information, please visit our shipping policy page.
              </p>
            </div>
          )}
        </div>
      </div>

      <Button
        className={`proxy-bundle-btn relative overflow-hidden mt-5 w-full rounded-[30px] border border-[var(--plum)] bg-[var(--plum)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] hover:bg-[var(--plum)] active:scale-[0.98] sm:text-[22px] ${isAdding ? "disabled:!opacity-100" : ""}`}
        disabled={isAdding}
        id="hero-cta"
        onClick={() => {
          setIsAdding(true);
          addProduct(product);
          router.push(
            appendAttributionToPath(
              "/cart",
              pickAttributionFromSearch(window.location.search),
            ),
          );
        }}
      >
        {isAdding ? (
          <>
            <span style={{ visibility: "hidden" }} className="relative z-20 whitespace-nowrap">
              {giftButtonLabel}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <Lottie animationData={loadingLottie} loop={true} className="h-16 w-24 scale-[1.35]" />
            </span>
          </>
        ) : (
          <span className="relative z-20 whitespace-nowrap">
            {giftButtonLabel}
          </span>
        )}
      </Button>

      {/* Benefits Grid Row (Mask Only) */}
      {product.id === "buudy-led-mask" && (
        <div className="mt-8 grid grid-cols-4 gap-2 border-b border-[rgba(58,31,61,.12)] pb-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/media/products/buudy-led-mask/images/i5.png"
              alt="Full-Face & Neck Coverage"
              width={60}
              height={60}
              className="object-contain"
            />
            <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
              Full-Face &<br />
              Neck Coverage
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/media/products/buudy-led-mask/images/i6.png"
              alt="Wireless & Rechargeable"
              width={60}
              height={60}
              className="object-contain"
            />
            <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
              Wireless &<br />
              Rechargeable
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/media/products/buudy-led-mask/images/i7.png"
              alt="Easy Returns & Refunds"
              width={60}
              height={60}
              className="object-contain"
            />
            <p className="buudy-display text-[10px] font-bold leading-tight text-[var(--plum-soft)] tracking-wider uppercase">
              Easy Returns
              <br />
              & Refunds
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/media/products/buudy-led-mask/images/i8.png"
              alt="Science-Backed Light"
              width={60}
              height={60}
              className="object-contain"
            />
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
              {isEarlyBlackFriday ? "Black Friday FREE Gifts" : isHalloween ? "Halloween Free Gifts" : "Exclusive Free Gifts"}
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
                  {gift.valueCents > 0 && (
                    <span className="line-through text-xs sm:text-sm text-[var(--muted)] buudy-display font-semibold leading-none">
                      {formatMoney(gift.valueCents, product.currency)}
                    </span>
                  )}
                </div>

                {/* Gift Image (No inner box container, directly given standard even border-radius) */}
                <div className="relative mt-1 md:mt-2 aspect-square w-full overflow-hidden rounded-[20px] p-0.5 md:p-1 flex items-center justify-center">
                  <Image
                    alt={gift.name}
                    className="rounded-[20px] object-contain p-0.5 transition-transform duration-300 group-hover:scale-105 md:p-1"
                    fill
                    sizes="120px"
                    src={gift.image}
                    unoptimized
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
      ) : null}
      {/* <section
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
        </section> */}

      <ProductDetailsAccordion product={product} />
    </div>
  );
}
