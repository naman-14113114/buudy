"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, X } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";

export function PromoCodeBox() {
  const {
    applyManualPromoCode,
    clearManualPromoCode,
    manualPromoCode: appliedCode,
    totals,
  } = useCart();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(
    appliedCode ? "Promo code applied successfully." : "",
  );
  const [status, setStatus] = useState<"idle" | "success" | "error">(
    appliedCode ? "success" : "idle",
  );
  const active = totals.itemCount > 0;

  function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const applied = applyManualPromoCode(code);
    if (applied) {
      setCode("");
      setMessage("Promo code applied successfully.");
      setStatus("success");
      return;
    }

    setMessage("Invalid promo code.");
    setStatus("error");
  }

  function handleRemove() {
    clearManualPromoCode();
    setCode("");
    setMessage("");
    setStatus("idle");
  }

  if (active && appliedCode) {
    return (
      <div className="space-y-3">
        <div aria-live="polite" className="flex items-center justify-between gap-4">
          <span className="flex min-w-0 items-center gap-2 text-xs font-semibold text-[var(--gold)] sm:text-sm">
            <CheckCircle2 aria-hidden="true" className="shrink-0" size={16} />
            <span>Promo code applied successfully.</span>
          </span>
          <span className="buudy-display shrink-0 text-lg text-[var(--plum)]">
            -{formatMoney(totals.promoDiscountCents)}
          </span>
        </div>

        <div className="inline-flex min-w-[150px] items-center justify-between gap-4 rounded-md border border-[var(--border)] bg-[var(--cream)] py-1.5 pl-4 pr-1.5 text-[var(--plum)]">
          <span className="buudy-display text-base uppercase">{appliedCode}</span>
          <button
            aria-label={`Remove ${appliedCode} promo code`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[rgba(58,31,61,.08)] hover:text-[var(--plum)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
            onClick={handleRemove}
            type="button"
          >
            <X aria-hidden="true" size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <form className="flex gap-2 max-[420px]:flex-col" onSubmit={handleApply}>
        <input
          aria-label="Promo code"
          className="buudy-display h-10 min-w-0 flex-1 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 text-sm uppercase text-[var(--plum)] outline-none transition placeholder:text-[rgba(58,31,61,.45)] focus:border-[var(--gold)] disabled:opacity-50"
          disabled={!active}
          onChange={(event) => {
            setCode(event.target.value);
            if (status !== "idle") {
              setMessage("");
              setStatus("idle");
            }
          }}
          placeholder="Enter Promo Code"
          value={active ? code : ""}
        />
        <button
          className="buudy-display h-10 rounded-full bg-[var(--plum)] px-6 text-sm uppercase text-[var(--cream)] transition hover:bg-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-50 md:px-7"
          disabled={!active}
          type="submit"
        >
          Apply
        </button>
      </form>
      {active && message ? (
        <p
          aria-live="polite"
          className={`mt-2 flex items-center gap-2 text-xs font-semibold ${
            status === "success" ? "text-[var(--gold)]" : "text-red-600"
          }`}
        >
          {status === "success" ? <CheckCircle2 aria-hidden="true" size={15} /> : null}
          {message}
        </p>
      ) : null}
    </>
  );
}
