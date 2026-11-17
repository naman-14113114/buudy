import type { Metadata } from "next";
import { AllProductsCatalog } from "@/components/collection/AllProductsCatalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products & Collections | Buudy CA — Clinical Phototherapy & Skincare",
  description:
    "Explore the complete Buudy CA catalog. Discover clinical 7 Colour LED light therapy masks, targeted red light therapy torches, anti-ageing peptide creams, and clean vegan serums.",
  alternates: {
    canonical: "https://ca.buudy.com/collections/all",
  },
  openGraph: {
    title: "All Products & Collections | Buudy CA",
    description:
      "Explore the complete Buudy CA catalog of clinical LED devices and bioactive skincare formulations.",
    url: "https://ca.buudy.com/collections/all",
    siteName: "Buudy CA",
    locale: "en_CA",
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

export default function ProductsCatalogPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Products — Buudy CA",
    url: "https://ca.buudy.com/collections/all",
    description:
      "Complete collection of Buudy CA light therapy devices, clinical peptide creams, and active serums.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products
        .filter((p) => !EXCLUDED_SCHEMA_IDS.has(p.id))
        .map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://ca.buudy.com/products/${p.slug}`,
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
