"use client";

import { useState } from "react";
import { wavelengths } from "@/data/productSections";

export function WavelengthSelector() {
  const [active, setActive] = useState(wavelengths[0]);

  return (
    <section className="buudy-section bg-[var(--ink)] py-24 text-[var(--cream)]">
      <div
        className="buudy-glow -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2"
        style={{ background: active.color }}
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
            <div
              className="absolute inset-0 rounded-full opacity-70 blur-sm transition duration-700"
              style={{
                background: `radial-gradient(circle, ${active.color} 0%, transparent 65%)`,
              }}
            />
            <div className="relative grid h-56 w-56 place-items-center rounded-full border border-[rgba(247,241,232,.2)] bg-[rgba(247,241,232,.05)] text-center backdrop-blur">
              <div>
                <p className="buudy-mono text-[rgba(247,241,232,.6)]">Wavelength</p>
                <p className="buudy-display mt-2 text-5xl">{active.nm}</p>
                <p className="buudy-display mt-1 text-2xl text-[var(--gold)]">
                  {active.name}
                </p>
              </div>
            </div>
          </div>

          <ul>
            {wavelengths.map((wavelength) => (
              <li key={wavelength.name}>
                <button
                  className="flex w-full items-center gap-4 border-b border-[rgba(247,241,232,.15)] py-5 text-left transition hover:pl-3"
                  onClick={() => setActive(wavelength)}
                  onMouseEnter={() => setActive(wavelength)}
                  type="button"
                >
                  <span
                    className="h-3 w-3 flex-none rounded-full transition group-hover:scale-150"
                    style={{ background: wavelength.color }}
                  />
                  <span className="buudy-mono w-20 text-[rgba(247,241,232,.6)]">
                    {wavelength.nm}
                  </span>
                  <span className="buudy-display text-xl">{wavelength.name}</span>
                  <span className="ml-auto hidden text-sm text-[rgba(247,241,232,.72)] sm:block">
                    {wavelength.description}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
