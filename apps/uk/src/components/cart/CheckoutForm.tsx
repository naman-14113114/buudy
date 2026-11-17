"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Lock, Truck } from "lucide-react";
import Lottie from "lottie-react";
import loadingLottie from "./loading-lottie.json";
import { Button } from "@/components/ui/Button";
import {
  attributionStorageKey,
  pickAttributionFromSearch,
} from "@/lib/attribution";
import { calculateCartTotals, getAppliedManualPromoCode, promoCode } from "@/lib/cart";
import { buildFastWhopCheckoutUrl } from "@/lib/checkout";
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
  timer?: string;
  deliveryIconData?: Record<string, unknown> | null;
};

export function CheckoutForm({
  initialCustomer,
  timer,
  deliveryIconData,
}: CheckoutFormProps) {
  const {
    totals,
    lines,
    giftMessage,
    activePromoCodes,
    manualPromoCode,
    manualPromoCodes,
    applyManualPromoCode,
  } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectingRef = useRef(false);
  const [error, setError] = useState("");
  const [isMorocco, setIsMorocco] = useState(false);
  const [hasKnownCountry, setHasKnownCountry] = useState(false);
  const hasItems = totals.itemCount > 0;

  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        redirectingRef.current = false;
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
        // A query override is useful for previewing copy, not for bypassing
        // the server's country guard. Unknown countries also retain that path.
        setHasKnownCountry(Boolean(data?.country) && !params.has("country"));
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
    if (typeof window === "undefined") return {};
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

  const getComputedCheckoutUrl = useCallback(() => {
    const attribution = readAttribution();

    let extraCode = "";
    if (typeof document !== "undefined") {
      const promoInput = document.querySelector('input[aria-label="Promo code"]') as HTMLInputElement | null;
      if (promoInput?.value) {
        const canonical = getAppliedManualPromoCode(promoInput.value);
        if (canonical) {
          extraCode = canonical;
        }
      }
    }

    const appliedCodesList = Array.from(
      new Set(
        [
          ...(manualPromoCodes || []),
          manualPromoCode,
          extraCode,
        ]
          .map((c) => getAppliedManualPromoCode(c))
          .filter(Boolean),
      ),
    );

    return (
      buildFastWhopCheckoutUrl(lines, appliedCodesList, attribution) ||
      "https://buudy.com/checkout/plan_IY6bXASo3Gh15"
    );
  }, [lines, manualPromoCode, manualPromoCodes]);

  const [preloadedUrl, setPreloadedUrl] = useState<string | null>(null);

  const warmCheckout = useCallback(() => {
    if (!hasItems) return;
    const url = getComputedCheckoutUrl();
    setPreloadedUrl((prev) => (prev === url ? prev : url));
  }, [hasItems, getComputedCheckoutUrl]);

  useEffect(() => {
    if (!hasItems) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const runWarmup = () => {
      warmCheckout();
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(runWarmup, { timeout: 1000 });
    }
    timeoutId = setTimeout(runWarmup, 150);

    const handleGlobalWarmup = () => {
      warmCheckout();
    };
    window.addEventListener("buudy:warmup-checkout", handleGlobalWarmup);

    return () => {
      if (idleId !== undefined && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("buudy:warmup-checkout", handleGlobalWarmup);
    };
  }, [hasItems, warmCheckout]);

  async function handleCheckout() {
    if (!hasItems || redirectingRef.current) {
      return;
    }

    if (isMorocco) {
      setError("The checkout has not been connected, and no order has been placed.");
      return;
    }

    const attribution = readAttribution();

    // Ensure any promo code typed into the promo input is captured even if not clicked or submitted
    let extraCode = "";
    if (typeof document !== "undefined") {
      const promoInput = document.querySelector('input[aria-label="Promo code"]') as HTMLInputElement | null;
      if (promoInput?.value) {
        const canonical = getAppliedManualPromoCode(promoInput.value);
        if (canonical) {
          extraCode = canonical;
          applyManualPromoCode(canonical);
        }
      }
    }

    const appliedCodesList = Array.from(
      new Set(
        [
          ...(manualPromoCodes || []),
          manualPromoCode,
          extraCode,
        ]
          .map((c) => getAppliedManualPromoCode(c))
          .filter(Boolean),
      ),
    );
    const primaryCode = appliedCodesList[0] || "";
    const effectiveTotals = calculateCartTotals(lines, appliedCodesList);

    writeCheckoutSnapshot({
      lines,
      giftMessage,
      promoCode,
      manualPromoCode: primaryCode,
      manualPromoCodes: appliedCodesList,
    });
    setError("");
    redirectingRef.current = true;
    setIsRedirecting(true);
    window.dispatchEvent(
      new CustomEvent("buudy:started-checkout", {
        detail: {
          lines,
          totals: effectiveTotals,
        },
      }),
    );

    try {
      let checkoutUrl = hasKnownCountry ? buildFastWhopCheckoutUrl(lines, appliedCodesList, attribution) : null;
      if (!checkoutUrl) {
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
              promoCodes: appliedCodesList,
              manualPromoCode: primaryCode,
              manualPromoCodes: appliedCodesList,
            },
            totals: effectiveTotals,
            attribution,
          }),
        });

        const data = (await response.json()) as { checkoutUrl?: string; error?: string };
        if (!response.ok || !data.checkoutUrl) throw new Error(data.error || "Could not prepare checkout.");
        checkoutUrl = data.checkoutUrl;
      }

      // Both paths whitelist attribution. Suppress the referrer so unrelated
      // cart URL parameters never become visible on the payment page.
      const checkoutLink = document.createElement("a");
      checkoutLink.href = checkoutUrl;
      checkoutLink.rel = "noreferrer noopener";
      checkoutLink.referrerPolicy = "no-referrer";
      checkoutLink.hidden = true;
      document.body.appendChild(checkoutLink);
      checkoutLink.click();
      checkoutLink.remove();
    } catch (checkoutError) {
      redirectingRef.current = false;
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
        onMouseEnter={warmCheckout}
        onTouchStart={warmCheckout}
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
      {preloadedUrl ? (
        <>
          <link rel="prefetch" href={preloadedUrl} as="document" />
          <iframe
            src={preloadedUrl}
            title="Checkout Preloader"
            tabIndex={-1}
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              border: 0,
              opacity: 0,
              pointerEvents: "none",
            }}
          />
        </>
      ) : null}
      {error ? (
        <p className="mt-3 text-center text-xs font-semibold text-[var(--plum)]">
          {error}
        </p>
      ) : null}
      {timer ? (
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[var(--plum)]">
          {deliveryIconData ? (
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
              <Lottie animationData={deliveryIconData} loop={true} />
            </div>
          ) : (
            <Truck size={15} className="text-[var(--gold)] shrink-0" />
          )}
          <span>
            Order within <span className="font-bold text-[var(--plum)]">{timer}</span> to get early dispatch
          </span>
        </div>
      ) : null}
    </>
  );
}
