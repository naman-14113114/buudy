import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";
import { buudyMask, fullLedMaskGallery, standardMaskFaqs } from "@/data/products";
import { ledMaskSeoFaqs } from "@/data/seoFaqs";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  productJsonLd,
  productWebPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const pagePath = "/products/buudy-led-face-mask";
const pageProduct = {
  ...buudyMask,
  slug: "buudy-led-face-mask",
  gallery: fullLedMaskGallery,
  faqs: standardMaskFaqs,
};

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Buudy 7 Colour LED Face Mask | Black Friday Early Access - 60% + £10 OFF",
  description: "Black Friday Early Access UK Sale: Save 60% on the Buudy 7 Colour LED Face Mask plus an extra £10 OFF with code BLACKFRIDAY10. Includes Free £70 Red Torch gift bundle, 90-day money-back guarantee, and fast UK delivery.",
  keywords: [
    "best LED face mask UK",
    "LED face mask UK",
    "red light therapy mask UK",
    "LED face mask for acne UK",
    "anti ageing LED mask",
    "LED mask with neck coverage",
    "near infrared LED face mask",
  ],
  alternates: {
    canonical: pagePath,
    languages: {
      "en-GB": pagePath,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Buudy 7 Colour LED Face Mask | Black Friday Early Access - 60% + £10 OFF",
    description: "Black Friday Early Access UK Sale: Save 60% on the Buudy 7 Colour LED Face Mask plus an extra £10 OFF with code BLACKFRIDAY10. Includes Free £70 Red Torch gift bundle.",
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
  twitter: {
    card: "summary_large_image",
    title: "Buudy 7 Colour LED Face Mask | Black Friday Early Access - 60% + £10 OFF",
    description: "Black Friday Early Access UK Sale: Save 60% on the Buudy 7 Colour LED Face Mask plus an extra £10 OFF with code BLACKFRIDAY10. Includes Free £70 Red Torch gift bundle.",
    images: [pageProduct.gallery[0].src],
  },
};

export default function BuudyLedFaceMaskProductRoute() {
  const productFaqs = [...ledMaskSeoFaqs, ...pageProduct.faqs];

  return (
    <>
      {[
        organizationJsonLd(),
        websiteJsonLd(),
        productWebPageJsonLd(pageProduct),
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
      <ProductPage
        product={pageProduct}
        galleryVariant="omnilux"
        comparisonPosition="below-app"
        isHalloween={false}
        isEarlyBlackFriday={true}
      />
    </>
  );
}
