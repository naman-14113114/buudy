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
        : product.template === "serum"
        ? product.id.includes("prebiotic") || product.slug.includes("prebiotic") || product.slug.includes("noni")
          ? [
              "prebiotics jelly serum UK",
              "bioactive prebiotics serum",
              "microbiome face serum UK",
              "best serum for skin barrier UK",
              "Lactobacillus ferment lysate serum",
              "prebiotic serum for LED mask",
              "hydrating jelly serum UK",
              "Buudy prebiotic serum",
              "ECOCERT organic prebiotic serum",
              "lightweight barrier serum UK",
              "Selfnamed prebiotic jelly serum",
              "Noni balancing serum UK",
            ]
          : product.id.includes("peptide") || product.slug.includes("peptide") || product.slug.includes("collagen")
          ? [
              "peptide serum UK",
              "peptide anti ageing serum UK",
              "Hexapeptide-11 serum UK",
              "best peptide serum for LED mask",
              "collagen boost peptide serum",
              "post light therapy peptide serum",
              "anti ageing peptide serum UK",
              "Buudy peptide serum",
              "ECOCERT organic peptide serum",
              "firming facial peptide serum",
              "Selfnamed peptide serum",
            ]
          : [
              "hyaluronic acid serum UK",
              "best hyaluronic acid serum for LED mask",
              "LED face mask serum UK",
              "double hydration boost gel UK",
              "water based hyaluronic acid gel",
              "Buudy hyaluronic acid 2% B5",
              "phototherapy hyaluronic serum",
              "light activating serum UK",
              "ECOCERT organic hyaluronic serum",
              "non sticky hydration serum UK",
            ]
        : product.template === "cleanser" || product.slug.includes("face-wash") || product.slug.includes("purifying")
        ? [
            "blemish purifying face wash UK",
            "acne purifying face wash UK",
            "gentle face wash for blemishes UK",
            "mate leaf face wash",
            "iceland moss cleanser",
            "juniper callus cleanser UK",
            "salicylic acid cleanser alternative",
            "LED face mask cleanser UK",
            "blue light therapy cleanser UK",
            "ECOCERT organic face wash",
            "sulphate free acne cleanser UK",
            "Buudy blemish purifying face wash",
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
      <ProductPage
        product={product}
        isHalloween={false}
        isEarlyBlackFriday={true}
        hyaluronicEditorial={slug === "buudy-light-activating-hyaluronic-serum"}
      />
    </>
  );
}
