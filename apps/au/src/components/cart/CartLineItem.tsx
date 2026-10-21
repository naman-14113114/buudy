"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { CartLine } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";

const MASK_INCLUDED_ITEMS = [
  {
    name: "Premium Travel Box",
    image: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-premium-travel-box-uk.webp",
    alt: "Buudy 7 Colour LED Mask Premium Travel Box AU",
  },
  {
    name: "Eyes Protection",
    image: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-eyes-protection-uk.webp",
    alt: "Buudy 7 Colour LED Mask Eyes Protection AU",
  },
  {
    name: "USB-cable",
    image: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-usb-cable-uk.webp",
    alt: "Buudy 7 Colour LED Mask USB Cable AU",
  },
];

function IncludedInTheBox({
  items,
}: {
  items: { name: string; image: string; alt: string }[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="cart-line-included">
      <button
        type="button"
        className="cart-line-included__btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>Included in the box</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`cart-line-included__chevron${isOpen ? " is-open" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="cart-line-included__grid">
          {items.map((includedItem) => (
            <div
              key={includedItem.name}
              className="cart-line-included__card"
            >
              <div
                className="cart-line-included__thumb"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: 0,
                  overflow: "hidden",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={includedItem.image}
                  alt={includedItem.alt}
                  loading="lazy"
                  width={76}
                  height={76}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "9px",
                  }}
                />
              </div>
              <span className="cart-line-included__label">
                {includedItem.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CartLineItem({ line }: { line: CartLine }) {
  const { setQuantity } = useCart();

  const isTorch =
    line.title === "Buudy LED Torch" || line.id.includes("buudy-led-torch");
  const isEbook =
    line.id.includes("skincare-ebook") ||
    line.slug === "skincare-ebook" ||
    line.productId === "buudy-skincare-ebook" ||
    line.title.toLowerCase().includes("ebook") ||
    line.title.toLowerCase().includes("e-book");

  const isMask =
    line.type === "product" &&
    !isTorch &&
    !isEbook &&
    (line.productId === "buudy-led-mask" ||
      line.id === "buudy-led-mask" ||
      line.slug === "buudy-led-mask" ||
      line.title.toLowerCase().includes("mask"));

  const itemHref = isTorch
    ? "/products/red-light-torch"
    : isEbook
    ? "/products/skincare-ebook"
    : line.type === "product" && line.slug
    ? `/products/${line.slug}`
    : undefined;

  return (
    <div className="flex items-start gap-4 border-b border-[var(--border)] py-5">
      {itemHref ? (
        <Link
          aria-label={`View ${line.title}`}
          className="relative h-24 w-20 flex-none overflow-hidden rounded-lg bg-[var(--blush)] transition hover:opacity-90"
          href={itemHref}
        >
          <Image
            alt={line.title}
            className="object-cover"
            fill
            loading="eager"
            sizes="80px"
            src={line.image}
          />
        </Link>
      ) : (
        <div className="relative h-24 w-20 flex-none overflow-hidden rounded-lg bg-[var(--blush)]">
          <Image
            alt={line.title}
            className="object-cover"
            fill
            loading="lazy"
            sizes="80px"
            src={line.image}
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            {itemHref ? (
              <Link
                href={itemHref}
                className="transition hover:text-[var(--gold)]"
              >
                <p className="buudy-display text-lg leading-tight text-[var(--plum)]">
                  {line.title}
                </p>
              </Link>
            ) : (
              <p className="buudy-display text-lg leading-tight text-[var(--plum)]">
                {line.title}
              </p>
            )}
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{line.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="buudy-display text-lg text-[var(--plum)]">
              {line.unitPriceCents === 0
                ? "Free"
                : formatMoney(line.unitPriceCents)}
            </p>
            {line.compareAtCents && line.compareAtCents > line.unitPriceCents ? (
              <p className="text-xs text-[var(--muted)] line-through">
                {formatMoney(line.compareAtCents)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-3">
          {line.locked ? (
            <span className="buudy-mono rounded-full bg-[rgba(184,149,86,.12)] px-3 py-1 text-[var(--gold)]">
              Unlocked x {line.quantity}
            </span>
          ) : (
            <div className="ml-auto inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)]">
              <button
                aria-label="Decrease quantity"
                className="grid h-9 w-9 place-items-center"
                data-testid={`quantity-decrease-${line.productId}`}
                onClick={() => setQuantity(line.productId, line.quantity - 1)}
                type="button"
              >
                <Minus size={14} />
              </button>
              <span className="buudy-mono min-w-8 text-center text-[var(--plum)]">
                {line.quantity}
              </span>
              <button
                aria-label="Increase quantity"
                className="grid h-9 w-9 place-items-center"
                data-testid={`quantity-increase-${line.productId}`}
                onClick={() => setQuantity(line.productId, line.quantity + 1)}
                type="button"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>

        {isMask ? <IncludedInTheBox items={MASK_INCLUDED_ITEMS} /> : null}
      </div>
    </div>
  );
}
