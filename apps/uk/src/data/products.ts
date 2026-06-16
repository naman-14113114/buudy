import {
  productAsset,
  productMediaAsset,
  type ProductImage,
} from "@/lib/media";
import { market, type StoreCurrency } from "@/lib/market";
import {
  faqs,
  torchFaqs,
  torchWavelengths,
  type FAQItem,
  type Wavelength,
} from "./productSections";

export type ProductGift = {
  id: string;
  name: string;
  valueCents: number;
  image: string;
  label: string;
  href: string;
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
  template: "mask" | "torch";
  name: string;
  heroTitle: string;
  heroEmphasis: string;
  shortDescription: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  currency: StoreCurrency;
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
  highlights: string[];
  keyBenefits?: string[];
  differentiators?: string[];
  faqs: FAQItem[];
  wavelengths?: Wavelength[];
  badges: string[];
};

export const buudyMask: Product = {
  id: "buudy-led-mask",
  sku: "BUUDY-LED-MASK-7W",
  slug: "buudy-led-mask",
  template: "mask",
  name: "Buudy LED Mask",
  heroTitle: "Buudy LED",
  heroEmphasis: "Mask",
  shortDescription:
    "Salon-grade LED mask with the Premium Travel Box included for protected storage and travel.",
  description:
    "Salon-grade light therapy reimagined for UK homes. The Buudy LED Mask combines 192 high-density LEDs, 7 visible light colours plus a dedicated 830nm near-infrared mode, full face and neck coverage, cordless wearability, and a simple ritual built for consistent at-home skincare.",
  seoTitle: "Best LED Face Mask UK | Buudy Red Light Therapy Mask",
  seoDescription:
    "Shop the Buudy LED Face Mask in the UK: 192 LEDs, red and blue light therapy, 830nm near-infrared mode, face plus neck coverage, cordless design, 90-day returns, and free glow kit.",
  currency: market.currency,
  priceCents: 17900,
  compareAtCents: 44900,
  rating: 4.9,
  reviewCount: 16000,
  customerCount: "16,000+",
  promoCode: "GLOWKIT",
  promoLabel: "Glow kit promo applied",
  cartImage: productAsset("01-buudy-led-mask-front.webp"),
  gallery: [
    {
      src: productMediaAsset("Cleopatra-LED-Red-Light-Mask.webp"),
      alt: "Cleopatra LED Red Light Mask",
    },
    {
      src: productAsset("02-buudy-led-mask-side-profile.webp"),
      alt: "Buudy LED Mask side profile",
    },
    {
      src: productAsset("03-buudy-led-mask-anti-ageing-mode.webp"),
      alt: "Buudy LED Mask anti-ageing mode",
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
    {
      src: productAsset("09-buudy-led-mask-home-spa.webp"),
      alt: "Buudy LED Mask home spa",
    },
    {
      src: productAsset("10-buudy-led-mask-dermatologist-recommended.webp"),
      alt: "Buudy LED Mask dermatologist recommended",
    },
    {
      src: productAsset("11-buudy-led-mask-flexible-silicone.webp"),
      alt: "Buudy LED Mask flexible silicone",
    },
    {
      src: productAsset("13-buudy-led-mask-starter-kit.webp"),
      alt: "Buudy LED Mask starter kit",
    },
    {
      src: productMediaAsset("O3-w.webp"),
      alt: "Buudy LED Mask O3",
    },
    {
      src: productAsset("buudy_purple.jpeg"),
      alt: "Buudy LED Mask Purple",
    },
    {
      src: productAsset("01-buudy-led-mask-front.webp"),
      alt: "Buudy LED Mask front view",
    },
  ],
  gifts: [
    {
      id: "premium-travel-box",
      name: "Premium Travel Box",
      valueCents: 3900,
      image: productMediaAsset("ChatGPT Image May 31, 2026, 11_53_13 PM.png"),
      label: "Exclusive item",
      href: "/pages/premium-travel-box",
    },
    {
      id: "buudy-led-torch",
      name: "Buudy LED Torch",
      valueCents: 7000,
      image: productAsset("buudy-led-torch.jpg"),
      label: "Limited edition",
      href: "/pages/buudy-led-torch",
    },
    {
      id: "skincare-ebook",
      name: "Skincare E-Book",
      valueCents: 1900,
      image: productMediaAsset("free_guide-v2.webp"),
      label: "Digital copy",
      href: "/pages/skincare-guide",
    },
  ],
  specs: [
    { label: "Dimensions", value: "20cm x 29cm (7.87in x 11.42in)" },
    { label: "Number of LEDs", value: "192" },
    { label: "Intensity Level", value: "4 levels" },
    { label: "Light Modes", value: "7 visible colours + 830nm near-infrared" },
    { label: "Near-Infrared (NIR)", value: "830nm" },
    { label: "Battery Life", value: "Up to 12 sessions per charge (1500mAh)" },
    { label: "Use Type", value: "Portable cordless LED mask for household" },
    { label: "Power Source", value: "Rechargeable battery" },
    { label: "Irradiance", value: "32 mW/cm2" },
    { label: "Voltage", value: "220V / 110V" },
    { label: "Power", value: "6.8W" },
  ],
  included: [
    { quantity: "1x", label: "Premium Travel Box", tag: "Free gift" },
    { quantity: "1x", label: "7-colour + NIR LED Light Face Mask" },
    { quantity: "1x", label: "Charger with USB-C cable" },
    { quantity: "2x", label: "Eye Support" },
    { quantity: "1x", label: "User Manual" },
    { quantity: "1x", label: "Comprehensive Treatment Guide" },
    { quantity: "1x", label: "Buudy LED Torch", tag: "Free gift" },
  ],
  highlights: [
    "Stimulates collagen production",
    "Smooths skin & fine lines",
    "Full face and neck coverage",
    "Cordless, rechargeable, and easy to use",
  ],
  keyBenefits: [
    "Stimulate collagen production",
    "Assist with anti-ageing",
    "Reduce acne",
    "Aid in healing",
    "Address sun damage",
    "Cleanse your skin",
    "Minimize wrinkles and lines",
  ],
  differentiators: [
    "Buudy AI app for guided sessions",
    "7 wavelengths plus 830nm near-infrared",
    "Full-face and neck coverage",
    "Cordless, rechargeable design",
    "3-minute treatment routine",
    "Tap-to-cycle touch control",
    "Integrated eye protection",
  ],
  faqs,
  badges: [
    "Health Canada approved",
    "CE / FCC / ROHS",
    "90-day money back",
    "Dermatologist endorsed",
  ],
};

const torchAsset = (fileName: string) =>
  productAsset(fileName, "buudy-red-torch");

export const buudyRedTorch: Product = {
  id: "buudy-red-torch",
  sku: "1000020384558655",
  slug: "red-light-torch",
  template: "torch",
  name: "Buudy Red Torch",
  heroTitle: "Buudy Red",
  heroEmphasis: "Torch",
  shortDescription:
    "A compact blue, red, and near-infrared light therapy torch with 5 targeted wavelengths for skin health, body relief, and easy travel use.",
  description:
    "Blue and red light therapy device with 5 wavelengths: 460nm, 630nm, 660nm, 850nm, and 900nm. Designed for localized body relief, acne care, skin health, and portable at-home wellness rituals.",
  seoTitle: "Buudy Red Torch | 5 Wavelength Red Light Therapy Device",
  seoDescription:
    "Portable red and blue light therapy torch with 5 wavelengths, near infrared support, rechargeable battery, and targeted body and skin relief.",
  currency: market.currency,
  priceCents: 7000,
  compareAtCents: 17500,
  rating: 4.8,
  reviewCount: 16000,
  customerCount: "16,000+",
  promoCode: "TORCH60",
  promoLabel: "Red torch offer applied",
  cartImage: torchAsset("01-buudy-red-torch-main.png"),
  gallery: [
    {
      src: torchAsset("01-buudy-red-torch-main.png"),
      alt: "Buudy Red Torch handheld light therapy device",
    },
    {
      src: torchAsset("02-buudy-red-torch-animation.gif"),
      alt: "Buudy Red Torch light therapy in use",
      animated: true,
    },
    {
      src: torchAsset("03-buudy-red-torch-handheld.jpeg"),
      alt: "Buudy Red Torch compact handheld device",
    },
    {
      src: torchAsset("04-buudy-red-torch-wavelengths.jpeg"),
      alt: "Buudy Red Torch wavelength detail",
    },
    {
      src: torchAsset("05-buudy-red-torch-kit.jpeg"),
      alt: "Buudy Red Torch kit and accessories",
    },
    {
      src: torchAsset("06-buudy-red-torch-body-relief.jpeg"),
      alt: "Buudy Red Torch body relief use",
    },
    {
      src: torchAsset("07-buudy-red-torch-closeup.jpeg"),
      alt: "Buudy Red Torch LED close up",
    },
    {
      src: torchAsset("08-buudy-red-torch-travel.jpeg"),
      alt: "Buudy Red Torch travel-ready design",
    },
  ],
  gifts: [],
  specs: [
    { label: "Dimensions", value: "2.9cm x 12.5cm (0.95in x 4.92in)" },
    { label: "Wavelength", value: "460nm, 630nm, 660nm, 850nm, 900nm" },
    { label: "Intensity Level", value: "4 levels" },
    { label: "Power Source", value: "Rechargeable battery" },
    { label: "LED Count", value: "5 LEDs" },
    { label: "Light Color", value: "Blue, Red, Infrared" },
    { label: "Voltage", value: "220V / 110V" },
    { label: "Power", value: "3W" },
    { label: "Irradiance", value: "Surface 281mW/cm2, 4in 71mW/cm2" },
    { label: "Battery", value: "2200mA" },
    { label: "Warranty", value: "24 months" },
    { label: "Lifespan", value: "50,000+ hours" },
    { label: "Weight", value: "0.5kg" },
  ],
  included: [
    { quantity: "1x", label: "Carton Box" },
    { quantity: "1x", label: "Rechargeable Battery 18650" },
    { quantity: "1x", label: "Battery Charger" },
    { quantity: "1x", label: "USB cable" },
    { quantity: "1x", label: "User Manual" },
    { quantity: "1x", label: "Red Light Torch" },
    { quantity: "1x", label: "Sun Glasses" },
  ],
  highlights: [
    "Stimulate collagen production",
    "Smooths skin & fine lines",
    "Assist with anti-ageing and healing",
    "Enhances overall skin health",
    "Portable, safe, and easy to use",
    "Minimize wrinkles and lines",
  ],
  faqs: torchFaqs,
  wavelengths: torchWavelengths,
  badges: [
    "5 precision wavelengths",
    "Rechargeable battery",
    "Dual voltage",
    "24 month warranty",
  ],
};

export const products = [buudyMask, buudyRedTorch];

export const productsById = Object.fromEntries(
  products.map((product) => [product.id, product]),
) as Record<string, Product>;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return productsById[id];
}
