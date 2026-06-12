import { Buffer } from "node:buffer";
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import {
  getMergedProductReviewDataset,
  isReviewProductHandle,
  maxReviewPageSize,
  reviewPageSize,
  toPublicProductReview,
} from "@/data/reviews";
import type { ProductReview, ProductReviewSortOption } from "@/types/reviews";

const REVIEW_IMAGE_BUCKET = "product-review-images";
const MAX_REVIEW_IMAGES = 5;
const MAX_REVIEW_IMAGE_BYTES = 5 * 1024 * 1024;

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const imageExtensionByType: Record<string, string> = {
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const reviewSortOptions = new Set<ProductReviewSortOption>([
  "most-recent",
  "oldest",
  "with-photos",
  "highest-rating",
  "lowest-rating",
]);

const reviewSubmissionSchema = z.object({
  body: z.string().trim().min(10).max(1000),
  customerEmail: z.string().trim().email().max(254),
  customerName: z.string().trim().min(2).max(50),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().min(2).max(70),
});

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function parseRating(value: string | null) {
  if (value === null) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 1 && parsed <= 5 ? parsed : null;
}

function parseBoolean(value: string | null) {
  if (value === null || value === "") {
    return false;
  }

  return value === "true" || value === "1";
}

function parseReviewSort(value: string | null): ProductReviewSortOption | null {
  if (value === null || value === "") {
    return "most-recent";
  }

  return reviewSortOptions.has(value as ProductReviewSortOption)
    ? (value as ProductReviewSortOption)
    : null;
}

function getReviewTimestamp(review: ProductReview) {
  const timestamp = Date.parse(review.date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function compareNewestFirst(a: ProductReview, b: ProductReview) {
  const dateDifference = getReviewTimestamp(b) - getReviewTimestamp(a);

  if (dateDifference !== 0) {
    return dateDifference;
  }

  return a.sourceIndex - b.sourceIndex;
}

function sortReviews(reviews: ProductReview[], sort: ProductReviewSortOption) {
  const sortedReviews = [...reviews];

  switch (sort) {
    case "oldest":
      return sortedReviews.sort((a, b) => {
        const dateDifference = getReviewTimestamp(a) - getReviewTimestamp(b);

        if (dateDifference !== 0) {
          return dateDifference;
        }

        return a.sourceIndex - b.sourceIndex;
      });
    case "with-photos":
      return sortedReviews.sort((a, b) => {
        const imageDifference = Number(b.images.length > 0) - Number(a.images.length > 0);

        if (imageDifference !== 0) {
          return imageDifference;
        }

        return compareNewestFirst(a, b);
      });
    case "highest-rating":
      return sortedReviews.sort((a, b) => {
        const ratingDifference = b.rating - a.rating;

        if (ratingDifference !== 0) {
          return ratingDifference;
        }

        return compareNewestFirst(a, b);
      });
    case "lowest-rating":
      return sortedReviews.sort((a, b) => {
        const ratingDifference = a.rating - b.rating;

        if (ratingDifference !== 0) {
          return ratingDifference;
        }

        return compareNewestFirst(a, b);
      });
    case "most-recent":
    default:
      return sortedReviews.sort(compareNewestFirst);
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ productHandle: string }> },
) {
  const { productHandle } = await context.params;
  const dataset = await getMergedProductReviewDataset(productHandle);

  if (!dataset) {
    return NextResponse.json({ message: "Reviews not found." }, { status: 404 });
  }

  const searchParams = request.nextUrl.searchParams;
  const offset = parsePositiveInteger(searchParams.get("offset"), 0);
  const requestedLimit = parsePositiveInteger(searchParams.get("limit"), reviewPageSize);
  const limit = Math.min(maxReviewPageSize, Math.max(1, requestedLimit));
  const rating = parseRating(searchParams.get("rating"));
  const sort = parseReviewSort(searchParams.get("sort"));
  const withPhotos = parseBoolean(searchParams.get("withPhotos"));
  const verifiedOnly = parseBoolean(searchParams.get("verified"));

  if (rating === null) {
    return NextResponse.json({ message: "Rating must be between 1 and 5." }, { status: 400 });
  }

  if (sort === null) {
    return NextResponse.json({ message: "Sort option is not supported." }, { status: 400 });
  }

  const filteredReviews = sortReviews(
    dataset.reviews.filter((review) => {
      if (rating && review.rating !== rating) {
        return false;
      }

      if (withPhotos && review.images.length === 0) {
        return false;
      }

      // Current public Buudy reviews are all verified, so this flag is a no-op
      // until a future import exposes non-verified review records.
      void verifiedOnly;
      return true;
    }),
    sort,
  );
  const reviews = filteredReviews.slice(offset, offset + limit);
  const total = filteredReviews.length;
  const nextOffset = offset + reviews.length;

  return NextResponse.json(
    {
      averageRating: dataset.summary.averageRating,
      hasMore: nextOffset < total,
      nextOffset,
      ratingDistribution: dataset.summary.ratingDistribution,
      reviews,
      summaryTotal: dataset.summary.total,
      total,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function getCleanFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getReviewFiles(formData: FormData) {
  return formData
    .getAll("images")
    .filter((value): value is File => value instanceof File && value.size > 0);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ productHandle: string }> },
) {
  const { productHandle } = await context.params;

  if (!isReviewProductHandle(productHandle)) {
    return NextResponse.json({ message: "Reviews not found." }, { status: 404 });
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { message: "Review submissions are not configured on this environment yet." },
      { status: 503 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Review form data was not readable." }, { status: 400 });
  }

  if (getCleanFormValue(formData, "botcheck")) {
    return NextResponse.json({ message: "Review submission rejected." }, { status: 400 });
  }

  const parsed = reviewSubmissionSchema.safeParse({
    body: getCleanFormValue(formData, "body"),
    customerEmail: getCleanFormValue(formData, "customerEmail"),
    customerName: getCleanFormValue(formData, "customerName"),
    rating: getCleanFormValue(formData, "rating"),
    title: getCleanFormValue(formData, "title"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please complete every review field before submitting." },
      { status: 400 },
    );
  }

  const imageFiles = getReviewFiles(formData);

  if (imageFiles.length > MAX_REVIEW_IMAGES) {
    return NextResponse.json(
      { message: `Please upload no more than ${MAX_REVIEW_IMAGES} images.` },
      { status: 400 },
    );
  }

  const invalidImage = imageFiles.find(
    (image) => !allowedImageTypes.has(image.type) || image.size > MAX_REVIEW_IMAGE_BYTES,
  );

  if (invalidImage) {
    return NextResponse.json(
      { message: "Review images must be JPG, PNG, WebP, or GIF files under 5MB." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const reviewId = randomUUID();
  const imageUrls: string[] = [];

  for (const [index, image] of imageFiles.entries()) {
    const extension = imageExtensionByType[image.type] ?? "jpg";
    const path = `${productHandle}/${reviewId}/review-image-${index + 1}.${extension}`;
    const bytes = Buffer.from(await image.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from(REVIEW_IMAGE_BUCKET)
      .upload(path, bytes, {
        contentType: image.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { message: "Review image upload is not configured yet. Please try again later." },
        { status: 500 },
      );
    }

    const { data } = supabase.storage.from(REVIEW_IMAGE_BUCKET).getPublicUrl(path);
    imageUrls.push(data.publicUrl);
  }

  const { data, error } = await supabase
    .from("product_reviews")
    .insert({
      body: parsed.data.body,
      customer_email: parsed.data.customerEmail.toLowerCase(),
      customer_name: parsed.data.customerName,
      id: reviewId,
      images: imageUrls,
      product_handle: productHandle,
      rating: parsed.data.rating,
      source: "uk_buudy_review_form",
      status: "published",
      title: parsed.data.title,
    })
    .select(
      "id, product_handle, customer_name, customer_email, rating, title, body, images, status, source, created_at, updated_at",
    )
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "We could not publish your review right now. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ review: toPublicProductReview(data) }, { status: 201 });
}
