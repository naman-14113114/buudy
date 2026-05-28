"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Truck, Package, Clock, ShieldCheck, Mail, MapPin } from "lucide-react";
import { orderTrackingData } from "@/data/policies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type FaqItemProps = {
  question: string;
  answerHtml: string;
  isOpen: boolean;
  onClick: () => void;
};

function TrackingFaqItem({ question, answerHtml, isOpen, onClick }: FaqItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(0);

  useEffect(() => {
    if (isOpen) {
      const handleResize = () => {
        if (contentRef.current) {
          setHeight(contentRef.current.scrollHeight);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div 
      className={`group rounded-[20px] border border-[var(--border)] bg-[var(--card)] transition-all duration-300 ease-out hover:border-[rgba(58,31,61,0.2)] ${
        isOpen ? "shadow-[0_12px_28px_-16px_rgba(58,31,61,0.08)] border-[rgba(58,31,61,0.18)]" : ""
      }`}
    >
      <button
        onClick={onClick}
        type="button"
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--plum)] rounded-[20px]"
        aria-expanded={isOpen}
      >
        <span className="buudy-display text-base sm:text-lg text-[var(--plum)] font-normal">
          {question}
        </span>
        <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(58,31,61,0.04)] text-[var(--plum)] transition-all duration-300 ${
          isOpen ? "rotate-180 bg-[var(--plum)]! text-[var(--cream)]!" : ""
        }`}>
          <ChevronDown size={14} className="stroke-[2.5]" />
        </span>
      </button>

      <div
        className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ height }}
      >
        <div ref={contentRef} className="px-5 pb-5">
          <div className="h-[1px] w-full bg-[var(--border)] mb-4" />
          <div 
            className={`text-sm leading-6 text-[var(--muted)] transition-all duration-500 ease-out font-light ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
            dangerouslySetInnerHTML={{ __html: answerHtml }}
          />
        </div>
      </div>
    </div>
  );
}

export function OrderTrackingPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Tracking form states
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTrackingResult(null);

    const cleanOrder = orderNumber.trim();
    const cleanEmail = email.trim();

    if (!cleanOrder || !cleanEmail) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true);

    // Simulate database lookup
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate result
      setTrackingResult({
        orderId: cleanOrder.startsWith("#") ? cleanOrder : `#${cleanOrder}`,
        status: "In Transit",
        carrier: "DHL Express",
        trackingId: "DHL-BUUDY-" + Math.floor(1000000 + Math.random() * 9000000),
        dispatchedFrom: "Rickmansworth, UK",
        transitSteps: [
          { label: "Order Received", desc: "Your order details have been received and verified.", date: "May 25, 2026", active: true },
          { label: "Processed & Quality Checked", desc: "The Buudy LED Mask has passed all safety checks.", date: "May 26, 2026", active: true },
          { label: "Dispatched from Warehouse", desc: "In transit from Rickmansworth, UK depot.", date: "May 27, 2026", active: true },
          { label: "In Transit (International)", desc: "Currently cleared local customs and is in transit.", date: "May 28, 2026", active: true },
          { label: "Out for Delivery", desc: " Courier delivery will attempt arrival soon.", date: "Expected in 2-3 business days", active: false }
        ]
      });
    }, 1200);
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen py-16 md:py-24 relative overflow-hidden">
      <div className="buudy-glow -left-20 top-12 h-[340px] w-[340px] bg-[#f4a17b] opacity-10" />
      <div className="buudy-glow -right-20 bottom-12 h-[380px] w-[380px] bg-[#a05080] opacity-10" />

      <div className="buudy-wrap relative z-10 max-w-4xl px-4 sm:px-6">
        
        {/* Header section */}
        <div className="text-center mb-12">
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
          <p className="mt-4 text-xs text-[var(--muted)] font-light italic">
            {orderTrackingData.subIntro}
          </p>
        </div>

        {/* Dynamic Tracking Form / Result Grid */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[0_16px_40px_-24px_rgba(58,31,61,0.08)]">
            
            <form onSubmit={handleTrackSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                
                {/* Order Number Field */}
                <div>
                  <label htmlFor="order-num" className="block text-xs font-semibold uppercase tracking-wider text-[var(--plum)] mb-2">
                    Order Number
                  </label>
                  <div className="relative">
                    <input
                      id="order-num"
                      type="text"
                      placeholder="e.g. #1024"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full h-12 rounded-full border border-[var(--border)] bg-[var(--cream)] px-5 text-sm outline-none focus:border-[var(--plum)] transition-all font-light"
                      required
                    />
                  </div>
                </div>

                {/* Email Address Field */}
                <div>
                  <label htmlFor="email-addr" className="block text-xs font-semibold uppercase tracking-wider text-[var(--plum)] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email-addr"
                      type="email"
                      placeholder="e.g. you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 rounded-full border border-[var(--border)] bg-[var(--cream)] px-5 text-sm outline-none focus:border-[var(--plum)] transition-all font-light"
                      required
                    />
                  </div>
                </div>

              </div>

              {error && <p className="text-xs text-red-500 font-light pl-2">{error}</p>}

              {/* Submit Button */}
              <Button type="submit" disabled={isLoading} className="w-full min-h-[48px] rounded-full">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Locating Shipment...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Search size={16} />
                    Track Shipment
                  </span>
                )}
              </Button>
            </form>

            {/* Simulated Live Tracking Dashboard Mockup */}
            {trackingResult && (
              <div className="mt-8 pt-8 border-t border-[var(--border)] space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--cream)] p-4 rounded-2xl border border-[var(--border)]">
                  <div>
                    <p className="text-xs uppercase text-[var(--muted)] font-semibold">Order ID</p>
                    <p className="text-sm font-semibold text-[var(--plum)]">{trackingResult.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-[var(--muted)] font-semibold">DHL Tracking ID</p>
                    <p className="text-sm font-semibold text-[var(--plum)] select-all">{trackingResult.trackingId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-[var(--muted)] font-semibold">Warehouse Depot</p>
                    <p className="text-sm font-semibold text-[var(--plum)]">{trackingResult.dispatchedFrom}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="buudy-display text-lg text-[var(--plum)] flex items-center gap-2">
                    <Truck size={18} className="text-[var(--gold)]" />
                    Shipment Timeline
                  </h4>

                  {/* Horizontal tracker steps */}
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-[var(--border)]">
                    {trackingResult.transitSteps.map((step: any, index: number) => (
                      <div key={index} className="relative flex items-start gap-4">
                        <span className={`absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--card)] ${
                          step.active ? "bg-[var(--plum)]" : "bg-[var(--cream)] border-[var(--border)]"
                        }`} />
                        <div className="space-y-1">
                          <p className={`text-sm font-semibold leading-none ${
                            step.active ? "text-[var(--plum)]" : "text-[var(--muted)] font-light"
                          }`}>
                            {step.label}
                          </p>
                          <p className="text-xs text-[var(--muted)] font-light leading-relaxed">
                            {step.desc}
                          </p>
                          <span className="block text-[10px] text-[var(--gold)] font-medium">
                            {step.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Tracking FAQs Accordion */}
        <div className="max-w-2xl mx-auto space-y-8">
          <h3 className="buudy-display text-2xl text-[var(--plum)] text-center mb-6">
            Tracking FAQ
          </h3>
          <div className="space-y-3">
            {orderTrackingData.faqs.map((faq, index) => (
              <TrackingFaqItem
                key={index}
                question={faq.question}
                answerHtml={faq.answerHtml}
                isOpen={activeIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* Connect with us social links */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[rgba(58,31,61,0.08)] pt-6 text-center">
            <span className="text-xs text-[var(--muted)] font-semibold uppercase tracking-wider">Connect with us:</span>
            <div className="flex items-center gap-3 justify-center">
              <a
                href="https://www.facebook.com/profile.php?id=61565686185222"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(58,31,61,0.05)] text-[var(--plum)] transition-all duration-300 hover:bg-[var(--plum)] hover:text-[var(--cream)] hover:-translate-y-0.5 shadow-sm"
                aria-label="Facebook"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/buudy_com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(58,31,61,0.05)] text-[var(--plum)] transition-all duration-300 hover:bg-[var(--plum)] hover:text-[var(--cream)] hover:-translate-y-0.5 shadow-sm"
                aria-label="Instagram"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@buudy-com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(58,31,61,0.05)] text-[var(--plum)] transition-all duration-300 hover:bg-[var(--plum)] hover:text-[var(--cream)] hover:-translate-y-0.5 shadow-sm"
                aria-label="YouTube"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
