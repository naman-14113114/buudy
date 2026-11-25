"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";

function AhaRoutineSteps({ children }: { children: ReactNode }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = list.current;
    if (!element || !window.IntersectionObserver || !element.animate) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        if (!motion.matches) {
          element.animate(
            [{ opacity: 0.78, transform: "translateY(5px)" }, { opacity: 1, transform: "none" }],
            { duration: 240, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          );
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <ol className="mt-5 space-y-4 md:mt-6" ref={list}>
      {children}
    </ol>
  );
}

// 1. Product In Details (10-Card Carousel for Buudy AHA Peeling Concentrate from Selfnamed)
function ProductInDetailsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScrollable = () => {
      setCanScroll(el.scrollWidth > el.clientWidth + 2);
    };

    checkScrollable();
    const ro = new ResizeObserver(() => checkScrollable());
    ro.observe(el);
    window.addEventListener("resize", checkScrollable);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -340 : 340;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const detailCards = [
    { num: "01", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-01.jpg", alt: "10% Plant Lactic Acid active chemical exfoliant" },
    { num: "02", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-02.jpg", alt: "Smooths rough skin texture and sweeps away dead cells" },
    { num: "03", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-03.jpg", alt: "Stimulates cellular turnover and epidermal rejuvenation" },
    { num: "04", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-04.jpg", alt: "Brightens dull complexion and restores natural glow" },
    { num: "05", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-05.jpg", alt: "Refines congested pores and clears follicular impurities" },
    { num: "06", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-06.jpg", alt: "Hydrating exfoliator with 1% hyaluronic acid moisture cushion" },
    { num: "07", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-07.jpg", alt: "Optimal bioactive pH 4.0 to 4.2 for effective non-stinging peel" },
    { num: "08", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-08.jpg", alt: "Calming botanical sage and white tea antioxidant extracts" },
    { num: "09", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-09.jpg", alt: "ECOCERT COSMOS Natural certified organic standard" },
    { num: "10", src: "/images/products/buudy-aha-peeling-concentrate/selfnamed/detail-10.jpg", alt: "Overnight leave-on resurfacing protocol 1 to 2 times weekly" },
  ];

  return (
    <section className="buudy-section bg-white py-12 md:py-18">
      <div className="buudy-wrap">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
              Formula Breakdown &amp; In-Depth Attributes
            </p>
            <h2 className="buudy-display mt-2 text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-[var(--plum)]">
              Product in <em className="buudy-italic text-[var(--gold)]">details</em>.
            </h2>
          </div>

          {canScroll && (
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous card"
                className="w-10 h-10 rounded-full border border-[rgba(46,16,47,0.15)] bg-white text-[var(--plum)] hover:bg-[var(--plum)] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next card"
                className="w-10 h-10 rounded-full border border-[rgba(46,16,47,0.15)] bg-white text-[var(--plum)] hover:bg-[var(--plum)] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Reel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-6 md:pb-8 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
        >
          {detailCards.map((card) => (
            <div
              key={card.num}
              className="flex-none w-[260px] sm:w-[290px] md:w-[320px] aspect-[320/488] relative rounded-[20px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[rgba(184,149,86,0.35)] transition-all duration-300 snap-start"
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(min-width: 768px) 320px, 260px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 2. Product Features & Star Attributes (Authentic Selfnamed AHA Data)
function ProductFeaturesSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Feature Banner Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md">
              <Image
                src="/images/products/buudy-aha-peeling-concentrate/buudy-aha-peeling-concentrate-bottle-three-quarter-plum-uk.webp"
                alt="Buudy AHA Peeling Concentrate 30ml clinical three-quarter bottle display against plum backdrop UK"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Key Attributes & Star Features */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
                Dermal Targeting &amp; Clinical Calibration
              </p>
              <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
                Targeted features, <em className="buudy-italic text-[var(--gold)]">engineered for results</em>.
              </h2>
              <p className="mt-3 text-base md:text-lg text-[var(--muted)] leading-relaxed">
                Use your Buudy LED Mask as directed. On alternate evenings, or following your 10-minute LED session, smooth 2 to 3 drops of Buudy AHA Peeling Concentrate across clean skin before moisturiser. Plant-derived 10% Lactic Acid and soothing 1% Hyaluronic Acid gently dissolve dead surface cells to reveal a luminous, refined complexion overnight.
              </p>
              <Link
                href="/products/buudy-led-mask"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--plum)] underline underline-offset-4 hover:text-[var(--gold)] transition-colors"
              >
                Explore the Buudy LED Mask
                <ChevronRight aria-hidden="true" size={17} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Best For */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                  <Sparkles size={16} />
                  <span className="buudy-mono text-xs uppercase tracking-wider font-bold text-[var(--plum)]">
                    Best For
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  Rough skin, dull skin, uneven skin tone, clogged pores, and textured complexion.
                </p>
              </div>

              {/* Skin Type */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                  <Droplets size={16} />
                  <span className="buudy-mono text-xs uppercase tracking-wider font-bold text-[var(--plum)]">
                    Skin Type
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  All skin types, mature skin, oily, combination, and blemish-prone skin.
                </p>
              </div>

              {/* Star Features */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                  <ShieldCheck size={16} />
                  <span className="buudy-mono text-xs uppercase tracking-wider font-bold text-[var(--plum)]">
                    Star Features
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  Hydrating exfoliator, refreshes, smooths, brightens, adds natural-looking glow, plant-based AHA, allergen-free.
                </p>
              </div>

              {/* Aroma */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                  <Wind size={16} />
                  <span className="buudy-mono text-xs uppercase tracking-wider font-bold text-[var(--plum)]">
                    Aroma
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  Delicate, clean botanical aroma with subtle natural herbal sweetness from sage and white tea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Curated For (Clinical Specialists — Authentic Selfnamed Copy)
function CuratedForSection() {
  const roles = [
    {
      title: "Estheticians",
      subtitle: "Brightening Facials",
      desc: "A 10% lactic acid concentrate to add a resurfacing step to brightening facials and salon treatment protocols.",
      img: "/images/products/buudy-aha-peeling-concentrate/selfnamed/curated-estheticians.jpg",
    },
    {
      title: "Cosmetologists",
      subtitle: "Texture & Tone Refining",
      desc: "A gentle AHA peel recommended for clients addressing stubborn dullness, uneven texture, and congested pores.",
      img: "/images/products/buudy-aha-peeling-concentrate/selfnamed/curated-cosmetologists.jpg",
    },
    {
      title: "Makeup Artists",
      subtitle: "Pre-Event Smoothing",
      desc: "A pre-event smoothing treatment applied 1–2 nights before cosmetics for an exceptionally smooth, pore-free canvas.",
      img: "/images/products/buudy-aha-peeling-concentrate/selfnamed/curated-makeup-artists.jpg",
    },
    {
      title: "Skincare Specialists",
      subtitle: "Weekly Renewal Ritual",
      desc: "An essential weekly cellular renewal ritual that boosts moisture retention and maximizes nighttime skincare uptake.",
      img: "/images/products/buudy-aha-peeling-concentrate/selfnamed/model-face.jpg",
    },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20">
      <div className="buudy-wrap">
        <div className="max-w-2xl text-center mx-auto mb-12">
          <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
            Professional Grade Formulation
          </p>
          <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
            Curated for <em className="buudy-italic text-[var(--gold)]">clinical specialists</em>.
          </h2>
          <p className="mt-3 text-base md:text-lg text-[var(--muted)] leading-relaxed">
            Engineered to professional salon standards — trusted by estheticians, cosmetologists, and makeup artists worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4 pb-6">
          {roles.map((role) => (
            <div
              key={role.title}
              data-story-card
              className="flex flex-col rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[rgba(184,149,86,0.35)] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--cream)]">
                <Image
                  src={role.img}
                  alt={role.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 pb-7 flex flex-col flex-1">
                <span className="buudy-mono text-xs text-[var(--gold)] font-bold uppercase tracking-wider mb-1.5">
                  {role.subtitle}
                </span>
                <h3 className="buudy-display text-lg font-semibold text-[var(--plum)] mb-2">
                  {role.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {role.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. Product Formula & Physical Calibration (AHA Peeling Concentrate)
function ProductFormulaSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Texture Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md">
              <Image
                src="/images/products/buudy-aha-peeling-concentrate/buudy-aha-peeling-concentrate-closed-bottle-swatch-hand-uk.webp"
                alt="Buudy AHA Peeling Concentrate bottle and lightweight resurfacing fluid swatch applied on hand UK"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Physical Sliders & Attributes */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            <div>
              <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
                Dermal Calibration &amp; Sensory Profile
              </p>
              <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
                Product <em className="buudy-italic text-[var(--gold)]">formula</em>.
              </h2>
              <p className="mt-3 text-base md:text-lg text-[var(--muted)] leading-relaxed">
                Weightless plant-derived lactic acid fluid calibrated at an optimal pH of 4.0–4.2 with botanical antioxidants and cellular humectants to ensure maximum dead cell turnover with zero barrier irritation.
              </p>
            </div>

            <div className="space-y-6">
              {/* Texture Slider */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="buudy-mono text-xs font-bold text-[var(--plum)] uppercase tracking-wider">
                    Texture
                  </span>
                  <span className="text-xs font-semibold text-[var(--gold)] buudy-mono">
                    Light Fluid
                  </span>
                </div>
                <div className="relative h-2 w-full bg-[rgba(46,16,47,0.08)] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[20%] bg-[var(--plum)] rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-[var(--muted)] mt-2 buudy-mono uppercase tracking-wider">
                  <span>Light</span>
                  <span>Fluid</span>
                  <span>Rich</span>
                </div>
              </div>

              {/* Finish Slider */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="buudy-mono text-xs font-bold text-[var(--plum)] uppercase tracking-wider">
                    Finish
                  </span>
                  <span className="text-xs font-semibold text-[var(--gold)] buudy-mono">
                    Weightless
                  </span>
                </div>
                <div className="relative h-2 w-full bg-[rgba(46,16,47,0.08)] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[15%] bg-[var(--plum)] rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-[var(--muted)] mt-2 buudy-mono uppercase tracking-wider">
                  <span>Weightless</span>
                  <span>Silky</span>
                  <span>Occlusive</span>
                </div>
              </div>

              {/* pH Level & Ritual Rhythm */}
              <div className="grid grid-cols-2 gap-4">
                <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                  <span className="buudy-mono text-xs text-[var(--gold)] uppercase font-bold tracking-wider">
                    pH Level
                  </span>
                  <p className="buudy-display text-2xl font-bold text-[var(--plum)] mt-1">
                    4.0 – 4.2
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
                    Optimal cellular exfoliating range.
                  </p>
                </div>

                <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                  <span className="buudy-mono text-xs text-[var(--gold)] uppercase font-bold tracking-wider">
                    Ritual Rhythm
                  </span>
                  <p className="buudy-display text-2xl font-bold text-[var(--plum)] mt-1">
                    1–2x Weekly
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
                    Overnight leave-on renewal treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Key Ingredients Deep Dive (Authentic Selfnamed 4 Bioactives)
function KeyIngredientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScrollable = () => {
      setCanScroll(el.scrollWidth > el.clientWidth + 2);
    };

    checkScrollable();
    const ro = new ResizeObserver(() => checkScrollable());
    ro.observe(el);
    window.addEventListener("resize", checkScrollable);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -280 : 280;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const ingredients = [
    {
      name: "10% Lactic Acid",
      role: "Pure Plant AHA",
      desc: "Gentle alpha hydroxy acid derived from plant fermentation that dissolves dull surface keratinocytes, accelerates cellular turnover, and draws moisture into the epidermis.",
      img: "/images/products/buudy-aha-peeling-concentrate/selfnamed/ingredient-lactic-acid.jpg",
    },
    {
      name: "1% Hyaluronic Acid",
      role: "Moisture Barrier Cushion",
      desc: "High-molecular weight hyaluronic acid that cushions the skin during active exfoliation, locking in deep hydration and preventing trans-epidermal moisture loss.",
      img: "/images/products/buudy-aha-peeling-concentrate/selfnamed/ingredient-hyaluronic-acid.jpg",
    },
    {
      name: "Sage Extract",
      role: "Purifying Botanical",
      desc: "Calming botanical extract rich in natural antioxidants that tones the skin, regulates follicular sebum, and soothes redness.",
      img: "/images/products/buudy-aha-peeling-concentrate/selfnamed/ingredient-sage-extract.jpg",
    },
    {
      name: "White Tea Extract",
      role: "Polyphenol Defence",
      desc: "Antioxidant-dense botanical extract from Camellia Sinensis that neutralises free radicals, reduces skin stress, and illuminates dull skin.",
      img: "/images/products/buudy-aha-peeling-concentrate/selfnamed/ingredient-white-tea-extract.jpg",
    },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20">
      <div className="buudy-wrap">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
              Pure Active Chemistry
            </p>
            <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
              Key <em className="buudy-italic text-[var(--gold)]">bioactive ingredients</em>.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
              Formulated according to strict European ECOCERT COSMOS Natural standards. Zero synthetic fragrances, parabens, phthalates, or microplastics.
            </p>
          </div>

          {canScroll && (
            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous ingredient"
                className="w-10 h-10 rounded-full border border-[rgba(46,16,47,0.15)] bg-white text-[var(--plum)] hover:bg-[var(--plum)] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next ingredient"
                className="w-10 h-10 rounded-full border border-[rgba(46,16,47,0.15)] bg-white text-[var(--plum)] hover:bg-[var(--plum)] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Horizontal Scrollable Reel with Touch, Trackpad & Arrow Navigation */}
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pt-2 pb-6 md:pb-8 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 touch-pan-x"
        >
          {ingredients.map((ing) => (
            <div
              key={ing.name}
              data-story-card
              className="flex-none w-[220px] sm:w-[240px] flex flex-col rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] p-5 pb-7 text-center shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[rgba(184,149,86,0.35)] transition-all duration-300 snap-start"
            >
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-[var(--cream)] border border-[rgba(46,16,47,0.08)] mb-4 shrink-0">
                <Image
                  src={ing.img}
                  alt={ing.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <h3 className="buudy-display text-base font-semibold text-[var(--plum)]">
                {ing.name}
              </h3>
              <span className="buudy-mono text-[11px] text-[var(--gold)] font-bold uppercase tracking-wider mt-1 mb-2">
                {ing.role}
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
                {ing.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. How To Use Section (Buudy AHA Peeling Concentrate Overnight Ritual)
function AhaHowToUseSection({ editorial = false }: { editorial?: boolean }) {
  const steps = [
    {
      num: 1,
      title: "Cleanse Your Skin",
      desc: "Start with clean, dry skin in the evening. Ensure face and neck are completely dry before application.",
    },
    {
      num: 2,
      title: "Apply AHA Concentrate",
      desc: "Dispense 2 to 3 drops onto fingertips and smooth a thin, even layer across the face, avoiding the eye contour.",
    },
    {
      num: 3,
      title: "Leave On Overnight",
      desc: "Allow the concentrate to absorb for 2 minutes, then follow with your evening moisturiser. Do not rinse off.",
    },
    {
      num: 4,
      title: "Weekly Rhythm & SPF",
      desc: "Use 1 to 2 evenings per week. Always apply broad-spectrum SPF the following morning.",
    },
  ];

  if (editorial) {
    return (
      <section
        aria-labelledby="aha-how-to-use"
        className="buudy-section scroll-mt-24"
        id="how-to-use"
      >
        <div className="buudy-wrap grid items-center gap-7 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:order-last md:aspect-[4/3]">
            <Image
              src="/images/products/buudy-aha-peeling-concentrate/buudy-aha-peeling-concentrate-model-radiant-collarbone-uk.webp"
              alt="Radiant, smooth skin on model neck and collarbone after overnight Buudy AHA Peeling treatment UK"
              fill
              sizes="(min-width: 1260px) 560px, (min-width: 768px) 46vw, calc(100vw - 32px)"
              className="object-cover"
            />
          </div>
          <div>
            <h2 id="aha-how-to-use" className="buudy-display text-[var(--plum)]">
              How to Use
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)] sm:text-base">
              Follow these simple steps to get the best results
            </p>
            <AhaRoutineSteps>
              {steps.map(({ num, title, desc }) => (
                <li className="flex items-baseline gap-3 sm:gap-4" key={num}>
                  <span aria-hidden="true" className="buudy-mono shrink-0 text-[var(--plum-soft)]">
                    {String(num).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="buudy-display text-xl leading-tight text-[var(--plum)]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </AhaRoutineSteps>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20" id="how-to-use">
      <div className="buudy-wrap">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="buudy-display text-3xl sm:text-4xl lg:text-[2.6rem] text-[var(--plum)]">
            How to Use
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">
            Follow these simple steps to get the best results
          </p>
        </div>

        {/* Horizontal Stepper Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-[1.5px] bg-[#d5cfc5] z-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="w-14 h-14 rounded-full bg-white border border-[#d5cfc5] shadow-xs text-[var(--plum)] font-serif font-bold text-lg flex items-center justify-center mb-4 md:mb-6 shrink-0 transition-transform hover:scale-105">
                  {step.num}
                </div>

                {/* Title */}
                <h3 className="buudy-display font-semibold text-base sm:text-lg text-[var(--plum)] mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Master Wrapper for all Selfnamed Sections on AHA Peeling Concentrate Page
export function AhaPeelingSelfnamedSections({ routineFirstGrid = false }: { routineFirstGrid?: boolean }) {
  return (
    <>
      <ProductInDetailsCarousel />
      {routineFirstGrid && <AhaHowToUseSection editorial />}
      <ProductFeaturesSection />
      <CuratedForSection />
      <ProductFormulaSection />
      <KeyIngredientsSection />
      {!routineFirstGrid && <AhaHowToUseSection />}
    </>
  );
}
