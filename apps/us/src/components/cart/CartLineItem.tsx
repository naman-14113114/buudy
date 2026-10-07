"use client";
import { StoreText, StoreButton } from '@/components/international/StoreLocale';


import { StoreImage as Image } from '@/components/international/StoreLocale';
import { StoreLink as Link } from '@/components/international/StoreLocale';
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLine } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";
import { NativePrice } from '@/components/international/NativePrice';

export function CartLineItem({ line }: { line: CartLine }) {
  const { setQuantity, removeProduct } = useCart();

  return (
    <div className="flex gap-4 border-b border-[var(--border)] py-5">
      {((line.type === "product" && line.slug) || line.title === "Buudy LED Torch") ? (
        <Link
          aria-label={`View ${line.title}`}
          className="relative h-24 w-20 flex-none overflow-hidden rounded-lg bg-[var(--blush)] transition hover:opacity-90"
          href={line.title === "Buudy LED Torch" ? "/products/red-light-torch" : `/products/${line.slug}`}
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
            <p className="buudy-display text-lg leading-tight text-[var(--plum)]">
              <StoreText>{line.title}</StoreText>
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]"><StoreText>{line.subtitle}</StoreText></p>
          </div>
          <div className="text-right">
            <p className="buudy-display text-lg text-[var(--plum)]">
              {line.unitPriceCents === 0
                ? <StoreText>Free</StoreText>
                : line.productId==='buudy-led-mask'?<NativePrice/>:formatMoney(line.unitPriceCents)}
            </p>
            {line.compareAtCents && line.productId!=='buudy-led-mask' ? (
              <p className="text-xs text-[var(--muted)] line-through">
                {formatMoney(line.compareAtCents)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          {line.locked ? (
            <span className="buudy-mono rounded-full bg-[rgba(184,149,86,.12)] px-3 py-1 text-[var(--gold)]"><StoreText>
              Unlocked x </StoreText><StoreText>{line.quantity}</StoreText>
            </span>
          ) : (
            <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)]">
              <StoreButton
                aria-label="Decrease quantity"
                className="grid h-9 w-9 place-items-center"
                data-testid={`quantity-decrease-${line.productId}`}
                onClick={() => setQuantity(line.productId, line.quantity - 1)}
                type="button"
              >
                <Minus size={14} />
              </StoreButton>
              <span className="buudy-mono min-w-8 text-center text-[var(--plum)]">
                <StoreText>{line.quantity}</StoreText>
              </span>
              <StoreButton
                aria-label="Increase quantity"
                className="grid h-9 w-9 place-items-center"
                data-testid={`quantity-increase-${line.productId}`}
                onClick={() => setQuantity(line.productId, line.quantity + 1)}
                type="button"
              >
                <Plus size={14} />
              </StoreButton>
            </div>
          )}
          {!line.locked ? (
            <StoreButton
              aria-label={`Remove ${line.title}`}
              className="inline-flex items-center gap-2 text-xs text-[var(--muted)] transition hover:text-[var(--plum)]"
              data-testid={`remove-${line.productId}`}
              onClick={() => removeProduct(line.productId)}
              type="button"
            >
              <Trash2 size={14} /><StoreText>
              Remove
            </StoreText></StoreButton>
          ) : null}
        </div>
      </div>
    </div>
  );
}
