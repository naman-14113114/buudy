"use client";

import Image from "next/image";

/**
 * HalloweenOverlay – visual decorative elements matching the exact reference screenshot:
 * 1. Corner cobweb (top-left) - starts under announcement bar, draping over header & gallery
 * 2. Corner cobweb (top-right) - starts under announcement bar, draping over header & cart
 * 3. Spider dangling from vertical silk thread below cart icon
 * 4. Silhouette bats flying across upper section and left margin
 * 5. Carved Jack-o'-Lantern pumpkins on right side, bottom-left, bottom-right
 */
export function HalloweenOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-[64px] lg:-top-[72px] h-[380px] z-50 overflow-hidden select-none"
    >
      {/* ── Top-Left Corner Cobweb (Shortened & Subtle Opacity) ── */}
      <svg
        className="absolute top-0 left-0 w-[85px] sm:w-[95px] md:w-[110px] h-[85px] sm:h-[95px] md:h-[110px]"
        viewBox="0 0 215 215"
        fill="none"
        stroke="#2c1630"
        strokeWidth="1.0"
        opacity="0.22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0" x2="210.0" y2="0.0" />
        <line x1="0" y1="0" x2="199.7" y2="64.9" />
        <line x1="0" y1="0" x2="169.9" y2="123.4" />
        <line x1="0" y1="0" x2="123.4" y2="169.9" />
        <line x1="0" y1="0" x2="64.9" y2="199.7" />
        <line x1="0" y1="0" x2="0.0" y2="210.0" />
        <path d="M 30.0 0.0 Q 22.8 3.6 28.5 9.3 Q 20.6 10.5 24.3 17.6 Q 16.3 16.3 17.6 24.3 Q 10.5 20.6 9.3 28.5 Q 3.6 22.8 0.0 30.0" />
        <path d="M 65.0 0.0 Q 49.5 7.8 61.8 20.1 Q 44.6 22.7 52.6 38.2 Q 35.4 35.4 38.2 52.6 Q 22.7 44.6 20.1 61.8 Q 7.8 49.5 0.0 65.0" />
        <path d="M 105.0 0.0 Q 79.9 12.7 99.9 32.4 Q 72.1 36.7 84.9 61.7 Q 57.2 57.2 61.7 84.9 Q 36.7 72.1 32.4 99.9 Q 12.7 79.9 0.0 105.0" />
        <path d="M 150.0 0.0 Q 114.1 18.1 142.7 46.4 Q 103.0 52.5 121.4 88.2 Q 81.7 81.7 88.2 121.4 Q 52.5 103.0 46.4 142.7 Q 18.1 114.1 0.0 150.0" />
        <path d="M 195.0 0.0 Q 148.4 23.5 185.5 60.3 Q 133.9 68.2 157.8 114.6 Q 106.2 106.2 114.6 157.8 Q 68.2 133.9 60.3 185.5 Q 23.5 148.4 0.0 195.0" />
      </svg>

      {/* ── Top-Right Corner Cobweb (Shortened & Subtle Opacity) ── */}
      <svg
        className="absolute top-0 right-0 w-[85px] sm:w-[95px] md:w-[110px] h-[85px] sm:h-[95px] md:h-[110px] -scale-x-100"
        viewBox="0 0 215 215"
        fill="none"
        stroke="#2c1630"
        strokeWidth="1.0"
        opacity="0.22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0" x2="210.0" y2="0.0" />
        <line x1="0" y1="0" x2="199.7" y2="64.9" />
        <line x1="0" y1="0" x2="169.9" y2="123.4" />
        <line x1="0" y1="0" x2="123.4" y2="169.9" />
        <line x1="0" y1="0" x2="64.9" y2="199.7" />
        <line x1="0" y1="0" x2="0.0" y2="210.0" />
        <path d="M 30.0 0.0 Q 22.8 3.6 28.5 9.3 Q 20.6 10.5 24.3 17.6 Q 16.3 16.3 17.6 24.3 Q 10.5 20.6 9.3 28.5 Q 3.6 22.8 0.0 30.0" />
        <path d="M 65.0 0.0 Q 49.5 7.8 61.8 20.1 Q 44.6 22.7 52.6 38.2 Q 35.4 35.4 38.2 52.6 Q 22.7 44.6 20.1 61.8 Q 7.8 49.5 0.0 65.0" />
        <path d="M 105.0 0.0 Q 79.9 12.7 99.9 32.4 Q 72.1 36.7 84.9 61.7 Q 57.2 57.2 61.7 84.9 Q 36.7 72.1 32.4 99.9 Q 12.7 79.9 0.0 105.0" />
        <path d="M 150.0 0.0 Q 114.1 18.1 142.7 46.4 Q 103.0 52.5 121.4 88.2 Q 81.7 81.7 88.2 121.4 Q 52.5 103.0 46.4 142.7 Q 18.1 114.1 0.0 150.0" />
        <path d="M 195.0 0.0 Q 148.4 23.5 185.5 60.3 Q 133.9 68.2 157.8 114.6 Q 106.2 106.2 114.6 157.8 Q 68.2 133.9 60.3 185.5 Q 23.5 148.4 0.0 195.0" />
      </svg>

      {/* ── Bat (Upper hero right side, crisp and clearly visible) ── */}
      <div
        className="absolute top-[160px] sm:top-[175px] right-[80px] sm:right-[130px] md:right-[160px] z-20"
        style={{ animation: "halloween-bat-float-2 6s ease-in-out infinite" }}
      >
        <Image
          src="/images/halloween-bat.png"
          alt="Halloween Bat"
          width={40}
          height={20}
          className="w-[28px] sm:w-[32px] h-auto object-contain rotate-[10deg]"
          priority
        />
      </div>

      {/* ── Pumpkin (Upper hero right side, sharp and clearly visible with zero blur) ── */}
      <div
        className="absolute top-[225px] sm:top-[240px] right-[14px] sm:right-[28px] md:right-[38px] z-20"
        style={{ animation: "halloween-pumpkin-glow 3.5s ease-in-out infinite" }}
      >
        <Image
          src="/images/halloween-pumpkin.png"
          alt="Halloween Pumpkin"
          width={34}
          height={34}
          className="w-[28px] sm:w-[32px] h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}

/**
 * HalloweenSaleBadge – exact pill badge with orange drip from reference image.
 * Renders the clean extracted badge image with dripping orange liquid.
 */
export function HalloweenSaleBadge() {
  return (
    <div className="inline-flex items-center shrink-0 -my-2.5">
      <Image
        src="/images/halloween-sale-badge.png"
        alt="Halloween Sale Save 60%"
        width={140}
        height={48}
        className="h-[46px] sm:h-[50px] w-auto object-contain select-none drop-shadow-[0_2px_8px_rgba(255,122,0,0.35)]"
        priority
        unoptimized
      />
    </div>
  );
}
