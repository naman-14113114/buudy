"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  Home,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  MapPin,
} from "lucide-react";
import type { TrackingData } from "@/lib/order-tracking";

export function OrderTrackingPage() {
  const [query, setQuery] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const handleSearch = useCallback((searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) {
      setError("Please enter your tracking number or order number.");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/order-tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });

        const json = await res.json();

        if (res.ok && json.status === "found" && json.data) {
          setTrackingData(json.data);
          setError(null);
        } else {
          setTrackingData(null);
          setError(
            json.message ||
              "No tracking record was found for this number. Please verify the code from your confirmation email.",
          );
        }
      } catch {
        setTrackingData(null);
        setError("Unable to connect to the tracking network right now. Please try again shortly.");
      }
    });
  }, []);

  // Check URL query parameter on initial load (e.g. ?tracking=... or ?number=...)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const rawQuery = params.get("tracking") || params.get("number") || params.get("order");
    if (!rawQuery) return;
    const initialQuery = rawQuery.trim();
    if (!initialQuery) return;

    let ignore = false;
    async function loadInitial() {
      try {
        const res = await fetch("/api/order-tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: initialQuery }),
        });
        const json = await res.json();
        if (!ignore) {
          setQuery(initialQuery);
          if (res.ok && json.status === "found" && json.data) {
            setTrackingData(json.data);
            setError(null);
          } else {
            setTrackingData(null);
            setError(
              json.message ||
                "Unable to retrieve tracking information. Please check your tracking number and try again.",
            );
          }
        }
      } catch {
        // Ignore initial load network errors
      }
    }

    void loadInitial();
    return () => {
      ignore = true;
    };
  }, []);

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-24 pt-12 md:pt-16">
      <div className="buudy-wrap">
        {/* Header Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="buudy-display text-4xl text-[var(--plum)] sm:text-5xl md:text-6xl">
            Order Tracking
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Enter your tracking number or Buudy order number below to check the real-time status of your delivery.
          </p>

          {/* Search Box */}
          <div className="mx-auto mt-8 max-w-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="relative flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter tracking number (e.g. 9400..., 1Z... or #order)"
                  className="h-14 w-full rounded-full border border-[var(--border)] bg-white/90 pl-11 pr-10 text-sm font-medium text-[var(--plum)] shadow-sm outline-none transition placeholder:text-[var(--muted)]/60 focus:border-[var(--plum)] focus:bg-white focus:ring-2 focus:ring-[var(--plum)]/10"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--plum)]"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="buudy-cart-wipe inline-flex h-14 min-w-[150px] items-center justify-center gap-2 rounded-full border border-[var(--plum)] bg-[var(--plum)] px-7 text-sm font-semibold text-[var(--cream)] shadow-md transition hover:border-[var(--gold)] disabled:pointer-events-none disabled:opacity-60"
              >
                {isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Tracking...
                  </span>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 flex items-start gap-3.5 rounded-2xl border border-[rgba(58,31,61,0.15)] bg-white/90 p-5 text-left shadow-sm backdrop-blur-sm sm:items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertCircle size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-[var(--plum)]">Order Not Found</p>
                  <p className="text-xs sm:text-sm font-light text-[var(--muted)] leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tracking Details View */}
        {trackingData && (
          <div className="mx-auto mt-12 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Overview Card */}
            <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white/95 p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)]/60 pb-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                      Order Reference
                    </span>
                    <span className="font-mono text-sm font-bold text-[var(--plum)]">
                      {trackingData.orderRef}
                    </span>
                  </div>
                  <h2 className="mt-1 text-2xl font-bold text-[var(--plum)] sm:text-3xl">
                    {trackingData.status}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                      trackingData.statusCode === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800"
                        : trackingData.statusCode === "OUT_FOR_DELIVERY"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-[rgba(58,31,61,0.08)] text-[var(--plum)]"
                    }`}
                  >
                    {trackingData.statusCode === "DELIVERED" ? (
                      <CheckCircle2 size={14} className="text-emerald-600" />
                    ) : trackingData.statusCode === "OUT_FOR_DELIVERY" ? (
                      <MapPin size={14} className="text-amber-600" />
                    ) : (
                      <Clock size={14} className="text-[var(--gold)]" />
                    )}
                    {trackingData.status}
                  </span>
                </div>
              </div>

              {/* Order Metadata Grid */}
              <div
                className={`mt-6 grid grid-cols-2 gap-4 ${
                  trackingData.statusCode === "DELIVERED" ? "sm:grid-cols-4" : "sm:grid-cols-3"
                } sm:gap-6`}
              >
                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                    Tracking Number
                  </span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-[var(--plum)] sm:text-sm">
                      {trackingData.trackingNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(trackingData.trackingNumber)}
                      title="Copy Tracking Number"
                      className="rounded p-1 text-[var(--muted)] transition hover:bg-[var(--cream)] hover:text-[var(--plum)]"
                    >
                      {copied ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                    Destination
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[var(--plum)]">
                    {trackingData.destination}
                  </span>
                </div>

                <div>
                  <span className="block text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                    Order Date
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[var(--plum)]">
                    {trackingData.orderDate || "Verified"}
                  </span>
                </div>

                {trackingData.statusCode === "DELIVERED" && trackingData.estimatedDelivery && (
                  <div>
                    <span className="block text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                      Delivered Date
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-emerald-700">
                      {trackingData.estimatedDelivery}
                    </span>
                  </div>
                )}
              </div>

              {/* Progress Bar / Stepper */}
              <div className="mt-10 pt-6">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-[var(--muted)]">
                  <span>Delivery Journey</span>
                  <span className="text-[var(--plum)]">{trackingData.progressPercentage}% Complete</span>
                </div>

                {/* Linear Bar */}
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[rgba(58,31,61,0.08)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--plum)] to-[var(--gold)] transition-all duration-700 ease-out"
                    style={{ width: `${trackingData.progressPercentage}%` }}
                  />
                </div>

                {/* Step Icons & Labels */}
                <div className="mt-6 grid grid-cols-5 gap-1.5 sm:gap-2">
                  {[
                    {
                      label: "Order Placed",
                      desc: "Confirmed",
                      icon: CheckCircle2,
                      step: 0,
                    },
                    {
                      label: "Processing",
                      desc: "Quality Check",
                      icon: Package,
                      step: 1,
                    },
                    {
                      label: "In Transit",
                      desc: "On the way",
                      icon: Truck,
                      step: 2,
                    },
                    {
                      label: "Out for Delivery",
                      desc: "With Courier",
                      icon: MapPin,
                      step: 3,
                    },
                    {
                      label: "Delivered",
                      desc: "Arrived",
                      icon: Home,
                      step: 4,
                    },
                  ].map((s) => {
                    const isCompleted = trackingData.activeStepIndex >= s.step;
                    const isCurrent = trackingData.activeStepIndex === s.step;

                    const IconComponent = s.icon;

                    return (
                      <div key={s.label} className="flex flex-col items-center text-center">
                        <div
                          className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 sm:h-12 sm:w-12 ${
                            isCompleted
                              ? "bg-[var(--plum)] text-[var(--cream)] shadow-sm"
                              : "bg-[rgba(58,31,61,0.08)] text-[var(--muted)]"
                          } ${isCurrent ? "ring-4 ring-[var(--gold)]/30" : ""}`}
                        >
                          <IconComponent size={18} className="sm:h-5 sm:w-5" />
                          {isCurrent && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
                              <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--gold)]" />
                            </span>
                          )}
                        </div>

                        <span
                          className={`mt-2 text-[11px] font-bold leading-tight sm:text-xs md:text-sm ${
                            isCompleted ? "text-[var(--plum)]" : "text-[var(--muted)]"
                          }`}
                        >
                          {s.label}
                        </span>
                        <span className="hidden text-[11px] text-[var(--muted)] sm:inline-block">
                          {s.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shipment Milestones Timeline */}
            <div className="rounded-3xl border border-[var(--border)] bg-white/95 p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-[var(--border)]/60 pb-5">
                <div className="flex items-center gap-2.5">
                  <Truck size={20} className="text-[var(--gold)]" />
                  <h3 className="buudy-display text-xl text-[var(--plum)] sm:text-2xl">
                    Shipment Timeline
                  </h3>
                </div>
                <span className="text-xs text-[var(--muted)]">Updates in Real-Time</span>
              </div>

              <div className="relative mt-8 space-y-8 pl-6 before:absolute before:bottom-3 before:left-3 before:top-3 before:w-[2px] before:bg-[var(--border)] sm:pl-8 sm:before:left-4">
                {trackingData.timeline.map((event, index) => {
                  return (
                    <div key={`${event.title}-${index}`} className="relative group">
                      {/* Circle Dot */}
                      <span
                        className={`absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white sm:-left-[37px] sm:h-5 sm:w-5 ${
                          event.completed
                            ? "bg-[var(--plum)] shadow-sm"
                            : "bg-[var(--border)]"
                        }`}
                      >
                        {event.completed && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cream)]" />
                        )}
                      </span>

                      {/* Content */}
                      <div className="rounded-2xl border border-transparent bg-[var(--cream)]/40 p-4 transition group-hover:border-[var(--border)] group-hover:bg-[var(--cream)]">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                          <h4
                            className={`text-sm font-bold sm:text-base ${
                              event.completed ? "text-[var(--plum)]" : "text-[var(--muted)]"
                            }`}
                          >
                            {event.title}
                          </h4>
                          <span className="text-xs font-semibold text-[var(--gold)]">
                            {event.date}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-light leading-relaxed text-[var(--muted)] sm:text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items & Support Box */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Order Items */}
              <div className="rounded-3xl border border-[var(--border)] bg-white/95 p-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-[var(--border)]/60 pb-4">
                  <Package size={18} className="text-[var(--plum)]" />
                  <h4 className="font-bold text-[var(--plum)]">Order Contents</h4>
                </div>
                <div className="mt-4 divide-y divide-[var(--border)]/40">
                  {trackingData.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--plum)]">{item.title}</p>
                        {item.variant && (
                          <p className="text-xs text-[var(--muted)]">{item.variant}</p>
                        )}
                      </div>
                      <span className="rounded-full bg-[var(--cream)] px-3 py-1 text-xs font-bold text-[var(--plum)]">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Assistance */}
              <div className="flex flex-col justify-between rounded-3xl border border-[var(--border)] bg-gradient-to-br from-white to-[var(--cream)]/60 p-6 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 border-b border-[var(--border)]/60 pb-4">
                    <HelpCircle size={18} className="text-[var(--gold)]" />
                    <h4 className="font-bold text-[var(--plum)]">Need Help With This Order?</h4>
                  </div>
                  <p className="mt-4 text-xs font-light leading-relaxed text-[var(--muted)] sm:text-sm">
                    Have questions about delivery timing or need to request assistance? Our dedicated US customer care team is here to support you.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:support@buudy.com"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--plum)] bg-[var(--plum)] px-5 text-xs font-semibold text-[var(--cream)] transition hover:border-[var(--gold)]"
                  >
                    Contact Support
                  </a>
                  <Link
                    href="/pages/faqs"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--border)] bg-white px-5 text-xs font-semibold text-[var(--plum)] transition hover:bg-[var(--cream)]"
                  >
                    View Shipping FAQs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
