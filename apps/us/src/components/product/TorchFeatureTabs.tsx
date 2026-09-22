"use client";

import { useState } from "react";
import Image from "next/image";
import { productAsset } from "@/lib/media";

const tabs = [
  {
    id: "compact-build",
    tabLabel: "Compact Build",
    title: "Take your Wellness Anywhere",
    body: "Lightweight 74g design (12cm / 4.72 inches) works at home, the office, or during travel. Durable one-button operation.",
    image: productAsset(
      "07-buudy-red-light-torch-lifestyle-portable-relief.webp",
      "buudy-red-torch",
    ),
  },
  {
    id: "clinical-strength",
    tabLabel: "Clinical Strength",
    title: "Clinical Strength",
    body: "The Buudy LED Torch combines red (630nm), deep red (660nm), and near-infrared (850nm) wavelengths for a focused skin and body care routine.",
    image: productAsset(
      "08-buudy-red-light-torch-neck-targeted-wellness.webp",
      "buudy-red-torch",
    ),
  },
  {
    id: "precision-wavelengths",
    tabLabel: "Precision Wavelengths",
    title: "Precision Wavelengths",
    body: "Use the specific wavelength blend for localized application on the face, back, knees, shoulders, hands, feet, or other target areas.",
    image: productAsset(
      "09-buudy-red-light-torch-knee-joint-precision.webp",
      "buudy-red-torch",
    ),
  },
  {
    id: "rapid-treatment",
    tabLabel: "Rapid Treatment",
    title: "Rapid Treatment",
    body: "Hold the torch over the target area for quick sessions, building gradually as your body gets used to red light therapy.",
    image: productAsset(
      "10-buudy-red-light-torch-arm-muscle-rapid-treatment.webp",
      "buudy-red-torch",
    ),
  },
];

export function TorchFeatureTabs() {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <section className="buudy-section bg-[var(--cream)] text-[var(--plum)] md: py-14 md:py-24">
      <div className="buudy-wrap">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--ink)] text-[var(--cream)]"
                    : "bg-[rgba(58,31,61,.04)] text-[var(--plum)] hover:bg-[rgba(58,31,61,.08)]"
                }`}
              >
                {tab.tabLabel}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-3xl">
            <Image
              src={activeTab.image}
              alt={activeTab.tabLabel}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="buudy-display text-4xl sm:text-5xl text-[var(--plum)] mb-6">
              {activeTab.title}
            </h2>
            <p className="text-[var(--muted)] leading-relaxed text-lg max-w-lg mx-auto md:mx-0">
              {activeTab.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
