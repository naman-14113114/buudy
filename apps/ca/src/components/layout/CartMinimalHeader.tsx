"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import Lottie from "lottie-react";
import loadingLottie from "@/components/cart/loading-lottie.json";

const TRUST_ITEMS = [
  "FREE TRACKED SHIPPING \u2022 4.9/5 FROM 16,000+ CUSTOMERS \u2022 SECURE CHECKOUT",
];

export function CartMinimalHeader() {
  const [isRedirecting, setIsRedirecting] = useState(false);

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
    return () => {
      window.removeEventListener("buudy:started-checkout", handleCheckoutStarted);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(58,31,61,.14)] bg-[rgba(247,241,232,.96)]">
      <div className="bg-[var(--plum)] px-4 py-2 text-center text-[var(--cream)]">
        <p className="buudy-mono mx-auto max-w-5xl text-[0.62rem] leading-5 tracking-[0.2em] sm:text-xs">
          {TRUST_ITEMS.map((item, index) => (
            <span key={item}>
              {index > 0 ? (
                <span className="px-2 text-[rgba(247,241,232,.72)]">{"\u2022"}</span>
              ) : null}
              {item}
            </span>
          ))}
        </p>
      </div>

      <div className="buudy-wrap grid min-h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
        <span aria-hidden="true" />
        <Link
          aria-label="Buudy home"
          className="inline-flex shrink-0 items-center justify-self-center"
          href="/"
        >
          <Image
            alt="Buudy Logo"
            className="h-auto w-[132px] object-contain sm:w-[160px]"
            height={74}
            priority
            sizes="(min-width: 640px) 160px, 132px"
            src="/media/products/buudy-led-mask/images/ChatGPT Image May 31, 2026, 12_10_21 AM.png"
            width={220}
          />
        </Link>

        <div className="justify-self-end">
          <button
            className={`buudy-cart-wipe buudy-display relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-[30px] border border-[var(--plum)] bg-[var(--plum)] px-6 py-3 text-xs font-bold uppercase leading-none tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] active:scale-[0.98] sm:text-sm ${!isRedirecting ? "proxy-bundle-btn" : ""}`}
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
                  <span>Buy Now</span>
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <Lottie animationData={loadingLottie} loop={true} className="h-14 w-20 scale-[1.35]" />
                </span>
              </>
            ) : (
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                <Lock size={16} strokeWidth={1.8} />
                <span>Buy Now</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
