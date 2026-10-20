import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/ProductPage";
import { getProductBySlug } from "@/data/products";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  productJsonLd,
  productWebPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const slug = "buudy-gift-card";
const pagePath = `/products/${slug}`;

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Buudy Official Digital Gift Card | Instant Voucher Delivery",
    };
  }

  const primaryImage = product.gallery[0]?.src || product.cartImage;
  const primaryImageAlt = product.gallery[0]?.alt || product.name;

  return {
    title: "Buudy Official Digital Gift Card | Instant Voucher Delivery",
    description: product.seoDescription,
    keywords: [
      "Buudy Official Digital Gift Card",
      "Buudy digital gift card",
      "skincare gift voucher UK",
      "beauty gift card instant delivery",
      "LED mask gift certificate",
      "Buudy official gift card",
      "digital e-voucher skincare",
      "skincare gift card UK",
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
      title: "Buudy Official Digital Gift Card | Instant Voucher Delivery",
      description: product.description,
      url: absoluteUrl(pagePath),
      type: "website",
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 1500,
          alt: primaryImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Buudy Official Digital Gift Card | Instant Voucher Delivery",
      description: product.seoDescription,
      images: [primaryImage],
    },
  };
}

export default async function BuudyGiftCardProductRoute() {
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      {[
        organizationJsonLd(),
        websiteJsonLd(),
        productWebPageJsonLd(product),
        productJsonLd(product),
        breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: product.name, url: pagePath },
        ]),
        faqJsonLd(product.faqs),
      ].map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={index}
          type="application/ld+json"
        />
      ))}
      <ProductPage product={product} />
    </>
  );
}
