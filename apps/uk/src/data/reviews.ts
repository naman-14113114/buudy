import maskReviews from "./reviews/buudy-led-mask-reviews.json";
import torchReviews from "./reviews/buudy-red-torch-reviews.json";
import iplReviews from "./reviews/buudy-ipl-hair-removal-device-reviews.json";
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

const reviewCollections = {
  "buudy-led-mask": maskReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-red-torch": torchReviews.map(normalizeStaticReview) as ProductReview[],
  "buudy-ipl-device": iplReviews.map(normalizeStaticReview) as ProductReview[],
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

async function getSubmittedProductReviews(productHandle: ReviewProductHandle) {
  if (!isSupabaseAdminConfigured()) {
    return [];
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("product_reviews")
      .select(
        "id, product_handle, customer_name, customer_email, rating, title, body, images, status, source, created_at, updated_at",
      )
      .eq("product_handle", productHandle)
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Unable to load submitted product reviews.", error);
      return [];
    }

    return data.map(toPublicProductReview);
  } catch (error) {
    console.error("Unable to load submitted product reviews.", error);
    return [];
  }
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
