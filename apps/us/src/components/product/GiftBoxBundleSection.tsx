"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";

interface ProductCardProps {
  step: string;
  title: string;
  volume: string;
  role: string;
  description: string;
  actives: string[];
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const renewalProducts: ProductCardProps[] = [
  {
    step: "STEP 01",
    title: "Buudy AHA Peeling Concentrate",
    volume: "30 ML / 1.01 FL OZ",
    role: "Overnight Exfoliation (1–2x Weekly)",
    description:
      "Gentle plant-derived lactic acid dissolves dead surface keratinocytes, unclogs congested pores, and promotes active epidermal cellular renewal without redness or barrier tightness.",
    actives: ["10% Plant Lactic Acid", "1% Hyaluronic Acid", "Organic White Tea & Sage"],
    imageSrc:
      "/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-overnight-exfoliation-aha-peel-uk.webp",
    imageAlt: "Buudy AHA Peeling Concentrate 30ml spotlight",
    href: "/products/buudy-aha-peeling-concentrate",
  },
  {
    step: "STEP 02",
    title: "Buudy Hyaluronic Serum",
    volume: "30 ML / 1.01 FL OZ",
    role: "Daily Hydrate & LED Priming (AM & PM)",
    description:
      "100% water-based, crystal-clear optical hydrogel matrix engineered for zero light scattering during phototherapy while delivering 72-hour multi-depth cellular moisture.",
    actives: ["2% Multi-Depth HA", "Provitamin B5", "Sodium PCA (NMF)"],
    imageSrc:
      "/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-hydration-spotlight-ha-gel-uk.webp",
    imageAlt: "Buudy Hyaluronic Serum 30ml spotlight",
    href: "/products/buudy-light-activating-hyaluronic-serum",
  },
  {
    step: "STEP 03",
    title: "Buudy Peptide Serum",
    volume: "30 ML / 1.01 FL OZ",
    role: "Treat & Firm Facial Contours (AM & PM)",
    description:
      "Bio-fermented Hexapeptide-11 signals dermal fibroblasts to synthesize fresh collagen, softening expression lines, crow's feet, and restoring supple facial bounce.",
    actives: ["Hexapeptide-11 Matrix", "Bio-Fermented Peptides", "Multi-Molecular HA"],
    imageSrc:
      "/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-peptide-spotlight-serum-uk.webp",
    imageAlt: "Buudy Peptide Serum 30ml spotlight",
    href: "/products/buudy-peptide-serum",
  },
];

export function GiftBoxBundleSection({ productSlug }: { productSlug: string }) {
  if (productSlug !== "the-ultimate-renewal-collection-box") {
    return null;
  }

  return (
    <section className="buudy-section bg-[var(--cream)] py-12 md:py-20 border-b border-[rgba(58,31,61,.08)]">
      <div className="buudy-wrap">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(184,149,86,.3)] bg-[rgba(184,149,86,.1)] px-4 py-1.5 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
            <span className="buudy-mono text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
              The Clinical Trilogy · 3 Full-Size Formulations
            </span>
          </div>
          <h2 className="buudy-display text-2xl sm:text-3xl lg:text-[2.5rem] leading-tight text-[var(--plum)]">
            Everything inside <em className="buudy-italic text-[var(--gold)]">The Ultimate Renewal Box</em>.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
            Three synergistic, dermatologically validated treatments formulated to work in harmony—resurfacing, hydrating, and firming your skin for visible clinic-grade results at home.
          </p>
        </div>

        {/* 3-Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {renewalProducts.map((item, idx) => (
            <div
              key={idx}
              data-story-card
              className="flex flex-col rounded-[22px] border border-[rgba(58,31,61,.1)] bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Product Spotlight Image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[var(--cream)] mb-5">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Title */}
              <div className="mb-3">
                <h3 className="buudy-display text-lg sm:text-xl font-bold text-[var(--plum)] leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-[var(--muted)] leading-relaxed mb-4 flex-1">
                {item.description}
              </p>

              {/* Key Actives Pills */}
              <div className="space-y-1.5 pt-3 border-t border-[rgba(58,31,61,.08)] mb-4">
                {item.actives.map((active, aIdx) => (
                  <div key={aIdx} className="flex items-center gap-2 text-xs text-[var(--plum)]">
                    <Check className="h-3.5 w-3.5 text-[var(--gold)] shrink-0" />
                    <span className="font-medium">{active}</span>
                  </div>
                ))}
              </div>

              {/* Direct Link to Individual Product Page */}
              <Link
                href={item.href}
                className="mt-auto inline-flex items-center justify-between text-xs font-semibold text-[var(--plum)] hover:text-[var(--gold)] transition-colors pt-2 group"
              >
                <span>Explore Individual Product</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Dual Visual Feature: Skincare Rhythm (Left) + Three Textures (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div data-story-card className="rounded-[22px] border border-[rgba(58,31,61,.1)] bg-white p-6 shadow-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] mb-4">
              <Image
                src="/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-three-step-skincare-in-use-uk.webp"
                alt="Complete 3-step skincare ritual in use with The Ultimate Renewal Collection Box UK"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <h4 className="buudy-display text-base sm:text-lg font-bold text-[var(--plum)]">
              Your Weekly Skincare Rhythm
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 leading-relaxed">
              Resurface 1–2 evenings per week with the 10% Lactic Acid Concentrate. Hydrate daily with Double Hydration Boost Gel, and seal post-phototherapy cellular energy with Collagen-Lock Hexapeptide Serum.
            </p>
          </div>

          <div data-story-card className="rounded-[22px] border border-[rgba(58,31,61,.1)] bg-white p-6 shadow-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] mb-4">
              <Image
                src="/images/products/the-ultimate-renewal-collection-box/buudy-ultimate-renewal-full-size-luxury-gifting-presentation-uk.webp"
                alt="Full-size 3 x 30ml luxury gifting presentation box set with bespoke deep plum sleeve carton UK"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <h4 className="buudy-display text-base sm:text-lg font-bold text-[var(--plum)]">
              Three Lightweight, Synergistic Textures
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 leading-relaxed">
              Engineered with zero heavy waxes or pore-clogging silicones. From featherweight peeling fluid to zero-scattering optical hydrogel and velvety peptide emulsion, each layer absorbs instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
