"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { transformations } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

const NUM_SETS = 3;
const loopedStories = Array(NUM_SETS).fill(transformations).flat();

export function BeforeAfterGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-story-card]");
    if (!track || !card) return 320;

    const styles = window.getComputedStyle(track);
    const rawGap = styles.columnGap === "normal" ? styles.gap : styles.columnGap;
    const gap = Number.parseFloat(rawGap) || 0;

    return card.getBoundingClientRect().width + gap;
  }, []);

  const getSetWidth = useCallback(() => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll("[data-story-card]");
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

    // Debounce teleport to ensure it only happens when scroll momentum settles
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
    }, 3200);

    return () => window.clearInterval(interval);
  }, [userInteracted, isPaused, getStep, customSmoothScroll]);

  return (
    <section className="buudy-section bg-[var(--cream)] md: md: py-14 md:py-24">
      <div className="buudy-wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <SectionHeading
            eyebrow="Real users / Real results"
            title={
              <>
                Eight stories, <em className="buudy-italic">one device</em>.
              </>
            }
          />
          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            Verified customer transformations, photographed in their own homes
            after consistent use of the Buudy LED Mask.
          </p>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          aria-label="Customer transformation stories"
          className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-4 pb-4 md:px-10"
          onScroll={handleScroll}
          onPointerDown={stopAutoScroll}
          onTouchStart={stopAutoScroll}
          onWheel={stopAutoScroll}
          ref={trackRef}
        >
          {loopedStories.map((story, index) => (
            <article
              className="w-[min(82vw,21rem)] flex-none snap-start overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)] transition duration-300 hover:-translate-y-1"
              data-story-card
              key={`${story.id}-${index}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--blush)]">
                <Image
                  alt={story.concern}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 336px, 82vw"
                  src={story.image}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="buudy-mono text-[var(--gold)]">{story.concern}</p>
                  <span className="buudy-mono text-[var(--plum-soft)]">5.0</span>
                </div>
                <h3 className="buudy-display mt-3 text-xl text-[var(--plum)]">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {story.quote}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
                  <span className="buudy-display text-sm text-[var(--plum)]">
                    {story.name}
                  </span>
                  <span className="buudy-mono text-[var(--plum-soft)]">Verified</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="buudy-wrap mt-6 flex items-center justify-center gap-5">
          <button
            aria-label="Previous transformation story"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
            onClick={scrollBackward}
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="buudy-mono text-[var(--plum)]">customer stories</span>
          <button
            aria-label="Next transformation story"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
            onClick={scrollForward}
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
