"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { transformations } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

const loopedStories = [...transformations, ...transformations, ...transformations];

export function BeforeAfterGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-story-card]");

    if (!track || !card) {
      return 320;
    }

    const styles = window.getComputedStyle(track);
    const rawGap = styles.columnGap === "normal" ? styles.gap : styles.columnGap;
    const gap = Number.parseFloat(rawGap) || 0;

    return card.getBoundingClientRect().width + gap;
  }, []);

  const normalizeScroll = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const segmentWidth = track.scrollWidth / 3;
    const step = getStep();

    if (segmentWidth <= 0) {
      return;
    }

    if (track.scrollLeft >= segmentWidth * 2 - step * 2) {
      track.scrollLeft -= segmentWidth;
    }

    if (track.scrollLeft <= step) {
      track.scrollLeft += segmentWidth;
    }
  }, [getStep]);

  const scrollStories = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      track.scrollBy({
        behavior: "smooth",
        left: getStep() * direction,
      });

      window.setTimeout(normalizeScroll, 520);
    },
    [getStep, normalizeScroll],
  );

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const setMiddleSegment = () => {
      track.scrollLeft = track.scrollWidth / 3;
    };

    const frame = window.requestAnimationFrame(setMiddleSegment);
    window.addEventListener("resize", setMiddleSegment);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", setMiddleSegment);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isPaused || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => scrollStories(1), 3200);

    return () => window.clearInterval(interval);
  }, [isPaused, scrollStories]);

  return (
    <section className="buudy-section bg-[var(--cream)] py-24">
      <div className="buudy-wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
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
        onFocusCapture={() => setIsPaused(true)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          aria-label="Customer transformation stories"
          className="no-scrollbar flex snap-x gap-5 overflow-x-auto scroll-smooth px-4 pb-4 md:px-10"
          onScroll={normalizeScroll}
          ref={trackRef}
        >
          {loopedStories.map((story, index) => (
            <article
              className="w-[min(82vw,21rem)] flex-none snap-start overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)] shadow-[0_16px_40px_-32px_rgba(58,31,61,.4)] transition duration-300 hover:-translate-y-1"
              data-story-card
              key={`${story.id}-${index}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--blush)]">
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
            onClick={() => scrollStories(-1)}
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="buudy-mono text-[var(--plum)]">customer stories</span>
          <button
            aria-label="Next transformation story"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
            onClick={() => scrollStories(1)}
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
