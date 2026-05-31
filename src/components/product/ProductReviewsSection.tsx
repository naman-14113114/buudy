import { ProductReviewsGrid } from "./ProductReviewsGrid";
import {
  getProductReviewSummary,
  getProductReviews,
  reviewPageSize,
} from "@/data/reviews";

const productHandle = "buudy-led-mask";

export function ProductReviewsSection() {
  const summary = getProductReviewSummary(productHandle);

  if (!summary) {
    return null;
  }

  const initialReviews = getProductReviews(productHandle, 0, reviewPageSize);

  return (
    <section className="buudy-section bg-[var(--cream)] py-24" id="reviews">
      <div className="buudy-wrap">
        <ProductReviewsGrid
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
