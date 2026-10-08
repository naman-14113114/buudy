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
                      src={productMediaAsset("shark_logo.png")}
                      alt="Dr Dennis Gross"
                      className="w-auto object-contain"
                      style={{ maxHeight: "28px", maxWidth: "70%" }}
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
                      src={productMediaAsset("shark-2.png")}
                      alt="Dr Dennis Gross Mask"
                      className="w-auto object-contain"
                      style={{ maxHeight: "150px" }}
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
            title="Neck Coverage"
            subtitle="Full face & neck coverage in one"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Light Colours"
            subtitle="Specific wavelengths for targeted skin concerns"
            values={[
              <div key="1" className="flex flex-col items-center">
                <strong className="buudy-display font-bold text-xs md:text-sm text-[var(--plum)]">
                  7 LED Colours + NIR
                </strong>
                <div className="flex flex-wrap items-center justify-center gap-1 md:gap-1.5 mt-1.5">
                  <span title="Red (633nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#F00202" }} />
                  <span title="Near-Infrared (830nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#8B0000" }} />
                  <span title="Blue (415nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#0231F0" }} />
                  <span title="Green (525nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#05CF1D" }} />
                  <span title="Cyan (490nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#02E1F0" }} />
                  <span title="Yellow (590nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#F0E602" }} />
                  <span title="Purple (390nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#DE02F0" }} />
                </div>
              </div>,
              <div key="2" className="flex flex-col items-center">
                <strong className="buudy-display font-bold text-xs md:text-sm text-[var(--muted)]">
                  2 TOTAL
                </strong>
                <div className="flex items-center justify-center gap-1 md:gap-1.5 mt-1.5">
                  <span title="Red (633nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#F00202" }} />
                  <span title="Near-Infrared (830nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#8B0000" }} />
                </div>
              </div>,
              <div key="3" className="flex flex-col items-center">
                <strong className="buudy-display font-bold text-xs md:text-sm text-[var(--muted)]">
                  2 TOTAL
                </strong>
                <div className="flex items-center justify-center gap-1 md:gap-1.5 mt-1.5">
                  <span title="Red (633nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#F00202" }} />
                  <span title="Near-Infrared (830nm)" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#8B0000" }} />
                </div>
              </div>,
              <div key="4" className="flex flex-col items-center">
                <strong className="buudy-display font-bold text-xs md:text-sm text-[var(--muted)]">
                  3 TOTAL
                </strong>
                <div className="flex items-center justify-center gap-1 md:gap-1.5 mt-1.5">
                  <span title="Red" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#F00202" }} />
                  <span title="Blue" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#0231F0" }} />
                  <span title="Purple" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full inline-block shadow-sm border border-black/10 shrink-0" style={{ backgroundColor: "#DE02F0" }} />
                </div>
              </div>,
            ]}
          />

          <ComparisonRow
            title="Portable"
            subtitle="Hands-free, cordless and rechargeable"
            values={[<CheckIcon key="1" />, <CheckIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Free UK Delivery"
            subtitle="Fast, tracked next-day dispatch"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Free £70 Torch Included"
            subtitle="Targeted red light device with order"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Eye Protection"
            subtitle="Integrated protective eye cushions"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ComparisonRow
            title="Customizable treatments"
            subtitle="Targeted modes & session control"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="App companion"
            subtitle="Free guided sessions on iOS & Android"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Price"
            values={[
              <span key="1" className="buudy-display font-bold text-base md:text-lg text-[var(--plum)]">
                <span className="line-through mr-1.5 opacity-60">£449</span>£179
              </span>,
              <span key="2" className="buudy-display text-base md:text-lg text-[var(--muted)]">£348</span>,
              <span key="3" className="buudy-display text-base md:text-lg text-[var(--muted)]">£399</span>,
              <span key="4" className="buudy-display text-base md:text-lg text-[var(--muted)]">£259</span>,
            ]}
            isLast={true}
          />
        </div>
      </div>
    </section>
  );
}
