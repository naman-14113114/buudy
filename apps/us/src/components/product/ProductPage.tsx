import type { Product } from "@/data/products";
import {
  serumTransformations,
  peptideTransformations,
  prebioticTransformations,
  cleanserTransformations,
  renewalCollectionTransformations,
} from "@/data/productSections";
import { SerumClinicalResults, SerumHowToUse } from "./SerumClinicalSections";
import { CleanserClinicalResults, CleanserHowToUse } from "./CleanserClinicalSections";
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
import { SerumCertificationsRow } from "./SerumCertificationsRow";
import { GiftBoxBundleSection } from "./GiftBoxBundleSection";
import styles from "./HyaluronicSerumEditorial.module.css";
import { ProductSignalsRow } from "./ProductDetailsAccordion";
import {
  HyaluronicSerumSelfnamedSections,
  PackagingSection,
  RelatedProductsSection,
} from "./HyaluronicSerumSelfnamedSections";
import { PeptideSerumSelfnamedSections } from "./PeptideSerumSelfnamedSections";
import { AhaPeelingSelfnamedSections } from "./AhaPeelingSelfnamedSections";
import { RenewalBoxSelfnamedSections } from "./RenewalBoxSelfnamedSections";

export function ProductPage({
  product,
  variant,
  galleryVariant = "omnilux",
  comparisonPosition = product.template === "mask" ? "below-app" : "default",
  isHalloween = false,
  isEarlyBlackFriday = true,
  hyaluronicEditorial = false,
}: {
  product: Product;
  variant?: string;
  galleryVariant?: "default" | "omnilux";
  comparisonPosition?: "default" | "below-app";
  isHalloween?: boolean;
  isEarlyBlackFriday?: boolean;
  hyaluronicEditorial?: boolean;
}) {
  if (product.template === "torch") {
    return <TorchProductPage product={product} isHalloween={isHalloween} />;
  }

  if (product.template === "ipl") {
    return <IplProductPage product={product} isHalloween={isHalloween} />;
  }

  if (product.template === "minimal") {
    return <MinimalProductPage product={product} />;
  }

  const isPeptide =
    product.id.includes("peptide") ||
    product.slug.includes("peptide") ||
    product.slug.includes("collagen");

  const isPrebiotic =
    product.id.includes("prebiotic") ||
    product.slug.includes("prebiotic") ||
    product.slug.includes("noni");

  const isAha =
    product.id.includes("aha") ||
    product.slug.includes("aha");

  const isRenewalBox =
    product.id === "the-ultimate-renewal-collection-box" ||
    product.slug === "the-ultimate-renewal-collection-box";

  const isSerumOrGift =
    product.template === "serum" ||
    product.template === "cleanser";

  const isEditorial =
    hyaluronicEditorial ||
    isSerumOrGift;

  const isHyaluronic =
    product.id === "buudy-light-activating-hyaluronic-serum" ||
    product.slug === "buudy-light-activating-hyaluronic-serum" ||
    product.slug === "buudy-hyaluronic-serum" ||
    product.slug.includes("hyaluronic") ||
    product.slug.includes("double-hydration");

  const overview = (
    <>
      {product.template === "mask" && <DeferredVideoReviews />}
      {product.template === "mask" && <TrustBadges />}
      {isSerumOrGift && !isEditorial && <SerumCertificationsRow />}
      {isEditorial && product.productSignals && product.productSignals.length > 0 && (
        <ProductSignalsRow signals={product.productSignals} />
      )}
      <GiftBoxBundleSection productSlug={product.slug} />
      {/* <FeatureGrid /> */}
      {/* 1. Verified Clinical Before & After Grid - Placed ABOVE both the Percentage Grid and How-To-Use */}
      {product.template === "serum" && isRenewalBox && (
        <DeferredBeforeAfterGrid
          items={renewalCollectionTransformations}
          title={
            <>
              Real users, <em className="buudy-italic">total skin renewal</em>.
            </>
          }
          description="Verified customer transformations after incorporating The Ultimate Renewal Collection Box into their weekly resurfacing, daily hydration, and firming ritual."
        />
      )}
      {product.template === "serum" && isPrebiotic && (
        <DeferredBeforeAfterGrid
          items={prebioticTransformations}
          title={
            <>
              Real users, <em className="buudy-italic">restored skin barrier</em>.
            </>
          }
          description="Verified customer transformations after incorporating Buudy Bioactive Prebiotics Jelly Serum into their daily barrier-repair and light therapy ritual."
        />
      )}
      {product.template === "serum" && isPeptide && (
        <DeferredBeforeAfterGrid
          items={peptideTransformations}
          title={
            <>
              Real users, <em className="buudy-italic">firmer, lifted skin</em>.
            </>
          }
          description={`Verified customer transformations after incorporating ${product.name} into their daily firming and light therapy ritual.`}
        />
      )}
      {product.template === "serum" && !isPeptide && !isPrebiotic && !isAha && !isRenewalBox && (
        <DeferredBeforeAfterGrid
          items={serumTransformations}
          title={
            <>
              Real users, <em className="buudy-italic">visible dermal renewal</em>.
            </>
          }
          description={`Verified customer transformations after incorporating ${product.name} into their daily hydration and skincare ritual.`}
        />
      )}
      {product.template === "cleanser" && (
        <DeferredBeforeAfterGrid
          items={cleanserTransformations}
          title={
            <>
              Real users, <em className="buudy-italic">visibly clearer skin</em>.
            </>
          }
          description="Verified customer results after incorporating Buudy Blemish Purifying Face Wash into their daily morning and evening cleansing ritual."
        />
      )}

      {/* 2. Selfnamed Rich Clinical Sections for Hyaluronic, Peptide, AHA Serums & Renewal Box */}
      {isHyaluronic && <HyaluronicSerumSelfnamedSections routineFirstGrid={hyaluronicEditorial} />}
      {isPeptide && <PeptideSerumSelfnamedSections routineFirstGrid={isEditorial} />}
      {isAha && <AhaPeelingSelfnamedSections routineFirstGrid={isEditorial} />}
      {isRenewalBox && <RenewalBoxSelfnamedSections routineFirstGrid={isEditorial} />}

      {/* 3. Consumer Perception & Clinical Trial Stats - Split Grid with Image & Miroooo One-Time Circular Filling Animation */}
      {product.template === "serum" && (
        <SerumClinicalResults isPeptide={isPeptide} isPrebiotic={isPrebiotic} isAha={isAha} productSlug={product.slug} />
      )}
      {isHyaluronic && !hyaluronicEditorial && <PackagingSection />}
      {product.template === "cleanser" && <CleanserClinicalResults />}

      {/* 4. Daily Application / Cleansing Ritual - How To Use Section */}
      {product.template === "mask" && <DeferredBeforeAfterGrid />}
      {product.template === "mask" && <DeferredWavelengthSelector />}
      {product.template === "mask" && <DeferredHowToUseSection />}
      {product.template === "serum" && !isHyaluronic && !isPeptide && !isAha && !isRenewalBox && (
        <SerumHowToUse isPeptide={isPeptide} isPrebiotic={isPrebiotic} isAha={isAha} productSlug={product.slug} />
      )}
      {product.template === "cleanser" && <CleanserHowToUse />}
      {product.template === "mask" && <DeferredExpertSection />}
      {product.template === "mask" && comparisonPosition === "default" && <ComparisonTable />}
      {/* <TouchTechSection /> */}

      {/* 5. Related Products Section */}
      {isSerumOrGift && (
        <RelatedProductsSection
          currentProductId={product.id}
          heading={isEditorial ? "Recommended products" : undefined}
        />
      )}
    </>
  );

  return (
    <div className="relative">
      <ProductHero
        product={product}
        galleryVariant={galleryVariant}
        isHalloween={isHalloween}
        isEarlyBlackFriday={isEarlyBlackFriday}
        hyaluronicEditorial={isEditorial}
      />
      {isEditorial ? (
        <div className={styles.editorial} data-editorial-theme>
          {overview}
        </div>
      ) : (
        overview
      )}
      {/* 6. Customer Reviews Section - After all the clinical, transformation, and ritual sections */}
      <ProductReviewsSection productHandle={product.template === "mask" ? "buudy-led-mask" : product.slug} />
      {product.template === "mask" && <AppPromo />}
      {product.template === "mask" && comparisonPosition === "below-app" && <ComparisonTable />}
      {product.template === "mask" && <BlueLightSection />}
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection />
      <StickyAddToCart product={product} isEarlyBlackFriday={isEarlyBlackFriday} />
    </div>
  );
}
