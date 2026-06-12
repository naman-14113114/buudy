import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { market } from "@/lib/market";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Best LED Face Mask Australia | Buudy Red Light Therapy",
  description:
    "Shop Buudy Australia for salon-grade LED face masks, red light therapy, blue light acne routines, anti-ageing skincare, near-infrared support, neck coverage, and free tracked shipping.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Best LED Face Mask Australia",
    "red light therapy mask Australia",
    "LED face mask for acne Australia",
    "anti ageing LED mask Australia",
    "home LED light therapy",
  ],
  openGraph: {
    title: "Best LED Face Mask Australia | Buudy",
    description:
      "Discover the Buudy LED Mask with 192 LEDs, red and blue light therapy, near-infrared support, and full face plus neck coverage.",
    url: market.siteUrl,
    images: [
      {
        url: "/images/products/buudy-led-mask/09-buudy-led-mask-home-spa.webp",
        width: 1200,
        height: 900,
        alt: "Buudy LED light therapy mask at home",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      {[organizationJsonLd(), websiteJsonLd()].map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={index}
          type="application/ld+json"
        />
      ))}
      <HomePage />
    </>
  );
}
