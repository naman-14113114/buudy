"use client";

import { useState } from "react";
import {
  ChevronDown,
  Ruler,
  Lightbulb,
  Palette,
  Battery,
  Smile,
  Zap,
  Sun,
  Activity,
  Smartphone,
  ScanFace,
  BatteryCharging,
  Timer,
  Hand,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Plug,
  Sliders,
  Eye,
  Pipette,
  Calendar,
  SunMedium,
  Droplets,
  FlaskConical,
  Leaf,
  Scale,
  Moon,
  Layers,
  Package,
  Tag,
  Award,
  Heart,
  Shield,
  CheckCircle2,
  Globe,
} from "lucide-react";
import type { Product } from "@/data/products";
import type { ReactNode } from "react";
import { features, torchFeatures, iplFeatures, serumFeatures, peptideSerumFeatures, prebioticSerumFeatures, cleanserFeatures } from "@/data/productSections";
import {
  IconGrid4x4,
  IconShieldHeart,
  IconColorFilter,
  IconBatteryCharging,
  IconShieldCheck,
  IconDeviceMobile,
  IconBulb,
} from "@tabler/icons-react";

const featureIcons = [
  IconGrid4x4,
  IconShieldHeart,
  IconColorFilter,
  IconBatteryCharging,
  IconShieldCheck,
  IconDeviceMobile,
];

function getCertificationIcon(badge: string) {
  const norm = badge.toLowerCase();
  if (norm.includes("gluten")) return ShieldCheck;
  if (norm.includes("nut")) return Shield;
  if (norm.includes("vegan")) return Leaf;
  if (norm.includes("natural")) return Award;
  if (norm.includes("allergen")) return Sparkles;
  if (norm.includes("cosmeceutical") || norm.includes("cosmetic")) return FlaskConical;
  if (norm.includes("dermatolog")) return CheckCircle2;
  if (norm.includes("fda")) return ShieldCheck;
  if (norm.includes("gmp") || norm.includes("iso")) return Award;
  if (norm.includes("b corporation") || norm.includes("b-corp") || norm.includes("b corp")) return Globe;
  if (norm.includes("ecocert") || norm.includes("cosmos") || norm.includes("organic")) return Award;
  if (norm.includes("cruelty")) return Heart;
  if (norm.includes("clean") || norm.includes("silicone") || norm.includes("paraben")) return Sparkles;
  if (norm.includes("cpnp") || norm.includes("registered") || norm.includes("safety")) return CheckCircle2;
  return ShieldCheck;
}

function getSkincareFeatureIcon(feature: { title: string; kicker: string }, index: number) {
  const text = `${feature.title} ${feature.kicker}`.toLowerCase();
  if (text.includes("hexapeptide") || text.includes("peptide") || text.includes("amino")) return Sparkles;
  if (text.includes("hydroxyproline") || text.includes("collagen") || text.includes("firm")) return Layers;
  if (text.includes("ha") || text.includes("hyaluronic") || text.includes("pca") || text.includes("hydration")) return Droplets;
  if (text.includes("blueberry") || text.includes("ginkgo") || text.includes("antioxidant") || text.includes("botanical") || text.includes("mate")) return Leaf;
  if (text.includes("jojoba") || text.includes("strawberry") || text.includes("lipid") || text.includes("barrier") || text.includes("moisture")) return ShieldCheck;
  if (text.includes("ecocert") || text.includes("cosmos") || text.includes("vegan") || text.includes("standard") || text.includes("cleanse")) return Award;
  const fallbacks = [Sparkles, Layers, Droplets, Leaf, ShieldCheck, Award];
  return fallbacks[index % fallbacks.length];
}

type AccordionItem = {
  id: "unique" | "specs" | "benefits" | "included" | "certifications";
  eyebrow: string;
  title: string;
  content: ReactNode;
};

function getSpecIcon(label: string) {
  const normLabel = label.toLowerCase();
  if (normLabel.includes("included") || normLabel.includes("items") || normLabel.includes("collection") || normLabel.includes("formulas")) return Layers;
  if (normLabel.includes("packaging") || normLabel.includes("carton") || normLabel.includes("box") || normLabel.includes("presentation")) return Package;
  if (normLabel.includes("peel") || normLabel.includes("acid") || normLabel.includes("aha")) return FlaskConical;
  if (normLabel.includes("botanical") || normLabel.includes("antioxidant") || normLabel.includes("plant") || normLabel.includes("tea")) return Leaf;
  if (normLabel.includes("ph") || normLabel.includes("balance")) return Scale;
  if (normLabel.includes("overnight") || normLabel.includes("evening") || normLabel.includes("night")) return Moon;
  if (normLabel.includes("active") || normLabel.includes("complex") || normLabel.includes("peptide")) return Sparkles;
  if (normLabel.includes("hydration") || normLabel.includes("matrix") || normLabel.includes("ingredient") || normLabel.includes("moisture") || normLabel.includes("cushion")) return Droplets;
  if (normLabel.includes("regimen") || normLabel.includes("step") || normLabel.includes("routine") || normLabel.includes("usage")) return Calendar;
  if (normLabel.includes("savings") || normLabel.includes("saving") || normLabel.includes("value") || normLabel.includes("discount") || normLabel.includes("price")) return Tag;
  if (normLabel.includes("circulation") || normLabel.includes("eye") || normLabel.includes("optical") || normLabel.includes("transparency")) return Eye;
  if (normLabel.includes("volume") || normLabel.includes("size") || normLabel.includes("capacity") || normLabel.includes("bottle") || normLabel.includes("pump") || normLabel.includes("tube")) return Pipette;
  if (normLabel.includes("synergy") || normLabel.includes("light") || normLabel.includes("wavelength") || normLabel.includes("irradiance")) return SunMedium;
  if (normLabel.includes("dimension")) return Ruler;
  if (normLabel.includes("led")) return Lightbulb;
  if (normLabel.includes("color")) return Palette;
  if (normLabel.includes("battery")) return Battery;
  if (normLabel.includes("use")) return Smile;
  if (normLabel.includes("power")) return Plug;
  if (normLabel.includes("voltage")) return Zap;
  if (normLabel.includes("intensity")) return Activity;
  if (normLabel.includes("cooling")) return Snowflake;
  if (normLabel.includes("flash")) return Sparkles;
  if (normLabel.includes("mode")) return Sliders;
  if (normLabel.includes("lamp")) return Lightbulb;
  return Sparkles;
}

const keyBenefitIcons = [
  Smartphone,
  Palette,
  ScanFace,
  BatteryCharging,
  Timer,
  Hand,
  ShieldCheck,
];

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentId = `product-detail-${item.id}`;

  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <div
        aria-controls={contentId}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 py-4 text-left cursor-pointer select-none"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <span>
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--gold)]">{item.eyebrow}</span>
          <span className="font-playfair mt-1 block text-xl text-[var(--plum)]">
            {item.title}
          </span>
        </span>
        <ChevronDown
          className={`flex-none text-[var(--plum)] transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
          size={19}
        />
      </div>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        id={contentId}
      >
        <div className="overflow-hidden">
          <div className="pb-5">{item.content}</div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsAccordion({ product }: { product: Product }) {
  const [openItems, setOpenItems] = useState<Set<AccordionItem["id"]>>(new Set());

  function toggleItem(id: AccordionItem["id"]) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const isPeptide =
    product.id.includes("peptide") ||
    product.slug.includes("peptide") ||
    product.slug.includes("collagen");

  const isPrebiotic =
    product.id.includes("prebiotic") ||
    product.slug.includes("prebiotic") ||
    product.slug.includes("noni");

  const items: AccordionItem[] = [
    {
      id: "unique",
      eyebrow: "Features",
      title: product.template === "torch" ? "What makes our torch unique?" : product.template === "ipl" ? "What makes our IPL unique?" : product.template === "cleanser" ? "What makes our cleanser unique?" : product.template === "serum" ? "What makes our formula unique?" : "What makes our mask unique?",
      content: (
        <ul className="grid gap-3">
          {(product.template === "torch" ? torchFeatures : product.template === "ipl" ? iplFeatures : product.template === "cleanser" ? cleanserFeatures : product.template === "serum" ? (isPeptide ? peptideSerumFeatures : isPrebiotic ? prebioticSerumFeatures : serumFeatures) : features).map((feature, index) => {
            const Icon = product.template === "torch" ? IconBulb : (product.template === "serum" || product.template === "cleanser") ? getSkincareFeatureIcon(feature, index) : featureIcons[index % featureIcons.length];
            return (
            <li
              key={index}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[rgba(184,149,86,.12)] text-[var(--gold)]">
                    {Icon ? <Icon size={20} strokeWidth={1.5} /> : null}
                  </span>
                  <div>
                    <p className="font-sans text-sm font-bold text-[var(--plum)]">
                      {feature.title}
                    </p>
                    <p className="font-sans mt-0.5 text-xs italic font-semibold text-[var(--gold)]">
                      {feature.kicker}
                    </p>
                  </div>
                </div>
                <span className="buudy-display text-sm text-[var(--gold)] font-medium self-start mt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="font-sans mt-1 text-xs leading-5 text-[var(--muted)]">
                {feature.body}
              </p>
            </li>
          );
        })}
        </ul>
      ),
    },
    {
      id: "specs",
      eyebrow: "Specifications",
      title: "The numbers, in detail",
      content: (
        <dl className="grid gap-3">
          {product.specs.map((spec) => {
            const Icon = getSpecIcon(spec.label);
            return (
              <div className="grid grid-cols-[1fr_auto] gap-4 items-center" key={spec.label}>
                <dt className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[var(--gold)]">
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  <span className="font-sans text-sm font-medium text-[var(--muted)]">{spec.label}</span>
                </dt>
                <dd className="font-sans text-right text-sm font-semibold leading-5 text-[var(--plum)]">
                  {spec.value}
                </dd>
              </div>
            );
          })}
        </dl>
      ),
    },
    /* {
      id: "benefits",
      eyebrow: "Key benefits",
      title: "What your ritual supports",
      content: (
        <ul className="grid gap-2 sm:grid-cols-2">
          {(product.differentiators ?? product.keyBenefits ?? product.highlights).map((benefit, index) => {
            const Icon = keyBenefitIcons[index % keyBenefitIcons.length];

            return (
              <li
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm font-semibold leading-5 text-[var(--plum)]"
                key={benefit}
              >
                <Icon className="shrink-0 text-[var(--gold)]" size={15} strokeWidth={1.8} />
                {benefit}
              </li>
            );
          })}
        </ul>
      ),
    }, */
    {
      id: "included",
      eyebrow: "In the box",
      title: "Everything you need",
      content: (
        <ul className="grid gap-2">
          {product.included.map((item) => (
            <li
              className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[rgba(247,241,232,.55)] px-4 py-3"
              key={`${item.quantity}-${item.label}`}
            >
              <span className="flex items-center gap-3">
                <span className="buudy-mono text-[var(--gold)]">{item.quantity}</span>
                <span className="text-sm font-semibold text-[var(--plum)]">
                  {item.label}
                </span>
              </span>
              {item.tag ? (
                <span className="buudy-mono rounded-full bg-[rgba(184,149,86,.18)] px-3 py-1 text-[var(--plum)]">
                  {item.tag}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "certifications",
      eyebrow: "Certifications",
      title: "Safety and product signals",
      content: (
        <ul className={`grid gap-2.5 grid-cols-1 ${product.badges.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          {product.badges.map((badge) => {
            const CertIcon = getCertificationIcon(badge);
            return (
              <li
                key={badge}
                className="flex items-center gap-2.5 rounded-xl border border-[rgba(58,31,61,0.08)] bg-[var(--card)] px-3.5 py-3 text-sm font-semibold leading-5 text-[var(--plum)] shadow-[0_1px_3px_rgba(58,31,61,0.02)] transition-all hover:border-[rgba(184,149,86,0.35)]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(184,149,86,0.12)] text-[var(--gold)]">
                  <CertIcon size={16} strokeWidth={2} />
                </span>
                <span className="font-sans text-sm tracking-tight">{badge}</span>
              </li>
            );
          })}
        </ul>
      ),
    },
  ];

  return (
    <section
      aria-label="Product details"
      className="mt-8 rounded-[18px] border border-[var(--border)] bg-[rgba(247,241,232,.64)] px-5"
    >
      {items.filter(item => !(product.template === "torch" && item.id === "certifications")).map((item) => (
        <AccordionPanel
          isOpen={openItems.has(item.id)}
          item={item}
          key={item.id}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </section>
  );
}
