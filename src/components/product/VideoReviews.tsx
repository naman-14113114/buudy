"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviewVideos, type ReviewVideo } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

const NUM_SETS = 3;
const loopedVideos = Array(NUM_SETS).fill(reviewVideos).flat();

function ReviewVideoCard({
  index,
  video,
}: {
  index: number;
  video: ReviewVideo;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlayRef = useRef(false);
  const primarySrc = video.fallbackSrc ?? video.src;
  const [src, setSrc] = useState(primarySrc);
  const [shouldLoad, setShouldLoad] = useState(false);

  const playWhenReady = useCallback(() => {
    if (!shouldPlayRef.current) return;

    videoRef.current?.play().catch(() => undefined);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const videoEl = videoRef.current;
    if (!card || !videoEl) return;

    videoEl.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        shouldPlayRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          setShouldLoad(true);
          videoEl.play().catch(() => undefined);
        } else {
          videoEl.pause();
        }
      },
      { rootMargin: "900px 700px", threshold: 0.01 },
    );

    observer.observe(card);

    return () => {
      shouldPlayRef.current = false;
      observer.disconnect();
    };
  }, []);

  return (
    <article
      className="relative aspect-[9/16] w-40 flex-none snap-start overflow-hidden rounded-[18px] bg-[var(--ink)] transition hover:-translate-y-1 md:w-52"
      ref={cardRef}
    >
      <video
        aria-label={`Buudy customer video review ${index + 1}`}
        className="h-full w-full object-cover"
        disablePictureInPicture
        loop
        autoPlay={shouldLoad}
        muted
        onCanPlay={playWhenReady}
        onError={() => {
          if (src !== video.src) {
            setSrc(video.src);
          }
        }}
        onLoadedData={playWhenReady}
        playsInline
        poster={video.poster}
        preload={shouldLoad ? "auto" : "none"}
        ref={videoRef}
        src={shouldLoad ? src : undefined}
      >
        Your browser does not support the video tag.
      </video>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(18,9,20,.48)] to-transparent"
      />
    </article>
  );
}

export function VideoReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("article");
    if (!track || !card) return 180;

    const styles = window.getComputedStyle(track);
    const rawGap = styles.columnGap === "normal" ? styles.gap : styles.columnGap;
    const gap = Number.parseFloat(rawGap) || 0;

    return card.getBoundingClientRect().width + gap;
  }, []);

  const getSetWidth = useCallback(() => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll("article");
    if (!track || !cards || cards.length === 0) return 0;

    const styles = window.getComputedStyle(track);
    const rawGap = styles.columnGap === "normal" ? styles.gap : styles.columnGap;
    const gap = Number.parseFloat(rawGap) || 0;

    return (cards[0].getBoundingClientRect().width + gap) * (cards.length / NUM_SETS);
  }, []);

  const stopAutoScroll = useCallback(() => {
    setUserInteracted(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      if (trackRef.current) {
        trackRef.current.style.scrollSnapType = "";
      }
    }
  }, []);

  const customSmoothScroll = useCallback((track: HTMLDivElement, distance: number, duration: number = 800) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    isAutoScrollingRef.current = true;
    const start = track.scrollLeft;
    const startTime = performance.now();

    // Disable snap to prevent browser stuttering during JS scroll
    track.style.scrollSnapType = "none";
    track.style.scrollBehavior = "auto";

    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      track.scrollLeft = start + distance * easeInOutCubic(progress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        track.style.scrollSnapType = "";
        animationRef.current = null;
        
        // Wait a tiny bit before accepting manual scrolls again
        setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 50);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  }, []);

  const handleScroll = useCallback(() => {
    if (!isAutoScrollingRef.current) {
      stopAutoScroll();
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;

      const setWidth = getSetWidth();
      if (setWidth <= 0) return;

      if (track.scrollLeft >= setWidth * 2 - 10) {
        track.style.scrollBehavior = "auto";
        track.scrollLeft -= setWidth;
      } else if (track.scrollLeft <= 10) {
        track.style.scrollBehavior = "auto";
        track.scrollLeft += setWidth;
      }
    }, 150);
  }, [getSetWidth, stopAutoScroll]);

  const scrollForward = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    
    // Set userInteracted to true so interval stops, but don't cancel this animation
    setUserInteracted(true); 
    customSmoothScroll(track, getStep());
  }, [getStep, customSmoothScroll]);

  const scrollBackward = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    
    setUserInteracted(true);
    customSmoothScroll(track, -getStep());
  }, [getStep, customSmoothScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const timer = setTimeout(() => {
      const setWidth = getSetWidth();
      if (setWidth > 0) {
        track.style.scrollBehavior = "auto";
        track.scrollLeft = setWidth;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [getSetWidth]);

  useEffect(() => {
    if (userInteracted || isPaused) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;

      customSmoothScroll(track, getStep());
    }, 3000);

    return () => window.clearInterval(interval);
  }, [userInteracted, isPaused, getStep, customSmoothScroll]);

  return (
    <section className="buudy-section bg-[rgba(241,223,210,.3)] py-20">
      <div className="buudy-wrap">
        <SectionHeading
          align="center"
          eyebrow="§ Real Customers"
          title={
            <>
              Buudy Mask <span className="buudy-italic text-[var(--gold)]">reviews</span> <span className="font-playfair italic text-[var(--plum)]">&</span> real results
            </>
          }
        />

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="no-scrollbar mt-10 flex snap-x gap-4 overflow-x-auto pb-3 px-4 md:px-10"
            onScroll={handleScroll}
            onPointerDown={stopAutoScroll}
            onTouchStart={stopAutoScroll}
            onWheel={stopAutoScroll}
            ref={trackRef}
          >
            {loopedVideos.map((video, index) => (
              <ReviewVideoCard
                index={index}
                key={`${video.id}-${index}`}
                video={video}
              />
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              aria-label="Previous video reviews"
              className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
              onClick={scrollBackward}
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="buudy-mono text-[var(--plum)]">video reviews</span>
            <button
              aria-label="Next video reviews"
              className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
              onClick={scrollForward}
              type="button"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
