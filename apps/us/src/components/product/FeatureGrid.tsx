"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { features } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconGrid4x4,
  IconShieldHeart,
  IconColorFilter,
  IconBatteryCharging,
  IconShieldCheck,
  IconDiamond,
} from "@tabler/icons-react";

const featureIcons = [
  IconGrid4x4,
  IconShieldHeart,
  IconColorFilter,
  IconBatteryCharging,
  IconShieldCheck,
  IconDiamond,
];

export function FeatureGrid() {
  const [open, setOpen] = useState(0);

  return (
    <section className="buudy-section border-y border-[var(--border)] bg-[rgba(241,223,210,.42)] md: md: py-14 md:py-24">
      <div className="buudy-wrap">
        <SectionHeading
          eyebrow="Why Buudy"
          title={
            <>
              What makes our mask{" "}
              <em className="buudy-italic text-[var(--gold)]">unique</em>?
            </>
          }
        />

        {/* Desktop View: Original Grid */}
        <div className="hidden mt-10 gap-px bg-[rgba(58,31,61,.15)] md:mt-16 md:grid md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <article
                className="bg-[var(--cream)] p-8 transition-all duration-300 hover:bg-[var(--card)] hover:shadow-xl md:p-10 group"
                key={`desktop-${feature.title}`}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Glowing Icon Container */}
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[rgba(184,149,86,.12)] text-[var(--gold)] transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:text-[var(--cream)] shadow-sm">
                    {Icon ? <Icon size={24} stroke={1.5} /> : null}
                  </span>
                  <div className="flex flex-1 items-center gap-4">
                    <span className="h-px flex-1 bg-[rgba(58,31,61,.15)]" />
                    <span className="buudy-display text-base text-[var(--gold)] font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <h3 className="buudy-display mt-6 text-2xl text-[var(--plum)] transition-colors duration-300 group-hover:text-[var(--gold)]">
                  {feature.title}
                </h3>
                <p className="buudy-display mt-2.5 italic text-[var(--plum-soft)]">
                  {feature.kicker}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {feature.body}
                </p>
              </article>
            );
          })}
        </div>

        {/* Mobile View: Accordion */}
        <div className="mt-10 md:hidden bg-[var(--cream)] border-y border-[var(--border)]">
          <ul>
            {features.map((feature, index) => {
              const Icon = featureIcons[index];
              const isOpen = open === index;

              return (
                <li className="border-b border-[var(--border)] last:border-b-0" key={`mobile-${feature.title}`}>
                  <button
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    type="button"
                  >
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[rgba(184,149,86,.12)] text-[var(--gold)]">
                      {Icon ? <Icon size={20} stroke={1.5} /> : null}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="buudy-display text-[0.95rem] leading-tight text-[var(--plum)] truncate">
                        {feature.title}
                      </h3>
                      <p className="buudy-display mt-0.5 text-[0.8rem] italic text-[var(--plum-soft)] truncate">
                        {feature.kicker}
                      </p>
                    </div>
                    <div className="flex flex-none items-center gap-2">
                      <span className="buudy-display text-sm text-[var(--gold)] font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Plus
                        className={`flex-none text-[var(--gold)] transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        size={18}
                      />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] pb-6 px-6 opacity-100" : "grid-rows-[0fr] px-6 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-7 text-[var(--muted)]">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
