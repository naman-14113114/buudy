import type { Product } from "@/data/products";
import { AppPromo, BlueLightSection, TouchTechSection } from "./AppPromo";
import { BeforeAfterGrid } from "./BeforeAfterGrid";
import { ComparisonTable } from "./ComparisonTable";
import { ExpertSection } from "./ExpertSection";
import { FAQSection } from "./FAQSection";
import { FeatureGrid } from "./FeatureGrid";
import { GuaranteeSection } from "./GuaranteeSection";
import { ProductHero } from "./ProductHero";
import { ProductReviewsSection } from "./ProductReviewsSection";
import { StickyAddToCart } from "./StickyAddToCart";
import { TorchProductPage } from "./TorchProductPage";
import { VideoReviews } from "./VideoReviews";
import { WavelengthSelector } from "./WavelengthSelector";

export function ProductPage({ product }: { product: Product }) {
  if (product.template === "torch") {
    return <TorchProductPage product={product} />;
  }

  return (
    <>
      <ProductHero product={product} />
      <VideoReviews />
      <FeatureGrid />
      <BeforeAfterGrid />
      <WavelengthSelector />
      <ExpertSection />
      <ComparisonTable />
      <TouchTechSection />
      <AppPromo />
      <BlueLightSection />
      <ProductReviewsSection />
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection />
      <StickyAddToCart product={product} />
    </>
  );
}
