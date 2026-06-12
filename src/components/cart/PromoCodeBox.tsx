"use client";

import { CheckCircle2 } from "lucide-react";
import { useCart } from "./CartProvider";

export function PromoCodeBox() {
  const { activePromoCodes, totals } = useCart();
  const active = totals.itemCount > 0;
  const codes =
    activePromoCodes.length > 0 ? activePromoCodes.join(" + ") : "AUTO";

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[rgba(241,223,210,.35)] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="buudy-mono text-[var(--gold)]">Promo code</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {active
              ? "Applied automatically for product offers and free shipping."
              : "Add a Buudy product to unlock the current offer."}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--cream)] px-3 py-2 text-xs font-semibold text-[var(--plum)]">
          {active ? (
            <CheckCircle2 size={15} className="text-[var(--gold)]" />
          ) : null}
          {codes}
        </span>
      </div>
    </div>
  );
}
