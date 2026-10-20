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

  const appliedCodes =
    manualPromoCodes && manualPromoCodes.length > 0
      ? manualPromoCodes
      : manualPromoCode
      ? [manualPromoCode]
      : [];

  function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    const canonical = getAppliedManualPromoCode(trimmed);
    if (canonical && appliedCodes.includes(canonical)) {
      setMessage("Code already applied.");
      setStatus("error");
      return;
    }

    const applied = applyManualPromoCode(trimmed);
    if (applied) {
      setCode("");
      setMessage("Code applied successfully.");
      setStatus("success");
      return;
    }

    setMessage("Invalid promo code.");
    setStatus("error");
  }

  function handleRemove(codeToRemove: string) {
    removeManualPromoCode(codeToRemove);
    setMessage("");
    setStatus("idle");
  }

  return (
    <div className="space-y-2.5">
      {/* Promo Code Input Form (Always Visible) */}
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

      {/* Applied Promo Code Pills (4 chars + ... with cross on right end) */}
      {appliedCodes.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {appliedCodes.map((applied) => {
            const displayCode = applied.length > 4 ? `${applied.slice(0, 4)}...` : applied;
            return (
              <div
                key={applied}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--cream)] py-1 pl-3.5 pr-1.5 text-xs text-[var(--plum)] shadow-sm"
              >
                <span className="font-semibold uppercase tracking-wider font-mono text-xs">
                  {displayCode}
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
            );
          })}
        </div>
      )}
    </div>
  );
}
