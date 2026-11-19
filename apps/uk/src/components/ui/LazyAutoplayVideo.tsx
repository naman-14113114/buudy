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
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoaded(true);
        }
        setShouldPlay(entry.isIntersecting && !reducedMotion.matches);
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (hasLoaded) videoRef.current?.load();
  }, [hasLoaded, src]);

  useEffect(() => {
    if (!shouldPlay) {
      videoRef.current?.pause();
      return;
    }

    videoRef.current?.play().catch(() => undefined);
  }, [shouldPlay, hasLoaded]);

  return (
    <video
      aria-label={ariaLabel}
      autoPlay={shouldPlay}
      className={["block", className].filter(Boolean).join(" ")}
      loop
      muted
      playsInline
      poster={poster}
      preload={hasLoaded ? "metadata" : "none"}
      ref={(video) => {
        if (video) video.defaultMuted = true;
        videoRef.current = video;
      }}
    >
      {hasLoaded && <source src={src} type={type} />}
    </video>
  );
}
