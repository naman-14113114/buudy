import { productAsset, type ProductImage } from "@/lib/media";
import { faqs, torchFaqs, torchWavelengths, type FAQItem, type Wavelength } from "./productSections";

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
  template: "mask" | "torch";
  name: string;
  heroTitle: string;
  heroEmphasis: string;
  shortDescription: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
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
  highlights: string[];
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
    "Salon-grade light therapy with 192 high-density LEDs and full face plus neck coverage.",
  description:
    "Salon-grade light therapy reimagined for home. The Buudy LED Mask combines 192 high-density LEDs, 7 wavelengths, full face and neck coverage, cordless wearability, and a simple ritual built for consistent at-home skincare.",
  seoTitle: "Buudy LED Mask | 7 Wavelength LED Face and Neck Mask",
  seoDescription:
    "Salon-grade LED light therapy for home with 192 LEDs, 7 wavelengths, face and neck coverage, cordless design, and free gifts.",
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
  ],
  gifts: [
    {
      id: "premium-travel-box",
      name: "Premium Travel Box",
      valueCents: 3900,
      image: productAsset("premium-travel-box.jpg"),
      label: "Exclusive item",
    },
    {
      id: "buudy-led-torch",
      name: "Buudy LED Torch",
      valueCents: 7000,
      image: productAsset("buudy-led-torch.jpg"),
      label: "Limited edition",
    },
    {
      id: "skincare-ebook",
      name: "Skincare E-Book",
      valueCents: 1900,
      image: productAsset("skincare-ebook.jpg"),
      label: "Digital copy",
    },
  ],
  specs: [
    { label: "Dimensions", value: "20cm x 29cm (7.87in x 11.42in)" },
    { label: "Number of LEDs", value: "192" },
    { label: "Light Colors", value: "7-color LED mask" },
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
    { quantity: "1x", label: "7-color LED Light Face Mask" },
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
  faqs,
  badges: [
    "Health Canada approved",
    "CE / FCC / ROHS",
    "90-day money back",
    "Dermatologist endorsed",
  ],
};

const torchAsset = (fileName: string) => productAsset(fileName, "buudy-red-torch");

export const buudyRedTorch: Product = {
  id: "buudy-red-torch",
  sku: "1000020018633106",
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
  currency: "USD",
  priceCents: 9139,
  compareAtCents: 22847,
  rating: 4.9,
  reviewCount: 58,
  customerCount: "58+",
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
    "Assist with anti-aging and healing",
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
