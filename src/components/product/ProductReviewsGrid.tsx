"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BadgeCheck, LoaderCircle, Star } from "lucide-react";
import { Button, cn } from "@/components/ui/Button";
import type { ProductReview, ProductReviewsResponse } from "@/types/reviews";

type ProductReviewsGridProps = {
  productHandle: string;
  initialReviews: ProductReview[];
  pageSize: number;
  total: number;
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className="flex gap-1 text-[var(--gold)]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          aria-hidden="true"
          className={index < rating ? "fill-current" : "opacity-30"}
          key={index}
          size={16}
        />
      ))}
    </div>
  );
}

function ReviewImages({ images, name }: { images: string[]; name: string }) {
  if (!images.length) {
    return null;
  }

  const visibleImages = images.slice(0, 3);

  return (
    <div
      className={cn(
        "mb-5 grid overflow-hidden rounded-[16px] border border-[rgba(58,31,61,.12)] bg-[var(--blush)]",
        visibleImages.length === 1 ? "grid-cols-1" : "grid-cols-2",
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

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <article className="flex h-full flex-col rounded-[18px] border border-[rgba(58,31,61,.14)] bg-[var(--card)] p-5 shadow-[0_18px_44px_-34px_rgba(58,31,61,.45)]">
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

      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--muted)]">{review.body}</p>

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
  const [reviews, setReviews] = useState(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const visibleCount = reviews.length;
  const hasMore = visibleCount < total;
  const progressLabel = useMemo(
    () => `${visibleCount.toLocaleString("en-US")} of ${total.toLocaleString("en-US")}`,
    [total, visibleCount],
  );

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
      setReviews((currentReviews) => [...currentReviews, ...data.reviews]);
    } catch {
      setError("We could not load more reviews right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
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
