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

const pagePath = "/products/buudy-led-mask-2";
const pageProduct = {
  ...buudyMask,
  slug: "buudy-led-mask-2",
};

export const revalidate = 86400;

export const metadata: Metadata = {
  title: buudyMask.seoTitle,
  description: buudyMask.seoDescription,
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
    canonical: "/products/buudy-led-mask",
    languages: {
      "en-GB": pagePath,
    },
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
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
        url: buudyMask.gallery[0].src,
        width: 1200,
        height: 1500,
        alt: buudyMask.gallery[0].alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: buudyMask.seoTitle,
    description: buudyMask.seoDescription,
    images: [buudyMask.gallery[0].src],
  },
};

export default function BuudyMaskProductRouteTwo() {
  const productFaqs = [...ledMaskSeoFaqs, ...buudyMask.faqs];

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
      <ProductPage product={pageProduct} />
    </>
  );
}
