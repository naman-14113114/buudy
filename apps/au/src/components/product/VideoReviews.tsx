"use client";

import { useEffect, useRef, useState } from "react";
import { reviewVideos, type ReviewVideo } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

const NUM_SETS = 2;
const loopedVideos = Array(NUM_SETS).fill(reviewVideos).flat();

function ReviewVideoCard({
  index,
  video,
  isInSectionView,
}: {
  index: number;
  video: ReviewVideo;
  isInSectionView: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isInSectionView) {
      el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }, [isInSectionView]);

  return (
    <article
      className="relative aspect-[9/16] w-40 flex-none overflow-hidden rounded-[18px] bg-[var(--ink)] transition hover:-translate-y-1 md:w-52 cursor-pointer"
      onClick={() => {
        window.location.href = "#reviews";
      }}
    >
      <video
        aria-label={`Buudy customer video review ${index + 1}`}
        className="h-full w-full object-cover"
        disablePictureInPicture
        loop
        autoPlay
        muted
        playsInline
        poster={video.poster}
        preload="auto"
        ref={(el) => {
          if (el) {
            el.defaultMuted = true;
            el.muted = true;
          }
          videoRef.current = el;
        }}
        src={video.src}
        onLoadedData={(e) => {
          if (isInSectionView) {
            e.currentTarget.play().catch(() => undefined);
          }
        }}
        onCanPlay={(e) => {
          if (isInSectionView) {
            e.currentTarget.play().catch(() => undefined);
          }
        }}
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "400px 0px", threshold: 0.01 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="buudy-section bg-[#f6ede2] pt-14 md:pt-24 pb-4 md:pb-6 overflow-hidden"
    >
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
                isInSectionView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
