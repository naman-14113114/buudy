"use client";

import { useEffect, useRef, useState } from "react";

type LazyAutoplayVideoProps = {
  ariaLabel?: string;
  className?: string;
  poster?: string;
  rootMargin?: string;
  src: string;
  type?: string;
};

export function LazyAutoplayVideo({
  ariaLabel,
  className,
  poster,
  rootMargin = "1400px 0px",
  src,
  type = "video/mp4",
}: LazyAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setShouldPlay(true);
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!shouldPlay) {
      return;
    }

    videoRef.current?.play().catch(() => undefined);
  }, [shouldPlay]);

  return (
    <video
      aria-label={ariaLabel}
      autoPlay={shouldPlay}
      className={["block", className].filter(Boolean).join(" ")}
      loop
      muted
      playsInline
      poster={poster}
      preload="metadata"
      ref={videoRef}
    >
      <source src={src} type={type} />
    </video>
  );
}
