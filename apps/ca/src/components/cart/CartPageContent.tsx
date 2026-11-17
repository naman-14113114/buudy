"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Gift,
  ShoppingBag,
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

export function CartPageContent({
  initialCustomer,
}: {
  initialCustomer: CheckoutCustomer;
}) {
  const { isHydrated, lines, totals, giftMessage, setGiftMessage } = useCart();
  const [giftMessageOpen, setGiftMessageOpen] = useState(Boolean(giftMessage));
  const [showSaved, setShowSaved] = useState(false);
  const [deliveryIconData, setDeliveryIconData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const timer = useCheckoutCountdown(10 * 60 - 1);

  useEffect(() => {
    fetch(
      "/media/products/buudy-led-mask/images/lottieflow-ecommerce-14-19-aa8e50-easey.json",
    )
      .then((res) => res.json())
      .then((data) => setDeliveryIconData(data))
      .catch((err) => console.error("Error loading delivery lottie", err));
  }, []);

  const visibleLines = useMemo(
    () => getDisplayLines(lines),
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
            Add the Buudy LED Mask or Buudy LED Torch to unlock current offers and
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
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_430px]">
          <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5">
              {visibleLines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <CartSummary>
              <CheckoutForm
                initialCustomer={initialCustomer}
                timer={timer}
                deliveryIconData={deliveryIconData}
              />
            </CartSummary>
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
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          <Lock size={16} strokeWidth={1.8} />
          <span>{isRedirecting ? "Opening Checkout…" : "Checkout Securely"}</span>
        </span>
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
