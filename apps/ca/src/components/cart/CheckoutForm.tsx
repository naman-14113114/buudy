"use client";

import { useState, useEffect, useRef } from "react";
import { Lock } from "lucide-react";
import Lottie from "lottie-react";
import loadingLottie from "./loading-lottie.json";
import { Button } from "@/components/ui/Button";
import { attributionStorageKey } from "@/components/integrations/AttributionCapture";
import { buildPlusbaseCheckoutUrl } from "@/lib/site";
import { promoCode } from "@/lib/cart";
import {
  attributionKeys,
  normalizeAttribution,
} from "@/lib/conversions/attribution";
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

type CheckoutFormProps = { initialCustomer: CheckoutCustomer };

export function CheckoutForm({ initialCustomer }: CheckoutFormProps) {
  const { totals, lines, giftMessage, activePromoCodes } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");
  const hasItems = totals.itemCount > 0;
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOriginalVisible, setIsOriginalVisible] = useState(true);

  useEffect(() => {
    if (!buttonRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsOriginalVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        setIsRedirecting(false);
        setError("");
      }
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const maskQuantity =
    lines.find(
      (line) => line.type === "product" && line.productId === "buudy-led-mask",
    )?.quantity ?? totals.itemCount;

  function readAttribution() {
    const params = new URLSearchParams(window.location.search);
    const current: Record<string, string> = {};
    attributionKeys.forEach((key) => {
      const value = params.get(key);
      if (value) current[key] = value;
    });
    try {
      const stored = JSON.parse(
        window.localStorage.getItem(attributionStorageKey) ?? "{}",
      ) as Record<string, string>;
      return normalizeAttribution({ ...stored, ...current });
    } catch {
      return normalizeAttribution(current);
    }
  }

  async function handleCheckout() {
    if (!hasItems || isRedirecting) return;
    const attribution = readAttribution();
    writeCheckoutSnapshot({ lines, giftMessage, promoCode });
    setError("");
    setIsRedirecting(true);
    window.dispatchEvent(
      new CustomEvent("buudy:started-checkout", { detail: { lines, totals } }),
    );
    try {
      const response = await fetch("/api/checkout/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: initialCustomer.email,
          quantity: maskQuantity,
          cart: { lines, giftMessage, promoCodes: activePromoCodes },
          totals,
          attribution,
        }),
      });
      if (!response.ok) throw new Error("Could not prepare checkout.");
      const data = (await response.json()) as { checkoutUrl?: string };
      window.location.assign(
        data.checkoutUrl ?? buildPlusbaseCheckoutUrl({ quantity: maskQuantity }),
      );
    } catch {
      setError("Opening secure checkout...");
      window.location.assign(
        buildPlusbaseCheckoutUrl({ quantity: maskQuantity, extraParams: { ...attribution, discount: "FREE_BUNDLE_CA" } }),
      );
    }
  }

  const checkoutButton = (sticky = false) => (
    <Button
      id={sticky ? undefined : "main-checkout-btn"}
      className={`relative w-full overflow-hidden rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 buudy-display ${
        sticky ? "" : "hover:scale-[1.02] hover:border-[var(--gold)] active:scale-[0.98]"
      } ${!isRedirecting ? "proxy-bundle-btn" : "disabled:!opacity-100"}`}
      disabled={!hasItems || isRedirecting}
      onClick={handleCheckout}
      type="button"
    >
      {isRedirecting ? (
        <>
          <span style={{ visibility: "hidden" }} className="flex items-center gap-2">
            <Lock size={17} /> Checkout securely
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <Lottie animationData={loadingLottie} loop className="h-16 w-24 scale-[1.35]" />
          </span>
        </>
      ) : (
        <><Lock size={17} /> Checkout securely</>
      )}
    </Button>
  );

  return (
    <>
      <div ref={buttonRef} className="w-full">{checkoutButton()}</div>
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transform p-4 pb-6 transition-all duration-300 md:hidden ${
          isOriginalVisible
            ? "pointer-events-none translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {checkoutButton(true)}
      </div>
      {error ? (
        <p className="mt-3 text-center text-xs font-semibold text-[var(--plum)]">
          {error}
        </p>
      ) : null}
    </>
  );
}
