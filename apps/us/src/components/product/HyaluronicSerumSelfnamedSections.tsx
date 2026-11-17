"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Check,
  Star,
  Leaf,
  Wind,
  CheckCircle2,
  Recycle,
} from "lucide-react";
import { products, type Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { useCart } from "@/components/cart/CartProvider";

// 1. Product In Details (10-Card Carousel)
function ProductInDetailsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -340 : 340;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const detailCards = [
    { num: "01", src: "/images/products/buudy-serum/selfnamed/detail-01.jpg", alt: "Double Hydration Boost Gel + HA clinical overview" },
    { num: "02", src: "/images/products/buudy-serum/selfnamed/detail-02.jpg", alt: "Multi-molecular weight hyaluronic acid penetration" },
    { num: "03", src: "/images/products/buudy-serum/selfnamed/detail-03.jpg", alt: "Surface barrier film-forming protection" },
    { num: "04", src: "/images/products/buudy-serum/selfnamed/detail-04.jpg", alt: "Cellular hydration lock and dermal plumping" },
    { num: "05", src: "/images/products/buudy-serum/selfnamed/detail-05.jpg", alt: "Instant hydration surge without heavy oils" },
    { num: "06", src: "/images/products/buudy-serum/selfnamed/detail-06.jpg", alt: "Skin-friendly acid mantle pH calibration" },
    { num: "07", src: "/images/products/buudy-serum/selfnamed/detail-07.jpg", alt: "Provitamin B5 and Sodium PCA synergy" },
    { num: "08", src: "/images/products/buudy-serum/selfnamed/detail-08.jpg", alt: "Clean organic certification and dermatological testing" },
    { num: "09", src: "/images/products/buudy-serum/selfnamed/detail-09.jpg", alt: "Optical hydrogel transmission for light therapy" },
    { num: "10", src: "/images/products/buudy-serum/selfnamed/detail-10.jpg", alt: "Long-term skin barrier resilience" },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-12 md:py-18 border-t border-[rgba(46,16,47,0.08)]">
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
        </div>

        {/* Carousel Reel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
        >
          {detailCards.map((card) => (
            <div
              key={card.num}
              className="flex-none w-[260px] sm:w-[290px] md:w-[320px] aspect-[320/488] relative rounded-[20px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-sm hover:shadow-md hover:border-[rgba(184,149,86,0.35)] transition-all snap-start"
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

// 2. Product Features & Star Attributes
function ProductFeaturesSection() {
  return (
    <section className="buudy-section bg-[#fbf7f1] py-14 md:py-20 border-t border-[rgba(46,16,47,0.08)]">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Feature Banner Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md">
              <Image
                src="/images/products/buudy-serum/selfnamed/features-banner.jpg"
                alt="Buudy Hyaluronic Serum Double Hydration Boost Gel clinical features banner"
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
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                Formulated with dual-molecular weight hyaluronic acid and physiological Sodium PCA to form a protective moisture-locking cushion that plumps dehydrated dermal tissue.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Best For */}
              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                  <Sparkles size={16} />
                  <span className="buudy-mono text-[11px] uppercase tracking-wider font-bold text-[var(--plum)]">
                    Best For
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed font-medium">
                  Anti-ageing, compromised skin barrier, dehydrated skin, and under-eye fatigue.
                </p>
              </div>

              {/* Skin Type */}
              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                  <Droplets size={16} />
                  <span className="buudy-mono text-[11px] uppercase tracking-wider font-bold text-[var(--plum)]">
                    Skin Type
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed font-medium">
                  Normal, dry, mature, and sensitive skin needing weightless cellular moisture.
                </p>
              </div>

              {/* Star Features */}
              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                  <ShieldCheck size={16} />
                  <span className="buudy-mono text-[11px] uppercase tracking-wider font-bold text-[var(--plum)]">
                    Star Features
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed font-medium">
                  Deep moisture surge, multi-molecular HA + Sodium PCA, visibly softens fine lines.
                </p>
              </div>

              {/* Aroma */}
              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[var(--gold)]">
                  <Wind size={16} />
                  <span className="buudy-mono text-[11px] uppercase tracking-wider font-bold text-[var(--plum)]">
                    Aroma
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed font-medium">
                  Fresh aquatic aroma with juicy, delicate fruity notes from 100% natural botanical extracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Curated For (Clinical Specialists & Rituals)
function CuratedForSection() {
  const roles = [
    {
      title: "Estheticians",
      subtitle: "Clinical Facials & Light Prep",
      desc: "A multi-molecular hyaluronic gel to deliver an intense hydration step in plumping facials and LED phototherapy treatments.",
      img: "/images/products/buudy-serum/selfnamed/curated-estheticians.jpg",
    },
    {
      title: "Makeup Artists",
      subtitle: "Skin Prep & Dewy Base",
      desc: "A moisture-quenching gel that instantly plumps and preps thirsty skin before makeup, eliminating dry patches with zero pilling.",
      img: "/images/products/buudy-serum/selfnamed/curated-makeup-artists.jpg",
    },
    {
      title: "Cosmetologists",
      subtitle: "Barrier Recovery Protocol",
      desc: "A double-hydration restorative gel specifically calibrated for clients whose skin appears depleted, reactive, or dull.",
      img: "/images/products/buudy-serum/selfnamed/curated-cosmetologists.jpg",
    },
    {
      title: "Massage Therapists",
      subtitle: "Sculpting Glide & Drainage",
      desc: "A cooling, watery gel that provides effortless glide for facial sculpting massage and lymphatic drainage without heavy oils.",
      img: "/images/products/buudy-serum/selfnamed/curated-massage-therapists.jpg",
    },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20 border-t border-[rgba(46,16,47,0.08)]">
      <div className="buudy-wrap">
        <div className="max-w-2xl text-center mx-auto mb-12">
          <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
            Professional Grade Formulation
          </p>
          <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
            Curated for <em className="buudy-italic text-[var(--gold)]">clinical specialists</em>.
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
            Engineered to professional salon standards — trusted by dermal therapists, aesthetic practitioners, and skincare specialists worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <div
              key={role.title}
              className="flex flex-col rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] overflow-hidden shadow-xs hover:shadow-lg hover:border-[rgba(184,149,86,0.35)] transition-all"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#faf5ee]">
                <Image
                  src={role.img}
                  alt={role.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="buudy-mono text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider mb-1">
                  {role.subtitle}
                </span>
                <h3 className="buudy-display text-lg font-semibold text-[var(--plum)] mb-2">
                  {role.title}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
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

// 4. Product Formula & Physical Calibration
function ProductFormulaSection() {
  return (
    <section className="buudy-section bg-[#fbf7f1] py-14 md:py-20 border-t border-[rgba(46,16,47,0.08)]">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Texture Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md">
              <Image
                src="/images/products/buudy-serum/selfnamed/formula-texture.jpg"
                alt="Buudy Hyaluronic Serum Double Hydration Boost Gel formula texture and viscosity"
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
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                Water-based optical gel matrix designed with zero oils, zero silicones, and zero light scattering to maximize both daily dermal absorption and LED phototherapy wavelength penetration.
              </p>
            </div>

            <div className="space-y-6">
              {/* Texture Slider */}
              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="buudy-mono text-xs font-bold text-[var(--plum)] uppercase tracking-wider">
                    Texture
                  </span>
                  <span className="text-xs font-semibold text-[var(--gold)] buudy-mono">
                    Light Fluid
                  </span>
                </div>
                <div className="relative h-2 w-full bg-[rgba(46,16,47,0.08)] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[25%] bg-[var(--plum)] rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1.5 buudy-mono uppercase">
                  <span>Light</span>
                  <span>Rich</span>
                </div>
              </div>

              {/* Finish Slider */}
              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="buudy-mono text-xs font-bold text-[var(--plum)] uppercase tracking-wider">
                    Finish
                  </span>
                  <span className="text-xs font-semibold text-[var(--gold)] buudy-mono">
                    Natural Weightless
                  </span>
                </div>
                <div className="relative h-2 w-full bg-[rgba(46,16,47,0.08)] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[20%] bg-[var(--plum)] rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1.5 buudy-mono uppercase">
                  <span>Weightless</span>
                  <span>Occlusive</span>
                </div>
              </div>

              {/* pH Level & Optical Transmission */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                  <span className="buudy-mono text-[10px] text-[var(--gold)] uppercase font-bold tracking-wider">
                    pH Level
                  </span>
                  <p className="buudy-display text-2xl font-bold text-[var(--plum)] mt-1">
                    5.0 – 5.25
                  </p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
                    Skin-friendly physiological balance.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                  <span className="buudy-mono text-[10px] text-[var(--gold)] uppercase font-bold tracking-wider">
                    Light Synergy
                  </span>
                  <p className="buudy-display text-2xl font-bold text-[var(--plum)] mt-1">
                    100% Optical
                  </p>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">
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

// 5. Key Ingredients Deep Dive
function KeyIngredientsSection() {
  const ingredients = [
    {
      name: "Sodium PCA",
      role: "0.1% Physiological Humectant",
      desc: "An organic compound that occurs naturally in human skin, binding moisture directly to epidermal cells to prevent moisture evaporation.",
      img: "/images/products/buudy-serum/selfnamed/ingredient-sodium-pca.jpg",
    },
    {
      name: "Hyaluronic Acid",
      role: "Multi-Molecular Weight Complex",
      desc: "High-molecular HA forms a protective surface hydration shield, while hydrolyzed micro-HA penetrates deeply to plump dehydrated tissue.",
      img: "/images/products/buudy-serum/selfnamed/ingredient-hyaluronic-acid.jpg",
    },
    {
      name: "Aloe Leaf Juice",
      role: "Botanical Soothing Matrix",
      desc: "Organic aloe replaces plain water, drenching skin in natural polysaccharides, vitamins, and minerals to calm micro-inflammation.",
      img: "/images/products/buudy-serum/selfnamed/ingredient-aloe-leaf-juice.jpg",
    },
    {
      name: "Sage Extract",
      role: "Herbal Antioxidant Shield",
      desc: "Rich in ursolic acid and rosmarinic acid to soothe skin reactivity and protect against external oxidative environmental stressors.",
      img: "/images/products/buudy-serum/selfnamed/ingredient-sage-extract.jpg",
    },
    {
      name: "White Tea Extract",
      role: "Cellular Polyphenol Defense",
      desc: "Concentrated catechins defend cellular collagen networks against free-radical degradation, maintaining firmness and clarity.",
      img: "/images/products/buudy-serum/selfnamed/ingredient-white-tea-extract.jpg",
    },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20 border-t border-[rgba(46,16,47,0.08)]">
      <div className="buudy-wrap">
        <div className="max-w-2xl text-center mx-auto mb-12">
          <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
            Pure Active Chemistry
          </p>
          <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
            Key <em className="buudy-italic text-[var(--gold)]">bioactive ingredients</em>.
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
            Formulated according to strict ECOCERT COSMOS Natural standards. Zero synthetic fragrances, parabens, silicones, or microplastics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {ingredients.map((ing) => (
            <div
              key={ing.name}
              className="flex flex-col rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] p-5 text-center shadow-xs hover:shadow-md hover:border-[rgba(184,149,86,0.35)] transition-all"
            >
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden bg-[#faf5ee] border border-[rgba(46,16,47,0.08)] mb-4">
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
              <span className="buudy-mono text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider mt-1 mb-2">
                {ing.role}
              </span>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                {ing.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. Packaging & Circular Sustainability
function PackagingSection() {
  return (
    <section className="buudy-section bg-[#fbf7f1] py-14 md:py-20 border-t border-[rgba(46,16,47,0.08)]">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Technical Drawing */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md p-6">
              <Image
                src="/images/products/buudy-serum/selfnamed/packaging-drawings.jpg"
                alt="Buudy Hyaluronic Serum packaging technical drawing and recyclable specifications"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-4"
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
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                We believe exceptional luxury skincare must care for the planet. Our bottles and components are selected for infinite circular recyclability.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <h3 className="buudy-display text-base font-semibold text-[var(--plum)] flex items-center gap-2">
                  <Recycle size={18} className="text-[var(--gold)]" />
                  Glass Treatment Bottle
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed mt-1.5">
                  Heavy, sturdy cosmetic glass — durable, protective of delicate bio-actives, and infinitely recyclable without loss of purity or structural quality.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <h3 className="buudy-display text-base font-semibold text-[var(--plum)] flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[var(--gold)]" />
                  PP #5 Precision Dispensing Pump
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed mt-1.5">
                  Precision airless dispensing mechanism crafted from Polypropylene (PP #5) — durable, lightweight, and fully recyclable.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs">
                <h3 className="buudy-display text-base font-semibold text-[var(--plum)] flex items-center gap-2">
                  <Leaf size={18} className="text-[var(--gold)]" />
                  Circular Recycling Guidelines
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed mt-1.5">
                  Separate the pump from the glass bottle before disposal. Rinse the bottle and place into standard glass collection; recycle the PP #5 pump with household plastics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 7. How To Use (4-Step Protocol)
function HowToUseSection() {
  const steps = [
    {
      num: "01",
      title: "Cleanse Skin",
      desc: "Apply to thoroughly cleansed skin, after washing or immediately before your Buudy LED Mask session.",
    },
    {
      num: "02",
      title: "Dispense & Smooth",
      desc: "Smooth a small amount (1–2 pumps) evenly across face and neck with gentle upward motions.",
    },
    {
      num: "03",
      title: "Absorb & Layer",
      desc: "Allow 30–60 seconds for complete dermal absorption. Layer a moisturiser or oil on top if more nourishment is desired.",
    },
    {
      num: "04",
      title: "Keep It Daily",
      desc: "Use morning (AM) and evening (PM) every day to maintain a plump, deeply hydrated moisture barrier.",
    },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-20 border-t border-[rgba(46,16,47,0.08)]">
      <div className="buudy-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Model Ritual Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full rounded-[24px] overflow-hidden border border-[rgba(46,16,47,0.08)] bg-white shadow-md">
              <Image
                src="/images/products/buudy-serum/selfnamed/how-to-use.jpg"
                alt="Model applying Buudy Hyaluronic Serum Double Hydration Boost Gel in daily morning routine"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: 4 Steps */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
                Daily Application Protocol
              </p>
              <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
                How to <em className="buudy-italic text-[var(--gold)]">use</em>.
              </h2>
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                Follow this simple 4-step ritual morning and evening for optimal dermal plumping and light therapy synergy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="p-5 rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] shadow-xs"
                >
                  <span className="buudy-mono text-sm font-bold text-[var(--gold)]">
                    Step {s.num}
                  </span>
                  <h3 className="buudy-display text-base font-semibold text-[var(--plum)] mt-1 mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 8. Related Products Section (Complete Your Ritual)
export function RelatedProductsSection({ currentProductId }: { currentProductId?: string }) {
  const { addProduct, openCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Pick complementary products
  const relatedList = useMemo(() => {
    const targetSlugs = [
      "buudy-7-colour-led-mask",
      "buudy-peptide-ageless-am-pm-cream",
      "red-light-torch",
      "buudy-blemish-purifying-face-wash",
    ];

    return products.filter(
      (p) => targetSlugs.includes(p.slug) && p.id !== currentProductId
    );
  }, [currentProductId]);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addProduct(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
    openCart();
  };

  return (
    <section className="buudy-section bg-[#fbf7f1] py-16 md:py-24 border-t border-[rgba(46,16,47,0.08)]">
      <div className="buudy-wrap">
        <div className="max-w-2xl text-center mx-auto mb-12">
          <p className="buudy-mono text-[var(--gold)] uppercase tracking-[0.2em] text-xs font-semibold">
            Complete Your Ritual
          </p>
          <h2 className="buudy-display mt-2 text-3xl sm:text-4xl leading-tight text-[var(--plum)]">
            Pairs well with <em className="buudy-italic text-[var(--gold)]">clinical synergy</em>.
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
            Enhance your cellular results. Layer with our phototherapy hardware and peptide collagen firming formulations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedList.map((product: Product) => {
            const isAdded = addedId === product.id;
            const imageSrc = product.cartImage || product.gallery?.[0]?.src || "/images/placeholder.webp";

            return (
              <div
                key={product.id}
                className="group flex flex-col rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] overflow-hidden shadow-sm hover:shadow-xl hover:border-[rgba(184,149,86,0.4)] transition-all duration-300"
              >
                {/* End-to-end Image */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative aspect-square w-full bg-[#fbf7f1] overflow-hidden block"
                >
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="buudy-mono text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider mb-1">
                    {product.template === "mask" ? "LED Phototherapy" : "Clinical Formulation"}
                  </span>
                  <h3 className="buudy-display text-base font-semibold text-[var(--plum)] leading-snug group-hover:text-[var(--gold)] transition-colors min-h-[2.5rem] line-clamp-2">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>

                  {/* Stars */}
                  <div className="flex items-center gap-1.5 my-2">
                    <div className="flex items-center text-[var(--gold)]">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[var(--plum)]">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-auto pt-3 border-t border-[rgba(46,16,47,0.06)] flex flex-col gap-3">
                    <div className="flex items-baseline gap-2">
                      <span className="buudy-display text-xl font-bold text-[var(--plum)]">
                        {formatMoney(product.priceCents, product.currency)}
                      </span>
                      {product.compareAtCents && product.compareAtCents > product.priceCents ? (
                        <span className="text-xs text-[var(--muted)] line-through">
                          {formatMoney(product.compareAtCents, product.currency)}
                        </span>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, product)}
                      disabled={isAdded}
                      className="buudy-cart-wipe relative flex min-h-11 w-full items-center justify-center overflow-hidden rounded-full border border-[var(--plum)] bg-[var(--plum)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--cream)] shadow-sm transition-all duration-300 hover:border-[var(--gold)] active:scale-95 cursor-pointer"
                    >
                      <span className="buudy-cart-wipe-content inline-flex items-center justify-center gap-2">
                        {isAdded ? (
                          <>
                            <Check size={14} />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} />
                            <span>Add To Cart</span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Master Wrapper for all Selfnamed Sections on Hyaluronic Serum Page
export function HyaluronicSerumSelfnamedSections() {
  return (
    <>
      <ProductInDetailsCarousel />
      <ProductFeaturesSection />
      <CuratedForSection />
      <ProductFormulaSection />
      <KeyIngredientsSection />
      <PackagingSection />
      <HowToUseSection />
    </>
  );
}
