"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  Minus,
  Plus,
  Sparkles,
  Star,
} from "lucide-react";
import Lottie from "lottie-react";
import loadingLottie from "@/components/cart/loading-lottie.json";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import {
  appendAttributionToPath,
  pickAttributionFromSearch,
} from "@/lib/attribution";
import { TrustBadges } from "./TrustBadges";
import { FAQSection } from "./FAQSection";
import { GuaranteeSection } from "./GuaranteeSection";

export function MinimalProductPage({ product }: { product: Product }) {
  const router = useRouter();
  const { addProduct } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        setIsAdding(false);
      }
    }

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const isGiftCard = product.id === "buudy-gift-card";
  const isPackageProtection = product.id === "buudy-package-protection";
  const isEbook = product.id === "buudy-skincare-ebook" || product.slug === "skincare-ebook";
  const isDigital = isGiftCard || isPackageProtection || isEbook;

  const unitPriceCents = product.priceCents;
  const compareAtCents = product.compareAtCents;
  const showCompareAt = !isDigital && compareAtCents > unitPriceCents;

  // Floating top-left badge
  const floatingBadge = isGiftCard
    ? "Instant Digital Code"
    : isPackageProtection
    ? "Transit Guarantee"
    : isEbook
    ? "Free Companion Edition"
    : product.badges?.[0] || "Official Guarantee";

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    for (let i = 0; i < quantity; i++) {
      addProduct(product);
    }

    router.push(
      appendAttributionToPath(
        "/cart",
        pickAttributionFromSearch(window.location.search),
      ),
    );
  };

  return (
    <div className="bg-[var(--cream)] relative">
      {/* Subtle ambient luxury glow */}
      <div className="buudy-glow -left-20 -top-24 h-[500px] w-[500px] bg-[#f4a17b] pointer-events-none" />
      <div className="buudy-glow -right-24 top-52 h-[560px] w-[560px] bg-[#a05080] pointer-events-none" />

      {/* Hero Section */}
      <section
        id="product-hero"
        className="buudy-section pt-4 pb-2 md:pt-6 md:pb-4 relative z-10"
      >
        <div className="buudy-wrap">
          {/* Breadcrumbs (Hidden on digital products) */}
          {!isDigital && (
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 buudy-mono text-xs uppercase tracking-wider text-[var(--plum)]/60"
            >
              <Link href="/" className="hover:text-[var(--plum)] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/" className="hover:text-[var(--plum)] transition-colors">
                Products
              </Link>
              <span>/</span>
              <span className="text-[var(--plum)] font-semibold truncate max-w-[200px] sm:max-w-none">
                {product.name}
              </span>
            </nav>
          )}

          {/* 2-Column Hero Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Image Card (Sticky scrolling matching mask page) */}
            <div className="lg:col-span-6 lg:sticky lg:top-6 lg:self-start w-full">
              {/* Product Image Card */}
              <div
                className={`relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[var(--card)] border border-[rgba(58,31,61,0.12)] shadow-sm transition-all duration-300 hover:shadow-md group ${
                  isDigital
                    ? "p-0"
                    : "p-6 sm:p-10 flex items-center justify-center"
                }`}
              >
                {/* Floating Top-Left Badge (Hidden on Digital Products) */}
                {!isDigital && floatingBadge && (
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--plum)]/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[var(--cream)] shadow-sm uppercase buudy-mono">
                    <Sparkles size={12} className="text-[var(--gold)]" />
                    <span>{floatingBadge}</span>
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={product.cartImage || product.gallery?.[0]?.src || "/images/placeholder.webp"}
                    alt={product.gallery?.[0]?.alt || product.name}
                    fill
                    className={
                      isDigital
                        ? "object-cover rounded-2xl sm:rounded-3xl transition-transform duration-500 ease-out group-hover:scale-105"
                        : "object-contain p-4 sm:p-8 transition-transform duration-500 ease-out group-hover:scale-105"
                    }
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Details, Denominations, Highlights, Stepper & Purchase */}
            <div className="lg:col-span-6 w-full flex flex-col">
              {/* Eyebrow */}
              <p className="buudy-mono text-xs uppercase tracking-widest text-[var(--gold)] font-semibold">
                {product.promoLabel || product.badges?.[0] || "Official Buudy Release"}
              </p>

              {/* Title with serif Playfair + italic gold emphasis */}
              <h1 className="font-playfair buudy-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--plum)] leading-[1.12] mt-2">
                {product.heroTitle ? (
                  <>
                    {product.heroTitle}{" "}
                    <em className="buudy-italic font-normal text-[var(--gold)]">
                      {product.heroEmphasis}
                    </em>
                  </>
                ) : (
                  product.name
                )}
              </h1>

              {/* Star Rating & Customer Count Pill (Hidden on Digital Products) */}
              {!isDigital && product.rating > 0 && (
                <div className="mt-3.5 flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 text-[var(--gold)]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-[var(--gold)] text-[var(--gold)]" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[var(--plum)]">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                  <span className="rounded-full bg-[rgba(184,149,86,0.14)] border border-[rgba(184,149,86,0.3)] px-2.5 py-0.5 text-xs font-medium text-[var(--plum)]">
                    {product.customerCount || `${product.reviewCount}+`} happy customers
                  </span>
                </div>
              )}

              {/* Pricing Row */}
              <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                <span className="buudy-display text-3xl sm:text-4xl font-bold text-[var(--plum)]">
                  {unitPriceCents === 0 ? "FREE" : formatMoney(unitPriceCents, product.currency)}
                </span>
                {showCompareAt && (
                  <>
                    <span className="line-through text-lg sm:text-xl text-[var(--muted)] buudy-display font-medium">
                      {formatMoney(compareAtCents, product.currency)}
                    </span>
                    <span className="rounded-full bg-[rgba(184,149,86,0.18)] text-[var(--plum)] font-semibold text-xs px-2.5 py-1 uppercase tracking-wide">
                      Save {Math.round(((compareAtCents - unitPriceCents) / compareAtCents) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Short Description */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--muted)] buudy-copy">
                {product.shortDescription || product.description}
              </p>

              {/* 3-5 Highlights with checkmark in gold circle */}
              <ul className="mt-5 space-y-2.5">
                {(product.highlights && product.highlights.length > 0
                  ? product.highlights.slice(0, 5)
                  : product.keyBenefits?.slice(0, 5) || []
                ).map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[var(--plum)] font-normal leading-normal"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(184,149,86,0.16)] text-[var(--gold)] mt-0.5">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Quantity Stepper & Add To Cart CTA */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center justify-between sm:justify-center rounded-full border border-[rgba(58,31,61,0.18)] bg-[var(--card)] p-1.5 h-12 w-full sm:w-36 shrink-0 shadow-sm">
                  <button
                    type="button"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-9 w-9 rounded-full flex items-center justify-center text-[var(--plum)] hover:bg-[rgba(58,31,61,0.06)] transition disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="buudy-mono text-sm font-semibold text-[var(--plum)] px-2 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-9 w-9 rounded-full flex items-center justify-center text-[var(--plum)] hover:bg-[rgba(58,31,61,0.06)] transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <Button
                  className={`relative overflow-hidden w-full h-12 rounded-full border border-[var(--plum)] bg-[var(--plum)] text-[var(--cream)] px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md transition-all duration-300 hover:border-[var(--gold)] hover:shadow-lg active:scale-[0.99] flex-1 ${
                    isAdding ? "disabled:!opacity-100" : ""
                  }`}
                  disabled={isAdding}
                  onClick={handleAddToCart}
                >
                  {isAdding ? (
                    <>
                      <span style={{ visibility: "hidden" }} className="whitespace-nowrap">
                        ADD TO CART
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Lottie
                          animationData={loadingLottie}
                          loop={true}
                          className="h-16 w-24 scale-[1.35]"
                        />
                      </span>
                    </>
                  ) : (
                    <span className="whitespace-nowrap">
                      ADD TO CART
                    </span>
                  )}
                </Button>
              </div>

              {/* Accordions (3 expandable sections: Details & Specs, How It Works, Guarantee) */}
              <div className="mt-6 divide-y divide-[rgba(58,31,61,0.12)] border-t border-b border-[rgba(58,31,61,0.12)]">
                {/* 1. Details & Specs */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("specs")}
                    aria-expanded={openAccordion === "specs"}
                    className="flex w-full items-center justify-between py-4 text-left group"
                  >
                    <span className="buudy-display text-base sm:text-lg font-semibold text-[var(--plum)] group-hover:text-[var(--gold)] transition-colors">
                      Details &amp; Specs
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[var(--plum)]/60 transition-transform duration-300 ${
                        openAccordion === "specs" ? "rotate-180 text-[var(--gold)]" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openAccordion === "specs"
                        ? "grid-rows-[1fr] pb-5 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {product.specs && product.specs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                          {product.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="flex justify-between sm:flex-col py-1.5 border-b border-[rgba(58,31,61,0.06)] sm:border-0"
                            >
                              <span className="text-[var(--muted)] font-medium">{spec.label}</span>
                              <span className="font-semibold text-[var(--plum)]">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                          {product.description}
                        </p>
                      )}

                      {/* Included Items */}
                      {product.included && product.included.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[rgba(58,31,61,0.08)]">
                          <p className="buudy-mono text-xs uppercase tracking-wider text-[var(--gold)] font-semibold mb-2">
                            What&apos;s Included:
                          </p>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--plum)]">
                            {product.included.map((item, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <span className="buudy-mono font-semibold text-[var(--gold)]">
                                  {item.quantity}
                                </span>
                                <span>{item.label}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. How It Works */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("how-it-works")}
                    aria-expanded={openAccordion === "how-it-works"}
                    className="flex w-full items-center justify-between py-4 text-left group"
                  >
                    <span className="buudy-display text-base sm:text-lg font-semibold text-[var(--plum)] group-hover:text-[var(--gold)] transition-colors">
                      How It Works
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[var(--plum)]/60 transition-transform duration-300 ${
                        openAccordion === "how-it-works" ? "rotate-180 text-[var(--gold)]" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openAccordion === "how-it-works"
                        ? "grid-rows-[1fr] pb-5 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {isGiftCard ? (
                        <ol className="space-y-2.5 text-xs sm:text-sm text-[var(--plum)]">
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              1
                            </span>
                            <span>Select your AU$28 digital gift card.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              2
                            </span>
                            <span>Complete checkout to receive your unique 16-digit voucher code delivered directly to your email in seconds.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              3
                            </span>
                            <span>Forward the electronic voucher to your recipient, or print the luxury gift certificate PDF.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              4
                            </span>
                            <span>Recipient redeems the AU$28 voucher at checkout on any Buudy light therapy device or skincare accessory within 3 months of receipt.</span>
                          </li>
                        </ol>
                      ) : isPackageProtection ? (
                        <ol className="space-y-2.5 text-xs sm:text-sm text-[var(--plum)]">
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              1
                            </span>
                            <span>Add Complete Package Protection to your cart alongside your order.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              2
                            </span>
                            <span>Comprehensive transit insurance attaches automatically when dispatched from our Australian fulfillment center.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              3
                            </span>
                            <span>In the rare event of transit damage, parcel loss, or doorstep theft, simply email support@buudy.com.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              4
                            </span>
                            <span>Receive priority 24-hour claims processing and an immediate brand-new replacement unit with zero deductible fees.</span>
                          </li>
                        </ol>
                      ) : isEbook ? (
                        <ol className="space-y-2.5 text-xs sm:text-sm text-[var(--plum)]">
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              1
                            </span>
                            <span>Complete your order to instantly receive a secure direct download link sent to your inbox.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              2
                            </span>
                            <span>Access the 40+ page high-resolution PDF on smartphone, tablet, e-reader, or computer.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              3
                            </span>
                            <span>Follow the 7-colour clinical photobiomodulation cheat sheets and serum pairing chemistry protocols.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-mono text-[11px] font-bold">
                              4
                            </span>
                            <span>Track your weekly skin milestones with the included printable 90-day progress schedules.</span>
                          </li>
                        </ol>
                      ) : (
                        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Guarantee */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleAccordion("guarantee")}
                    aria-expanded={openAccordion === "guarantee"}
                    className="flex w-full items-center justify-between py-4 text-left group"
                  >
                    <span className="buudy-display text-base sm:text-lg font-semibold text-[var(--plum)] group-hover:text-[var(--gold)] transition-colors">
                      Guarantee &amp; Returns
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[var(--plum)]/60 transition-transform duration-300 ${
                        openAccordion === "guarantee" ? "rotate-180 text-[var(--gold)]" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openAccordion === "guarantee"
                        ? "grid-rows-[1fr] pb-5 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden text-xs sm:text-sm text-[var(--muted)] leading-relaxed space-y-2">
                      <p>
                        Every Buudy item is backed by our Official 30-Day Money-Back Guarantee. We are committed to clinical-grade quality and complete customer delight.
                      </p>
                      <p>
                        If you are not completely satisfied with your purchase, our dedicated Australian support team is here to assist with hassle-free returns, zero-friction exchanges, or full refunds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Below Hero Sections */}
      {!isDigital && <TrustBadges />}
      <FAQSection className="pt-2 pb-12 md:pt-4 md:pb-16" faqs={product.faqs} />
      {!isDigital && <GuaranteeSection />}
    </div>
  );
}
