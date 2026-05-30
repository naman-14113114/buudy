"use client";

import { useState } from "react";
import { wavelengths } from "@/data/productSections";
import { productMediaAsset } from "@/lib/media";

const wavelengthImages: Record<string, string> = {
  RED: productMediaAsset("ChatGPT Image May 30, 2026, 05_13_17 PM (1).png"),
  BLUE: productMediaAsset("91.png"),
  GREEN: productMediaAsset("ChatGPT Image May 30, 2026, 05_13_20 PM (4).png"),
  CYAN: productMediaAsset("ChatGPT Image May 30, 2026, 05_13_17 PM (2).png"),
  YELLOW: productMediaAsset("ChatGPT Image May 30, 2026, 05_13_19 PM (3).png"),
  PURPLE: productMediaAsset("ChatGPT Image May 30, 2026, 05_13_22 PM (5).png"),
  WHITE: productMediaAsset("ChatGPT Image May 30, 2026, 05_13_24 PM (6).png"),
};

export function WavelengthSelector() {
  const [active, setActive] = useState(wavelengths[0]);

  return (
    <section className="buudy-section bg-[var(--ink)] py-24 text-[var(--cream)] overflow-hidden">
      <div
        className="buudy-glow -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 transition-colors duration-700"
        style={{ background: `${active.color}15` }}
      />
      <div className="buudy-wrap relative z-10">
        <div className="max-w-3xl">
          <p className="buudy-mono text-[var(--gold)]">Spectrum</p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-[1.06] text-[var(--cream)] md:text-6xl">
            Change <em className="buudy-italic">7 wavelengths</em> with a tap.
          </h2>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center">
            {/* Soft, beautiful radial glow behind the mask */}
            <div
              className="absolute inset-0 rounded-full opacity-60 blur-xl transition duration-700"
              style={{
                background: `radial-gradient(circle, ${active.color} 0%, transparent 70%)`,
              }}
            />
            
            {/* Stacked absolute images for preloading and instant transitions */}
            <div className="relative w-full h-full">
              {wavelengths.map((wavelength) => {
                const imgPath = wavelengthImages[wavelength.name];
                const isActive = active.name === wavelength.name;
                return (
                  <img
                    key={wavelength.name}
                    src={imgPath}
                    alt={`Buudy LED Mask - ${wavelength.name} Light`}
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ease-in-out ${
                      isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
                    }`}
                    style={{
                      filter: isActive ? `drop-shadow(0 0 35px ${wavelength.color}35)` : "none",
                    }}
                  />
                );
              })}
            </div>

            {/* Premium, floating glassmorphic badge for wavelength detail */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center rounded-full border border-[rgba(247,241,232,.15)] bg-[rgba(15,15,15,.65)] px-6 py-2.5 backdrop-blur-md text-center shadow-lg transition duration-500 hover:border-[rgba(247,241,232,.3)]">
              <p className="buudy-mono text-[9px] uppercase tracking-[0.15em] text-[rgba(247,241,232,.5)]">Wavelength</p>
              <div className="flex items-center gap-2.5 mt-0.5">
                <span className="buudy-display text-2xl font-semibold text-[var(--cream)]">{active.nm}</span>
                <span className="h-2 w-2 rounded-full shadow-glow" style={{ background: active.color, boxShadow: `0 0 8px ${active.color}` }} />
                <span className="buudy-display text-sm font-medium tracking-wide text-[var(--gold)]">{active.name}</span>
              </div>
            </div>
          </div>

          <ul>
            {wavelengths.map((wavelength) => {
              const isActive = active.name === wavelength.name;
              return (
                <li key={wavelength.name}>
                  <button
                    className={`flex w-full items-center gap-4 border-b border-[rgba(247,241,232,.1)] py-5 text-left transition-all duration-300 hover:pl-3 group ${
                      isActive ? "bg-[rgba(247,241,232,.03)] pl-3 border-l-2 border-l-[var(--gold)]" : ""
                    }`}
                    onClick={() => setActive(wavelength)}
                    onMouseEnter={() => setActive(wavelength)}
                    type="button"
                  >
                    <span
                      className={`h-3.5 w-3.5 flex-none rounded-full transition-all duration-300 ${
                        isActive ? "scale-125" : "group-hover:scale-110"
                      }`}
                      style={{
                        background: wavelength.color,
                        boxShadow: isActive ? `0 0 10px ${wavelength.color}` : "none",
                      }}
                    />
                    <span className="buudy-display w-20 uppercase text-[rgba(247,241,232,.6)]">
                      {wavelength.nm}
                    </span>
                    <span className={`buudy-display text-xl transition-colors duration-300 ${
                      isActive ? "text-[var(--gold)]" : "text-[var(--cream)] group-hover:text-[var(--gold)]"
                    }`}>
                      {wavelength.name}
                    </span>
                    <span className="buudy-display ml-auto hidden text-sm text-[rgba(247,241,232,.6)] sm:block">
                      {wavelength.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

