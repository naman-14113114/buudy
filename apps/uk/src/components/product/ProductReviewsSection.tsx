import { LazyProductReviewsGrid } from "./LazyProductReviewsGrid";
import {
  getProductReviewSummary,
  getProductReviews,
  reviewPageSize,
} from "@/data/reviews";

export function ProductReviewsSection({ productHandle = "buudy-led-mask" }: { productHandle?: string } = {}) {
  const summary = getProductReviewSummary(productHandle);

  if (!summary) {
    return null;
  }

  const initialReviews = getProductReviews(productHandle, 0, reviewPageSize);

  return (
    <section className="buudy-section bg-[var(--cream)] md: md: py-14 md:py-24" id="reviews">
      <div className="buudy-wrap">
        <LazyProductReviewsGrid
          averageRating={summary.averageRating}
          initialReviews={initialReviews}
          pageSize={reviewPageSize}
          productHandle={productHandle}
          ratingDistribution={summary.ratingDistribution}
          total={summary.total}
        />
      </div>
    </section>
  );
}
