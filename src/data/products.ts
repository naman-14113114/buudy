import { productAsset, type ProductImage } from "@/lib/media";

export type ProductGift = {
  id: string;
  name: string;
  valueCents: number;
  image: string;
  label: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type IncludedItem = {
  quantity: string;
  label: string;
  tag?: string;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  currency: "USD";
  priceCents: number;
  compareAtCents: number;
  rating: number;
  reviewCount: number;
  customerCount: string;
  promoCode: string;
  promoLabel: string;
  cartImage: string;
  gallery: ProductImage[];
  gifts: ProductGift[];
  specs: ProductSpec[];
  included: IncludedItem[];
  badges: string[];
};

export const buudyMask: Product = {
  id: "buudy-led-mask",
  sku: "BUUDY-LED-MASK-7W",
  slug: "buudy-led-mask",
  name: "Buudy LED Mask",
  shortDescription:
    "Salon-grade light therapy with 192 high-density LEDs and full face plus neck coverage.",
  description:
    "Salon-grade light therapy reimagined for home. The Buudy LED Mask combines 192 high-density LEDs, 7 wavelengths, full face and neck coverage, cordless wearability, and a simple ritual built for consistent at-home skincare.",
  currency: "USD",
  priceCents: 19900,
  compareAtCents: 39900,
  rating: 4.9,
  reviewCount: 16000,
  customerCount: "16,000+",
  promoCode: "GLOWKIT",
  promoLabel: "Glow kit promo applied",
  cartImage: productAsset("01-buudy-led-mask-front.webp"),
  gallery: [
    {
      src: productAsset("01-buudy-led-mask-front.webp"),
      alt: "Buudy LED Mask front view",
    },
    {
      src: productAsset("02-buudy-led-mask-side-profile.webp"),
      alt: "Buudy LED Mask side profile",
    },
    {
      src: productAsset("03-buudy-led-mask-anti-ageing-mode.webp"),
      alt: "Buudy LED Mask anti-aging mode",
    },
    {
      src: productAsset("04-buudy-led-mask-blue-light-acne.webp"),
      alt: "Buudy LED Mask blue light acne mode",
    },
    {
      src: productAsset("05-buudy-led-mask-packaging.webp"),
      alt: "Buudy LED Mask packaging",
    },
    {
      src: productAsset("06-buudy-led-mask-results.webp"),
      alt: "Buudy LED Mask results",
    },
    {
      src: productAsset("07-buudy-led-mask-controller.webp"),
      alt: "Buudy LED Mask tap controller",
    },
    {
      src: productAsset("08-buudy-led-mask-lifestyle-use.webp"),
      alt: "Buudy LED Mask lifestyle use",
    },
  ],
  gifts: [
    {
      id: "premium-travel-box",
      name: "Premium Travel Box",
      valueCents: 3900,
      image: productAsset("premium-travel-box.png"),
      label: "Exclusive item",
    },
    {
      id: "buudy-led-torch",
      name: "Buudy LED Torch",
      valueCents: 7000,
      image: productAsset("buudy-led-torch.png"),
      label: "Limited edition",
    },
    {
      id: "skincare-ebook",
      name: "Skincare E-Book",
      valueCents: 1900,
      image: productAsset("skincare-ebook.png"),
      label: "Digital copy",
    },
  ],
  specs: [
    { label: "Dimensions", value: "20cm x 29cm (7.87in x 11.42in)" },
    { label: "Number of LEDs", value: "192" },
    { label: "Light Colors", value: "7-color LED mask" },
    { label: "Battery Life", value: "Up to 12 sessions per charge (1500mAh)" },
    { label: "Use Type", value: "Portable cordless LED mask for household" },
    { label: "Power Source", value: "Rechargeable battery" },
    { label: "Irradiance", value: "32 mW/cm2" },
    { label: "Voltage", value: "220V / 110V" },
    { label: "Power", value: "6.8W" },
  ],
  included: [
    { quantity: "1x", label: "Premium Travel Box", tag: "Free gift" },
    { quantity: "1x", label: "7-color LED Light Face Mask" },
    { quantity: "1x", label: "Charger with USB-C cable" },
    { quantity: "2x", label: "Eye Support" },
    { quantity: "1x", label: "User Manual" },
    { quantity: "1x", label: "Comprehensive Treatment Guide" },
    { quantity: "1x", label: "Buudy LED Torch", tag: "Free gift" },
  ],
  badges: [
    "Health Canada approved",
    "CE / FCC / ROHS",
    "90-day money back",
    "Dermatologist endorsed",
  ],
};

export const products = [buudyMask];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
