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

function getFieldError(state: CheckoutActionState, name: string) {
  return state.fieldErrors?.[name]?.[0];
}

function inputClasses(hasError = false) {
  return [
    "mt-2 h-12 w-full rounded-xl border bg-[var(--cream)] px-4 text-sm text-[var(--plum)] outline-none transition",
    hasError ? "border-red-300 focus:border-red-500" : "border-[var(--border)] focus:border-[var(--plum)]",
  ].join(" ");
}

export function CheckoutForm({ initialCustomer }: CheckoutFormProps) {
  const router = useRouter();
  const { lines, promoCode, giftMessage, totals, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(
    recordCheckoutAction,
    initialCheckoutState,
  );
  const cartJson = useMemo(
    () => JSON.stringify({ lines, promoCode, giftMessage }),
    [giftMessage, lines, promoCode],
  );
  const hasItems = totals.itemCount > 0;

  useEffect(() => {
    if (state.status === "success" && state.orderNumber) {
      clearCart();
      router.push(`/order-confirmation/${state.orderNumber}`);
    }
  }, [clearCart, router, state.orderNumber, state.status]);

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
    >
      <input name="cartJson" type="hidden" value={cartJson} />
      <div>
        <p className="buudy-mono text-[var(--gold)]">Checkout details</p>
        <h2 className="buudy-display mt-2 text-3xl text-[var(--plum)]">
          Record your order.
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Guest checkout stays open for conversion. Signed-in customers will see
          this order in their Buudy account.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Full name</span>
          <span className="relative block">
            <UserRound
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gold)]"
              size={17}
            />
            <input
              autoComplete="name"
              className={`${inputClasses(Boolean(getFieldError(state, "fullName")))} pl-11`}
              defaultValue={initialCustomer.fullName}
              name="fullName"
              placeholder="Customer name"
              required
              type="text"
            />
          </span>
          {getFieldError(state, "fullName") ? (
            <span className="mt-2 block text-sm text-red-700">
              {getFieldError(state, "fullName")}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Email</span>
          <span className="relative block">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gold)]"
              size={17}
            />
            <input
              autoComplete="email"
              className={`${inputClasses(Boolean(getFieldError(state, "email")))} pl-11`}
              defaultValue={initialCustomer.email}
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </span>
          {getFieldError(state, "email") ? (
            <span className="mt-2 block text-sm text-red-700">
              {getFieldError(state, "email")}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Phone</span>
          <span className="relative block">
            <Phone
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gold)]"
              size={17}
            />
            <input
              autoComplete="tel"
              className={`${inputClasses(Boolean(getFieldError(state, "phone")))} pl-11`}
              defaultValue={initialCustomer.phone}
              name="phone"
              placeholder="+1 555 000 0000"
              type="tel"
            />
          </span>
        </label>

        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Shipping address</span>
          <span className="relative block">
            <MapPin
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gold)]"
              size={17}
            />
            <input
              autoComplete="address-line1"
              className={`${inputClasses(Boolean(getFieldError(state, "shippingLine1")))} pl-11`}
              defaultValue={initialCustomer.shippingLine1}
              name="shippingLine1"
              placeholder="Street address"
              type="text"
            />
          </span>
        </label>

        <input
          autoComplete="address-line2"
          className={inputClasses(Boolean(getFieldError(state, "shippingLine2")))}
          defaultValue={initialCustomer.shippingLine2}
          name="shippingLine2"
          placeholder="Apartment, suite, etc. (optional)"
          type="text"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            autoComplete="address-level2"
            className={inputClasses(Boolean(getFieldError(state, "shippingCity")))}
            defaultValue={initialCustomer.shippingCity}
            name="shippingCity"
            placeholder="City"
            type="text"
          />
          <input
            autoComplete="address-level1"
            className={inputClasses(Boolean(getFieldError(state, "shippingState")))}
            defaultValue={initialCustomer.shippingState}
            name="shippingState"
            placeholder="State"
            type="text"
          />
          <input
            autoComplete="postal-code"
            className={inputClasses(Boolean(getFieldError(state, "shippingPostalCode")))}
            defaultValue={initialCustomer.shippingPostalCode}
            name="shippingPostalCode"
            placeholder="Postal code"
            type="text"
          />
          <input
            autoComplete="country-name"
            className={inputClasses(Boolean(getFieldError(state, "shippingCountry")))}
            defaultValue={initialCustomer.shippingCountry || "United States"}
            name="shippingCountry"
            placeholder="United States"
            type="text"
          />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[rgba(241,223,210,.32)] p-4 text-sm text-[var(--muted)]">
          <input
            className="mt-1 h-4 w-4 accent-[var(--plum)]"
            defaultChecked={initialCustomer.marketingOptIn}
            name="marketingOptIn"
            type="checkbox"
          />
          <span>Email me order updates, care tips, and Buudy offers.</span>
        </label>
      </div>

      <div className="mt-6 space-y-3 border-t border-[var(--border)] pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">Order total</span>
          <span className="font-semibold text-[var(--plum)]">
            {formatMoney(totals.totalCents)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">Shipping</span>
          <span className="font-semibold text-[var(--plum)]">
            {hasItems ? "Free" : formatMoney(0)}
          </span>
        </div>
      </div>

      {state.message && state.status !== "success" ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {state.message}
        </div>
      ) : null}

      <Button
        className="mt-5 w-full"
        disabled={!hasItems || pending || state.status === "success"}
        type="submit"
      >
        <Lock size={17} />
        {pending ? "Recording order..." : "Checkout securely"}
      </Button>
    </form>
  );
}
