"use client";

import { useRef, useState, useEffect } from "react";
import { pressHero, pressCarouselSlides } from "@/data/press";

export function PressPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scroller = carouselRef.current;
    if (scroller) {
      scroller.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        scroller.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen text-[var(--plum)]">
      {/* 1. Header Section */}
      <section className="py-14 sm:py-20 text-center border-b border-[var(--border)]/40">
        <div className="buudy-wrap max-w-4xl px-4">
          <p className="buudy-mono text-[var(--gold)] tracking-[0.22em] uppercase text-xs sm:text-sm font-semibold mb-3">
            {pressHero.eyebrow}
          </p>
          <h1 className="buudy-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[var(--plum)]">
            {pressHero.title}
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--muted)] max-w-3xl mx-auto font-light">
            {pressHero.description}
          </p>
        </div>
      </section>

      {/* 2. Discover Elevated Design Carousel Section */}
      <section className="py-12 sm:py-16 pb-20 sm:pb-28 overflow-hidden">
        <div className="buudy-wrap">
          {/* Carousel Header with Title & Controls */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="buudy-display text-2xl sm:text-3xl font-light text-[var(--plum)]">
              {pressHero.carouselTitle}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous slide"
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--plum)] shadow-sm transition-all duration-200 ${
                  !canScrollLeft
                    ? "opacity-35 cursor-not-allowed"
                    : "hover:border-[var(--plum)] hover:bg-[var(--plum)] hover:text-[var(--cream)] active:scale-95"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next slide"
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--plum)] shadow-sm transition-all duration-200 ${
                  !canScrollRight
                    ? "opacity-35 cursor-not-allowed"
                    : "hover:border-[var(--plum)] hover:bg-[var(--plum)] hover:text-[var(--cream)] active:scale-95"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {pressCarouselSlides.map((slide) => (
              <div
                key={slide.id}
                className="snap-start shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group"
              >
                <div className="relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--card)] shadow-[0_8px_24px_-12px_rgba(58,31,61,0.08)] transition-all duration-300 hover:shadow-[0_16px_32px_-12px_rgba(58,31,61,0.14)] hover:border-[var(--plum)]/30">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--blush)]/30">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {(slide.publication || slide.date) && (
                    <div className="p-4 flex items-center justify-between border-t border-[var(--border)]/40 bg-[var(--card)]">
                      <span className="font-medium text-sm text-[var(--plum)]">
                        {slide.publication}
                      </span>
                      {slide.date && (
                        <span className="buudy-mono text-xs text-[var(--muted)]">
                          {slide.date}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
