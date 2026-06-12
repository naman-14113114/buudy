"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, ExternalLink, Search, Truck } from "lucide-react";
import { orderTrackingData } from "@/data/policies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type TrackingEvent = {
  label: string;
  description?: string;
  date?: string;
};

type TrackingResult = {
  status: "found";
  orderId: string;
  shipmentStatus: string;
  carrier?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  trackingEvents: TrackingEvent[];
  trackingAvailable: boolean;
  message: string;
};

type TrackingResponse =
  | TrackingResult
  | {
      status: "error" | "not_found";
      message?: string;
    };

function TrackingFaqItem({
  question,
  answerHtml,
  isOpen,
  onClick,
}: {
  question: string;
  answerHtml: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`group rounded-[20px] border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-[rgba(58,31,61,0.2)] ${
        isOpen ? "border-[rgba(58,31,61,0.18)] shadow-[0_12px_28px_-16px_rgba(58,31,61,0.08)]" : ""
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 rounded-[20px] px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--plum)]"
        aria-expanded={isOpen}
      >
        <span className="buudy-display text-base font-normal text-[var(--plum)] sm:text-lg">{question}</span>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(58,31,61,0.04)] text-[var(--plum)] transition-all duration-300 ${
            isOpen ? "rotate-180 bg-[var(--plum)] text-[var(--cream)]" : ""
          }`}
        >
          <ChevronDown size={14} className="stroke-[2.5]" />
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            <div className="mb-4 h-px w-full bg-[var(--border)]" />
            <div
              className="text-sm font-light leading-6 text-[var(--muted)]"
              dangerouslySetInnerHTML={{ __html: answerHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-[var(--muted)]">{label}</p>
      <p className="text-sm font-semibold text-[var(--plum)]">{value}</p>
    </div>
  );
}

export function OrderTrackingPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");

  async function handleTrackSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setTrackingResult(null);

    const cleanOrder = orderNumber.trim();
    const cleanEmail = email.trim();

    if (!cleanOrder || !cleanEmail) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/order-tracking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ orderNumber: cleanOrder, email: cleanEmail }),
      });
      const data = (await response.json().catch(() => ({}))) as TrackingResponse;

      if (!response.ok || data.status !== "found") {
        setError(data.message ?? "We could not verify that order right now. Please try again.");
        return;
      }

      setTrackingResult({
        ...data,
        trackingEvents: Array.isArray(data.trackingEvents) ? data.trackingEvents : [],
      });
    } catch {
      setError("We could not reach the Buudy order system right now. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-glow -left-20 top-12 h-[340px] w-[340px] bg-[#f4a17b] opacity-10" />
      <div className="buudy-glow -right-20 bottom-12 h-[380px] w-[380px] bg-[#a05080] opacity-10" />

      <div className="buudy-wrap relative z-10 max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <SectionHeading
            eyebrow="Delivery Help"
            title={
              <>
                Track Your <em className="buudy-italic">Order</em>
              </>
            }
            copy={orderTrackingData.intro}
            align="center"
          />
          <p className="mt-4 text-xs font-light italic text-[var(--muted)]">{orderTrackingData.subIntro}</p>
        </div>

        <div className="mx-auto mb-16 max-w-2xl">
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_16px_40px_-24px_rgba(58,31,61,0.08)] sm:p-8">
            <form onSubmit={handleTrackSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--plum)]">
                    Order Number
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. #1024"
                    value={orderNumber}
                    onChange={(event) => setOrderNumber(event.target.value)}
                    className="h-12 w-full rounded-full border border-[var(--border)] bg-[var(--cream)] px-5 text-sm font-light outline-none transition-all focus:border-[var(--plum)]"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--plum)]">
                    Email Address
                  </span>
                  <input
                    type="email"
                    placeholder="e.g. you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-full border border-[var(--border)] bg-[var(--cream)] px-5 text-sm font-light outline-none transition-all focus:border-[var(--plum)]"
                    required
                  />
                </label>
              </div>

              {error && <p className="pl-2 text-xs font-light text-red-500">{error}</p>}

              <Button type="submit" disabled={isLoading} className="min-h-[48px] w-full rounded-full">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Checking Buudy Tracking...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Search size={16} />
                    Track Shipment
                  </span>
                )}
              </Button>
            </form>

            {trackingResult && (
              <div className="mt-8 space-y-6 border-t border-[var(--border)] pt-8">
                <div className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-4 sm:grid-cols-2">
                  <DetailCard label="Order ID" value={trackingResult.orderId} />
                  <DetailCard label="Current Status" value={trackingResult.shipmentStatus} />
                  <DetailCard label="Carrier" value={trackingResult.carrier ?? "Not assigned yet"} />
                  <DetailCard label="Tracking Number" value={trackingResult.trackingNumber ?? "Not assigned yet"} />
                </div>

                <div
                  className={`rounded-2xl border p-4 ${
                    trackingResult.trackingAvailable
                      ? "border-[rgba(58,31,61,0.14)] bg-[rgba(58,31,61,0.04)]"
                      : "border-[rgba(174,117,42,0.24)] bg-[rgba(174,117,42,0.08)]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {trackingResult.trackingAvailable ? (
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--plum)]" />
                    ) : (
                      <AlertCircle size={18} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                    )}
                    <div className="space-y-2">
                      <p className="text-sm font-light leading-6 text-[var(--plum)]">{trackingResult.message}</p>
                      {!trackingResult.trackingAvailable && (
                        <p className="text-xs font-light leading-5 text-[var(--muted)]">
                          Your order is verified, but the carrier timeline has not been published yet. Tracking usually updates after dispatch.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {trackingResult.trackingUrl && (
                  <Button asChild className="min-h-[48px] w-full rounded-full">
                    <a href={trackingResult.trackingUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} />
                      Open Carrier Tracking
                    </a>
                  </Button>
                )}

                <div className="space-y-4">
                  <h4 className="buudy-display flex items-center gap-2 text-lg text-[var(--plum)]">
                    <Truck size={18} className="text-[var(--gold)]" />
                    {trackingResult.trackingEvents.length ? "Shipment Timeline" : "Official Buudy Status"}
                  </h4>

                  {trackingResult.trackingEvents.length ? (
                    <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-2.5 before:top-2 before:w-px before:bg-[var(--border)]">
                      {trackingResult.trackingEvents.map((step, index) => (
                        <div key={`${step.label}-${index}`} className="relative flex items-start gap-4">
                          <span className="absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--card)] bg-[var(--plum)]" />
                          <div className="space-y-1">
                            <p className="text-sm font-semibold leading-none text-[var(--plum)]">{step.label}</p>
                            {step.description && (
                              <p className="text-xs font-light leading-relaxed text-[var(--muted)]">
                                {step.description}
                              </p>
                            )}
                            {step.date && <span className="block text-[10px] font-medium text-[var(--gold)]">{step.date}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-4 text-sm font-light leading-6 text-[var(--muted)]">
                      No carrier scan history is available yet. This page will show the real carrier timeline once Buudy receives it from the fulfillment system.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-2xl space-y-8">
          <h3 className="buudy-display mb-6 text-center text-2xl text-[var(--plum)]">Tracking FAQ</h3>
          <div className="space-y-3">
            {orderTrackingData.faqs.map((faq, index) => (
              <TrackingFaqItem
                key={faq.question}
                question={faq.question}
                answerHtml={faq.answerHtml}
                isOpen={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
