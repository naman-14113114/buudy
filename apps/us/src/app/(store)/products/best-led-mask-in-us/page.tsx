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

const pagePath = "/products/best-led-mask-in-us";
const pageProduct = {
  ...buudyMask,
  slug: "best-led-mask-in-us",
  gallery: fullLedMaskGallery,
  faqs: standardMaskFaqs,
};

export const revalidate = 86400;

export const metadata: Metadata = {
  title: buudyMask.seoTitle,
  description: buudyMask.seoDescription,
  keywords: [
    "best LED face mask US",
    "LED face mask US",
    "red light therapy mask US",
    "LED face mask for acne US",
    "anti ageing LED mask",
    "LED mask with neck coverage",
    "near infrared LED face mask",
  ],
  alternates: {
    canonical: pagePath,
    languages: {
      "en-US": pagePath,
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
    title: buudyMask.seoTitle,
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
  twitter: {
    card: "summary_large_image",
    title: buudyMask.seoTitle,
    description: buudyMask.seoDescription,
    images: [pageProduct.gallery[0].src],
  },
};

export default function BestLedMaskInUsProductRoute() {
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
      <ProductPage product={pageProduct} />
    </>
  );
}
