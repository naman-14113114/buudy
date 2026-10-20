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

const slug = "buudy-package-protection";
const pagePath = `/products/${slug}`;

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Buudy Complete Package Protection | Transit & Theft Guarantee",
    };
  }

  const primaryImage = product.gallery[0]?.src || product.cartImage;
  const primaryImageAlt = product.gallery[0]?.alt || product.name;

  return {
    title: "Buudy Complete Package Protection | Transit & Theft Guarantee",
    description: product.seoDescription,
    keywords: [
      "Buudy Complete Package Protection",
      "Buudy package protection",
      "order transit insurance US",
      "delivery protection guarantee",
      "shipping insurance",
      "package theft protection",
      "courier loss protection",
      "safe delivery guarantee US",
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
      title: "Buudy Complete Package Protection | Transit & Theft Guarantee",
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
      title: "Buudy Complete Package Protection | Transit & Theft Guarantee",
      description: product.seoDescription,
      images: [primaryImage],
    },
  };
}

export default async function BuudyPackageProtectionProductRoute() {
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
