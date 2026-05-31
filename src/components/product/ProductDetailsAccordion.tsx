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
} from "lucide-react";
import type { Product } from "@/data/products";
import type { ReactNode } from "react";

type AccordionItem = {
  id: "specs" | "included" | "certifications";
  eyebrow: string;
  title: string;
  content: ReactNode;
};

function getSpecIcon(label: string) {
  const normLabel = label.toLowerCase();
  if (normLabel.includes("dimension")) return Ruler;
  if (normLabel.includes("led")) return Lightbulb;
  if (normLabel.includes("color")) return Palette;
  if (normLabel.includes("battery")) return Battery;
  if (normLabel.includes("use")) return Smile;
  if (normLabel.includes("power")) return Zap;
  if (normLabel.includes("irradiance") || normLabel.includes("wavelength")) return Sun;
  if (normLabel.includes("voltage")) return Zap;
  if (normLabel.includes("intensity")) return Activity;
  return Zap;
}

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
      <button
        aria-controls={contentId}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 py-4 text-left"
        onClick={onToggle}
        type="button"
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
      </button>
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
  const [openItem, setOpenItem] = useState<AccordionItem["id"] | null>(null);

  const items: AccordionItem[] = [
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
        <ul className="grid gap-2 sm:grid-cols-2">
          {product.badges.map((badge) => (
            <li
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm font-semibold leading-5 text-[var(--plum)]"
              key={badge}
            >
              {badge}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section
      aria-label="Product details"
      className="mt-8 rounded-[18px] border border-[var(--border)] bg-[rgba(247,241,232,.64)] px-5"
    >
      {items.map((item) => (
        <AccordionPanel
          isOpen={openItem === item.id}
          item={item}
          key={item.id}
          onToggle={() =>
            setOpenItem((current) => (current === item.id ? null : item.id))
          }
        />
      ))}
    </section>
  );
}
