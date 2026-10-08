import type { Product } from "@/data/products";
import type { FAQItem } from "@/data/productSections";
import { absoluteUrl } from "@/lib/site";
import { market } from "@/lib/market";
import type { XpageQuote } from '@/lib/xpage-checkout';

export function productJsonLd(product: Product, nativeQuote?: XpageQuote | null) {
  const productUrl = absoluteUrl(`/products/${product.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    image: product.gallery.map((image) => absoluteUrl(image.src)),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Buudy",
    },
    category:
      product.template === "mask"
        ? "LED light therapy face mask"
        : product.template === "ipl"
          ? "IPL hair removal device"
          : "Handheld red light therapy device",
    sku: product.sku,
    ...(product.template === 'mask' && !nativeQuote ? {} : { offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: nativeQuote?.currency || product.currency,
      price: nativeQuote ? nativeQuote.unitPrice.toFixed(2) : (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Buudy",
      },
    }}),
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function productWebPageJsonLd(product: Product) {
  const productUrl = absoluteUrl(`/products/${product.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${productUrl}#webpage`,
    url: productUrl,
    name: product.seoTitle,
    description: product.seoDescription,
    inLanguage: market.locale,
    isPartOf: {
      "@id": `${absoluteUrl("/")}#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(product.gallery[0].src),
    },
    mainEntity: {
      "@id": `${productUrl}#product`,
    },
    audience: {
      "@type": "Audience",
      audienceType: "US skincare shoppers comparing LED face masks",
    },
    about: [
      { "@type": "Thing", name: "Best LED Face Mask US" },
      { "@type": "Thing", name: "red light therapy mask" },
      { "@type": "Thing", name: "blue light acne routine" },
      { "@type": "Thing", name: "anti-ageing skincare device" },
      { "@type": "Thing", name: "near-infrared light therapy" },
    ],
  };
}

export function faqJsonLd(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: "Buudy",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/media/products/buudy-led-mask/images/buudy_footer_logo.png"),
    sameAs: [
      "https://www.instagram.com/buudy_com",
      "https://www.facebook.com/profile.php?id=61565686185222",
      "https://www.youtube.com/@buudy-com",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@buudy.com",
      availableLanguage: [market.locale, "English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: "Buudy",
    url: absoluteUrl("/"),
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

export function guidePageJsonLd({
  title,
  description,
  url,
  faqs,
}: {
  title: string;
  description: string;
  url: string;
  faqs: FAQItem[];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${absoluteUrl(url)}#webpage`,
      name: title,
      description,
      url: absoluteUrl(url),
      inLanguage: market.locale,
      isPartOf: {
        "@id": `${absoluteUrl("/")}#website`,
      },
      about: [
        { "@type": "Thing", name: "Best LED Face Mask US" },
        { "@type": "Thing", name: "red light therapy mask" },
        { "@type": "Thing", name: "blue light therapy for acne routines" },
        { "@type": "Thing", name: "near-infrared skincare device" },
      ],
      mainEntity: {
        "@id": `${absoluteUrl("/products/buudy-led-mask")}#product`,
      },
    },
    faqJsonLd(faqs),
  ];
}
