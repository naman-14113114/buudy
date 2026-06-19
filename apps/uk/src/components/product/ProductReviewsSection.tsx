import { ProductReviewsGrid } from "./ProductReviewsGrid";
import {
  getMergedProductReviewDataset,
  reviewPageSize,
} from "@/data/reviews";

export async function ProductReviewsSection({ productHandle = "buudy-led-mask" }: { productHandle?: string } = {}) {
  const dataset = await getMergedProductReviewDataset(productHandle);

  if (!dataset) {
    return null;
  }

  const initialReviews = dataset.reviews.slice(0, reviewPageSize);

  return (
    <section className="buudy-section bg-[var(--cream)] md: md: py-14 md:py-24" id="reviews">
      <div className="buudy-wrap">
        <ProductReviewsGrid
          averageRating={dataset.summary.averageRating}
          initialReviews={initialReviews}
          pageSize={reviewPageSize}
          productHandle={productHandle}
          ratingDistribution={dataset.summary.ratingDistribution}
          total={dataset.summary.total}
        />
      </div>
    </section>
  );
}
