"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { attributionStorageKey } from "@/components/integrations/AttributionCapture";
import { buildPlusbaseCheckoutUrl } from "@/lib/site";
import { useCart } from "./CartProvider";

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
  const { totals, lines, giftMessage, activePromoCodes } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState("");
  const hasItems = totals.itemCount > 0;
  const maskQuantity =
    lines.find(
      (line) => line.type === "product" && line.productId === "buudy-led-mask",
    )?.quantity ?? totals.itemCount;

  function readAttribution() {
    const currentParams = new URLSearchParams(window.location.search);
    const current: Record<string, string> = {};

    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "msclkid",
      "gclid",
      "fbclid",
      "source",
    ].forEach((key) => {
      const value = currentParams.get(key);
      if (value) {
        current[key] = value;
      }
    });

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

    const attribution = readAttribution();
    setError("");
    setIsRedirecting(true);

    try {
      const response = await fetch("/api/checkout/prepare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail: initialCustomer.email,
          quantity: maskQuantity,
          cart: {
            lines,
            giftMessage,
            promoCodes: activePromoCodes,
          },
          totals,
          attribution,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not prepare checkout.");
      }

      const data = (await response.json()) as { checkoutUrl?: string };
      window.location.assign(
        data.checkoutUrl ?? buildPlusbaseCheckoutUrl({ quantity: maskQuantity }),
      );
    } catch {
      setError("Opening secure checkout...");
      window.location.assign(
        buildPlusbaseCheckoutUrl({
          quantity: maskQuantity,
          extraParams: attribution,
        }),
      );
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cta-shine {
          0% { transform: skewX(-20deg) translateX(-150%); opacity: 0; }
          20% { opacity: 0.6; }
          50%, 100% { transform: skewX(-20deg) translateX(250%); opacity: 0; }
        }
        .cart-checkout-btn {
          position: relative;
          overflow: hidden;
        }
        .cart-checkout-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg) translateX(-150%);
          animation: cta-shine 3s infinite ease-in-out;
          z-index: 1;
          pointer-events: none;
        }
      ` }} />
      <Button
        className="w-full py-4 text-xl font-bold tracking-wide uppercase buudy-display text-[var(--cream)] bg-[var(--ink)] hover:bg-[var(--plum)] rounded-[30px] border border-[var(--ink)] hover:border-[var(--plum)] shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cart-checkout-btn"
        disabled={!hasItems || isRedirecting}
        onClick={handleCheckout}
        type="button"
      >
        <Lock size={17} />
        {isRedirecting ? "Opening secure checkout..." : "Checkout securely"}
      </Button>
      {error ? (
        <p className="mt-3 text-center text-xs font-semibold text-[var(--plum)]">
          {error}
        </p>
      ) : null}
    </>
  );
}
