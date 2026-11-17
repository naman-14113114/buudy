import maskReviews from "./reviews/buudy-led-mask-reviews.json";
import torchReviews from "./reviews/buudy-red-torch-reviews.json";
import iplReviews from "./reviews/buudy-ipl-hair-removal-device-reviews.json";
import serumReviews from "./reviews/buudy-hyaluronic-serum-reviews.json";
import faceWashReviews from "./reviews/buudy-face-wash-reviews.json";
import prebioticReviews from "./reviews/buudy-prebiotics-serum-reviews.json";
import { market } from "@/lib/market";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type { ProductReviewRow } from "@/types/database";
import type { ProductReview, ProductReviewSummary } from "@/types/reviews";

export const reviewPageSize = 20;
export const maxReviewPageSize = 50;

const submittedReviewDateFormatter = new Intl.DateTimeFormat(market.locale, {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatSubmittedReviewDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return submittedReviewDateFormatter.format(parsed).toUpperCase();
}

function normalizeStaticReview(r: ProductReview) {
  return {
    ...r,
    displayDate: formatSubmittedReviewDate(r.date),
  };
}

const maskReviewList = maskReviews.map(normalizeStaticReview) as ProductReview[];

const reviewCollections = {
  "buudy-led-mask": maskReviewList,
  "buudy-led-face-mask": maskReviewList,
  "best-led-face-mask": maskReviewList,
  "best-led-mask-in-uk": maskReviewList,
  "buudy-7-colour-led-face-mask": maskReviewList,
  "buudy-7-colour-led-mask": maskReviewList,
  "buudy-led-mask-2": maskReviewList,
  "buudy-led-mask-compact": maskReviewList,
  "buudy-red-torch": torchReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-ipl-device": iplReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-light-activating-hyaluronic-serum": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-collagen-boost-serum": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "double-hydration-boost-gel": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-double-hydration-boost-gel": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-hyaluronic-serum": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-peptide-serum": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "peptide-serum": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-peptide-anti-aging-serum": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "collagen-boost-serum": serumReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-blemish-purifying-face-wash": faceWashReviews.map(normalizeStaticReview) as ProductReview[],
  "blemish-purifying-face-wash": faceWashReviews.map(normalizeStaticReview) as ProductReview[],
  "acne-purifying-face-wash": faceWashReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-acne-purifying-face-wash": faceWashReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-face-wash": faceWashReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-bioactive-prebiotics-serum": prebioticReviews.map(normalizeStaticReview) as ProductReview[],
  "bioactive-prebiotics-jelly-serum": prebioticReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-prebiotics-serum": prebioticReviews.map(normalizeStaticReview) as ProductReview[],
  "prebiotics-jelly-serum": prebioticReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-noni-serum": prebioticReviews.map(normalizeStaticReview) as ProductReview[],
  "noni-serum": prebioticReviews.map(normalizeStaticReview) as ProductReview[],
} as const;

export type ReviewProductHandle = keyof typeof reviewCollections;

type ProductReviewDataset = {
  reviews: ProductReview[];
  summary: ProductReviewSummary;
};

function createReviewSummary(
  productHandle: ReviewProductHandle,
  reviews: ProductReview[],
): ProductReviewSummary {
  const ratingDistribution = reviews.reduce<Record<string, number>>((acc, review) => {
    const key = String(review.rating);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    averageRating: reviews.length ? totalRating / reviews.length : 0,
    productHandle,
    ratingDistribution,
    total: reviews.length,
  };
}

const reviewSummaries = Object.fromEntries(
  Object.entries(reviewCollections).map(([productHandle, reviews]) => [
    productHandle,
    createReviewSummary(productHandle as ReviewProductHandle, reviews),
  ]),
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


function getReviewTimestamp(review: ProductReview) {
  const timestamp = Date.parse(review.date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function toPublicProductReview(row: ProductReviewRow): ProductReview {
  const createdTimestamp = Date.parse(row.created_at);
  const safeTimestamp = Number.isNaN(createdTimestamp) ? 0 : createdTimestamp;

  return {
    body: row.body,
    customerName: row.customer_name,
    date: row.created_at,
    displayDate: formatSubmittedReviewDate(row.created_at),
    id: row.id,
    images: row.images.filter(Boolean),
    productHandle: row.product_handle,
    rating: row.rating,
    sourceIndex: -safeTimestamp,
    title: row.title,
  };
}

async function getSubmittedProductReviews(_productHandle: ReviewProductHandle) {
  return [];
}

export async function getMergedProductReviewDataset(
  productHandle: string,
): Promise<ProductReviewDataset | undefined> {
  if (!isReviewProductHandle(productHandle)) {
    return undefined;
  }

  const submittedReviews = await getSubmittedProductReviews(productHandle);
  const reviews = [...submittedReviews, ...reviewCollections[productHandle]].sort((a, b) => {
    const dateDifference = getReviewTimestamp(b) - getReviewTimestamp(a);

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return a.sourceIndex - b.sourceIndex;
  });

  return {
    reviews,
    summary: createReviewSummary(productHandle, reviews),
  };
}

export async function getMergedProductReviews(
  productHandle: string,
  offset = 0,
  limit = reviewPageSize,
  rating?: number,
) {
  const dataset = await getMergedProductReviewDataset(productHandle);

  if (!dataset) {
    return [];
  }

  const safeOffset = Math.max(0, offset);
  const safeLimit = Math.min(maxReviewPageSize, Math.max(1, limit));
  const reviews = rating
    ? dataset.reviews.filter((review) => review.rating === rating)
    : dataset.reviews;

  return reviews.slice(safeOffset, safeOffset + safeLimit);
}

export async function getMergedProductReviewCount(productHandle: string, rating?: number) {
  const dataset = await getMergedProductReviewDataset(productHandle);

  if (!dataset) {
    return 0;
  }

  return rating
    ? dataset.reviews.filter((review) => review.rating === rating).length
    : dataset.reviews.length;
}
