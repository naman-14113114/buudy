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

export type ProductReviewsResponse = {
  reviews: ProductReview[];
  total: number;
  nextOffset: number;
  hasMore: boolean;
};
