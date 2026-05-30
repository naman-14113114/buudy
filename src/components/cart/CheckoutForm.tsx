"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo } from "react";
import { Lock, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { recordCheckoutAction } from "@/app/actions/checkout";
import { Button } from "@/components/ui/Button";
import { formatMoney } from "@/lib/money";
import {
  initialCheckoutState,
  type CheckoutActionState,
} from "@/types/actions";
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
  const { totals } = useCart();
  const hasItems = totals.itemCount > 0;

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
        disabled={!hasItems}
        onClick={() => {
          window.location.href = "https://buudy.com/pages/add-to-cart?variant_id=1000019092784268&product_id=1000000611225890&gift_variant_id=1000020018633106&gift_product_id=1000000647209032&gift=buudy-red-torch&redirect=checkout&product_handle=buudy-led-mask&source=learn_buudy&utm_source=learn.buudy.com&utm_medium=learn_cart_checkout&utm_campaign=cart_review";
        }}
        type="button"
      >
        <Lock size={17} />
        Checkout securely
      </Button>
    </>
  );
}
