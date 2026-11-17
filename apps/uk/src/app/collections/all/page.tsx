import type { Metadata } from "next";
import { AllProductsCatalog } from "@/components/collection/AllProductsCatalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products & Collections | Buudy UK — Clinical Phototherapy & Skincare",
  description:
    "Explore the complete Buudy UK catalog. Discover clinical 7 Colour LED light therapy masks, targeted red light therapy torches, anti-ageing peptide creams, and clean vegan serums.",
  alternates: {
    canonical: "https://www.buudy.co.uk/collections/all",
  },
  openGraph: {
    title: "All Products & Collections | Buudy UK",
    description:
      "Explore the complete Buudy UK catalog of clinical LED devices and bioactive skincare formulations.",
    url: "https://www.buudy.co.uk/collections/all",
    siteName: "Buudy UK",
    locale: "en_GB",
    type: "website",
  },
};

const EXCLUDED_SCHEMA_IDS = new Set([
  "buudy-package-protection",
  "buudy-phyto-renew-retinol-alternative-serum",
  "buudy-blemish-defense-niacinamide-gel",
  "buudy-hydrating-serum",
  "the-ultimate-hydration-duo",
]);

export default function CollectionsAllPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Products — Buudy UK",
    url: "https://www.buudy.co.uk/collections/all",
    description:
      "Complete collection of Buudy UK light therapy devices, clinical peptide creams, and active serums.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products
        .filter((p) => !EXCLUDED_SCHEMA_IDS.has(p.id))
        .map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://www.buudy.co.uk/products/${p.slug}`,
          name: p.name,
        })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <AllProductsCatalog />
    </>
  );
}
