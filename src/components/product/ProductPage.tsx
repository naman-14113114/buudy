import type { Product } from "@/data/products";
import { AppPromo, BlueLightSection, RitualSection, TouchTechSection } from "./AppPromo";
import { BeforeAfterGrid } from "./BeforeAfterGrid";
import { ComparisonTable } from "./ComparisonTable";
import { ExpertSection } from "./ExpertSection";
import { FAQSection } from "./FAQSection";
import { FeatureGrid } from "./FeatureGrid";
import { GuaranteeSection } from "./GuaranteeSection";
import { ProductHero } from "./ProductHero";
import { ResultsMarquee } from "./ResultsMarquee";
import { SpecsPanel } from "./SpecsPanel";
import { StickyAddToCart } from "./StickyAddToCart";
import { VideoReviews } from "./VideoReviews";
import { WavelengthSelector } from "./WavelengthSelector";

export function ProductPage({ product }: { product: Product }) {
  return (
    <>
      <ProductHero product={product} />
      <FeatureGrid />
      <SpecsPanel product={product} />
      <ResultsMarquee />
      <BeforeAfterGrid />
      <VideoReviews />
      <WavelengthSelector />
      <ExpertSection />
      <RitualSection />
      <ComparisonTable />
      <TouchTechSection />
      <AppPromo />
      <BlueLightSection />
      <FAQSection />
      <GuaranteeSection />
      <StickyAddToCart product={product} />
    </>
  );
}
