"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import Lottie from "lottie-react";
import loadingLottie from "./loading-lottie.json";
import { Button } from "@/components/ui/Button";
import {
  attributionStorageKey,
  pickAttributionFromSearch,
} from "@/lib/attribution";
import { promoCode } from "@/lib/cart";
import { useCart, writeCheckoutSnapshot } from "./CartProvider";

export type CheckoutCustomer = {
  fullName: string;
  email: string;
  phone: string;
  shippingLine1: string;
  shippingLine2: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  marketingOptIn: boolean;
};

type CheckoutFormProps = {
  initialCustomer: CheckoutCustomer;
};

export function CheckoutForm({ initialCustomer }: CheckoutFormProps) {
  const { totals, lines, giftMessage, activePromoCodes, manualPromoCode } =
    useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");
  const [isMorocco, setIsMorocco] = useState(false);
  const hasItems = totals.itemCount > 0;

  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        setIsRedirecting(false);
        setError("");
      }
    }

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("country")
      ? `?country=${encodeURIComponent(params.get("country")!)}`
      : "";
    fetch(`/api/geo${countryParam}`)
      .then((res) => res.json())
      .then((data: { country?: string }) => {
        if (data?.country === "MA" || data?.country === "MOROCCO") {
          setIsMorocco(true);
        }
      })
      .catch(() => {});
  }, []);

  const maskQuantity =
    lines.find(
      (line) => line.type === "product" && line.productId === "buudy-led-mask",
    )?.quantity ?? totals.itemCount;

  function readAttribution() {
    const current = pickAttributionFromSearch(window.location.search);

    try {
      return {
        ...((JSON.parse(
          window.localStorage.getItem(attributionStorageKey) ?? "{}",
        ) as Record<string, string>)),
        ...current,
        checkout_path: window.location.pathname,
        checkout_referrer: document.referrer,
      };
    } catch {
      return current;
    }
  }

  async function handleCheckout() {
    if (!hasItems || isRedirecting) {
      return;
    }

    if (isMorocco) {
      setError("The checkout has not been connected, and no order has been placed.");
      return;
    }

    const attribution = readAttribution();
    writeCheckoutSnapshot({ lines, giftMessage, promoCode, manualPromoCode });
    setError("");
    setIsRedirecting(true);
    window.dispatchEvent(
      new CustomEvent("buudy:started-checkout", {
        detail: {
          lines,
          totals,
        },
      }),
    );

    try {
      const response = await fetch("/api/checkout/prepare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail: initialCustomer.email,
          quantity: maskQuantity, // fallback quantity
          cart: {
            lines,
            giftMessage,
            promoCodes: activePromoCodes,
            manualPromoCode,
          },
          totals,
          attribution,
        }),
      });

      const data = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Could not prepare checkout.");
      }
      if (!data.checkoutUrl) {
        throw new Error("Could not prepare checkout.");
      }

      const checkoutLink = document.createElement("a");
      checkoutLink.href = data.checkoutUrl;
      checkoutLink.rel = "noreferrer noopener";
      checkoutLink.referrerPolicy = "no-referrer";
      checkoutLink.hidden = true;
      document.body.appendChild(checkoutLink);
      checkoutLink.click();
      checkoutLink.remove();
    } catch (checkoutError) {
      setIsRedirecting(false);
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout could not be opened. Please try again.");
    }
  }

  return (
    <>
      <Button
        id="main-checkout-btn"
        className={`relative overflow-hidden w-full rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] active:scale-[0.98] buudy-display ${!isRedirecting ? "proxy-bundle-btn" : "disabled:!opacity-100"}`}
        disabled={!hasItems || isRedirecting}
        onClick={handleCheckout}
        type="button"
      >
        {isRedirecting ? (
          <>
            <span style={{ visibility: "hidden" }} className="flex items-center gap-2">
              <Lock size={17} />
              Checkout securely
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <Lottie animationData={loadingLottie} loop={true} className="h-16 w-24 scale-[1.35]" />
            </span>
          </>
        ) : (
          <>
            <Lock size={17} />
            Checkout securely
          </>
        )}
      </Button>
      {error ? (
        <p className="mt-3 text-center text-xs font-semibold text-[var(--plum)]">
          {error}
        </p>
      ) : null}
    </>
  );
}
