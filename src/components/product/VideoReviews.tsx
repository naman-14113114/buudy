"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviewVideos } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function VideoReviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const distance = track.clientWidth * 0.8;
    const max = track.scrollWidth - track.clientWidth;
    const target =
      direction === 1 && track.scrollLeft >= max - 10
        ? 0
        : direction === -1 && track.scrollLeft <= 10
          ? max
          : track.scrollLeft + distance * direction;

    track.scrollTo({ left: target, behavior: "smooth" });
  }

  return (
    <section className="buudy-section bg-[rgba(241,223,210,.3)] py-20">
      <div className="buudy-wrap">
        <SectionHeading
          align="center"
          eyebrow="Real Customers"
          title={
            <>
              Buudy Mask <em className="buudy-italic">reviews</em> & real results
            </>
          }
        />

        <div
          className="no-scrollbar mt-10 flex snap-x gap-4 overflow-x-auto pb-3"
          ref={trackRef}
        >
          {reviewVideos.map((video, index) => (
            <article
              className="relative aspect-[9/16] w-40 flex-none snap-start overflow-hidden rounded-[18px] bg-[var(--ink)] shadow-[0_8px_24px_-12px_rgba(0,0,0,.28)] transition hover:-translate-y-1 md:w-52"
              key={video.id}
            >
              <video
                className="h-full w-full object-cover"
                controls
                muted
                playsInline
                poster={video.poster}
                preload="none"
                title={`Buudy customer video review ${index + 1}`}
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </article>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-5">
          <button
            aria-label="Previous video reviews"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
            onClick={() => scroll(-1)}
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="buudy-mono text-[var(--plum)]">video reviews</span>
          <button
            aria-label="Next video reviews"
            className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.3)] text-[var(--plum)] transition hover:bg-[var(--plum)] hover:text-[var(--cream)]"
            onClick={() => scroll(1)}
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
