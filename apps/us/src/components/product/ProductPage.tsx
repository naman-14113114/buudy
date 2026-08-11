import type { Product } from "@/data/products";
import { AppPromo, BlueLightSection } from "./AppPromo";
import { ComparisonTable } from "./ComparisonTable";
import { FAQSection } from "./FAQSection";
import { GuaranteeSection } from "./GuaranteeSection";
import { ProductHero } from "./ProductHero";
import { ProductReviewsSection } from "./ProductReviewsSection";
import { StickyAddToCart } from "./StickyAddToCart";
import { TorchProductPage } from "./TorchProductPage";
import { TrustBadges } from "./TrustBadges";
import {
  DeferredBeforeAfterGrid,
  DeferredExpertSection,
  DeferredVideoReviews,
  DeferredWavelengthSelector,
} from "./DeferredClientSections";

export function ProductPage({ product }: { product: Product }) {
  if (product.template === "torch") {
    return <TorchProductPage product={product} />;
  }

  return (
    <>
      <ProductHero product={product} />
      <DeferredVideoReviews />
      <TrustBadges />
      <DeferredBeforeAfterGrid />
      <DeferredWavelengthSelector />
      <DeferredExpertSection />
      <AppPromo />
      <ProductReviewsSection />
      <BlueLightSection />
      <ComparisonTable />
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection />
      <StickyAddToCart product={product} />
    </>
  );
}
