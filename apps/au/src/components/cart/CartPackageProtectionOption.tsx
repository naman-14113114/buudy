"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { buudyPackageProtection } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";

export function CartPackageProtectionOption() {
  const { lines, addProduct, removeProduct, totals } = useCart();
  const protectionProduct = buudyPackageProtection;

  // Only show when there are items in the cart
  if (totals.itemCount <= 0 || !protectionProduct) {
    return null;
  }

  const isProtectionAdded = lines.some(
    (line) => line.productId === protectionProduct.id && line.quantity > 0,
  );

  const toggleProtection = () => {
    if (isProtectionAdded) {
      removeProduct(protectionProduct.id);
    } else {
      addProduct(protectionProduct);
    }
  };

  return (
    <div
      onClick={toggleProtection}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggleProtection();
        }
      }}
      className={`mt-3.5 rounded-xl border p-3 sm:p-3.5 transition-all duration-200 cursor-pointer select-none ${
        isProtectionAdded
          ? "border-[var(--plum)] bg-[rgba(184,149,86,0.06)] shadow-sm"
          : "border-[var(--border)] bg-[var(--card)] hover:border-[rgba(58,31,61,0.25)]"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Custom Checkbox */}
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            type="checkbox"
            checked={isProtectionAdded}
            onChange={toggleProtection}
            className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
            aria-label="Add Buudy Package Protection"
          />
          <span
            aria-hidden="true"
            className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all pointer-events-none ${
              isProtectionAdded
                ? "bg-[var(--plum)] border-[var(--plum)] text-[var(--cream)]"
                : "bg-white border-[rgba(58,31,61,0.3)]"
            }`}
          >
            {isProtectionAdded && <Check size={13} strokeWidth={3} />}
          </span>
        </span>

        {/* Thumbnail */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[rgba(58,31,61,0.12)] bg-[var(--cream)] flex items-center justify-center">
          <Image
            src={protectionProduct.cartImage}
            alt="Buudy Package Protection"
            width={40}
            height={40}
            className="object-contain p-1"
          />
        </div>

        {/* Details & Clean Price */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="buudy-display text-sm font-semibold text-[var(--plum)] leading-tight">
              Package Protection
            </span>
            <span className="buudy-display text-sm font-bold text-[var(--plum)] shrink-0">
              +{formatMoney(protectionProduct.priceCents)}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] leading-tight text-[var(--muted)]">
            Complete transit damage, loss & theft guarantee
          </p>
        </div>
      </div>
    </div>
  );
}
