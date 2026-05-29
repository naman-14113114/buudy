"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BadgeCheck, LoaderCircle } from "lucide-react";
import { Button, cn } from "@/components/ui/Button";
import type { ProductReview, ProductReviewsResponse } from "@/types/reviews";

type AnimatableProductReview = ProductReview & {
  isNew?: boolean;
  staggerIndex?: number;
};

type ProductReviewsGridProps = {
  productHandle: string;
  initialReviews: ProductReview[];
  pageSize: number;
  total: number;
};

function RatingStars({ rating }: { rating: number }) {
  const filledStars = "★".repeat(rating);
  const emptyStars = "★".repeat(5 - rating);

  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className="text-lg leading-none text-[var(--gold)]"
    >
      <span aria-hidden="true">{filledStars}</span>
      {emptyStars ? (
        <span aria-hidden="true" className="opacity-30">
          {emptyStars}
        </span>
      ) : null}
    </span>
  );
}

function ReviewImages({ images, name }: { images: string[]; name: string }) {
  if (!images.length) {
    return null;
  }

  const visibleImages = images.slice(0, 3);

  /* ── Single image: natural aspect ratio, zero white-space ── */
  if (visibleImages.length === 1) {
    return (
      <div className="mb-5 overflow-hidden rounded-[16px] border border-[rgba(58,31,61,.12)]">
        <Image
          alt={`Review photo from ${name}`}
          className="w-full h-auto block"
          height={0}
          loading="lazy"
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 92vw"
          src={visibleImages[0]}
          width={0}
        />
      </div>
    );
  }

  /* ── Multi-image grid: tight object-cover, no background bleed ── */
  return (
    <div
      className={cn(
        "mb-5 grid overflow-hidden rounded-[16px] border border-[rgba(58,31,61,.12)]",
        "grid-cols-2",
      )}
    >
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

function ReviewCard({ review }: { review: AnimatableProductReview }) {
  return (
    <article
      className={cn(
        "rounded-[18px] border border-[rgba(58,31,61,.14)] bg-[var(--card)] p-5 shadow-[0_18px_44px_-34px_rgba(58,31,61,.45)]",
        review.isNew && "animate-fade-in-up"
      )}
      style={
        review.isNew && review.staggerIndex !== undefined
          ? { animationDelay: `${review.staggerIndex * 75}ms`, animationFillMode: "both" }
          : undefined
      }
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
    </article>
  );
}

export function ProductReviewsGrid({
  productHandle,
  initialReviews,
  pageSize,
  total,
}: ProductReviewsGridProps) {
  const [reviews, setReviews] = useState<AnimatableProductReview[]>(initialReviews);
  const [columnCount, setColumnCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const visibleCount = reviews.length;
  const hasMore = visibleCount < total;
  const progressLabel = useMemo(
    () => `${visibleCount.toLocaleString("en-US")} of ${total.toLocaleString("en-US")}`,
    [total, visibleCount],
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

  async function loadMoreReviews() {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        limit: String(pageSize),
        offset: String(reviews.length),
      });
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

      const data = (await response.json()) as ProductReviewsResponse;
      setReviews((currentReviews) => [
        ...currentReviews,
        ...data.reviews.map((r, i) => ({
          ...r,
          isNew: true,
          staggerIndex: i,
        })),
      ]);
    } catch {
      setError("We could not load more reviews right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-4">
        {reviewColumns.map((column, index) => (
          <div className="grid gap-5" key={`review-column-${index}`}>
            {column.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <p className="buudy-mono text-[var(--plum-soft)]">
          Showing {progressLabel} reviews
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
    </div>
  );
}
