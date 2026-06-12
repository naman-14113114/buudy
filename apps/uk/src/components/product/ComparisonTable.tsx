import React from "react";
import { productMediaAsset } from "@/lib/media";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="w-5 h-5 text-[var(--plum)]"
    >
      <circle cx="10" cy="10" r="9.375" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M5.55469 10L8.88802 13.3333L15 7.22217"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="w-5 h-5 text-[#c2bcb1]"
    >
      <circle cx="10" cy="10" r="9.375" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type BrandValues = [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode];

interface ComparisonRowProps {
  title: string;
  subtitle?: string;
  values: BrandValues;
  isLast?: boolean;
}

function ComparisonRow({ title, subtitle, values, isLast = false }: ComparisonRowProps) {
  return (
    <div className={isLast ? "" : "border-b border-[rgba(194,188,177,0.4)]"}>
      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* Feature Info */}
        <div className="w-full md:w-1/3 pr-4 py-2.5 md:py-3.5 flex flex-col justify-center">
          <p className="buudy-display font-semibold text-[var(--plum)] text-base md:text-lg leading-tight">
            {title}
          </p>
          {subtitle && (
            <p className="buudy-display text-[var(--plum-soft)] text-xs md:text-sm font-medium italic mt-0.5 leading-tight">
              {subtitle}
            </p>
          )}
        </div>

        {/* Brand Values */}
        <div className="w-full md:w-2/3">
          <div className="flex h-full items-stretch">
            {values.map((val, idx) => (
              <div
                key={idx}
                className={`w-1/4 py-2.5 md:py-3.5 flex items-center justify-center text-center px-2 min-h-[48px] ${
                  idx === 0
                    ? `bg-[rgba(58,31,61,0.05)] font-semibold text-[var(--plum)] ${isLast ? "rounded-b-2xl" : ""}`
                    : "text-[var(--muted)]"
                }`}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ColorRowProps {
  colorName: string;
  colorCode: string;
  description: string;
  values: BrandValues;
  borderBottom?: boolean;
}

function ColorRow({ colorName, colorCode, description, values, borderBottom = false }: ColorRowProps) {
  return (
    <div className={`${borderBottom ? "border-b border-[rgba(194,188,177,0.4)]" : ""}`}>
      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* Color Badge & Info */}
        <div className="w-full md:w-1/3 pr-4 py-2 md:py-2.5 flex items-center">
          <div className="flex items-center gap-2">
            <span
              className="buudy-mono inline-flex items-center justify-center font-bold text-[9px] uppercase text-white rounded-lg h-[18px] w-[81px] tracking-wider shrink-0"
              style={{ backgroundColor: colorCode }}
            >
              {colorName}
            </span>
            <span className="buudy-display text-[var(--plum)] text-sm md:text-base font-normal">
              {description}
            </span>
          </div>
        </div>

        {/* Brand Values */}
        <div className="w-full md:w-2/3">
          <div className="flex h-full items-stretch">
            {values.map((val, idx) => (
              <div
                key={idx}
                className={`w-1/4 py-2 md:py-2.5 flex items-center justify-center text-center px-2 min-h-[42px] ${
                  idx === 0
                    ? "bg-[rgba(58,31,61,0.05)] font-semibold text-[var(--plum)]"
                    : "text-[var(--muted)]"
                }`}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonTable() {
  return (
    <section className="buudy-section bg-[var(--cream)] md: md: py-14 md:py-24">
      <div className="buudy-wrap max-w-[1144px]">
        {/* Section Header */}
        <div className="mb-8 px-4 text-center md:mb-12">
          <h2 className="buudy-heading hidden md:block pb-2">
            What makes Buudy right for you?
          </h2>
          <h2 className="buudy-heading block md:hidden pb-2 text-[2.2rem]">
            Why is Buudy right for you?
          </h2>
          <h3 className="buudy-display text-xl md:text-2xl text-[var(--plum-soft)] italic mt-3">
            (Here is a comparison, but there is really no comparison)
          </h3>
        </div>

        <div className="mt-8 flex flex-col md:mt-12">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 rounded-t-2xl bg-[rgba(58,31,61,0.05)] md:left-1/3 md:w-1/6"
            />

            {/* Header Comp Row */}
            <div className="relative border-0">
            <div className="flex flex-col md:flex-row md:items-stretch">
              <div className="hidden md:block md:w-1/3"></div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center h-full">
                  <div className="-mb-px w-1/4 flex justify-center items-center h-full pt-4 px-2 pb-0 md:mb-0 md:pb-2">
                    <img
                      src={productMediaAsset("ChatGPT Image May 31, 2026, 12_10_21 AM.png")}
                      alt="Buudy Logo"
                      className="h-8 md:h-10 w-auto object-contain max-w-[90%]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pt-4 px-2 pb-1 md:pb-2">
                    <img
                      src={productMediaAsset("OmniLux_Logo.png")}
                      alt="Omnilux"
                      className="h-7 md:h-10 w-auto object-contain max-w-[90%]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pt-4 px-2 pb-1 md:pb-2">
                    <img
                      src={productMediaAsset("current_body_logo.png")}
                      alt="CurrentBody"
                      className="h-7 md:h-10 w-auto object-contain max-w-[90%]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pt-4 px-2 pb-1 md:pb-2">
                    <img
                      src={productMediaAsset("59 (2).png")}
                      alt="Dr Dennis Gross"
                      className="h-7 md:h-10 w-auto object-contain max-w-[90%]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Mask Images Row */}
            <div className="relative border-b border-[rgba(194,188,177,0.4)]">
            <div className="flex flex-col md:flex-row md:items-stretch h-full">
              <div className="hidden md:block md:w-1/3"></div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center h-full">
                  <div className="-mt-px w-1/4 flex justify-center items-center h-full pb-4 md:mt-0 md:pb-5 px-2 overflow-visible">
                    <img
                      src={productMediaAsset("ChatGPT Image May 31, 2026, 11_38_29 PM.png")}
                      alt="Buudy Mask"
                      className="h-24 sm:h-28 md:h-32 w-auto object-contain scale-[1.3] md:scale-[1.4] transform origin-center transition-transform"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pb-4 md:pb-5 px-2">
                    <img
                      src={productMediaAsset("omnilux.png")}
                      alt="Omnilux Contour Face Mask"
                      className="h-24 sm:h-28 md:h-32 w-auto object-contain"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pb-4 md:pb-5 px-2">
                    <img
                      src={productMediaAsset("current Body.png")}
                      alt="CurrentBody Mask"
                      className="h-24 sm:h-28 md:h-32 w-auto object-contain"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pb-4 md:pb-5 px-2">
                    <img
                      src={productMediaAsset("Dr Dennis Gross.png")}
                      alt="Dr Dennis Gross Mask"
                      className="h-24 sm:h-28 md:h-32 w-auto object-contain"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Features */}
          <ComparisonRow
            title="Portable"
            subtitle="Hands-free, cordless and rechargeable"
            values={[<CheckIcon key="1" />, <CheckIcon key="2" />, <CrossIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ComparisonRow
            title="Light Colours"
            subtitle="Each with specific skin benefits"
            values={[
              <strong key="1" className="buudy-display font-bold text-sm md:text-base text-[var(--plum)]">7 LED Colours + NIR</strong>,
              <strong key="2" className="buudy-display font-bold text-sm md:text-base text-[var(--muted)]">2 TOTAL</strong>,
              <strong key="3" className="buudy-display font-bold text-sm md:text-base text-[var(--muted)]">1 TOTAL</strong>,
              <strong key="4" className="buudy-display font-bold text-sm md:text-base text-[var(--muted)]">3 TOTAL</strong>,
            ]}
          />

          {/* Color Sub-rows */}
          <ColorRow
            colorName="Infrared"
            colorCode="#8B0000"
            description="Deep tissue repair and healing"
            values={[<CheckIcon key="1" />, <CheckIcon key="2" />, <CheckIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ColorRow
            colorName="Red"
            colorCode="#F00202"
            description="Anti-ageing and Revitalisation"
            values={[<CheckIcon key="1" />, <CheckIcon key="2" />, <CheckIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ColorRow
            colorName="Blue"
            colorCode="#0231F0"
            description="Anti-acne Fighter"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ColorRow
            colorName="Green"
            colorCode="#05CF1D"
            description="Reduces dark spots"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ColorRow
            colorName="Cyan"
            colorCode="#02E1F0"
            description="Reduces Swollen capillaries"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ColorRow
            colorName="Yellow"
            colorCode="#F0E602"
            description="Balances skin texture"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ColorRow
            colorName="Purple"
            colorCode="#DE02F0"
            description="Red and Blue in one"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ColorRow
            colorName="White"
            colorCode="#D2D2D2"
            description="Speed up skin metabolism"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
            borderBottom={true}
          />

          <ComparisonRow
            title="Neck Coverage"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Eye Protection"
            subtitle="Integrated eye support"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ComparisonRow
            title="Customizable treatments"
            subtitle="Hands-free, cordless and rechargeable"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ComparisonRow
            title="App companion"
            subtitle="iPhone/Android"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ComparisonRow
            title="Treatment Time"
            subtitle="Full Face + Neck"
            values={[
              <strong key="1" className="buudy-display font-bold text-sm md:text-base text-[var(--plum)]">3 MINS</strong>,
              <strong key="2" className="buudy-display font-bold text-sm md:text-base text-[var(--muted)]">10 MINS</strong>,
              <strong key="3" className="buudy-display font-bold text-sm md:text-base text-[var(--muted)]">10 MINS</strong>,
              <strong key="4" className="buudy-display font-bold text-sm md:text-base text-[var(--muted)]">3 MINS</strong>,
            ]}
          />

          <ComparisonRow
            title="Price"
            values={[
              <span key="1" className="buudy-display font-bold text-base md:text-lg text-[var(--plum)]">
                <span className="line-through mr-1.5 opacity-60">£449</span>£179
              </span>,
              <span key="2" className="buudy-display text-base md:text-lg text-[var(--muted)]">£395</span>,
              <span key="3" className="buudy-display text-base md:text-lg text-[var(--muted)]">£380</span>,
              <span key="4" className="buudy-display text-base md:text-lg text-[var(--muted)]">£455</span>,
            ]}
            isLast={true}
          />
        </div>
      </div>
    </section>
  );
}
