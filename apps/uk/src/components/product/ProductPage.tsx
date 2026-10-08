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
  DeferredHowToUseSection,
  DeferredVideoReviews,
  DeferredWavelengthSelector,
} from "./DeferredClientSections";
import { TrustBadges } from "./TrustBadges";

export function ProductPage({
  product,
  variant,
  galleryVariant = "default",
}: {
  product: Product;
  variant?: string;
  galleryVariant?: "default" | "omnilux";
}) {
  if (product.template === "torch") {
    return <TorchProductPage product={product} />;
  }

  if (product.template === "ipl") {
    return <IplProductPage product={product} />;
  }

  return (
    <>
      <ProductHero product={product} galleryVariant={galleryVariant} />
      <DeferredVideoReviews />
      <TrustBadges />
      {/* <FeatureGrid /> */}
      <DeferredBeforeAfterGrid />
      <DeferredWavelengthSelector />
      <DeferredHowToUseSection />
      <DeferredExpertSection />
      <ComparisonTable />
      {/* <TouchTechSection /> */}
      <ProductReviewsSection />
      <AppPromo />
      <BlueLightSection />
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection />
      <StickyAddToCart product={product} />
    </>
  );
}
