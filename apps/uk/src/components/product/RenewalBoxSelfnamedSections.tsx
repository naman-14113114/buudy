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
  Recycle,
  Leaf,
  Check,
} from "lucide-react";

function RenewalRoutineSteps({ children }: { children: ReactNode }) {
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

// 1. Product In Details (7-Card Carousel from Selfnamed)
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
    { num: "01", src: "/images/products/the-ultimate-renewal-collection-box/selfnamed/detail-03.jpg", alt: "Multi-Molecular Hyaluronic Acid optical hydrogel & LED priming" },
    { num: "02", src: "/images/products/the-ultimate-renewal-collection-box/selfnamed/detail-04.jpg", alt: "Bio-Fermented Hexapeptide-11 firming and collagen synthesis" },
    { num: "03", src: "/images/products/the-ultimate-renewal-collection-box/selfnamed/detail-05.jpg", alt: "Organic Botanicals: White Tea, Sage and Aloe Barbadensis" },
    { num: "04", src: "/images/products/the-ultimate-renewal-collection-box/selfnamed/detail-06.jpg", alt: "Strict ECOCERT COSMOS Natural and Vegan certification" },
    { num: "05", src: "/images/products/the-ultimate-renewal-collection-box/selfnamed/detail-07.jpg", alt: "Synergistic clinic-grade skincare protocol for radiance and bounce" },
  ];

  return (
    <section className="buudy-section bg-white py-12 md:py-18">
      <div className="buudy-wrap">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
              Trilogy Breakdown &amp; In-Depth Attributes
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
          className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-6 md:pb-8 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 touch-pan-x"
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

// 2. How To Use (Editorial 4-Step Protocol matching Hyaluronic layout)
function RenewalHowToUseSection({ editorial = true }: { editorial?: boolean }) {
  const steps = [
    {
      num: 1,
      title: "Overnight Resurface (1–2x Weekly)",
      desc: "After evening cleansing, smooth 2–3 drops of AHA 10% Lactic Acid Peeling Concentrate over face and neck. Leave on overnight to gently dissolve dull surface cells.",
    },
    {
      num: 2,
      title: "Daily Hydrate & LED Prime (AM & PM)",
      desc: "Apply 1–2 pumps of Double Hydration Boost Gel to clean skin. When using your Buudy LED Mask, apply the gel as an optical primer for 100% unimpeded light transmission.",
    },
    {
      num: 3,
      title: "Daily Firm & Collagen-Lock (AM & PM)",
      desc: "Smooth 1–2 pumps of Collagen-Lock Hexapeptide Serum over face and neck, pressing in gently to stimulate fresh collagen synthesis and facial bounce.",
    },
    {
      num: 4,
      title: "Follow with Moisturiser & SPF",
      desc: "Seal in actives with your favorite moisturiser. In the morning, always follow with broad-spectrum SPF 30+ to protect freshly renewed skin.",
    },
  ];

  if (editorial) {
    return (
      <section
        aria-labelledby="renewal-how-to-use"
        className="buudy-section scroll-mt-24 py-14 md:py-20"
        id="how-to-use"
      >
        <div className="buudy-wrap grid items-center gap-7 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:order-last md:aspect-[4/3] bg-white border border-[rgba(46,16,47,0.08)] shadow-sm">
            <Image
              src="/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-three-step-skincare-in-use-uk.webp"
              alt="Complete 3-step renewal ritual in use: exfoliate, hydrate, and firm with Buudy Ultimate Renewal Collection Box"
              fill
              sizes="(min-width: 1260px) 560px, (min-width: 768px) 46vw, calc(100vw - 32px)"
              className="object-cover"
            />
          </div>
          <div>
            <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
              Synergistic Weekly Protocol
            </p>
            <h2 id="renewal-how-to-use" className="buudy-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-[var(--plum)] mt-2">
              How to <em className="buudy-italic text-[var(--gold)]">Use</em>
            </h2>
            <p className="mt-3 text-sm text-[var(--muted)] sm:text-base leading-relaxed">
              Follow this clinical 3-step routine for optimal cellular turnover, deep hydration, and youthful facial bounce.
            </p>
            <RenewalRoutineSteps>
              {steps.map(({ num, title, desc }) => (
                <li className="flex items-baseline gap-3 sm:gap-4" key={num}>
                  <span aria-hidden="true" className="buudy-mono shrink-0 text-[var(--plum-soft)] font-bold">
                    {String(num).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="buudy-display text-lg sm:text-xl leading-tight text-[var(--plum)] font-semibold">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </RenewalRoutineSteps>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

// 3. Product Features & Star Attributes
function ProductFeaturesSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Feature Banner Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md">
              <Image
                src="/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-gift-box-in-hand-portrait-uk.webp"
                alt="The Ultimate Renewal Collection Box held in hand portrait UK"
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
                Triple-Action Synergy &amp; Clinical Targeting
              </p>
              <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
                Targeted features, <em className="buudy-italic text-[var(--gold)]">engineered for results</em>.
              </h2>
              <p className="mt-3 text-base md:text-lg text-[var(--muted)] leading-relaxed">
                Use the 10% Lactic Acid Concentrate 1–2 evenings per week to resurface dull cells. Smooth on the clear Hyaluronic Gel daily before phototherapy with your Buudy LED Mask to lock in hydration, and finish with the Hexapeptide Serum to firm facial contours and stimulate fresh collagen.
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
                  Anti-age, dark spots, uneven skin texture, cellular dullness, and loss of facial elasticity.
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
                  All skin types: normal, dry, mature, combination, and tired skin requiring total cellular renewal.
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
                  Moisture surge, softens fine lines, active cell-renewing care, revitalizes and lifts tired skin.
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
                  Natural botanical notes: soothing organic white tea, fresh aquatic hydrogel, and delicate floral amber.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Curated For (Clinical Specialists & Rituals)
function CuratedForSection() {
  const roles = [
    {
      title: "Estheticians",
      subtitle: "Clinical Peels & Resurfacing",
      desc: "A renewal trio to retail after professional peels, resurfacing facials, and dermal micro-needling treatments.",
      img: "/images/products/the-ultimate-renewal-collection-box/selfnamed/curated-estheticians.jpg",
    },
    {
      title: "Clinics / Med Spas",
      subtitle: "Comprehensive Home Care",
      desc: "Prescribed home care protocol that keeps skin smooth, deeply hydrated, and firm between clinical appointments.",
      img: "/images/products/the-ultimate-renewal-collection-box/selfnamed/curated-clinics-med-spas.jpg",
    },
    {
      title: "Skincare Practitioners",
      subtitle: "Turnkey Treatment Protocols",
      desc: "A calibrated 3-step regimen pairing overnight lactic acid resurfacing with optical hydration and bio-fermented peptide restoration.",
      img: "/images/products/the-ultimate-renewal-collection-box/selfnamed/curated-ecommerce-brands.jpg",
    },
    {
      title: "Luxury Gifting",
      subtitle: "Gift-Ready Presentation",
      desc: "An exquisitely packaged collection box for birthdays, seasonal celebrations, and high-impact self-care renewal routines.",
      img: "/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-full-size-luxury-gifting-presentation-uk.webp",
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
            Engineered to professional salon and clinic standards — trusted by dermal therapists, aesthetic practitioners, and skincare specialists worldwide.
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

// 5. Product Formula & Physical Calibration
function ProductFormulaSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Texture Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md">
              <Image
                src="/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-plum-sleeve-detail-editorial-uk.webp"
                alt="The Ultimate Renewal Collection Box formula and packaging detail UK"
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
                Dermal Calibration &amp; Three Textures
              </p>
              <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
                Product <em className="buudy-italic text-[var(--gold)]">formula</em>.
              </h2>
              <p className="mt-3 text-base md:text-lg text-[var(--muted)] leading-relaxed">
                Three distinct, clinically calibrated textures engineered with zero heavy waxes, mineral oils, or silicones for complete epidermal renewal and light therapy synergy.
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 01 Texture Slider */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="buudy-mono text-xs font-bold text-[var(--plum)] uppercase tracking-wider">
                    Step 01 AHA Peel
                  </span>
                  <span className="text-xs font-semibold text-[var(--gold)] buudy-mono">
                    Light Aqueous Fluid (15%)
                  </span>
                </div>
                <div className="relative h-2 w-full bg-[rgba(46,16,47,0.08)] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[15%] bg-[var(--plum)] rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-[var(--muted)] mt-2 buudy-mono uppercase tracking-wider">
                  <span>Fluid</span>
                  <span>Rich</span>
                </div>
              </div>

              {/* Step 02 Texture Slider */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="buudy-mono text-xs font-bold text-[var(--plum)] uppercase tracking-wider">
                    Step 02 HA Hydrogel
                  </span>
                  <span className="text-xs font-semibold text-[var(--gold)] buudy-mono">
                    Optical Crystal Gel (25%)
                  </span>
                </div>
                <div className="relative h-2 w-full bg-[rgba(46,16,47,0.08)] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[25%] bg-[var(--plum)] rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-[var(--muted)] mt-2 buudy-mono uppercase tracking-wider">
                  <span>Weightless</span>
                  <span>Occlusive</span>
                </div>
              </div>

              {/* Step 03 Texture Slider */}
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="buudy-mono text-xs font-bold text-[var(--plum)] uppercase tracking-wider">
                    Step 03 Hexapeptide
                  </span>
                  <span className="text-xs font-semibold text-[var(--gold)] buudy-mono">
                    Restorative Emulsion (45%)
                  </span>
                </div>
                <div className="relative h-2 w-full bg-[rgba(46,16,47,0.08)] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[45%] bg-[var(--plum)] rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-[var(--muted)] mt-2 buudy-mono uppercase tracking-wider">
                  <span>Fluid</span>
                  <span>Velvety Rich</span>
                </div>
              </div>

              {/* pH Level & Optical Transmission */}
              <div className="grid grid-cols-2 gap-4">
                <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                  <span className="buudy-mono text-xs text-[var(--gold)] uppercase font-bold tracking-wider">
                    pH Level
                  </span>
                  <p className="buudy-display text-2xl font-bold text-[var(--plum)] mt-1">
                    3.5 &amp; 5.2
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
                    AHA Peel pH 3.5; Serums pH 5.0–5.25.
                  </p>
                </div>

                <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                  <span className="buudy-mono text-xs text-[var(--gold)] uppercase font-bold tracking-wider">
                    Light Synergy
                  </span>
                  <p className="buudy-display text-2xl font-bold text-[var(--plum)] mt-1">
                    100% Optical
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
                    Zero light scattering / n ≈ 1.33.
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

// 6. Key Ingredients Deep Dive
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
    const scrollAmount = direction === "left" ? -260 : 260;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const ingredients = [
    {
      name: "10% Lactic Acid",
      role: "Plant-Derived AHA Exfoliant",
      desc: "A gentle alpha hydroxy acid that dissolves desmosomes binding dead surface cells, boosting natural cellular turnover and brightening uneven pigmentation.",
      img: "/images/products/the-ultimate-renewal-collection-box/selfnamed/ingredient-lactic-acid.jpg",
    },
    {
      name: "2% Hexapeptide-11",
      role: "Bio-Fermented Peptide",
      desc: "A biomimetic hexapeptide that stimulates dermal fibroblasts to synthesize fresh collagen, restoring facial elasticity and softening expression lines.",
      img: "/images/products/the-ultimate-renewal-collection-box/selfnamed/ingredient-peptides.jpg",
    },
    {
      name: "Hyaluronic Acid",
      role: "Dual-Depth Hydration Matrix",
      desc: "High-molecular HA seals surface moisture against trans-epidermal water loss, while hydrolyzed micro-HA penetrates deeply to plump dehydrated skin.",
      img: "/images/products/the-ultimate-renewal-collection-box/selfnamed/ingredient-sodium-hyaluronate.jpg",
    },
    {
      name: "Sodium PCA",
      role: "0.1% Physiological Humectant",
      desc: "An organic humectant that naturally occurs in human skin, binding water directly to epidermal cells to maintain a resilient skin moisture barrier.",
      img: "/images/products/the-ultimate-renewal-collection-box/selfnamed/ingredient-sodium-pca.jpg",
    },
    {
      name: "White Tea Extract",
      role: "Cellular Polyphenol Defense",
      desc: "Concentrated catechins defend cellular collagen networks against oxidative free-radical damage, preserving clarity and skin youthfulness.",
      img: "/images/products/the-ultimate-renewal-collection-box/selfnamed/ingredient-white-tea-extract.jpg",
    },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20">
      <div className="buudy-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
              Pure Active Chemistry
            </p>
            <h2 className="buudy-display mt-2 text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-[var(--plum)]">
              Key <em className="buudy-italic text-[var(--gold)]">bioactive ingredients</em>.
            </h2>
            <p className="mt-3 text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              Formulated according to strict ECOCERT COSMOS Natural standards. Zero synthetic fragrances, parabens, silicones, or microplastics.
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
                aria-label="Next card"
                className="w-10 h-10 rounded-full border border-[rgba(46,16,47,0.15)] bg-white text-[var(--plum)] hover:bg-[var(--plum)] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-6 md:pb-8 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 touch-pan-x"
        >
          {ingredients.map((ing) => (
            <div
              key={ing.name}
              data-story-card
              className="flex-none w-[220px] sm:w-[240px] flex flex-col rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] p-5 pb-7 text-center shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[rgba(184,149,86,0.35)] transition-all duration-300 snap-start"
            >
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-[var(--cream)] border border-[rgba(46,16,47,0.08)] mb-4">
                <Image
                  src={ing.img}
                  alt={ing.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <h3 className="buudy-display text-base sm:text-lg font-semibold text-[var(--plum)]">
                {ing.name}
              </h3>
              <span className="buudy-mono text-xs text-[var(--gold)] font-bold uppercase tracking-wider mt-1 mb-2">
                {ing.role}
              </span>
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {ing.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. Packaging & Circular Sustainability
function RenewalPackagingSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Sustainable Packaging Imagery */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md">
              <Image
                src="/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-full-size-luxury-gifting-presentation-uk.webp"
                alt="The Ultimate Renewal Collection Box luxury gifting presentation box set UK"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Sustainable Specifications */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
                Sustainable Luxury
              </p>
              <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
                Mindful <em className="buudy-italic text-[var(--gold)]">packaging</em>.
              </h2>
              <p className="mt-3 text-base md:text-lg text-[var(--muted)] leading-relaxed">
                Thoughtfully engineered with durable, eco-conscious materials designed to protect active formulas and minimize environmental impact.
              </p>
            </div>

            <div className="space-y-4">
              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <h3 className="buudy-display text-base sm:text-lg font-semibold text-[var(--plum)] flex items-center gap-2">
                  <Recycle size={18} className="text-[var(--gold)]" />
                  Rigid Presentation Gift Box
                </h3>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mt-2">
                  Sturdy, recyclable paperboard that protects all three products in transit and offers an exquisite unboxing experience.
                </p>
              </div>

              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <h3 className="buudy-display text-base sm:text-lg font-semibold text-[var(--plum)] flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[var(--gold)]" />
                  Glass Treatment Bottles &amp; Precision Pumps
                </h3>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mt-2">
                  Three full-size 30ml heavy cosmetic glass bottles with PP #5 precision dispensing pumps that guard against light and air oxidation.
                </p>
              </div>

              <div data-story-card className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <h3 className="buudy-display text-base sm:text-lg font-semibold text-[var(--plum)] flex items-center gap-2">
                  <Leaf size={18} className="text-[var(--gold)]" />
                  Circular Recycling Guidelines
                </h3>
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mt-2">
                  Cardboard box is widely accepted in curbside paper recycling. Flatten the box and recycle it with paper; separate pumps from glass bottles for standard glass recycling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Master Wrapper for all Selfnamed Sections on Renewal Collection Box Page
export function RenewalBoxSelfnamedSections({ routineFirstGrid = false }: { routineFirstGrid?: boolean }) {
  return (
    <>
      <ProductInDetailsCarousel />
      {routineFirstGrid && <RenewalHowToUseSection editorial />}
      <ProductFeaturesSection />
      <CuratedForSection />
      <ProductFormulaSection />
      <KeyIngredientsSection />
      {!routineFirstGrid && <RenewalHowToUseSection />}
    </>
  );
}
