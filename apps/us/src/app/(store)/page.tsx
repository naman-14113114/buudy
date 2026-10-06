import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { market } from "@/lib/market";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { languageAlternates } from '@/lib/international/markets';

export const metadata: Metadata = {
  title: "Buudy LED Face and Neck Mask | At-Home Skincare",
  description:
    "Explore the Buudy LED face and neck mask, seven visible colours, an 830 nm near-infrared mode and international delivery information.",
  alternates: {
    canonical: "/",
    languages: languageAlternates('/'),
  },
  keywords: [
    "Best LED Face Mask US",
    "red light therapy mask US",
    "LED face mask for acne US",
    "anti ageing LED mask US",
    "home LED light therapy",
  ],
  openGraph: {
    title: "Best LED Face Mask US | Buudy",
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
