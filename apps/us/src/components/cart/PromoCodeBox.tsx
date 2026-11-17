"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, X } from "lucide-react";
import { getAppliedManualPromoCode } from "@/lib/cart";
import { useCart } from "./CartProvider";

export function PromoCodeBox() {
  const {
    applyManualPromoCode,
    removeManualPromoCode,
    manualPromoCodes,
    manualPromoCode,
    totals,
  } = useCart();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const active = totals.itemCount > 0;

  const appliedList =
    manualPromoCodes && manualPromoCodes.length > 0
      ? manualPromoCodes
      : manualPromoCode
      ? [manualPromoCode]
      : [];

  function handleApply(event?: FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;

    const canonical = getAppliedManualPromoCode(trimmed);
    if (!canonical) {
      setMessage("Invalid promo code.");
      setStatus("error");
      return;
    }

    if (appliedList.includes(canonical)) {
      setCode("");
      setMessage(`${canonical} is already applied.`);
      setStatus("success");
      return;
    }

    const applied = applyManualPromoCode(canonical);
    if (applied) {
      setCode("");
      setMessage(`Code ${canonical} applied successfully.`);
      setStatus("success");
    } else {
      setMessage("Invalid promo code.");
      setStatus("error");
    }
  }

  function handleRemove(codeToRemove: string) {
    removeManualPromoCode(codeToRemove);
    setMessage("");
    setStatus("idle");
  }

  return (
    <div className="space-y-2.5">
      {/* Promo Code Input Form */}
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
          disabled={!active || !code.trim()}
          type="submit"
        >
          Apply
        </button>
      </form>

      {/* Status / Error Message */}
      {active && message ? (
        <p
          aria-live="polite"
          className={`flex items-center gap-1.5 text-xs font-semibold ${
            status === "success" ? "text-[var(--gold)]" : "text-red-600"
          }`}
        >
          {status === "success" ? <CheckCircle2 aria-hidden="true" size={14} /> : null}
          {message}
        </p>
      ) : null}

      {/* Active Promo Code Pills (supports multiple applied promo codes, e.g. BUUDY10 and BLACKFRIDAY10) */}
      {appliedList.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {appliedList.map((applied) => (
            <div
              key={applied}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--cream)] py-1 pl-3.5 pr-1.5 text-xs text-[var(--plum)] shadow-sm"
            >
              <span className="font-semibold uppercase tracking-wider font-mono text-xs">
                {applied}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(applied)}
                className="flex h-5 w-5 items-center justify-center rounded-full text-[var(--muted)] hover:bg-[rgba(58,31,61,.12)] hover:text-[var(--plum)] transition focus-visible:outline-2 focus-visible:outline-[var(--gold)]"
                aria-label={`Remove ${applied} promo code`}
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
