"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviewVideos, type ReviewVideo } from "@/data/productSections";
import { productMediaAsset } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";

const loopedVideos = [...reviewVideos, ...reviewVideos, ...reviewVideos];

function ReviewVideoCard({
  index,
  video,
}: {
  index: number;
  video: ReviewVideo;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const localSrc = productMediaAsset(`${video.id}.mp4`, "buudy-led-mask", "videos");
  const fallbackSrc = video.fallbackSrc ?? video.src;
  const [isVisible, setIsVisible] = useState(false);
  const [src, setSrc] = useState(localSrc);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "160px 0px", threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    element.muted = true;

    if (isVisible) {
      element.load();
      element.play().catch(() => undefined);
      return;
    }

    element.pause();
  }, [isVisible, src]);

  return (
    <article
      className="relative aspect-[9/16] w-40 flex-none snap-start overflow-hidden rounded-[18px] bg-[var(--ink)] shadow-[0_8px_24px_-12px_rgba(0,0,0,.28)] transition hover:-translate-y-1 md:w-52"
      ref={cardRef}
    >
      <video
        aria-label={`Buudy customer video review ${index + 1}`}
        autoPlay={isVisible}
        className="h-full w-full object-cover"
        disablePictureInPicture
        loop
        muted
        onError={() => {
          if (src !== fallbackSrc) {
            setSrc(fallbackSrc);
          }
        }}
        playsInline
        poster={video.poster}
        preload={isVisible || index < 5 ? "metadata" : "none"}
        ref={videoRef}
        src={src}
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
  const [isPaused, setIsPaused] = useState(false);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("article");

    if (!track || !card) {
      return 180;
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

  const scrollVideos = useCallback(
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

    const interval = window.setInterval(() => scrollVideos(1), 3200);

    return () => window.clearInterval(interval);
  }, [isPaused, scrollVideos]);

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
          onFocusCapture={() => setIsPaused(true)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="no-scrollbar mt-10 flex snap-x gap-4 overflow-x-auto scroll-smooth pb-3 px-4 md:px-10"
            onScroll={normalizeScroll}
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
              onClick={() => scrollVideos(-1)}
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="buudy-mono text-[var(--plum)]">video reviews</span>
            <button
              aria-label="Next video reviews"
              className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
              onClick={() => scrollVideos(1)}
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
