import { NextRequest, NextResponse } from "next/server";
import {
  getProductReviewSummary,
  getProductReviewCount,
  getProductReviews,
  maxReviewPageSize,
  reviewPageSize,
} from "@/data/reviews";

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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ productHandle: string }> },
) {
  const { productHandle } = await context.params;
  const summary = getProductReviewSummary(productHandle);

  if (!summary) {
    return NextResponse.json({ message: "Reviews not found." }, { status: 404 });
  }

  const searchParams = request.nextUrl.searchParams;
  const offset = parsePositiveInteger(searchParams.get("offset"), 0);
  const requestedLimit = parsePositiveInteger(searchParams.get("limit"), reviewPageSize);
  const limit = Math.min(maxReviewPageSize, Math.max(1, requestedLimit));
  const rating = parseRating(searchParams.get("rating"));

  if (rating === null) {
    return NextResponse.json({ message: "Rating must be between 1 and 5." }, { status: 400 });
  }

  const reviews = getProductReviews(productHandle, offset, limit, rating);
  const total = getProductReviewCount(productHandle, rating);
  const nextOffset = offset + reviews.length;

  return NextResponse.json(
    {
      hasMore: nextOffset < total,
      nextOffset,
      reviews,
      total,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    },
  );
}
