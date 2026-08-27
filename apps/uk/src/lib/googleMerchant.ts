import { buudyMask, buudyRedTorch } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

export type MerchantProductDetail = {
  sectionName: string;
  attributeName: string;
  attributeValue: string;
};

export type MerchantProduct = {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  additionalImageLinks: string[];
  availability: "in_stock" | "out_of_stock";
  price: string;
  brand: string;
  googleProductCategory: string;
  productType: string;
  productHighlights: string[];
  productDetails: MerchantProductDetail[];
  customLabels: [string, string, string, string, string];
};

const googleProductCategory = "Health & Beauty > Healthcare > Light Therapy Lamps";

function priceFromCents(priceCents: number) {
  return `${(priceCents / 100).toFixed(2)} GBP`;
}

function productImage(path: string) {
  return absoluteUrl(path);
}

/**
 * Merchant-facing copy is intentionally factual and separate from marketing copy.
 * Google uses this source for both free listings and Shopping ads, so it must stay
 * in lockstep with the purchasable UK product data above.
 */
export const googleMerchantProducts: MerchantProduct[] = [
  {
    id: "buudy-led-face-mask-uk",
    title: "Buudy 7 Colour LED Face Mask with 830 nm Near-Infrared",
    description:
      "Buudy 7 Colour LED Face Mask is a flexible, wearable device for adult at-home skincare routines. It uses seven visible light colours alongside a dedicated 830 nm near-infrared mode. The close-fitting mask supports a hands-free routine and comes with a USB-C charging cable, eye supports, a user manual and a comprehensive treatment guide.",
    link: absoluteUrl("/products/buudy-led-mask"),
    imageLink: productImage(
      "/images/products/buudy-led-mask/01-buudy-led-mask-front.webp",
    ),
    additionalImageLinks: [
      productImage("/images/products/buudy-led-mask/02-buudy-led-mask-side-profile.webp"),
      productImage("/images/products/buudy-led-mask/05-buudy-led-mask-packaging.webp"),
      productImage("/images/products/buudy-led-mask/07-buudy-led-mask-controller.webp"),
      productImage("/images/products/buudy-led-mask/08-buudy-led-mask-lifestyle-use.webp"),
      productImage("/images/products/buudy-led-mask/11-buudy-led-mask-flexible-silicone.webp"),
    ],
    availability: "in_stock",
    price: priceFromCents(buudyMask.priceCents),
    brand: "Buudy",
    googleProductCategory,
    productType: "Beauty & Personal Care > Skincare Devices > LED Face Masks",
    productHighlights: [
      "Full face and neck coverage",
      "Cordless rechargeable use",
      "Tap-to-cycle touch controls",
      "Four adjustable intensity levels",
      "Up to 12 sessions per charge",
      "192 high-density LEDs",
    ],
    productDetails: [
      {
        sectionName: "Technical specifications",
        attributeName: "Dimensions",
        attributeValue: "20 cm x 29 cm",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Battery capacity",
        attributeValue: "1500 mAh",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Irradiance",
        attributeValue: "32 mW/cm2",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Power",
        attributeValue: "6.8 W",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Voltage",
        attributeValue: "110 V / 220 V",
      },
    ],
    customLabels: ["hero-product", "price-100-plus", "uk", "light-therapy", "free-shipping"],
  },
  {
    id: "buudy-7-colour-led-mask-uk",
    title: "Buudy 7 Colour LED Light Therapy Face Mask - Red Light Therapy & 830nm NIR - Face & Neck Piece",
    description:
      "Buudy 7 Colour LED Face Mask delivers clinical-grade LED light therapy for home use. Features 7 visible light wavelengths plus 830 nm Near-Infrared (NIR) mode to stimulate collagen, reduce wrinkles, and clear acne. Full face and neck coverage with wireless tap controls. Includes USB-C charger, eye protection, and free £70 glow kit.",
    link: absoluteUrl("/products/buudy-7-colour-led-face-mask"),
    imageLink: productImage(
      "/images/products/buudy-led-mask/01-buudy-led-mask-front.webp",
    ),
    additionalImageLinks: [
      productImage("/images/products/buudy-led-mask/02-buudy-led-mask-side-profile.webp"),
      productImage("/images/products/buudy-led-mask/05-buudy-led-mask-packaging.webp"),
      productImage("/images/products/buudy-led-mask/07-buudy-led-mask-controller.webp"),
      productImage("/images/products/buudy-led-mask/08-buudy-led-mask-lifestyle-use.webp"),
      productImage("/images/products/buudy-led-mask/11-buudy-led-mask-flexible-silicone.webp"),
    ],
    availability: "in_stock",
    price: priceFromCents(buudyMask.priceCents),
    brand: "Buudy",
    googleProductCategory,
    productType: "Health & Beauty > Personal Care > Light Therapy Devices",
    productHighlights: [
      "7 targeted light colours + 830nm NIR",
      "Complete face and neck collar coverage",
      "Cordless, rechargeable, tap-to-cycle control",
      "Four adjustable intensity levels",
      "192 high-density LEDs",
      "90-day money back guarantee",
    ],
    productDetails: [
      {
        sectionName: "Technical specifications",
        attributeName: "Dimensions",
        attributeValue: "20 cm x 29 cm",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Battery capacity",
        attributeValue: "1500 mAh",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Irradiance",
        attributeValue: "32 mW/cm2",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Power",
        attributeValue: "6.8 W",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Voltage",
        attributeValue: "110 V / 220 V",
      },
    ],
    customLabels: ["best-led-mask", "generic-shopping", "uk", "light-therapy", "free-shipping"],
  },
  {
    id: "buudy-red-light-torch-uk",
    title: "Buudy Handheld Red Light Therapy Torch",
    description:
      "Buudy Red Light Therapy Torch is a compact handheld device for targeted adult at-home skincare and wellness routines. It combines red and near-infrared light at 630 nm, 660 nm and 850 nm in a portable format. The torch is supplied with a USB charging cable and wrist strap for easy storage and travel.",
    link: absoluteUrl("/products/red-light-torch"),
    imageLink: productImage(
      "/images/products/buudy-red-torch/07-buudy-red-torch-closeup.jpeg",
    ),
    additionalImageLinks: [
      productImage("/images/products/buudy-red-torch/01-buudy-red-torch-main.png"),
      productImage("/images/products/buudy-red-torch/03-buudy-red-torch-handheld.jpeg"),
      productImage("/images/products/buudy-red-torch/05-buudy-red-torch-kit.jpeg"),
      productImage("/images/products/buudy-red-torch/06-buudy-red-torch-body-relief.jpeg"),
      productImage("/images/products/buudy-red-torch/08-buudy-red-torch-travel.jpeg"),
    ],
    availability: "in_stock",
    price: priceFromCents(buudyRedTorch.priceCents),
    brand: "Buudy",
    googleProductCategory,
    productType: "Health & Beauty > Light Therapy Devices > Handheld Red Light Devices",
    productHighlights: [
      "Compact handheld aluminium design",
      "Four adjustable intensity levels",
      "Rechargeable battery",
      "USB charging cable and wrist strap included",
      "Dual-voltage 110 V / 220 V operation",
    ],
    productDetails: [
      {
        sectionName: "Technical specifications",
        attributeName: "Wavelength configuration",
        attributeValue: "630 nm, 660 nm and 850 nm",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "LED count",
        attributeValue: "5 LEDs",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Battery capacity",
        attributeValue: "2200 mAh",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Power",
        attributeValue: "5 W",
      },
      {
        sectionName: "Technical specifications",
        attributeName: "Weight",
        attributeValue: "200 g",
      },
    ],
    customLabels: ["accessory", "price-under-100", "uk", "light-therapy", "free-shipping"],
  },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function googleTag(name: string, value: string) {
  return `      <g:${name}>${escapeXml(value)}</g:${name}>`;
}

function validateMerchantProducts(products: MerchantProduct[]) {
  const ids = new Set<string>();

  for (const product of products) {
    if (ids.has(product.id)) {
      throw new Error(`Duplicate Google Merchant product ID: ${product.id}`);
    }
    ids.add(product.id);

    if (product.title.length > 150 || product.title.length < 20) {
      throw new Error(`Google Merchant title length is invalid for ${product.id}`);
    }
    if (product.description.length < 150 || product.description.length > 5000) {
      throw new Error(`Google Merchant description length is invalid for ${product.id}`);
    }
    if (product.productHighlights.length < 2 || product.productHighlights.length > 100) {
      throw new Error(`Google Merchant highlight count is invalid for ${product.id}`);
    }
    if (!product.imageLink.startsWith("https://")) {
      throw new Error(`Google Merchant image URL must be HTTPS for ${product.id}`);
    }
  }
}

export function buildGoogleMerchantXml(products = googleMerchantProducts) {
  validateMerchantProducts(products);

  const items = products
    .map((product) => {
      const details = product.productDetails.flatMap((detail) => [
        "      <g:product_detail>",
        googleTag("section_name", detail.sectionName),
        googleTag("attribute_name", detail.attributeName),
        googleTag("attribute_value", detail.attributeValue),
        "      </g:product_detail>",
      ]);
      const labels = product.customLabels.map((label, index) =>
        googleTag(`custom_label_${index}`, label),
      );

      return [
        "    <item>",
        googleTag("id", product.id),
        googleTag("title", product.title),
        googleTag("description", product.description),
        googleTag("link", product.link),
        googleTag("image_link", product.imageLink),
        ...product.additionalImageLinks.map((url) => googleTag("additional_image_link", url)),
        googleTag("availability", product.availability),
        googleTag("price", product.price),
        googleTag("condition", "new"),
        googleTag("brand", product.brand),
        // Do not invent a GTIN or MPN. Replace this only after a valid identifier is assigned.
        googleTag("identifier_exists", "no"),
        googleTag("google_product_category", product.googleProductCategory),
        googleTag("product_type", product.productType),
        ...product.productHighlights.map((highlight) => googleTag("product_highlight", highlight)),
        ...details,
        ...labels,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Buudy UK Product Feed</title>
    <link>${escapeXml(absoluteUrl("/"))}</link>
    <description>Google Merchant Center product data for Buudy UK.</description>
${items}
  </channel>
</rss>`;
}
