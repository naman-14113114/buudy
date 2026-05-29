import { ProductReviewsGrid } from "./ProductReviewsGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getProductReviewSummary,
  getProductReviews,
  reviewPageSize,
} from "@/data/reviews";

const productHandle = "buudy-led-mask";

function formatRating(value: number) {
  return value.toFixed(1);
}

function RatingBreakdown({
  distribution,
  total,
}: {
  distribution: Record<string, number>;
  total: number;
}) {
  return (
    <div className="mt-6 space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = distribution[String(rating)] ?? 0;
        const width = total ? `${(count / total) * 100}%` : "0%";

        return (
          <div
            className="grid grid-cols-[4.6rem_1fr_4rem] items-center gap-3"
            key={rating}
          >
            <span className="buudy-mono text-[var(--plum-soft)]">{rating} star</span>
            <span className="h-2 overflow-hidden rounded-full bg-[rgba(58,31,61,.1)]">
              <span
                className="block h-full rounded-full bg-[var(--gold)]"
                style={{ width }}
              />
            </span>
            <span className="buudy-mono text-right text-[var(--plum-soft)]">
              {count.toLocaleString("en-US")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ProductReviewsSection() {
  const summary = getProductReviewSummary(productHandle);

  if (!summary) {
    return null;
  }

  const initialReviews = getProductReviews(productHandle, 0, reviewPageSize);

  return (
    <section className="buudy-section bg-[var(--cream)] py-24" id="reviews">
      <div className="buudy-wrap">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <SectionHeading
            eyebrow="Product reviews"
            title={
              <>
                Buudy Mask <em className="buudy-italic">customer reviews</em>.
              </>
            }
            copy="Real feedback from customers who made Buudy part of their at-home skincare ritual."
          />

          <div className="rounded-[22px] border border-[rgba(58,31,61,.14)] bg-[rgba(255,252,245,.72)] p-6 shadow-[0_20px_52px_-42px_rgba(58,31,61,.55)]">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="buudy-mono text-[var(--gold)]">Average rating</p>
                <p className="buudy-display mt-2 text-6xl leading-none text-[var(--plum)]">
                  {formatRating(summary.averageRating)}
                </p>
              </div>
              <div className="text-right">
                <p className="buudy-mono text-[var(--plum-soft)]">Verified archive</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--plum)]">
                  {summary.total.toLocaleString("en-US")} reviews
                </p>
              </div>
            </div>
            <RatingBreakdown
              distribution={summary.ratingDistribution}
              total={summary.total}
            />
          </div>
        </div>

        <ProductReviewsGrid
          initialReviews={initialReviews}
          pageSize={reviewPageSize}
          productHandle={productHandle}
          total={summary.total}
        />
      </div>
    </section>
  );
}
