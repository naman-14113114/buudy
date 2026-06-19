import type { Product } from "@/data/products";
import { AppPromo, BlueLightSection } from "./AppPromo";
import { BeforeAfterGrid } from "./BeforeAfterGrid";
import { ComparisonTable } from "./ComparisonTable";
import { ExpertSection } from "./ExpertSection";
import { FAQSection } from "./FAQSection";
import { GuaranteeSection } from "./GuaranteeSection";
import { ProductHero } from "./ProductHero";
import { ProductReviewsSection } from "./ProductReviewsSection";
import { StickyAddToCart } from "./StickyAddToCart";
import { TorchProductPage } from "./TorchProductPage";
import { TrustBadges } from "./TrustBadges";
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
      <TrustBadges />
      <BeforeAfterGrid />
      <WavelengthSelector />
      <ExpertSection />
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
