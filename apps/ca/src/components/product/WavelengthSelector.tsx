"use client";

import { useState } from "react";
import { wavelengths } from "@/data/productSections";
import { productMediaAsset } from "@/lib/media";


export function WavelengthSelector() {
  const [active, setActive] = useState(
    wavelengths.find((wavelength) => wavelength.name === "RED") ?? wavelengths[0],
  );

  return (
    <section className="buudy-section overflow-hidden bg-[var(--ink)] py-14 text-[var(--cream)] md:py-24">
      <div
        className="buudy-glow -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 transition-colors duration-700"
        style={{ background: `${active.color}15` }}
      />
      <div className="buudy-wrap relative z-10">
        <div className="max-w-full lg:max-w-5xl">
          <p className="buudy-mono text-[var(--gold)]">Spectrum</p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-[1.06] text-[var(--cream)] md:text-6xl">
            Change <em className="buudy-italic">7 light modes</em> with a tap.
          </h2>
        </div>

        <div className="mt-4 grid items-center gap-4 md:mt-6 md:gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center">
            {/* Soft, beautiful radial glow behind the mask */}
            <div
              className="absolute inset-0 rounded-full opacity-60 blur-xl transition duration-700"
              style={{
                background: `radial-gradient(circle, ${active.color} 0%, transparent 70%)`,
              }}
            />
            
            {/* Autoplay video replacing stacked images */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <video
                src={productMediaAsset("7 colors muted.webm", "buudy-led-mask", "videos")}
                className="absolute inset-0 w-full h-full object-contain"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          <ul>
            {wavelengths.map((wavelength) => {
              const isActive = active.name === wavelength.name;
              return (
                <li key={wavelength.name}>
                  <button
                    className={`flex w-full items-center gap-4 border-b border-[rgba(247,241,232,.1)] py-2 text-left transition-all duration-300 hover:pl-3 group ${
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
