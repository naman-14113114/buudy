import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";
import { buudyMask, fullLedMaskGallery, standardMaskFaqs } from "@/data/products";
import { ledMaskSeoFaqs } from "@/data/seoFaqs";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  productJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const pagePath = "/products/buudy-led-mask-compact";
const pageProduct = {
  ...buudyMask,
  slug: "buudy-led-mask-compact",
  gallery: fullLedMaskGallery,
  faqs: standardMaskFaqs,
};

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Buudy LED Mask | Compact UK Product Page",
  description:
    "A tighter Buudy LED Mask UK product page with reviews earlier, compact expert video, and a faster path through the main buying sections.",
  alternates: {
    canonical: "/products/buudy-led-mask",
    languages: {
      "en-GB": pagePath,
    },
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Buudy LED Mask | Compact UK Product Page",
    description: buudyMask.description,
    url: absoluteUrl(pagePath),
    type: "website",
    images: [
      {
        url: pageProduct.gallery[0].src,
        width: 1200,
        height: 1500,
        alt: pageProduct.gallery[0].alt,
      },
    ],
  },
};

export default function CompactBuudyMaskProductRoute() {
  const productFaqs = [...ledMaskSeoFaqs, ...pageProduct.faqs];

  return (
    <>
      {[
        organizationJsonLd(),
        websiteJsonLd(),
        productJsonLd(pageProduct),
        breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: buudyMask.name, url: pagePath },
        ]),
        faqJsonLd(productFaqs),
      ].map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={index}
          type="application/ld+json"
        />
      ))}
      <ProductPage product={pageProduct} variant="compact" galleryVariant="omnilux" />
    </>
  );
}
