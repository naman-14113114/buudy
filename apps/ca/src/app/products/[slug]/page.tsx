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
    { slug: "double-hydration-boost-gel" },
    { slug: "buudy-double-hydration-boost-gel" },
    { slug: "buudy-hyaluronic-serum" },
    { slug: "peptide-serum" },
    { slug: "buudy-peptide-serum" },
    { slug: "buudy-collagen-boost-serum" },
    { slug: "collagen-boost-serum" },
    { slug: "buudy-peptide-anti-ageing-serum" },
    { slug: "buudy-peptide-anti-aging-serum" },
    { slug: "blemish-purifying-face-wash" },
    { slug: "buudy-blemish-purifying-face-wash" },
    { slug: "acne-purifying-face-wash" },
    { slug: "buudy-acne-purifying-face-wash" },
    { slug: "buudy-face-wash" },
    { slug: "bioactive-prebiotics-jelly-serum" },
    { slug: "buudy-bioactive-prebiotics-jelly-serum" },
    { slug: "buudy-bioactive-prebiotics-serum" },
    { slug: "buudy-prebiotics-serum" },
    { slug: "prebiotics-jelly-serum" },
    { slug: "buudy-noni-serum" },
    { slug: "noni-serum" },
    { slug: "hydrating-serum" },
    { slug: "buudy-deep-hydrating-serum" },
    { slug: "deep-hydrating-serum" },
    { slug: "peptide-ageless-am-pm-cream" },
    { slug: "buudy-peptide-cream" },
    { slug: "peptide-cream" },
    { slug: "peptide-age-defying-eye-cream" },
    { slug: "buudy-peptide-eye-cream" },
    { slug: "peptide-eye-cream" },
    { slug: "aha-peeling-concentrate" },
    { slug: "buudy-aha-peel" },
    { slug: "aha-peel" },
    { slug: "ultimate-hydration-duo" },
    { slug: "anti-age-peptide-gift-box" },
    { slug: "peptide-collection-box" },
    { slug: "ultimate-renewal-collection-box" },
    { slug: "the-ultimate-renewal-collection" },
    { slug: "buudy-retinol-alternative-repair-serum" },
    { slug: "buudy-retinol-alternative" },
    { slug: "retinol-alternative" },
    { slug: "retinol-alternative-serum" },
    { slug: "buudy-clarifying-niacinamide-gel" },
    { slug: "buudy-niacinamide-gel" },
    { slug: "niacinamide-gel" },
    { slug: "buudy-blemish-defence-niacinamide-gel" },
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
            "Best LED Face Mask Canada",
            "LED face mask Canada",
            "red light therapy mask Canada",
            "LED face mask for acne Canada",
            "anti ageing LED mask",
            "LED mask with neck coverage",
            "near infrared LED face mask",
          ]
        : product.template === "ipl"
          ? [
              "IPL hair removal device Canada",
              "laser hair removal Canada",
              "painless IPL hair removal",
              "at home laser hair removal",
            ]
          : product.slug === "skincare-ebook" || product.id === "buudy-skincare-ebook"
            ? [
                "clinical light masterclass ebook",
                "skincare ebook Canada",
                "photobiomodulation guide",
                "LED face mask routine guide",
                "Buudy skincare PDF",
                "red light therapy guide",
              ]
            : product.slug === "buudy-gift-card" || product.id === "buudy-gift-card"
              ? [
                  "Buudy digital gift card",
                  "skincare gift voucher Canada",
                  "beauty gift card instant delivery",
                  "LED mask gift certificate",
                  "Buudy official gift card",
                ]
              : product.slug === "buudy-package-protection" || product.id === "buudy-package-protection"
                ? [
                    "Buudy package protection",
                    "order transit insurance Canada",
                    "delivery protection guarantee",
                    "shipping insurance",
                    "package theft protection",
                  ]
                : [
                    "red light torch Canada",
                    "handheld red light therapy",
                    "near infrared torch",
                    "blue red light therapy device",
                  ],
    alternates: {
      canonical: `/products/${product.slug}`,
      languages: {
        "en-CA": `/products/${product.slug}`,
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
      description: product.seoDescription,
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
