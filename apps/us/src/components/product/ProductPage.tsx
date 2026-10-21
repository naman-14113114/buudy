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
import { MinimalProductPage } from "./MinimalProductPage";
import {
  DeferredBeforeAfterGrid,
  DeferredExpertSection,
  DeferredHowToUseSection,
  DeferredVideoReviews,
  DeferredWavelengthSelector,
} from "./DeferredClientSections";
import { TrustBadges } from "./TrustBadges";
import { HalloweenOverlay } from "./HalloweenOverlay";

export function ProductPage({
  product,
  variant,
  galleryVariant = product.template === "mask" ? "omnilux" : "default",
  comparisonPosition = "default",
  isHalloween = false,
}: {
  product: Product;
  variant?: string;
  galleryVariant?: "default" | "omnilux";
  comparisonPosition?: "default" | "below-app";
  isHalloween?: boolean;
}) {
  if (product.template === "torch") {
    return <TorchProductPage product={product} />;
  }

  if (product.template === "ipl") {
    return <IplProductPage product={product} />;
  }

  if (product.template === "minimal") {
    return <MinimalProductPage product={product} />;
  }

  return (
    <div className="relative">
      {isHalloween && <HalloweenOverlay />}
      <ProductHero product={product} galleryVariant={galleryVariant} isHalloween={isHalloween} />
      <DeferredVideoReviews />
      <TrustBadges />
      {/* <FeatureGrid /> */}
      <DeferredBeforeAfterGrid />
      <DeferredWavelengthSelector />
      <DeferredHowToUseSection />
      <DeferredExpertSection />
      {comparisonPosition === "default" && <ComparisonTable />}
      {/* <TouchTechSection /> */}
      <ProductReviewsSection />
      <AppPromo />
      {comparisonPosition === "below-app" && <ComparisonTable />}
      <BlueLightSection />
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection />
      <StickyAddToCart product={product} />
    </div>
  );
}
