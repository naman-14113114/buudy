import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/ProductPage";
import { getProductBySlug, products } from "@/data/products";
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

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 86400;

export function generateStaticParams() {
  const baseParams = products.map((product) => ({
    slug: product.slug,
  }));
  const aliases = [
    { slug: "buudy-skincare-ebook" },
    { slug: "gift-card" },
    { slug: "package-protection" },
  ];
  return [...baseParams, ...aliases];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  const primaryImage = product.gallery[0]?.src || product.cartImage;
  const primaryImageAlt = product.gallery[0]?.alt || product.name;

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords:
      product.template === "mask"
        ? [
            "best LED face mask UK",
            "LED face mask UK",
            "red light therapy mask UK",
            "LED face mask for acne UK",
            "anti ageing LED mask",
            "LED mask with neck coverage",
            "near infrared LED face mask",
          ]
        : product.template === "torch"
        ? [
            "Buudy LED Torch",
            "buudy led torch UK",
            "red light torch UK",
            "handheld red light therapy",
            "near infrared torch",
          ]
        : product.template === "ipl"
        ? [
            "Buudy IPL Hair Removal Device",
            "IPL laser hair removal UK",
            "ice cooling IPL UK",
            "at home hair removal device",
            "painless hair removal UK",
          ]
        : product.slug === "skincare-ebook" || product.id === "buudy-skincare-ebook"
        ? [
            "clinical light masterclass ebook",
            "skincare ebook UK",
            "photobiomodulation guide",
            "LED face mask routine guide",
            "Buudy skincare PDF",
            "red light therapy guide",
          ]
        : product.slug === "buudy-gift-card" || product.id === "buudy-gift-card"
        ? [
            "Buudy digital gift card",
            "skincare gift voucher UK",
            "beauty gift card instant delivery",
            "LED mask gift certificate",
            "Buudy official gift card",
          ]
        : product.slug === "buudy-package-protection" || product.id === "buudy-package-protection"
        ? [
            "Buudy package protection",
            "order transit insurance UK",
            "delivery protection guarantee",
            "shipping insurance",
            "package theft protection",
          ]
        : [
            product.name,
            product.seoTitle,
            `${product.name} UK`,
            "Buudy UK",
          ],
    alternates: {
      canonical: `/products/${product.slug}`,
      languages: {
        "en-GB": `/products/${product.slug}`,
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
      title: product.seoTitle,
      description: product.description,
      url: absoluteUrl(`/products/${product.slug}`),
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
      title: product.seoTitle,
      description: product.seoDescription,
      images: [primaryImage],
    },
  };
}

export default async function ProductRoute({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productFaqs = product.template === "mask"
    ? [...ledMaskSeoFaqs, ...product.faqs]
    : product.faqs;

  return (
    <>
      {[
        organizationJsonLd(),
        websiteJsonLd(),
        productWebPageJsonLd(product),
        productJsonLd(product),
        breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: product.name, url: `/products/${product.slug}` },
        ]),
        faqJsonLd(productFaqs),
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
