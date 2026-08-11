"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { transformations, type Transformation } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

const NUM_SETS = 3;
const loopedStories = Array(NUM_SETS).fill(transformations).flat();
const storyImagePromises = new Map<string, Promise<void>>();

function preloadStoryImage(src: string) {
  if (typeof window === "undefined") return Promise.resolve();

  const cached = storyImagePromises.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve) => {
    const image = new window.Image();
    let settled = false;

    const settle = () => {
      if (settled) return;
      settled = true;

      if (typeof image.decode === "function") {
        void image.decode().catch(() => undefined).finally(resolve);
      } else {
        resolve();
      }
    };

    image.decoding = "async";
    image.onload = settle;
    image.onerror = settle;
    image.src = src;

    if (image.complete) settle();
  });

  storyImagePromises.set(src, promise);
  return promise;
}

export function BeforeAfterGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoScrollingRef = useRef(false);
  const stepRef = useRef(320);
  const setWidthRef = useRef(0);
  const navigationRequestRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Transformation | null>(null);

  const openStory = useCallback((story: Transformation) => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const requestId = navigationRequestRef.current + 1;
    navigationRequestRef.current = requestId;

    void preloadStoryImage(story.image).then(() => {
      if (navigationRequestRef.current === requestId) {
        setSelectedStory(story);
      }
    });
  }, []);

  const closeStory = useCallback(() => {
    navigationRequestRef.current += 1;
    setSelectedStory(null);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const showRelativeStory = useCallback(
    (offset: number) => {
      if (!selectedStory) return;

      const currentIndex = transformations.findIndex(
        (story) => story.id === selectedStory.id,
      );
      if (currentIndex < 0) return;

      const nextIndex =
        (currentIndex + offset + transformations.length) % transformations.length;
      const nextStory = transformations[nextIndex];
      const requestId = navigationRequestRef.current + 1;
      navigationRequestRef.current = requestId;

      void preloadStoryImage(nextStory.image).then(() => {
        if (navigationRequestRef.current === requestId) {
          setSelectedStory(nextStory);
        }
      });
    },
    [selectedStory],
  );

  const handleNextStory = useCallback(
    () => showRelativeStory(1),
    [showRelativeStory],
  );
  const handlePrevStory = useCallback(
    () => showRelativeStory(-1),
    [showRelativeStory],
  );

  const stopAutoScroll = useCallback(() => {
    setUserInteracted(true);
    isAutoScrollingRef.current = false;
    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
      programmaticScrollTimeoutRef.current = null;
    }
  }, []);

  const smoothScroll = useCallback((distance: number) => {
    const track = trackRef.current;
    if (!track) return;

    isAutoScrollingRef.current = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ behavior: reduceMotion ? "auto" : "smooth", left: distance });

    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isAutoScrollingRef.current = false;
      programmaticScrollTimeoutRef.current = null;
    }, reduceMotion ? 50 : 850);
  }, []);

  const handleScroll = useCallback(() => {
    if (!isAutoScrollingRef.current) stopAutoScroll();
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      const track = trackRef.current;
      const setWidth = setWidthRef.current;
      if (!track || setWidth <= 0) return;

      if (track.scrollLeft >= setWidth * 2 - 10) {
        track.style.scrollBehavior = "auto";
        track.scrollLeft -= setWidth;
      } else if (track.scrollLeft <= 10) {
        track.style.scrollBehavior = "auto";
        track.scrollLeft += setWidth;
      }
      isAutoScrollingRef.current = false;
    }, 150);
  }, [stopAutoScroll]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsAnimationVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsAnimationVisible(entry.isIntersecting),
      { rootMargin: "160px 0px", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const card = track.querySelector<HTMLElement>("[data-story-card]");
      const cards = track.querySelectorAll("[data-story-card]");
      if (!card || cards.length === 0) return;

      const styles = window.getComputedStyle(track);
      const rawGap = styles.columnGap === "normal" ? styles.gap : styles.columnGap;
      const gap = Number.parseFloat(rawGap) || 0;
      stepRef.current = card.getBoundingClientRect().width + gap;
      setWidthRef.current = stepRef.current * (cards.length / NUM_SETS);
    };

    const observer = new ResizeObserver(measure);
    const firstCard = track.querySelector<HTMLElement>("[data-story-card]");
    observer.observe(track);
    if (firstCard) observer.observe(firstCard);

    const frameId = requestAnimationFrame(() => {
      measure();
      if (setWidthRef.current > 0 && track.scrollLeft <= 10) {
        isAutoScrollingRef.current = true;
        track.style.scrollBehavior = "auto";
        track.scrollLeft = setWidthRef.current;
        requestAnimationFrame(() => {
          isAutoScrollingRef.current = false;
        });
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAnimationVisible || userInteracted || isPaused || selectedStory) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => smoothScroll(stepRef.current), 3200);
    return () => window.clearInterval(interval);
  }, [isAnimationVisible, isPaused, selectedStory, smoothScroll, userInteracted]);

  useEffect(() => {
    if (!selectedStory) return;

    const currentIndex = transformations.findIndex(
      (story) => story.id === selectedStory.id,
    );
    const previous = transformations[
      (currentIndex - 1 + transformations.length) % transformations.length
    ];
    const next = transformations[(currentIndex + 1) % transformations.length];
    void preloadStoryImage(previous.image);
    void preloadStoryImage(next.image);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeStory();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeStory, selectedStory]);

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNextStory();
    if (distance < -50) handlePrevStory();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-24" ref={sectionRef}>
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
          onPointerDown={stopAutoScroll}
          onScroll={handleScroll}
          onTouchStart={stopAutoScroll}
          onWheel={stopAutoScroll}
          ref={trackRef}
        >
          {loopedStories.map((story, index) => (
            <button
              aria-label={`Open ${story.fullName}'s ${story.concern} story`}
              className="w-[min(82vw,21rem)] flex-none snap-start overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)] text-left transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              data-story-card
              key={`${story.id}-${index}`}
              onClick={() => openStory(story)}
              type="button"
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
            </button>
          ))}
        </div>

        <div className="buudy-wrap mt-6 flex items-center justify-center gap-5">
          <button
            aria-label="Previous transformation story"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
            onClick={() => {
              setUserInteracted(true);
              smoothScroll(-stepRef.current);
            }}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <span className="buudy-mono text-[var(--plum)]">customer stories</span>
          <button
            aria-label="Next transformation story"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
            onClick={() => {
              setUserInteracted(true);
              smoothScroll(stepRef.current);
            }}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>

      {selectedStory ? (
        <div
          aria-labelledby="transformation-dialog-title"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-4"
          onClick={(event) => {
            if (event.currentTarget === event.target) closeStory();
          }}
          role="dialog"
        >
          <button
            aria-label="Previous story"
            className="absolute left-4 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--cream)]/30 bg-[var(--cream)]/10 text-[var(--cream)] transition hover:bg-[var(--cream)] hover:text-[var(--plum)] md:flex xl:left-8"
            onClick={handlePrevStory}
            type="button"
          >
            <ChevronLeft aria-hidden="true" size={28} />
          </button>

          <div
            className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-y-auto rounded-[18px] bg-[var(--card)] shadow-2xl md:max-h-[90vh] md:flex-row md:overflow-hidden"
            onTouchEnd={handleTouchEnd}
            onTouchMove={(event) => {
              touchEndX.current = event.targetTouches[0].clientX;
            }}
            onTouchStart={(event) => {
              touchStartX.current = event.targetTouches[0].clientX;
              touchEndX.current = null;
            }}
          >
            <button
              aria-label="Close transformation details"
              className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-[rgba(247,241,232,.9)] text-[var(--plum)] shadow-sm transition hover:bg-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
              onClick={closeStory}
              ref={closeButtonRef}
              type="button"
            >
              <X aria-hidden="true" size={22} />
            </button>

            <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[var(--blush)] md:min-h-[500px] md:w-1/2 md:self-stretch">
              <Image
                alt={`${selectedStory.fullName}'s ${selectedStory.concern} transformation`}
                className="object-cover"
                fill
                key={selectedStory.id}
                sizes="(min-width: 768px) 448px, 100vw"
                src={selectedStory.image}
              />
              <div className="absolute inset-x-3 bottom-3 flex justify-between md:hidden">
                <button
                  aria-label="Previous story"
                  className="grid h-11 w-11 place-items-center rounded-full bg-[var(--cream)] text-[var(--plum)] shadow-lg"
                  onClick={handlePrevStory}
                  type="button"
                >
                  <ChevronLeft aria-hidden="true" size={22} />
                </button>
                <button
                  aria-label="Next story"
                  className="grid h-11 w-11 place-items-center rounded-full bg-[var(--cream)] text-[var(--plum)] shadow-lg"
                  onClick={handleNextStory}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" size={22} />
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-8">
              <p className="buudy-mono mb-2 text-sm uppercase text-[var(--gold)]">
                {selectedStory.concern}
              </p>
              <h3
                className="buudy-display mb-4 text-2xl leading-tight text-[var(--plum)] md:text-3xl"
                id="transformation-dialog-title"
              >
                {selectedStory.title}
              </h3>
              <p className="mb-5 text-sm italic leading-7 text-[var(--muted)]">
                {selectedStory.quote}
              </p>

              <div className="mb-5 flex items-center gap-2 border-b border-[var(--border)] pb-5">
                <span className="buudy-display text-lg text-[var(--plum)]">
                  {selectedStory.fullName}, {selectedStory.age}
                </span>
                <span className="buudy-mono ml-auto rounded bg-[var(--cream)] px-2 py-1 text-xs text-[var(--plum-soft)]">
                  Verified
                </span>
              </div>

              <div className="mb-4">
                <h4 className="buudy-mono mb-1.5 text-xs font-bold uppercase text-[var(--plum)]">
                  Skin type
                </h4>
                <p className="text-sm text-[var(--muted)]">{selectedStory.skinType}</p>
              </div>
              <div className="mb-4">
                <h4 className="buudy-mono mb-1.5 text-xs font-bold uppercase text-[var(--plum)]">
                  Skincare routine
                </h4>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  {selectedStory.routine}
                </p>
              </div>
              <div>
                <h4 className="buudy-mono mb-1.5 text-xs font-bold uppercase text-[var(--plum)]">
                  Experience
                </h4>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  {selectedStory.experience}
                </p>
              </div>
            </div>
          </div>

          <button
            aria-label="Next story"
            className="absolute right-4 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--cream)]/30 bg-[var(--cream)]/10 text-[var(--cream)] transition hover:bg-[var(--cream)] hover:text-[var(--plum)] md:flex xl:right-8"
            onClick={handleNextStory}
            type="button"
          >
            <ChevronRight aria-hidden="true" size={28} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
