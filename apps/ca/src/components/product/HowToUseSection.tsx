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
              poster={productAsset("buudy-7-colour-led-mask-unboxing-video-poster-16s-uk.webp")}
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
                className="absolute inset-0 flex items-center justify-center bg-transparent transition-all duration-300 cursor-pointer"
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

          <div className="mt-3.5 sm:mt-4 space-y-3 max-w-xl">
            <p className="font-sans text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              Curious about how to get started, charge your device, navigate the smart touch sensors, or customise your light therapy colours and intensity levels?
            </p>
            <p className="font-sans text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              Watch our complete unboxing and walkthrough video to see the Buudy LED Mask in action, explore every feature in detail, and learn how to fit it effortlessly into your daily skincare routine.
            </p>
          </div>

          <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center rounded-full bg-white/80 border border-[rgba(58,31,61,.1)] px-3 py-1 text-xs font-medium text-[var(--plum)] shadow-xs">
              ⚡ Setup &amp; Charging
            </span>
            <span className="inline-flex items-center rounded-full bg-white/80 border border-[rgba(58,31,61,.1)] px-3 py-1 text-xs font-medium text-[var(--plum)] shadow-xs">
              👆 Touch Sensor Controls
            </span>
            <span className="inline-flex items-center rounded-full bg-white/80 border border-[rgba(58,31,61,.1)] px-3 py-1 text-xs font-medium text-[var(--plum)] shadow-xs">
              🌈 7 Light Modes &amp; Intensity
            </span>
            <span className="inline-flex items-center rounded-full bg-white/80 border border-[rgba(58,31,61,.1)] px-3 py-1 text-xs font-medium text-[var(--plum)] shadow-xs">
              💆 Face &amp; Neck Fitting
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
