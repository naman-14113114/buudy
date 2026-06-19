"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { reviewVideos, type ReviewVideo } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

const NUM_SETS = 2;
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
  const [shouldLoad, setShouldLoad] = useState(index < 4);

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
      { rootMargin: "1200px 0px", threshold: 0.01 },
    );

    observer.observe(card);

    return () => {
      shouldPlayRef.current = false;
      observer.disconnect();
    };
  }, []);

  return (
    <article
      className="relative aspect-[9/16] w-40 flex-none overflow-hidden rounded-[18px] bg-[var(--ink)] transition hover:-translate-y-1 md:w-52 cursor-pointer"
      ref={cardRef}
      onClick={() => {
        window.location.href = "#reviews";
      }}
    >
      <video
        aria-label={`Buudy customer video review ${index + 1}`}
        className="h-full w-full object-cover"
        disablePictureInPicture
        loop
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
        preload={shouldLoad ? "metadata" : "none"}
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
  return (
    <section className="buudy-section bg-[#f6ede2] pt-14 md:pt-24 pb-4 md:pb-6 overflow-hidden">
      <style>{`
        @keyframes vr-css-auto-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="buudy-wrap">
        <SectionHeading
          align="center"
          eyebrow="Real Customers"
          title={
            <>
              Buudy Mask <span className="buudy-italic text-[var(--gold)]">reviews</span> <span className="font-playfair italic text-[var(--plum)]">&</span> real results
            </>
          }
        />

        <div className="relative mt-7 md:mt-10 mx-auto w-full max-w-[1400px] overflow-hidden pb-4 md:pb-8">
          <div 
            className="flex gap-4 w-max hover:[animation-play-state:paused]"
            style={{ 
              animation: 'vr-css-auto-scroll 95s linear infinite',
              willChange: 'transform' 
            }}
          >
            {loopedVideos.map((video, index) => (
              <ReviewVideoCard
                index={index}
                key={`${video.id}-${index}`}
                video={video}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
