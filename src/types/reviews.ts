export type ProductReview = {
  id: string;
  sourceIndex: number;
  productHandle: string;
  customerName: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  displayDate: string;
  images: string[];
};

export type ProductReviewSummary = {
  productHandle: string;
  total: number;
  averageRating: number;
  ratingDistribution: Record<string, number>;
};

export type ProductReviewSortOption =
  | "most-recent"
  | "oldest"
  | "with-photos"
  | "highest-rating"
  | "lowest-rating";

export type ProductReviewsResponse = {
  reviews: ProductReview[];
  total: number;
  summaryTotal?: number;
  averageRating?: number;
  ratingDistribution?: Record<string, number>;
  nextOffset: number;
  hasMore: boolean;
};

export type ProductReviewSubmissionResponse = {
  review: ProductReview;
};
