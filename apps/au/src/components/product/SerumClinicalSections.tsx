"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 1. Clinical & Consumer Perception Trial Stats (Beauty Pie / Clinical Standard)
export function SerumClinicalResults({
  isPeptide = false,
  isPrebiotic = false,
  isAha = false,
  productSlug = "",
}: {
  isPeptide?: boolean;
  isPrebiotic?: boolean;
  isAha?: boolean;
  productSlug?: string;
} = {}) {
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [values, setValues] = useState<number[]>([0, 0, 0, 0]);

  const isEyeCream = productSlug === "buudy-peptide-age-defying-eye-cream" || productSlug.includes("eye-cream") || productSlug.includes("eye");
  const isCream = productSlug === "buudy-peptide-ageless-am-pm-cream" || (productSlug.includes("cream") && !isEyeCream);
  const isRenewalBox = productSlug === "the-ultimate-renewal-collection-box";

  const stats = useMemo(() => {
    if (isAha) {
      return [
        {
          target: 96,
          label: "Overnight Cellular Renewal",
          desc: "Dissolves dull surface cells for a visibly refined glass-smooth texture.",
        },
        {
          target: 92,
          label: "Refined Pore Clarity",
          desc: "Unclogs congested pores and visibly minimizes pore appearance.",
        },
        {
          target: 94,
          label: "Luminous Skin Radiance",
          desc: "Noticeable boost in natural skin radiance and clarity by morning.",
        },
        {
          target: 89,
          label: "Barrier Hydration Cushion",
          desc: "Hyaluronic acid matrix prevents moisture loss during overnight exfoliation.",
        },
      ];
    }
    if (isPrebiotic) {
      return [
        {
          target: 96,
          label: "Stronger Moisture Barrier",
          desc: "Visible reduction in redness, dryness, and sensitivity.",
        },
        {
          target: 93,
          label: "Balanced Complexion",
          desc: "Complexion felt calm, less congested, and clarified all day.",
        },
        {
          target: 95,
          label: "Enhanced LED Synergy",
          desc: "Accelerated hydration and radiance paired with daily light therapy.",
        },
        {
          target: 91,
          label: "Bouncy Plump Texture",
          desc: "Skin felt plumper and smoother with zero sticky residue.",
        },
      ];
    }
    if (isPeptide) {
      return [
        {
          target: 95,
          label: "Restored Firmness & Bounce",
          desc: "Visible improvement in skin elasticity and firmer facial contours.",
        },
        {
          target: 92,
          label: "Expression Line Smoothing",
          desc: "Measurable softening of forehead lines, crow's feet, and smile lines.",
        },
        {
          target: 94,
          label: "Post-Light Collagen Synergy",
          desc: "Enhanced rejuvenation applied directly after red & near-infrared light.",
        },
        {
          target: 91,
          label: "Nourished Skin Density",
          desc: "Skin felt visibly denser and rejuvenated without oiliness or congestion.",
        },
      ];
    }
    return [
      {
        target: 94,
        label: "Instant Dermal Plump",
        desc: "Immediate deep hydration and visibly plumper-feeling skin.",
      },
      {
        target: 91,
        label: "Enhanced LED Synergy",
        desc: "Brighter radiance and optical clarity applied prior to LED phototherapy.",
      },
      {
        target: 89,
        label: "Fine Line Smoothing",
        desc: "Softening of superficial dehydration lines and dry patches.",
      },
      {
        target: 88,
        label: "Smoother, Calmer Complexion",
        desc: "Skin texture felt noticeably softer, balanced, and free from redness.",
      },
    ];
  }, [isPrebiotic, isPeptide, isAha]);

  const targets = useMemo(() => stats.map((s) => s.target), [stats]);

  useEffect(() => {
    setValues([0, 0, 0, 0]);
    const frames = new Map<number, number>();
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.3) return;
          const index = statRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index < 0) return;
          observer.unobserve(entry.target);

          if (reduced) {
            setValues((prev) => {
              const next = [...prev];
              next[index] = targets[index];
              return next;
            });
            return;
          }

          const start = performance.now();
          const target = targets[index];
          const duration = 1400; // 1.4s smooth cubic ease-out

          const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const value = target * easeOut;

            setValues((prev) => {
              const next = [...prev];
              next[index] = value;
              return next;
            });

            if (progress < 1) {
              frames.set(index, requestAnimationFrame(step));
            } else {
              setValues((prev) => {
                const next = [...prev];
                next[index] = target;
                return next;
              });
            }
          };

          frames.set(index, requestAnimationFrame(step));
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -40px 0px" }
    );

    statRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => {
      observer.disconnect();
      frames.forEach((frameId) => cancelAnimationFrame(frameId));
    };
  }, [targets]);

  const imageSrc = isCream
    ? "/images/products/buudy-peptide-ageless-am-pm-cream/buudy-peptide-ageless-am-pm-cream-skin-application-and-bottle-uk.webp"
    : isEyeCream
    ? "/images/products/buudy-peptide-age-defying-eye-cream/buudy-peptide-eye-cream-model-eye-area-contour-portrait-uk.webp"
    : isRenewalBox
    ? "/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-plum-sleeve-detail-editorial-uk.webp"
    : isAha
    ? "/images/products/buudy-aha-peeling-concentrate/buudy-aha-peeling-concentrate-model-radiant-collarbone-uk.webp"
    : isPrebiotic
    ? "/images/products/buudy-prebiotics-serum/06-sculptural-plinth-pair.webp"
    : isPeptide
    ? "/images/products/buudy-peptide-serum/buudy-peptide-serum-box-three-quarter-display-uk.webp"
    : "/images/products/buudy-serum/buudy-hyaluronic-acid-serum-neck-and-collarbone-beauty-glow-uk.webp";

  const imageAlt = isCream
    ? "Model application ritual with Buudy Peptide Ageless AM/PM Cream bottle for lifted, glowing facial contours UK"
    : isEyeCream
    ? "Model eye area portrait showcasing visibly smoothed periorbital contours and diminished crow's feet after Buudy Peptide Eye Cream ritual UK"
    : isRenewalBox
    ? "The Ultimate Renewal Collection Box deep plum carton sleeve architectural detail and gold foil typography UK"
    : isAha
    ? "Radiant, smooth skin on model neck and collarbone after overnight Buudy AHA Peeling Concentrate treatment UK"
    : isPrebiotic
    ? "Buudy Bioactive Prebiotics Jelly Serum architectural sculptural plinth pair"
    : isPeptide
    ? "Buudy Peptide Serum luxury deep plum folding carton and treatment pump bottle on stone plinth UK"
    : "Radiant, deeply hydrated skin on model neck and collarbone after Buudy Hyaluronic Serum treatment UK";

  return (
    <section className="buudy-section bg-[var(--cream)] py-10 md:py-16">
      <div className="buudy-wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <p className="buudy-mono text-[var(--gold)] uppercase tracking-wider text-xs md:text-sm font-semibold">
            Consumer Perception &amp; Clinical Trial Results
          </p>
          <h2 className="buudy-display mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-[2.4rem] leading-tight text-[var(--plum)]">
            Proven efficacy, <em className="buudy-italic text-[var(--gold)]">measured by real skin</em>.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
            {isCream
              ? "Formulated with clinical-grade Hexapeptide-11, Dipalmitoyl Hydroxyproline, and multi-molecular HA to lock in post-LED phototherapy rejuvenation and restore dermal elasticity."
              : isRenewalBox
              ? "Formulated as a complete 3-step clinical ritual combining 10% AHA cellular resurfacing, multi-depth optical hyaluronic hydration, and bio-fermented peptide collagen-locking."
              : isAha
              ? "Formulated specifically to dissolve dull intercellular bonds and unclog congested pores overnight with 10% pure plant Lactic Acid and 1% soothing Hyaluronic Acid."
              : isPrebiotic
              ? "Formulated specifically to restore and fortify your skin's protective microbiome while delivering weightless hydration and zero light-scattering phototherapy synergy."
              : isPeptide
              ? "Formulated specifically to maximise post-phototherapy cellular uptake, signalling dermal fibroblasts to synthesise collagen and firm expression lines."
              : "Formulated specifically to maximise photon transmission during light therapy while delivering multi-molecular hyaluronic moisture deep into the extracellular dermal matrix."}
          </p>
        </div>

        {/* Split Grid: 4 Animated Circular Percentage Cards (Left) + Architectural Product Image (Right) */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Animated Stats Column (7 cols) */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-2.5 sm:gap-3">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  statRefs.current[idx] = el;
                }}
                className="flex items-center gap-3.5 sm:gap-4 rounded-[18px] border border-[rgba(58,31,61,.08)] bg-[var(--card)] py-3 px-3.5 sm:py-3.5 sm:px-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[rgba(58,31,61,.18)]"
              >
                {/* Miroooo-Style Circular Progress Ring */}
                <div
                  className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 68 68"
                    className="h-full w-full -rotate-90 transform"
                  >
                    {/* Track */}
                    <circle
                      cx="34"
                      cy="34"
                      r="28"
                      fill="none"
                      stroke="rgba(58, 31, 61, 0.12)"
                      strokeWidth="3.5"
                    />
                    {/* Animated Fill Circle */}
                    <circle
                      cx="34"
                      cy="34"
                      r="28"
                      fill="none"
                      stroke="var(--plum)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="176"
                      strokeDashoffset={176 * (1 - (values[idx] || 0) / 100)}
                    />
                  </svg>
                  <span className="absolute font-playfair text-[0.95rem] sm:text-[1rem] font-bold text-[var(--plum)] tracking-tight">
                    {Math.round(values[idx] || 0)}%
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="buudy-display text-sm sm:text-base font-semibold text-[var(--plum)] leading-snug">
                    {stat.label}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--muted)] leading-snug">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Architectural Image Column (5 cols) - Pure and clean with zero text overlays */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-[rgba(58,31,61,.1)] bg-[var(--card)] shadow-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                priority={false}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-[rgba(58,31,61,0.06)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. How To Use 3-Step Daily Ritual (Featuring the model with serum)
export function SerumHowToUse({
  isPeptide = false,
  isPrebiotic = false,
  isAha = false,
  productSlug = "",
}: {
  isPeptide?: boolean;
  isPrebiotic?: boolean;
  isAha?: boolean;
  productSlug?: string;
} = {}) {
  const isEyeCream = productSlug === "buudy-peptide-age-defying-eye-cream" || productSlug.includes("eye-cream") || productSlug.includes("eye");
  const isCream = productSlug === "buudy-peptide-ageless-am-pm-cream" || (productSlug.includes("cream") && !isEyeCream);
  const isRenewalBox = productSlug === "the-ultimate-renewal-collection-box";

  const steps = isCream
    ? [
        {
          num: 1,
          title: "Cleanse Your Face",
          desc: "Start with a clean face, morning or night, or after your LED session.",
        },
        {
          num: 2,
          title: "Apply the Cream",
          desc: "Press 1–2 pumps onto clean fingertips and gently warm between hands.",
        },
        {
          num: 3,
          title: "Sculpt & Absorb",
          desc: "Smooth over face, neck, and décolletage in upward sculpting motions.",
        },
        {
          num: 4,
          title: "Lock & Protect",
          desc: "Seal in cellular firmness and hydration. Always follow with SPF in the morning.",
        },
      ]
    : isEyeCream
    ? [
        {
          num: 1,
          title: "Cleanse Your Face",
          desc: "Cleanse periorbital area thoroughly before morning or evening application.",
        },
        {
          num: 2,
          title: "Apply Eye Cream",
          desc: "Gently press a rice-grain droplet directly onto your ring fingertip.",
        },
        {
          num: 3,
          title: "Pat Eye Contours",
          desc: "Lightly pat along orbital bone and crow's feet until fully absorbed.",
        },
        {
          num: 4,
          title: "Follow with Moisturiser",
          desc: "Layer your face cream on top to lock in actives. Follow with SPF in morning.",
        },
      ]
    : isRenewalBox
    ? [
        {
          num: 1,
          title: "Cleanse Your Face",
          desc: "Start with a fresh, clean face before your targeted renewal protocol.",
        },
        {
          num: 2,
          title: "Apply the Active",
          desc: "Smooth 2–3 drops of AHA peeling or 1–2 pumps of peptide serum.",
        },
        {
          num: 3,
          title: "Massage & Absorb",
          desc: "Gently massage across face and neck in upward sculpting strokes.",
        },
        {
          num: 4,
          title: "Follow with Moisturiser",
          desc: "Layer cream on top to seal in cellular firmness. Follow with SPF in morning.",
        },
      ]
    : isAha
    ? [
        {
          num: 1,
          title: "Cleanse Your Face",
          desc: "Cleanse thoroughly with lukewarm water. Pat skin completely dry.",
        },
        {
          num: 2,
          title: "Apply the Peel",
          desc: "Dispense 3–4 drops onto fingertips and smooth gently over face and neck.",
        },
        {
          num: 3,
          title: "Massage & Absorb",
          desc: "Use light circular motions until peeling concentrate is fully absorbed.",
        },
        {
          num: 4,
          title: "Leave-On & Protect",
          desc: "Leave on overnight for cellular renewal. Rinse in AM and always apply SPF.",
        },
      ]
    : isPrebiotic
    ? [
        {
          num: 1,
          title: "Cleanse Your Face",
          desc: "Start with a clean face. Leave skin slightly damp for optimal hydrogel binding.",
        },
        {
          num: 2,
          title: "Apply the Serum",
          desc: "Dispense 1–2 drops and gently press into face, neck, and décolletage.",
        },
        {
          num: 3,
          title: "Massage & Absorb",
          desc: "Use light upward strokes to massage in until the jelly serum is fully absorbed.",
        },
        {
          num: 4,
          title: "Follow with Moisturiser",
          desc: "Layer a moisturiser on top to lock in the microbiome shield. Follow with SPF.",
        },
      ]
    : isPeptide
    ? [
        {
          num: 1,
          title: "Cleanse Your Face",
          desc: "Start with a clean face, morning or night, or immediately after LED therapy.",
        },
        {
          num: 2,
          title: "Apply the Serum",
          desc: "Dispense 1–2 drops and press gently into the face, neck, and décolletage.",
        },
        {
          num: 3,
          title: "Massage & Absorb",
          desc: "Use light upward strokes to massage in until peptides are fully absorbed.",
        },
        {
          num: 4,
          title: "Follow with Moisturiser",
          desc: "Layer a moisturiser on top to seal in collagen stimulation. Follow with SPF.",
        },
      ]
    : [
        {
          num: 1,
          title: "Cleanse Your Face",
          desc: "Start with a clean face, morning or night.",
        },
        {
          num: 2,
          title: "Apply the Serum",
          desc: "Dispense 1–2 drops and gently press into the face, neck and décolletage.",
        },
        {
          num: 3,
          title: "Massage & Absorb",
          desc: "Use light upward strokes to massage in until the serum is fully absorbed into the skin.",
        },
        {
          num: 4,
          title: "Follow with Moisturiser",
          desc: "Layer a moisturiser on top to lock in the actives. Always follow with SPF in the morning.",
        },
      ];


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
