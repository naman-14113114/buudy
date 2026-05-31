"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import Lottie from "lottie-react";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";

export function StickyAddToCart({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [cartIconData, setCartIconData] = useState<any>(null);

  useEffect(() => {
    fetch("/media/products/buudy-led-mask/images/lottieflow-ecommerce-14-8-f6ede2-cart.json")
      .then((res) => res.json())
      .then((data) => setCartIconData(data))
      .catch((err) => console.error("Error loading sticky cart lottie", err));
  }, []);

  const giftLabel =
    product.gifts.length > 0
      ? ` + ${product.gifts.length} free gifts`
      : " + free shipping";

  useEffect(() => {
    const button = document.getElementById("hero-cta");
    if (!button) {
      return;
    }

    let frame = 0;
    const updateVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect();
        setVisible(rect.bottom < 0);
      });
    };

    const observer = new IntersectionObserver(
      () => {
        updateVisibility();
      },
      { threshold: [0, 1] },
    );

    observer.observe(button);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-3 left-3 right-[5.25rem] z-40 transition duration-300 ease-out sm:inset-x-0 sm:bottom-5 sm:px-3 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-[calc(100%+2rem)] opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex min-h-12 w-fit max-w-full items-center rounded-full border border-[var(--border)] bg-[var(--card)] p-1 shadow-[0_18px_42px_-20px_rgba(58,31,61,.68)] sm:mx-auto sm:min-h-[78px] sm:w-full sm:max-w-[850px] sm:justify-between sm:gap-5 sm:px-3 sm:py-2.5">
        <div className="hidden min-w-0 items-center gap-4 sm:flex">
          <div className="relative h-14 w-14 flex-none overflow-hidden rounded-full border border-[var(--border)] bg-[var(--blush)]">
            <Image
              alt={product.name}
              className="object-cover"
              fill
              loading="eager"
              sizes="56px"
              src={product.cartImage}
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-[var(--plum)]">
              {product.name}
            </p>
            <p className="truncate text-sm text-[var(--muted)]">
              {formatMoney(product.priceCents, product.currency)}
              {giftLabel}
            </p>
          </div>
        </div>
        <Button
          aria-label={`Add ${product.name} to cart${giftLabel}`}
          className="min-h-11 flex-none px-4 text-xs sm:min-h-12 sm:px-6 sm:text-sm"
          onClick={() => {
            addProduct(product);
            router.push("/cart");
          }}
        >
          {cartIconData ? (
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
              <Lottie animationData={cartIconData} loop={true} />
            </div>
          ) : (
            <ShoppingBag size={17} />
          )}
          <span className="sm:hidden">Add to cart</span>
          <span className="hidden sm:inline">Add to cart{giftLabel}</span>
        </Button>
      </div>
    </div>
  );
}
