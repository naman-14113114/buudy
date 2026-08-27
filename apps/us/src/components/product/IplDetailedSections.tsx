"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 1. IPL Hero Video
export function IplHeroVideo() {
  return (
    <section className="buudy-section bg-[var(--plum)] py-14 md:py-24">
      <div className="buudy-wrap flex flex-col items-center text-center">
        <SectionHeading
          eyebrow="See it in action"
          title={
            <>
              Professional IPL, <em className="buudy-italic">at home</em>.
            </>
          }
          copy="Watch how easy it is to achieve permanent hair reduction with our ice-cooling technology."
          invert
        />
        <div className="mt-12 w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl">
          <video
            autoPlay
            controls
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
            src="/media/products/buudy-ipl/hero.mp4"
            poster="/images/products/buudy-ipl/hero.png"
          />
        </div>
      </div>
    </section>
  );
}

// 2. IPL Before / After Grid
const iplStories = [
  {
    id: "ipl-1",
    concern: "Legs & Thighs",
    title: "No more strawberry legs",
    quote: "I used to get razor bumps and strawberry legs every time I shaved. After 4 weeks with the Buudy IPL, my legs are completely smooth and the dark pores are gone.",
    name: "Sarah M.",
    image: "/images/products/buudy-ipl/before-after/ba2.jpg", // Using ba2 as ba1 failed to upload
  },
  {
    id: "ipl-2",
    concern: "Underarms",
    title: "Completely painless",
    quote: "The ice cooling is a game changer. I've had laser done at clinics before and it hurt. This feels like an ice cube gliding on your skin. Incredible.",
    name: "Jessica T.",
    image: "/images/products/buudy-ipl/before-after/ba2.jpg", 
  },
  {
    id: "ipl-3",
    concern: "Arms",
    title: "Noticeable difference fast",
    quote: "I saw a massive reduction in hair growth on my arms after just 3 weeks. Now I only do touch ups once a month.",
    name: "Emma L.",
    image: "/images/products/buudy-ipl/before-after/ba3.jpg", 
  },
  {
    id: "ipl-4",
    concern: "Legs",
    title: "Saved me hundreds",
    quote: "I cancelled my salon laser package. This device gives the exact same results for a fraction of the cost. So easy to use.",
    name: "Chloe R.",
    image: "/images/products/buudy-ipl/before-after/ba4.jpg", 
  },
  {
    id: "ipl-5",
    concern: "Full Body",
    title: "Best investment ever",
    quote: "Using the max mode on my legs and gentle mode for my face has completely transformed my routine.",
    name: "Mia K.",
    image: "/images/products/buudy-ipl/before-after/ba5.jpg", 
  },
  {
    id: "ipl-6",
    concern: "Back",
    title: "Actually works",
    quote: "I was skeptical, but the 4-week results speak for themselves. The hair on my back is almost entirely gone.",
    name: "David H.",
    image: "/images/products/buudy-ipl/before-after/ba6.jpg", 
  }
];

const NUM_SETS = 3;
const loopedStories = Array(NUM_SETS).fill(iplStories).flat();

export function IplBeforeAfterGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  const getStep = useCallback(() => {
    if (!trackRef.current) return 300;
    const item = trackRef.current.firstElementChild as HTMLElement;
    if (!item) return 300;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 0;
    return item.offsetWidth + gap;
  }, []);

  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    if (scrollLeft <= 0) {
      trackRef.current.scrollLeft = scrollWidth / NUM_SETS;
    } else if (scrollLeft >= scrollWidth - clientWidth) {
      trackRef.current.scrollLeft = scrollWidth / NUM_SETS - clientWidth;
    }
  }, []);

  const scrollLeft = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -getStep(), behavior: "smooth" });
    }
  }, [getStep]);

  const scrollRight = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: getStep(), behavior: "smooth" });
    }
  }, [getStep]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = track.scrollWidth / NUM_SETS;
    track.addEventListener("scroll", handleScroll);
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();
    const speed = 0.05;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!userInteracted && !isPaused && track) {
        isAutoScrollingRef.current = true;
        track.scrollLeft += speed * delta;
        isAutoScrollingRef.current = false;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [userInteracted, isPaused]);

  return (
    <section className="buudy-section bg-[var(--blush)] py-14 md:py-24 overflow-hidden">
      <div className="buudy-wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <SectionHeading
            eyebrow="Real users / Real results"
            title={
              <>
                Silky smooth, <em className="buudy-italic">for good</em>.
              </>
            }
          />
          <div className="flex gap-3">
            <button
              aria-label="Previous"
              className="grid h-12 w-12 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--plum)] transition hover:bg-[var(--cream)]"
              onClick={() => {
                setUserInteracted(true);
                scrollLeft();
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              className="grid h-12 w-12 place-items-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--plum)] transition hover:bg-[var(--cream)]"
              onClick={() => {
                setUserInteracted(true);
                scrollRight();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="w-full px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          setUserInteracted(true);
          setIsPaused(false);
        }}
      >
        <div
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
          ref={trackRef}
        >
          {loopedStories.map((story, i) => (
            <article
              className="w-[85vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)] transition duration-300 hover:-translate-y-1 sm:w-[340px]"
              key={`${story.id}-${i}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
                <Image
                  alt={story.concern}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 336px, 100vw"
                  src={story.image}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="buudy-mono text-[var(--gold)]">{story.concern}</p>
                  <span className="buudy-mono text-[var(--plum-soft)]">5.0 ★</span>
                </div>
                <h3 className="buudy-display mt-3 text-xl text-[var(--plum)]">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  &quot;{story.quote}&quot;
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
                  <span className="buudy-display text-sm text-[var(--plum)]">
                    {story.name}
                  </span>
                  <span className="buudy-mono text-[var(--plum-soft)] flex items-center gap-1">
                    <svg
                      className="h-4 w-4 text-[#00b67a]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. IPL Intensity Selector
export function IplIntensitySelector() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-24 border-y border-[var(--border)]">
      <div className="buudy-wrap grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Customizable Power"
            title="9 Intensity Levels"
            copy="Every body is different. Our device features 9 distinct energy levels to ensure maximum comfort and efficacy across all treatment zones."
          />
          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--gold)] text-[var(--cream)] font-bold">1-3</div>
              <div>
                <strong className="text-[var(--plum)]">Gentle Mode (Face & Bikini)</strong>
                <p className="text-sm text-[var(--muted)] mt-1">Perfect for first-time users or highly sensitive areas. Delivers gentle pulses that protect delicate skin.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--plum-soft)] text-[var(--plum)] font-bold">4-6</div>
              <div>
                <strong className="text-[var(--plum)]">Medium Mode (Arms & Underarms)</strong>
                <p className="text-sm text-[var(--muted)] mt-1">The ideal balance of power and comfort for medium-thickness hair.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--plum)] text-[var(--cream)] font-bold">7-9</div>
              <div>
                <strong className="text-[var(--plum)]">Max Mode (Legs & Back)</strong>
                <p className="text-sm text-[var(--muted)] mt-1">Maximum energy output for fast, effective treatment on larger areas with stubborn hair growth.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-[var(--card)] aspect-square">
          <Image
            alt="Buudy IPL Display"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/images/products/buudy-ipl/standalone.png"
          />
        </div>
      </div>
    </section>
  );
}

// 4. IPL Expert Section
export function IplExpertSection() {
  return (
    <section className="buudy-section bg-[var(--card)] py-14 md:py-24">
      <div className="buudy-wrap max-w-4xl text-center">
        <p className="buudy-mono text-[var(--gold)] mb-6">CLINICALLY PROVEN</p>
        <blockquote className="buudy-display text-2xl md:text-4xl text-[var(--plum)] leading-relaxed">
          &quot;The integration of sapphire ice-cooling technology with IPL represents a massive leap forward for at-home treatments. It neutralizes the heat risk, allowing for higher efficacy without the pain associated with clinical lasers.&quot;
        </blockquote>
        <p className="mt-8 text-[var(--muted)] font-medium">— Dermatology & Skincare Advisory Board</p>
      </div>
    </section>
  );
}

// 5. Comparison Table
export function IplComparisonTable() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-24 overflow-hidden">
      <div className="buudy-wrap max-w-5xl">
        <div className="text-center mb-12">
          <SectionHeading
            eyebrow="The Smart Choice"
            title="Buudy IPL vs. Alternatives"
          />
        </div>
        
        <div className="overflow-x-auto pb-6">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[var(--plum)]">
                <th className="p-4 w-1/4"></th>
                <th className="p-4 w-1/4 bg-[var(--plum)] text-[var(--cream)] rounded-t-xl text-center font-bold text-lg">Buudy IPL</th>
                <th className="p-4 w-1/4 text-center text-[var(--muted)] font-semibold">Salon Laser</th>
                <th className="p-4 w-1/4 text-center text-[var(--muted)] font-semibold">Waxing / Shaving</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--border)]">
                <td className="p-4 font-medium text-[var(--plum)]">Pain Level</td>
                <td className="p-4 bg-[rgba(58,31,61,.03)] text-center text-[var(--gold)] font-bold">Painless (Ice Cooling)</td>
                <td className="p-4 text-center text-[var(--muted)]">Painful</td>
                <td className="p-4 text-center text-[var(--muted)]">Very Painful / Tedious</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="p-4 font-medium text-[var(--plum)]">Long-term Cost</td>
                <td className="p-4 bg-[rgba(58,31,61,.03)] text-center font-bold text-[var(--plum)]">One-time purchase</td>
                <td className="p-4 text-center text-[var(--muted)]">£1,000+</td>
                <td className="p-4 text-center text-[var(--muted)]">Ongoing forever</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="p-4 font-medium text-[var(--plum)]">Convenience</td>
                <td className="p-4 bg-[rgba(58,31,61,.03)] text-center font-bold text-[var(--plum)]">At home, 15 mins</td>
                <td className="p-4 text-center text-[var(--muted)]">Appointments required</td>
                <td className="p-4 text-center text-[var(--muted)]">Messy / Daily hassle</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="p-4 font-medium text-[var(--plum)]">Results</td>
                <td className="p-4 bg-[rgba(58,31,61,.03)] text-center font-bold text-[var(--plum)] rounded-b-xl">Permanent reduction</td>
                <td className="p-4 text-center text-[var(--muted)]">Permanent reduction</td>
                <td className="p-4 text-center text-[var(--muted)]">Temporary (days/weeks)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// 6. Description Image Banners
export function IplDescriptionBanners() {
  return (
    <section className="bg-[var(--plum)] w-full py-16 md:py-24 border-y border-[var(--border)]">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-8 md:gap-12 px-0 md:px-6">
        {[
          { src: "/images/products/buudy-ipl/original_desc_1.jpg", alt: "Skip the Salon IPL Treatment" },
          { src: "/images/products/buudy-ipl/original_desc_3.jpg", alt: "Ice Cooling IPL Technology" },
          { src: "/images/products/buudy-ipl/original_desc_2.jpg", alt: "4 Step IPL Process" },
        ].map((banner, idx) => (
          <div key={idx} className="relative w-full md:rounded-2xl overflow-hidden shadow-xl border-y md:border-[rgba(247,241,232,0.1)] bg-[#eff4fd]">
            <Image
              src={banner.src}
              alt={banner.alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="100vw"
              quality={100}
              unoptimized={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
