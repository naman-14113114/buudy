"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviewVideos, type ReviewVideo } from "@/data/productSections";
import { productMediaAsset } from "@/lib/media";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
            <ReviewVideoCard index={index} key={video.id} video={video} />
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
