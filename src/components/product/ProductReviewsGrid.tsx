"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  X,
} from "lucide-react";
import { Button, cn } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProductReview, ProductReviewsResponse } from "@/types/reviews";

type AnimatableProductReview = ProductReview & {
  isNew?: boolean;
  staggerIndex?: number;
};

type ProductReviewsGridProps = {
  averageRating: number;
  productHandle: string;
  initialReviews: ProductReview[];
  pageSize: number;
  ratingDistribution: Record<string, number>;
  total: number;
};

const reviewImageCache = new Map<string, Promise<void>>();

function preloadReviewImage(src: string) {
  if (!src || typeof window === "undefined") {
    return Promise.resolve();
  }

  const cached = reviewImageCache.get(src);

  if (cached) {
    return cached;
  }

  const promise = new Promise<void>((resolve) => {
    const image = new window.Image();
    const settle = () => {
      if (typeof image.decode === "function") {
        image.decode().catch(() => undefined).finally(resolve);
      } else {
        resolve();
      }
    };

    image.decoding = "async";
    image.onload = settle;
    image.onerror = () => resolve();
    image.src = src;

    if (image.complete) {
      settle();
    }
  });

  reviewImageCache.set(src, promise);

  return promise;
}

function preloadReviewImages(images: string[]) {
  return Promise.all(images.map(preloadReviewImage)).then(() => undefined);
}

function RatingStars({ rating, size = 17 }: { rating: number; size?: number }) {
  const filledStars = "★".repeat(rating);
  const emptyStars = "★".repeat(5 - rating);

  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex leading-none tracking-[0.04em] text-[var(--gold)]"
      role="img"
      style={{ fontSize: size }}
    >
      <span aria-hidden="true">{filledStars}</span>
      {emptyStars ? (
        <span aria-hidden="true" className="opacity-25">
          {emptyStars}
        </span>
      ) : null}
    </span>
  );
}

function RatingBreakdown({
  activeRating,
  disabled,
  distribution,
  onSelect,
  total,
}: {
  activeRating: number | null;
  disabled: boolean;
  distribution: Record<string, number>;
  onSelect: (rating: number | null) => void;
  total: number;
}) {
  return (
    <div className="mt-6 space-y-2">
      <button
        aria-pressed={activeRating === null}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition hover:bg-[rgba(180,145,76,.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]",
          activeRating === null && "bg-[rgba(180,145,76,.12)]",
        )}
        disabled={disabled}
        onClick={() => onSelect(null)}
        type="button"
      >
        <span className="buudy-mono text-[var(--plum-soft)]">All reviews</span>
        <span className="buudy-mono text-[var(--plum-soft)]">
          {total.toLocaleString("en-US")}
        </span>
      </button>

      {[5, 4, 3, 2, 1].map((rating) => {
        const count = distribution[String(rating)] ?? 0;
        const width = total ? `${(count / total) * 100}%` : "0%";

        return (
          <button
            aria-label={`Show only ${rating}-star reviews`}
            aria-pressed={activeRating === rating}
            className={cn(
              "grid w-full grid-cols-[5.5rem_1fr_4rem] items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-[rgba(180,145,76,.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]",
              activeRating === rating && "bg-[rgba(180,145,76,.12)]",
            )}
            disabled={disabled}
            key={rating}
            onClick={() => onSelect(rating)}
            type="button"
          >
            <span className="inline-flex items-center gap-1 text-[var(--gold)]">
              <span aria-hidden="true" className="text-sm leading-none">★</span>
              <span className="buudy-mono text-[var(--plum-soft)]">{rating} star</span>
            </span>
            <span className="h-2 overflow-hidden rounded-full bg-[rgba(58,31,61,.1)]">
              <span
                className="block h-full rounded-full bg-[var(--gold)] transition-[width] duration-300 ease-out"
                style={{ width }}
              />
            </span>
            <span className="buudy-mono text-right text-[var(--plum-soft)]">
              {count.toLocaleString("en-US")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ReviewImages({ images, name }: { images: string[]; name: string }) {
  if (!images.length) {
    return null;
  }

  const visibleImages = images.slice(0, 3);

  if (visibleImages.length === 1) {
    return (
      <div className="mb-5 overflow-hidden rounded-[16px] border border-[rgba(58,31,61,.12)]">
        <Image
          alt={`Review photo from ${name}`}
          className="block h-auto w-full"
          height={0}
          loading="lazy"
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 92vw"
          src={visibleImages[0]}
          width={0}
        />
      </div>
    );
  }

  return (
    <div className="mb-5 grid grid-cols-2 overflow-hidden rounded-[16px] border border-[rgba(58,31,61,.12)]">
      {visibleImages.map((image, index) => (
        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden",
            visibleImages.length === 3 && index === 0 && "row-span-2 aspect-auto",
          )}
          key={`${image}-${index}`}
        >
          <Image
            alt={`Review photo from ${name}`}
            className="object-cover"
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 92vw"
            src={image}
          />
          {index === 2 && images.length > 3 ? (
            <span className="absolute inset-0 grid place-items-center bg-[rgba(30,12,31,.56)] text-sm font-semibold text-[var(--cream)]">
              +{images.length - 3}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ReviewCard({
  onOpen,
  onPrefetch,
  review,
}: {
  onOpen: (review: ProductReview) => void | Promise<void>;
  onPrefetch: (review: ProductReview) => void;
  review: AnimatableProductReview;
}) {
  return (
    <button
      aria-label={`Open full review from ${review.customerName}`}
      className={cn(
        "w-full rounded-[18px] border border-[rgba(58,31,61,.14)] bg-[var(--card)] p-5 text-left shadow-[0_18px_44px_-34px_rgba(58,31,61,.45)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(180,145,76,.5)] hover:shadow-[0_24px_48px_-32px_rgba(58,31,61,.58)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]",
        review.isNew && "animate-fade-in-up",
      )}
      onClick={() => void onOpen(review)}
      onFocus={() => onPrefetch(review)}
      onPointerDown={() => onPrefetch(review)}
      onPointerEnter={() => onPrefetch(review)}
      style={
        review.isNew && review.staggerIndex !== undefined
          ? { animationDelay: `${review.staggerIndex * 75}ms`, animationFillMode: "both" }
          : undefined
      }
      type="button"
    >
      <ReviewImages images={review.images} name={review.customerName} />
      <div className="flex items-center justify-between gap-4">
        <RatingStars rating={review.rating} />
        <span className="buudy-mono text-[var(--plum-soft)]">
          {review.displayDate || review.date}
        </span>
      </div>

      {review.title ? (
        <h3 className="buudy-display mt-4 text-xl leading-snug text-[var(--plum)]">
          {review.title}
        </h3>
      ) : null}

      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{review.body}</p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[rgba(58,31,61,.12)] pt-4">
        <span className="buudy-display text-base text-[var(--plum)]">
          {review.customerName}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(180,145,76,.12)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--plum-soft)]">
          <BadgeCheck aria-hidden="true" size={14} />
          Verified
        </span>
      </div>
    </button>
  );
}

function ReviewModal({
  onClose,
  review,
}: {
  onClose: () => void;
  review: ProductReview;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const activeImage = review.images[imageIndex];
  const hasMultipleImages = review.images.length > 1;

  const goNextImage = useCallback(() => {
    setImageIndex((current) => (current + 1) % review.images.length);
  }, [review.images.length]);

  const goPreviousImage = useCallback(() => {
    setImageIndex((current) => (current - 1 + review.images.length) % review.images.length);
  }, [review.images.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (hasMultipleImages && event.key === "ArrowRight") {
        goNextImage();
      }

      if (hasMultipleImages && event.key === "ArrowLeft") {
        goPreviousImage();
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLButtonElement>("button:not([disabled])"),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [goNextImage, goPreviousImage, hasMultipleImages, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100000100] grid place-items-center bg-[rgba(30,12,31,.62)] p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-label={`Full review from ${review.customerName}`}
        aria-modal="true"
        className={cn(
          "relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[22px] border border-[rgba(180,145,76,.35)] bg-[var(--card)] shadow-[0_28px_90px_-34px_rgba(15,4,16,.82)]",
          activeImage && "max-w-[calc(100vw-2rem)] lg:w-fit lg:max-w-[calc(100vw-3rem)] lg:flex-row",
        )}
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Close full review"
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.16)] bg-[rgba(247,241,232,.94)] text-[var(--plum)] transition hover:scale-105 hover:bg-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={22} />
        </button>

        {activeImage ? (
          <div className="relative flex w-fit max-w-full flex-none self-center items-center justify-center overflow-hidden bg-[var(--card)] p-3 lg:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`Full-size review photo from ${review.customerName}`}
              className="block h-auto max-h-[42vh] w-auto max-w-full rounded-[18px] border border-[rgba(58,31,61,.14)] object-contain shadow-[0_18px_42px_-30px_rgba(58,31,61,.6)] lg:max-h-[calc(90vh-2rem)] lg:max-w-[58vw]"
              decoding="async"
              loading="eager"
              src={activeImage}
            />
            {hasMultipleImages ? (
              <>
                <button
                  aria-label="Previous review image"
                  className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[rgba(247,241,232,.9)] text-[var(--plum)] shadow transition hover:scale-105"
                  onClick={goPreviousImage}
                  type="button"
                >
                  <ChevronLeft aria-hidden="true" size={22} />
                </button>
                <button
                  aria-label="Next review image"
                  className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[rgba(247,241,232,.9)] text-[var(--plum)] shadow transition hover:scale-105"
                  onClick={goNextImage}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" size={22} />
                </button>
              </>
            ) : null}
          </div>
        ) : null}

        <div className="w-full overflow-y-auto px-6 pb-7 pt-20 sm:px-8 lg:w-[min(34vw,28rem)] lg:flex-none lg:px-9">
          <p className="buudy-mono text-[var(--gold)]">Verified customer review</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <RatingStars rating={review.rating} size={20} />
            <span className="buudy-mono text-[var(--plum-soft)]">
              {review.displayDate || review.date}
            </span>
          </div>
          {review.title ? (
            <h3 className="buudy-display mt-6 text-3xl leading-tight text-[var(--plum)]">
              {review.title}
            </h3>
          ) : null}
          <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-[var(--muted)]">
            {review.body}
          </p>
          <div className="mt-8 flex items-center gap-2 border-t border-[rgba(58,31,61,.12)] pt-5 text-[var(--plum)]">
            <BadgeCheck aria-hidden="true" className="text-[var(--gold)]" size={18} />
            <span className="buudy-display text-lg">{review.customerName}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ProductReviewsGrid({
  averageRating,
  productHandle,
  initialReviews,
  pageSize,
  ratingDistribution,
  total,
}: ProductReviewsGridProps) {
  const [reviews, setReviews] = useState<AnimatableProductReview[]>(initialReviews);
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [currentTotal, setCurrentTotal] = useState(total);
  const [columnCount, setColumnCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(null);
  const requestIdRef = useRef(0);
  const closeSelectedReview = useCallback(() => setSelectedReview(null), []);
  const openSelectedReview = useCallback(async (review: ProductReview) => {
    if (review.images[0]) {
      await preloadReviewImage(review.images[0]);
    }

    setSelectedReview(review);
    void preloadReviewImages(review.images.slice(1));
  }, []);
  const prefetchReviewImages = useCallback((review: ProductReview) => {
    void preloadReviewImages(review.images);
  }, []);

  useEffect(() => {
    const firstVisibleImages = reviews
      .flatMap((review) => review.images.slice(0, 1))
      .slice(0, 8);
    const prefetch = () => {
      void preloadReviewImages(firstVisibleImages);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetch, { timeout: 1200 });

      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(prefetch, 250);

    return () => clearTimeout(timeoutId);
  }, [reviews]);

  const visibleCount = reviews.length;
  const hasMore = visibleCount < currentTotal;
  const progressLabel = useMemo(
    () => `${visibleCount.toLocaleString("en-US")} of ${currentTotal.toLocaleString("en-US")}`,
    [currentTotal, visibleCount],
  );
  const reviewColumns = useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => [] as AnimatableProductReview[]);

    reviews.forEach((review, index) => {
      columns[index % columnCount].push(review);
    });

    return columns;
  }, [columnCount, reviews]);

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setColumnCount(4);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);

    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  async function fetchReviews(rating: number | null, offset: number) {
    const params = new URLSearchParams({
      limit: String(pageSize),
      offset: String(offset),
    });

    if (rating !== null) {
      params.set("rating", String(rating));
    }

    const response = await fetch(
      `/api/reviews/${encodeURIComponent(productHandle)}?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Review request failed");
    }

    return (await response.json()) as ProductReviewsResponse;
  }

  async function selectRating(rating: number | null) {
    if (isLoading || rating === activeRating) {
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setActiveRating(rating);
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchReviews(rating, 0);

      if (requestId !== requestIdRef.current) {
        return;
      }

      setReviews(
        data.reviews.map((review, index) => ({
          ...review,
          isNew: true,
          staggerIndex: index,
        })),
      );
      setCurrentTotal(data.total);
    } catch {
      setError("We could not filter reviews right now. Please try again.");
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }

  async function loadMoreReviews() {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await fetchReviews(activeRating, reviews.length);
      setReviews((currentReviews) => [
        ...currentReviews,
        ...data.reviews.map((review, index) => ({
          ...review,
          isNew: true,
          staggerIndex: index,
        })),
      ]);
      setCurrentTotal(data.total);
    } catch {
      setError("We could not load more reviews right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
        <SectionHeading
          eyebrow="Product reviews"
          title={
            <>
              Buudy Mask <em className="buudy-italic">customer reviews</em>.
            </>
          }
          copy="Real feedback from customers who made Buudy part of their at-home skincare ritual."
        />

        <div className="rounded-[22px] border border-[rgba(58,31,61,.14)] bg-[rgba(255,252,245,.72)] p-6 shadow-[0_20px_52px_-42px_rgba(58,31,61,.55)]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="buudy-mono text-[var(--gold)]">Average rating</p>
              <p className="buudy-display mt-2 text-6xl leading-none text-[var(--plum)]">
                {averageRating.toFixed(1)}
              </p>
            </div>
            <div className="text-right">
              <p className="buudy-mono text-[var(--plum-soft)]">Verified archive</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--plum)]">
                {total.toLocaleString("en-US")} reviews
              </p>
            </div>
          </div>
          <RatingBreakdown
            activeRating={activeRating}
            disabled={isLoading}
            distribution={ratingDistribution}
            onSelect={selectRating}
            total={total}
          />
        </div>
      </div>

      <div aria-busy={isLoading} className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-4">
        {reviewColumns.map((column, index) => (
          <div className="grid gap-5" key={`review-column-${index}`}>
            {column.map((review) => (
              <ReviewCard
                key={review.id}
                onOpen={openSelectedReview}
                onPrefetch={prefetchReviewImages}
                review={review}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <p className="buudy-mono text-[var(--plum-soft)]">
          Showing {progressLabel} reviews
          {activeRating ? ` filtered to ${activeRating} star` : ""}
        </p>
        {error ? <p className="text-sm text-red-900">{error}</p> : null}
        {hasMore ? (
          <Button
            aria-label="Load 20 more Buudy LED Mask reviews"
            className="min-w-48"
            disabled={isLoading}
            onClick={loadMoreReviews}
          >
            {isLoading ? (
              <>
                <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
                Loading
              </>
            ) : (
              "Load more"
            )}
          </Button>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            You have reached the end of the review archive.
          </p>
        )}
      </div>

      {selectedReview ? (
        <ReviewModal onClose={closeSelectedReview} review={selectedReview} />
      ) : null}
    </div>
  );
}
