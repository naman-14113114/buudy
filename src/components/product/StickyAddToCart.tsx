"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";

export function StickyAddToCart({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const [visible, setVisible] = useState(false);
  const giftLabel =
    product.gifts.length > 0
      ? ` + ${product.gifts.length} free gifts`
      : " + free shipping";

  useEffect(() => {
    const button = document.getElementById("hero-cta");
    if (!button) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && window.scrollY > 200);
      },
      { threshold: 0 },
    );

    observer.observe(button);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-[rgba(247,241,232,.95)] shadow-[0_-20px_50px_-35px_rgba(0,0,0,.45)] backdrop-blur transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="buudy-wrap flex min-h-[76px] items-center justify-between gap-4 py-3">
        <div className="hidden items-center gap-4 sm:flex">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--blush)]">
            <Image
              alt={product.name}
              className="object-cover"
              fill
              loading="eager"
              sizes="56px"
              src={product.cartImage}
            />
          </div>
          <div>
            <p className="font-semibold text-[var(--plum)]">{product.name}</p>
            <p className="text-sm text-[var(--muted)]">
              {formatMoney(product.priceCents, product.currency)}
              {giftLabel}
            </p>
          </div>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => addProduct(product)}>
          <ShoppingBag size={17} />
          Add to cart{giftLabel}
        </Button>
      </div>
    </div>
  );
}
