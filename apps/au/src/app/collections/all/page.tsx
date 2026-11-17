import type { Metadata } from "next";
import { AllProductsCatalog } from "@/components/collection/AllProductsCatalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "All Products & Collections | Buudy AU — Clinical Phototherapy & Skincare",
  description:
    "Explore the complete Buudy AU catalog. Discover clinical 7 Colour LED light therapy masks, targeted red light therapy torches, anti-ageing peptide creams, and clean vegan serums.",
  alternates: {
    canonical: "https://au.buudy.com/collections/all",
  },
  openGraph: {
    title: "All Products & Collections | Buudy AU",
    description:
      "Explore the complete Buudy AU catalog of clinical LED devices and bioactive skincare formulations.",
    url: "https://au.buudy.com/collections/all",
    siteName: "Buudy AU",
    locale: "en_AU",
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
    name: "All Products — Buudy AU",
    url: "https://au.buudy.com/collections/all",
    description:
      "Complete collection of Buudy AU light therapy devices, clinical peptide creams, and active serums.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products
        .filter((p) => !EXCLUDED_SCHEMA_IDS.has(p.id))
        .map((p, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://au.buudy.com/products/${p.slug}`,
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
