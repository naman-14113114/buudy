"use client";

import { useRef, useState } from "react";
import { expertVideo } from "@/data/productSections";

export function ExpertSection() {
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
    <section className="buudy-section bg-[var(--cream)] md: md: py-14 md:py-24" id="expert">
      <div className="buudy-wrap grid items-center gap-6 md:gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="relative mx-auto w-full max-w-[360px] lg:max-w-[400px]">
          <div className="relative overflow-hidden rounded-[18px] border border-[rgba(58,31,61,.12)] bg-[var(--ink)]">
            <video
              className="w-full aspect-[2/3] object-cover object-center block"
              playsInline
              poster={expertVideo.poster}
              preload="none"
              ref={videoRef}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
            >
              <source src={expertVideo.src} />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Overlay Button */}
            <button
              onClick={togglePlay}
              className={`absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/25 transition-all duration-300 ${
                isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
              }`}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[var(--plum)] shadow-lg transition-transform hover:scale-110 active:scale-95">
                {isPlaying ? (
                  // Pause Icon
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  // Play Icon
                  <svg className="h-6 w-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        <div>
          <p className="buudy-eyebrow">Expert</p>
          <h2 className="buudy-display mt-2 text-[2.5rem] leading-tight text-[var(--plum)] md:text-5xl">
            Dr. Gabriella <em className="buudy-italic">Vasili</em>, MD
          </h2>
          <p className="buudy-display mt-2 text-xl italic text-[var(--plum-soft)]">
            Double Board-Certified Dermatologist
          </p>
          <div className="buudy-copy mt-4 space-y-3">
            <p>
              Dr. Gabriella Vasili is an esteemed, double board-certified
              dermatologist based in Atlanta, Georgia. With an expert focus on
              enhancing the efficacy of modern skincare, Dr. Vasili is a strong
              advocate for integrating clinical-grade technologies into daily
              routines.
            </p>
            <p>
              She is particularly recognized for her expertise in Light Emitting
              Diode (LED) therapy. Dr. Vasili&apos;s commitment to skin health extends
              beyond the face to often-neglected areas like the neck, ensuring
              her patients achieve a comprehensive and rejuvenated glow.
            </p>
            <p>
              Her professional mission is to bridge the gap between professional
              dermatological treatments and accessible, high-performance skincare
              at home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
