import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";
import { buudyMask } from "@/data/products";
import { ledMaskSeoFaqs } from "@/data/seoFaqs";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  productJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Buudy LED Mask | Compact UK Product Page",
  description:
    "A tighter Buudy LED Mask UK product page with reviews earlier, compact expert video, and a faster path through the main buying sections.",
  alternates: {
    canonical: "/products/buudy-led-mask",
    languages: {
      "en-GB": "/products/buudy-led-mask-compact",
    },
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Buudy LED Mask | Compact UK Product Page",
    description: buudyMask.description,
    url: absoluteUrl("/products/buudy-led-mask-compact"),
    type: "website",
    images: [
      {
        url: buudyMask.gallery[0].src,
        width: 1200,
        height: 1500,
        alt: buudyMask.gallery[0].alt,
      },
    ],
  },
};

export default function CompactBuudyMaskProductRoute() {
  const productFaqs = [...ledMaskSeoFaqs, ...buudyMask.faqs];

  return (
    <>
      {[
        organizationJsonLd(),
        websiteJsonLd(),
        productJsonLd(buudyMask),
        breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: buudyMask.name, url: "/products/buudy-led-mask-compact" },
        ]),
        faqJsonLd(productFaqs),
      ].map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={index}
          type="application/ld+json"
        />
      ))}
      <ProductPage product={buudyMask} variant="compact" />
    </>
  );
}
