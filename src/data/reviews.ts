import maskReviews from "./reviews/buudy-led-mask-reviews.json";
import type { ProductReview, ProductReviewSummary } from "@/types/reviews";

export const reviewPageSize = 20;
export const maxReviewPageSize = 50;

const reviewCollections = {
  "buudy-led-mask": maskReviews as ProductReview[],
} as const;

export type ReviewProductHandle = keyof typeof reviewCollections;

const reviewSummaries = Object.fromEntries(
  Object.entries(reviewCollections).map(([productHandle, reviews]) => {
    const ratingDistribution = reviews.reduce<Record<string, number>>((acc, review) => {
      const key = String(review.rating);
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    return [
      productHandle,
      {
        averageRating: reviews.length ? totalRating / reviews.length : 0,
        productHandle,
        ratingDistribution,
        total: reviews.length,
      },
    ];
  }),
) as Record<ReviewProductHandle, ProductReviewSummary>;

export function isReviewProductHandle(handle: string): handle is ReviewProductHandle {
  return handle in reviewCollections;
}

export function getProductReviewSummary(
  productHandle: string,
): ProductReviewSummary | undefined {
  if (!isReviewProductHandle(productHandle)) {
    return undefined;
  }

  return reviewSummaries[productHandle];
}

export function getProductReviews(
  productHandle: string,
  offset = 0,
  limit = reviewPageSize,
  rating?: number,
) {
  if (!isReviewProductHandle(productHandle)) {
    return [];
  }

  const safeOffset = Math.max(0, offset);
  const safeLimit = Math.min(maxReviewPageSize, Math.max(1, limit));
  const reviews = rating
    ? reviewCollections[productHandle].filter((review) => review.rating === rating)
    : reviewCollections[productHandle];

  return reviews.slice(safeOffset, safeOffset + safeLimit);
}

export function getProductReviewCount(productHandle: string, rating?: number) {
  if (!isReviewProductHandle(productHandle)) {
    return 0;
  }

  return rating
    ? reviewCollections[productHandle].filter((review) => review.rating === rating).length
    : reviewCollections[productHandle].length;
}
