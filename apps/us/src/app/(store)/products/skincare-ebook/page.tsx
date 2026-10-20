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

const slug = "skincare-ebook";
const pagePath = `/products/${slug}`;

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "The Clinical Light Masterclass E-Book (Digital PDF) | Buudy",
    };
  }

  const primaryImage = product.gallery[0]?.src || product.cartImage;
  const primaryImageAlt = product.gallery[0]?.alt || product.name;

  return {
    title: "The Clinical Light Masterclass E-Book (Digital PDF) | Buudy",
    description: product.seoDescription,
    keywords: [
      "The Clinical Light Masterclass E-Book",
      "clinical light masterclass ebook",
      "skincare ebook US",
      "photobiomodulation guide",
      "LED face mask routine guide",
      "Buudy skincare PDF",
      "red light therapy guide",
      "at-home light therapy masterclass",
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
      title: "The Clinical Light Masterclass E-Book (Digital PDF) | Buudy",
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
      title: "The Clinical Light Masterclass E-Book (Digital PDF) | Buudy",
      description: product.seoDescription,
      images: [primaryImage],
    },
  };
}

export default async function SkincareEbookProductRoute() {
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
