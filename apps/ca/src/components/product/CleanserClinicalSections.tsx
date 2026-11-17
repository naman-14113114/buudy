"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 1. Clinical & Consumer Perception Trial Stats for Blemish Purifying Face Wash
export function CleanserClinicalResults() {
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [values, setValues] = useState<number[]>([0, 0, 0, 0]);

  const stats = useMemo(
    () => [
      {
        target: 96,
        label: "Purified & Clearer Complexion",
        desc: "Noticeable reduction in surface sebum and pore congestion.",
      },
      {
        target: 93,
        label: "Non-Stripping Moisture Balance",
        desc: "Skin felt calm, supple, and refreshed with zero tight dryness.",
      },
      {
        target: 91,
        label: "Visible Pore Refinement",
        desc: "Visibly clearer, tighter pores and smoother skin texture.",
      },
      {
        target: 94,
        label: "Enhanced Blue Light Synergy",
        desc: "Faster blemish resolution when cleansing prior to 415nm blue light.",
      },
    ],
    []
  );

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

  return (
    <section className="buudy-section bg-[var(--cream)] py-10 md:py-16">
      <div className="buudy-wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <p className="buudy-mono text-[var(--gold)] uppercase tracking-wider text-xs md:text-sm font-semibold">
            Consumer Perception &amp; Clinical Trial Results
          </p>
          <h2 className="buudy-display mt-2 sm:mt-3 text-2xl sm:text-3xl lg:text-[2.4rem] leading-tight text-[var(--plum)]">
            Gentle blemish purification, <em className="buudy-italic text-[var(--gold)]">proven on real skin</em>.
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
            Formulated specifically to remove excess sebum and impurities while preserving the skin&apos;s essential moisture barrier and prepping pores for optimal LED light absorption.
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
                src="/images/products/buudy-face-wash/05-cleanse-rinse-reset-still-life.webp"
                alt="Buudy Blemish Purifying Face Wash cleanse rinse reset architectural still life"
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

// 2. How To Use 3-Step Daily Cleansing Ritual
export function CleanserHowToUse() {
  const steps = [
    {
      num: "01",
      title: "Wet Face",
      desc: "Wet face and neck with lukewarm water to soften sebum without triggering barrier sensitivity.",
    },
    {
      num: "02",
      title: "Massage Gently",
      desc: "Dispense 1–2 pumps onto damp hands. Gently massage across face and neck for 60 seconds.",
    },
    {
      num: "03",
      title: "Rinse & Prep for Light",
      desc: "Rinse thoroughly with lukewarm water and pat dry. Pores are purified and prepped for LED light therapy.",
    },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-10 md:py-16" id="how-to-use">
      <div className="buudy-wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Model Editorial Image Column using ONLY the provided image */}
        <div className="relative overflow-hidden rounded-[22px] border border-[rgba(58,31,61,.1)] bg-[var(--card)] shadow-lg aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
          <Image
            src="/images/products/buudy-face-wash/08-two-hand-pump-ritual.webp"
            alt="Buudy Blemish Purifying Face Wash two-hand application ritual"
            fill
            sizes="(min-width: 1024px) 500px, 100vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Steps Column */}
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow="The Daily Cleansing Ritual"
            title={
              <>
                How to cleanse for{" "}
                <em className="buudy-italic text-[var(--gold)]">clear, calm skin</em>.
              </>
            }
          />
          <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
            Sulphate-free micro-foam cleanser formulated to dissolve surface impurities, balance oil, and prime pores for phototherapy.
          </p>

          {/* 3 Step Cards */}
          <div className="mt-6 space-y-3 sm:space-y-3.5">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl border border-[rgba(58,31,61,.08)] bg-[var(--card)]/80 transition-colors hover:bg-[var(--card)]"
              >
                <div className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-[var(--plum)] text-white font-serif font-bold text-xs sm:text-sm">
                  {step.num}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="buudy-display text-sm sm:text-base font-semibold text-[var(--plum)] leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--muted)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
