import type { Product } from "@/data/products";
import { AppPromo, BlueLightSection, TouchTechSection } from "./AppPromo";
import { ComparisonTable } from "./ComparisonTable";
import { FAQSection } from "./FAQSection";
import { FeatureGrid } from "./FeatureGrid";
import { GuaranteeSection } from "./GuaranteeSection";
import { ProductHero } from "./ProductHero";
import { ProductReviewsSection } from "./ProductReviewsSection";
import { StickyAddToCart } from "./StickyAddToCart";
import { TorchProductPage } from "./TorchProductPage";
import { IplProductPage } from "./IplProductPage";
import {
  DeferredBeforeAfterGrid,
  DeferredExpertSection,
  DeferredVideoReviews,
  DeferredWavelengthSelector,
} from "./DeferredClientSections";
import { TrustBadges } from "./TrustBadges";

export function ProductPage({ product, variant }: { product: Product; variant?: string }) {
  if (product.template === "torch") {
    return <TorchProductPage product={product} />;
  }

  if (product.template === "ipl") {
    return <IplProductPage product={product} />;
  }

  return (
    <>
      <ProductHero product={product} />
      <DeferredVideoReviews />
      <TrustBadges />
      {/* <FeatureGrid /> */}
      <DeferredBeforeAfterGrid />
      <DeferredWavelengthSelector />
      <DeferredExpertSection />
      {/* <TouchTechSection /> */}
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
