import type { Product } from "@/data/products";
import type { FAQItem } from "@/data/productSections";
import { absoluteUrl } from "@/lib/site";

export function productJsonLd(product: Product) {
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
        : "Handheld red light therapy device",
    sku: product.sku,
    mpn: product.sku,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.currency,
      price: (product.priceCents / 100).toFixed(2),
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Buudy",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: product.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "GB",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "GB",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 90,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
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
      availableLanguage: ["en-GB", "English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: "Buudy UK",
    url: absoluteUrl("/"),
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/products/buudy-led-mask")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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
      inLanguage: "en-GB",
      isPartOf: {
        "@id": `${absoluteUrl("/")}#website`,
      },
      about: [
        { "@type": "Thing", name: "best LED face mask UK" },
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
