"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Check,
  ChevronDown,
  Gift,
  ShoppingBag,
  Truck,
  Lock,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Lottie from "lottie-react";
import loadingLottie from "@/components/cart/loading-lottie.json";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { CheckoutForm, type CheckoutCustomer } from "./CheckoutForm";
import { FreeGiftsPanel } from "./FreeGiftsPanel";
import { getDisplayLines, type CartLine } from "@/lib/cart";
import { market } from "@/lib/market";

const digitalGiftId = "skincare-ebook";

function useCheckoutCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining((current) => (current <= 0 ? seconds : current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [seconds]);

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return `${String(minutes).padStart(2, "0")}m : ${String(secs).padStart(2, "0")}s`;
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

export function CartPageContent({
  initialCustomer,
}: {
  initialCustomer: CheckoutCustomer;
}) {
  const { isHydrated, lines, totals, giftMessage, setGiftMessage } = useCart();
  const [giftMessageOpen, setGiftMessageOpen] = useState(Boolean(giftMessage));
  const [showSaved, setShowSaved] = useState(false);
  const timer = useCheckoutCountdown(10 * 60 - 1);
  const deliveryDate = useDeliveryDate(3);
  const visibleLines = useMemo(
    () => getDisplayLines(lines),
    [lines],
  );
  const digitalGift = useMemo(
    () => lines.find((line) => line.id.includes(digitalGiftId)),
    [lines],
  );
  const hasItems = totals.itemCount > 0;

  if (!isHydrated) {
    return <CartRestoringState />;
  }

  if (!hasItems) {
    return (
      <section className="buudy-section bg-[var(--cream)] py-28">
        <div className="buudy-wrap max-w-2xl text-center">
          <ShoppingBag className="mx-auto text-[var(--gold)]" size={42} />
          <h1 className="buudy-heading mt-5">Your cart is empty.</h1>
          <p className="buudy-copy mx-auto mt-5 max-w-lg">
            Add the Buudy LED Mask or Red Torch to unlock current offers and
            free shipping.
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Shop Buudy</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
    <section className="buudy-section bg-[var(--cream)] pt-2 pb-8 md:pt-4 md:pb-12">
      <div className="buudy-wrap">
        <div className="mb-8 rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] px-5 py-4 shadow-[0_18px_40px_-32px_rgba(58,31,61,.45)]">
          <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
            <div className="flex flex-col items-center gap-3 md:flex-row">
              <div className="flex w-full items-center justify-center gap-3 md:w-auto">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[rgba(184,149,86,.12)] text-[var(--gold)]">
                  <Truck size={22} />
                </span>
                <span className="buudy-mono rounded-full bg-[rgba(184,149,86,.12)] px-4 py-2 text-[var(--plum)] md:hidden">
                  Free tracked shipping
                </span>
              </div>
              <p className="buudy-display text-xl leading-snug text-[var(--plum)] md:text-2xl">
                Order in next{" "}
                <span className="font-semibold text-[var(--ink)]">{timer}</span>{" "}
                and receive it by{" "}
                <span className="font-semibold text-[var(--plum)]">
                  {deliveryDate || "soon"}
                </span>
              </p>
            </div>
            <span className="buudy-mono hidden rounded-full bg-[rgba(184,149,86,.12)] px-4 py-2 text-[var(--plum)] md:block">
              Free tracked shipping
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_430px]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5">
              {visibleLines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </div>
            {digitalGift ? <DigitalGiftNotice line={digitalGift} /> : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <CartSummary>
              <CheckoutForm initialCustomer={initialCustomer} />
            </CartSummary>
            <FreeGiftsPanel compact />
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
              <button
                aria-controls="gift-message-panel"
                aria-expanded={giftMessageOpen}
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setGiftMessageOpen((current) => !current)}
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(184,149,86,.12)] text-[var(--gold)]">
                    <Gift size={17} />
                  </span>
                  <span>
                    <span className="buudy-mono block text-[var(--plum)]">
                      Add Gift Message
                    </span>
                    <span className="mt-1 block text-sm text-[var(--muted)]">
                      Price will be hidden on packing slip.
                    </span>
                  </span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="buudy-mono hidden text-[var(--gold)] sm:inline">
                    {giftMessage.length}/300
                  </span>
                  <ChevronDown
                    className={`text-[var(--gold)] transition-transform duration-300 ${
                      giftMessageOpen ? "rotate-180" : ""
                    }`}
                    size={18}
                  />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  giftMessageOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
                id="gift-message-panel"
              >
                <div className="overflow-hidden">
                  <div className="mt-4 flex justify-end sm:hidden">
                    <span className="buudy-mono text-[var(--gold)]">
                      {giftMessage.length}/300
                    </span>
                  </div>
                  <textarea
                    className="mt-4 min-h-28 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--cream)] p-3 text-sm text-[var(--plum)] outline-none transition focus:border-[var(--plum)]"
                    maxLength={300}
                    onChange={(event) => {
                      setGiftMessage(event.target.value);
                      setShowSaved(false);
                    }}
                    placeholder="Write your warm wish..."
                    value={giftMessage}
                  />
                  <button
                    className="mt-3 flex items-center gap-2 text-sm font-semibold text-[var(--plum)] transition hover:text-[var(--gold)]"
                    onClick={() => setShowSaved(true)}
                    type="button"
                  >
                    {showSaved ? <Check size={16} /> : null}
                    {showSaved ? "Gift message saved" : "Save gift message"}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <MobileStickyCheckout />
    </>
  );
}

function MobileStickyCheckout() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isMainBtnVisible, setIsMainBtnVisible] = useState(false);

  useEffect(() => {
    function handleCheckoutStarted() {
      setIsRedirecting(true);
    }

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        setIsRedirecting(false);
      }
    }

    window.addEventListener("buudy:started-checkout", handleCheckoutStarted);
    window.addEventListener("pageshow", handlePageShow);

    const mainBtn = document.getElementById("main-checkout-btn");
    let observer: IntersectionObserver | null = null;

    if (mainBtn) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsMainBtnVisible(entry.isIntersecting);
        },
        { threshold: 0 }
      );
      observer.observe(mainBtn);
    }

    return () => {
      window.removeEventListener("buudy:started-checkout", handleCheckoutStarted);
      window.removeEventListener("pageshow", handlePageShow);
      if (observer && mainBtn) {
        observer.unobserve(mainBtn);
      }
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 pointer-events-none flex justify-center lg:hidden transition-all duration-300 ${
        isMainBtnVisible ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <button
        className={`pointer-events-auto buudy-cart-wipe buudy-display relative flex h-14 w-full max-w-[400px] items-center justify-center overflow-hidden rounded-[35px] border border-[var(--plum)] bg-[var(--plum)] px-6 py-3 text-[15px] font-bold uppercase leading-none tracking-wide text-[var(--cream)] shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] active:scale-[0.98] ${!isRedirecting ? "proxy-bundle-btn" : ""}`}
        type="button"
        disabled={isRedirecting}
        onClick={() => {
          const btn = document.getElementById('main-checkout-btn') as HTMLButtonElement;
          btn?.click();
        }}
      >
        {isRedirecting ? (
          <>
            <span style={{ visibility: "hidden" }} className="inline-flex items-center gap-2">
              <Lock size={16} strokeWidth={1.8} />
              <span>Checkout Securly</span>
            </span>
            <span style={{ position: "absolute", inset: 0 }} className="flex items-center justify-center">
              <Lottie animationData={loadingLottie} loop={true} className="h-16 w-24 scale-[1.35]" />
            </span>
          </>
        ) : (
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            <Lock size={16} strokeWidth={1.8} />
            <span>Checkout Securly</span>
          </span>
        )}
      </button>
    </div>
  );
}

function CartRestoringState() {
  return (
    <section
      aria-live="polite"
      aria-busy="true"
      className="buudy-section bg-[var(--cream)] py-28"
    >
      <div className="buudy-wrap max-w-2xl text-center">
        <ShoppingBag
          className="mx-auto animate-pulse text-[var(--gold)]"
          size={42}
        />
        <h1 className="buudy-heading mt-5">Restoring your bag...</h1>
        <p className="buudy-copy mx-auto mt-5 max-w-lg">
          Bringing your Buudy selections back into view.
        </p>
      </div>
    </section>
  );
}

function DigitalGiftNotice({ line }: { line: CartLine }) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-[rgba(184,149,86,.25)] bg-[rgba(184,149,86,.09)] p-5 md:pl-6 md:pr-36">
      <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:gap-4 md:text-left">
        <div className="flex items-center justify-center gap-3 md:w-auto">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-[var(--card)] text-[var(--gold)] shadow-sm">
            <BookOpen size={22} />
          </span>
          <span className="buudy-mono rounded-full bg-[var(--card)] px-4 py-2 text-[var(--plum)] md:hidden">
            Free digital reward
          </span>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <span className="buudy-mono hidden rounded-full bg-[var(--card)] px-4 py-2 text-[var(--plum)] md:block">
            Free digital reward
          </span>
          <p className="mt-2 buudy-display text-2xl leading-tight text-[var(--plum)]">
            {line.title} is sent by email after checkout.
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            It will not appear as a shipped cart item, but it stays unlocked with
            your mask order so your routine starts the moment your confirmation
            email arrives.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[-24px] right-3 hidden h-32 w-24 rotate-[-7deg] overflow-hidden rounded-xl border border-[rgba(58,31,61,.14)] bg-[var(--card)] shadow-xl md:block">
        <Image
          alt={line.title}
          className="object-contain p-2"
          fill
          sizes="96px"
          src={line.image}
        />
      </div>
    </div>
  );
}
