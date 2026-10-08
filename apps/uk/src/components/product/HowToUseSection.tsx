"use client";

import { useRef, useState } from "react";
import { productMediaAsset, productAsset } from "@/lib/media";

export function HowToUseSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const steps = [
    {
      num: "1",
      title: "Cleanse & Dry",
      desc: "Wash and thoroughly dry your face and neck before use.",
    },
    {
      num: "2",
      title: "Fit & Fasten",
      desc: "Place the silicone mask and neck piece on, securing the straps.",
    },
    {
      num: "3",
      title: "Select Light Mode",
      desc: "Tap the touch button to choose your target light therapy colour.",
    },
    {
      num: "4",
      title: "Relax (3–10 Mins)",
      desc: "Wear comfortably; the mask powers off automatically when done.",
    },
  ];

  return (
    <section className="buudy-section bg-[var(--cream)] py-12 md:py-16" id="how-to-use">
      <div className="buudy-wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Video Column: Right on Desktop (lg:order-2), Above on Mobile (order-1) */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <div className="relative w-full overflow-hidden rounded-[20px] border border-[rgba(58,31,61,.12)] bg-[var(--ink)] shadow-md">
            <video
              className="w-full aspect-video object-cover object-center block"
              playsInline
              controls={isPlaying}
              poster={productAsset("buudy-7-colour-led-mask-how-to-use-poster-uk.webp")}
              preload="metadata"
              ref={videoRef}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
            >
              <source
                src={productMediaAsset("buudy-7-colour-led-mask-how-to-use-guide-uk.mp4", "buudy-led-mask", "videos")}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay (Zero text over image) */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/15 hover:bg-black/30 transition-all duration-300 cursor-pointer"
                aria-label="Play video"
              >
                <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/95 text-[var(--plum)] shadow-xl transition-transform duration-200 hover:scale-110 active:scale-95">
                  <svg className="h-7 w-7 md:h-8 md:w-8 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Content Column: Left on Desktop (lg:order-1), Below on Mobile (order-2) */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          <h2 className="buudy-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-[var(--plum)]">
            Buudy unboxing &amp; <em className="buudy-italic">review</em>
          </h2>

          {/* Compact Steps Matching Video Height */}
          <div className="mt-4 space-y-2">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-3.5 rounded-xl border border-[rgba(58,31,61,.08)] bg-white/70 px-3.5 py-2 transition-colors hover:bg-white"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--plum)] text-xs font-bold text-white font-mono">
                  {step.num}
                </span>
                <div className="min-w-0">
                  <span className="font-sans text-xs sm:text-sm font-bold text-[var(--plum)] mr-2">
                    {step.title}:
                  </span>
                  <span className="text-xs text-[var(--muted)] leading-relaxed">
                    {step.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
