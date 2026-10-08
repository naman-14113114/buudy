import {
  productAsset,
  productMediaAsset,
  type ProductImage,
} from "@/lib/media";
import { market, type StoreCurrency } from "@/lib/market";
import {
  faqs,
  standardMaskFaqs,
  buudyLedMaskFaqs,
  torchFaqs,
  iplFaqs,
  torchWavelengths,
  type FAQItem,
  type Wavelength,
} from "./productSections";

export { standardMaskFaqs, buudyLedMaskFaqs };

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
  template: "mask" | "torch" | "ipl";
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

export const fullLedMaskGallery: ProductImage[] = [
  {
    src: productAsset("buudy-7-colour-led-mask-ce-certified-red-light-therapy-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask CE certified for red light therapy and skin rejuvenation UK",
  },
  {
    src: productAsset("buudy-7-colour-led-mask-cleopatra-edition-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask worn at home in red light therapy mode for anti-ageing in the UK",
    badge: {
      title: "FULL FACE & NECK\nCOVERAGE",
      sub: "Targeted firming & smoothing\nfor jawline & neck",
      position: "bottom-right",
      theme: "white",
    },
  },
  {
    src: productMediaAsset(
      "buudy-7-colour-led-mask-7-light-modes-showcase-uk.mp4",
      "buudy-led-mask",
      "videos",
    ),
    alt: "Buudy 7 Colour LED Face Mask 7 clinical light wavelengths and modes video showcase UK",
    badge: {
      title: "7 CLINICAL\nWAVELENGTHS",
      sub: "Complete spectrum for\nrejuvenation, clarity & glow",
      position: "bottom-left",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-with-free-red-light-torch-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask with included complimentary Red Light Torch treatment UK",
    badge: {
      title: "FREE BUUDY\nLED TORCH",
      sub: "£70 targeted red light device\nincluded free with your order",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy_purple.jpeg"),
    alt: "Buudy 7 Colour LED Face Mask with 192 high-density clinical LEDs across face and neck UK",
    badge: {
      title: "192 HIGH-DENSITY\nCLINICAL LEDS",
      sub: "Maximum coverage & optical\npower across face & neck",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("02-buudy-led-mask-side-profile.webp"),
    alt: "Buudy LED Mask side profile with built-in touch controls and cordless design",
    badge: {
      title: "100% CORDLESS &\nPORTABLE",
      sub: "Built-in touch controls on mask —\nno remote needed to carry or charge",
      position: "bottom-left",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-skin-rejuvenation-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask dermatologist approved for full skin rejuvenation UK",
    badge: {
      title: "DERMATOLOGIST\nRECOMMENDED",
      sub: "Trusted by skincare specialists\nfor everyday at-home routines",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("07-buudy-led-mask-controller.webp"),
    alt: "Buudy LED Mask tap controller",
    badge: {
      title: "SMART BUUDY\nAPP COMPANION",
      sub: "Personalised guided routines\n& progress tracking",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("09-buudy-led-mask-home-spa.webp"),
    alt: "Buudy LED Mask home spa",
  },
  {
    src: productAsset("05-buudy-led-mask-packaging.webp"),
    alt: "Buudy LED Mask packaging",
    badge: {
      title: "830NM DEEP NEAR\nINFRARED LIGHT",
      sub: "Deep dermal penetration\nboosts collagen & elasticity",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("04-buudy-led-mask-blue-light-acne.webp"),
    alt: "Buudy LED Mask blue light acne mode",
    badge: {
      title: "415NM TARGETED\nBLUE LIGHT",
      sub: "Purifies active blemishes\n& eliminates acne bacteria",
      position: "bottom-left",
      theme: "white",
    },
  },
  {
    src: productMediaAsset("Cleopatra-LED-Red-Light-Mask.webp"),
    alt: "Buudy LED Mask red light therapy mode for anti-ageing and collagen stimulation",
    badge: {
      title: "633NM RED LIGHT\nTHERAPY",
      sub: "Stimulates collagen production\n& reduces fine lines and wrinkles",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-uk-anti-ageing-red-light-therapy.webp"),
    alt: "Buudy 7 Colour LED Mask purple light mode for skin rejuvenation in the UK",
    badge: {
      title: "390NM PURPLE\nLIGHT THERAPY",
      sub: "Combines red & blue wavelengths\nfor deep repair & blemish control",
      position: "bottom-left",
      theme: "white",
    },
  },
  {
    src: productAsset("03-buudy-led-mask-anti-ageing-mode.webp"),
    alt: "Buudy LED Mask green light mode for dark spots and even skin tone",
    badge: {
      title: "525NM GREEN LIGHT\nTHERAPY",
      sub: "Fades dark spots, calms\nredness & evens skin tone",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("06-buudy-led-mask-results.webp"),
    alt: "Buudy LED Mask yellow light mode for balanced skin texture and tone",
    badge: {
      title: "590NM YELLOW\nLIGHT THERAPY",
      sub: "Balances skin texture, soothes\nsensitivity & boosts radiance",
      position: "top-right",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-cyan-light-therapy-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask white light therapy mode for accelerating skin metabolism and renewal UK",
    badge: {
      title: "510NM WHITE\nLIGHT THERAPY",
      sub: "Accelerates skin metabolism,\ntightens skin & boosts cellular repair",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("13-buudy-led-mask-starter-kit.webp"),
    alt: "Buudy LED Mask starter kit in cyan light therapy mode for calming capillaries and redness",
    badge: {
      title: "490NM CYAN\nLIGHT THERAPY",
      sub: "Calms swollen capillaries,\nreduces inflammation & redness",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("08-buudy-led-mask-lifestyle-use.webp"),
    alt: "Buudy LED Mask easy to use 3 minute daily skincare session",
    badge: {
      title: "FAST 3-MIN\nDAILY SESSIONS",
      sub: "Quick, effortless & easy to use —\njust 3 minutes a day for visible results",
      position: "bottom-right",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-unisex-skincare-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask unisex skincare treatment for men and women UK",
    badge: {
      title: "UNIVERSAL UNISEX\nDESIGN",
      sub: "Ergonomic fit designed for all\nskin types, both men & women",
      position: "bottom-right",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-lifestyle-red-light-therapy-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask lifestyle red light therapy routine in the UK",
  },
  {
    src: productAsset("11-buudy-led-mask-flexible-silicone.webp"),
    alt: "Buudy LED Mask flexible silicone",
  },
  {
    src: productMediaAsset("O3-w.webp"),
    alt: "Buudy LED Mask O3",
  },
  {
    src: productAsset("01-buudy-led-mask-front.webp"),
    alt: "Buudy LED Mask front view",
  },
];

export const buudyLedMaskGallery: ProductImage[] = [
  {
    src: productAsset("buudy-7-colour-led-mask-cleopatra-edition-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask worn at home in red light therapy mode for anti-ageing in the UK",
    badge: {
      title: "FULL FACE & NECK\nCOVERAGE",
      sub: "Targeted firming & smoothing\nfor jawline & neck",
      position: "bottom-right",
      theme: "white",
    },
  },
  {
    src: productMediaAsset(
      "buudy-7-colour-led-mask-7-light-modes-showcase-uk.mp4",
      "buudy-led-mask",
      "videos",
    ),
    alt: "Buudy 7 Colour LED Face Mask 7 clinical light wavelengths and modes video showcase UK",
    badge: {
      title: "7 CLINICAL\nWAVELENGTHS",
      sub: "Complete spectrum for\nrejuvenation, clarity & glow",
      position: "bottom-left",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-with-free-red-light-torch-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask with included complimentary Red Light Torch treatment UK",
    badge: {
      title: "FREE BUUDY\nLED TORCH",
      sub: "£70 targeted red light device\nincluded free with your order",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy_purple.jpeg"),
    alt: "Buudy 7 Colour LED Face Mask with 192 high-density clinical LEDs across face and neck UK",
    badge: {
      title: "192 HIGH-DENSITY\nCLINICAL LEDS",
      sub: "Maximum coverage & optical\npower across face & neck",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("02-buudy-led-mask-side-profile.webp"),
    alt: "Buudy LED Mask side profile with built-in touch controls and cordless design",
    badge: {
      title: "100% CORDLESS &\nPORTABLE",
      sub: "Built-in touch controls on mask —\nno remote needed to carry or charge",
      position: "bottom-left",
      theme: "white",
    },
  },
  {
    src: productAsset("07-buudy-led-mask-controller.webp"),
    alt: "Buudy LED Mask tap controller",
    badge: {
      title: "SMART BUUDY\nAPP COMPANION",
      sub: "Personalised guided routines\n& progress tracking",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("09-buudy-led-mask-home-spa.webp"),
    alt: "Buudy LED Mask home spa",
  },
  {
    src: productAsset("05-buudy-led-mask-packaging.webp"),
    alt: "Buudy LED Mask packaging",
    badge: {
      title: "830NM DEEP NEAR\nINFRARED LIGHT",
      sub: "Deep dermal penetration\nboosts collagen & elasticity",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("04-buudy-led-mask-blue-light-acne.webp"),
    alt: "Buudy LED Mask blue light acne mode",
    badge: {
      title: "415NM TARGETED\nBLUE LIGHT",
      sub: "Purifies active blemishes\n& eliminates acne bacteria",
      position: "bottom-left",
      theme: "white",
    },
  },
  {
    src: productMediaAsset("Cleopatra-LED-Red-Light-Mask.webp"),
    alt: "Buudy LED Mask red light therapy mode for anti-ageing and collagen stimulation",
    badge: {
      title: "633NM RED LIGHT\nTHERAPY",
      sub: "Stimulates collagen production\n& reduces fine lines and wrinkles",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-purple-light-therapy-cleopatra-uk.jpg"),
    alt: "Buudy 7 Colour LED Mask purple light therapy mode for skin rejuvenation in the UK",
    badge: {
      title: "390NM PURPLE\nLIGHT THERAPY",
      sub: "Combines red & blue wavelengths\nfor deep repair & blemish control",
      position: "bottom-left",
      theme: "white",
    },
  },
  {
    src: productAsset("03-buudy-led-mask-anti-ageing-mode.webp"),
    alt: "Buudy LED Mask green light mode for dark spots and even skin tone",
    badge: {
      title: "525NM GREEN LIGHT\nTHERAPY",
      sub: "Fades dark spots, calms\nredness & evens skin tone",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("06-buudy-led-mask-results.webp"),
    alt: "Buudy LED Mask yellow light mode for balanced skin texture and tone",
    badge: {
      title: "590NM YELLOW\nLIGHT THERAPY",
      sub: "Balances skin texture, soothes\nsensitivity & boosts radiance",
      position: "top-right",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-cyan-light-therapy-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask white light therapy mode for accelerating skin metabolism and renewal UK",
    badge: {
      title: "510NM WHITE\nLIGHT THERAPY",
      sub: "Accelerates skin metabolism,\ntightens skin & boosts cellular repair",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("13-buudy-led-mask-starter-kit.webp"),
    alt: "Buudy LED Mask starter kit in cyan light therapy mode for calming capillaries and redness",
    badge: {
      title: "490NM CYAN\nLIGHT THERAPY",
      sub: "Calms swollen capillaries,\nreduces inflammation & redness",
      position: "top-left",
      theme: "white",
    },
  },
  {
    src: productAsset("08-buudy-led-mask-lifestyle-use.webp"),
    alt: "Buudy LED Mask easy to use 3 minute daily skincare session",
    badge: {
      title: "FAST 3-MIN\nDAILY SESSIONS",
      sub: "Quick, effortless & easy to use —\njust 3 minutes a day for visible results",
      position: "bottom-right",
      theme: "white",
    },
  },
  {
    src: productAsset("buudy-7-colour-led-mask-unisex-skincare-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask unisex skincare treatment for men and women UK",
    badge: {
      title: "UNIVERSAL UNISEX\nDESIGN",
      sub: "Ergonomic fit designed for all\nskin types, both men & women",
      position: "bottom-right",
      theme: "white",
    },
  },
  {
    src: productAsset("11-buudy-led-mask-flexible-silicone.webp"),
    alt: "Buudy LED Mask flexible silicone",
  },
  {
    src: productMediaAsset("O3-w.webp"),
    alt: "Buudy LED Mask O3",
  },
  {
    src: productAsset("01-buudy-led-mask-front.webp"),
    alt: "Buudy LED Mask front view",
  },
];

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
    "Shop the Buudy LED Face Mask in the UK: 192 LEDs, red and blue light therapy, 830nm near-infrared mode, face plus neck coverage, cordless design, easy returns and refunds, and free glow kit.",
  currency: market.currency,
  priceCents: 17900,
  compareAtCents: 44900,
  rating: 4.9,
  reviewCount: 16000,
  customerCount: "16,000+",
  promoCode: "GLOWKIT",
  promoLabel: "Glow kit promo applied",
  cartImage: productAsset("01-buudy-led-mask-front.webp"),
  gallery: buudyLedMaskGallery,
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
      image: productAsset("01-buudy-red-light-therapy-torch-main.webp", "buudy-red-torch"),
      label: "Limited edition",
      href: "/products/red-light-torch",
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
    "Easy return and refund",
    "Dermatologist endorsed",
  ],
};

const torchAsset = (fileName: string) =>
  productAsset(fileName, "buudy-red-torch");

export const buudyRedTorch: Product = {
  id: "buudy-red-torch",
  sku: "1000020579664204",
  slug: "red-light-torch",
  template: "torch",
  name: "Buudy LED Torch",
  heroTitle: "Buudy LED",
  heroEmphasis: "Torch",
  shortDescription:
    "A compact red and near-infrared light therapy torch with 3 targeted wavelengths for skin health, body relief, and easy travel use.",
  description:
    "Red light therapy device with 3 wavelengths: 630nm, 660nm, and 850nm. Designed for localized body relief, acne care, skin health, and portable at-home wellness rituals.",
  seoTitle: "Buudy LED Torch | 3 Wavelength Red Light Therapy Device",
  seoDescription:
    "Portable red light therapy torch with 3 wavelengths, near infrared support, rechargeable battery, and targeted body and skin relief.",
  currency: market.currency,
  priceCents: 7000,
  compareAtCents: 17500,
  rating: 4.8,
  reviewCount: 16000,
  customerCount: "16,000+",
  promoCode: "TORCH60",
  promoLabel: "LED torch offer applied",
  cartImage: torchAsset("01-buudy-red-light-therapy-torch-main.webp"),
  gallery: [
    {
      src: torchAsset("01-buudy-red-light-therapy-torch-main.webp"),
      alt: "Buudy LED Torch held by a woman applying targeted 630nm and 660nm red light to her cheek for facial skin rejuvenation and collagen stimulation",
    },
    {
      src: torchAsset("02-buudy-red-light-torch-product-travel-case.webp"),
      alt: "Buudy LED Torch with sleek aluminium body and red LED emitter alongside its protective black zippered travel storage case",
    },
    {
      src: torchAsset("03-buudy-red-light-torch-handheld-ergonomics.webp"),
      alt: "Compact and ergonomic Buudy LED Torch held in hand with safety wrist strap demonstrating portable travel-ready size",
    },
    {
      src: torchAsset("04-buudy-red-light-torch-neck-shoulder-treatment.webp"),
      alt: "Woman using the Buudy LED Torch for targeted red and near-infrared light therapy on her neck and shoulder for skin smoothing and tension relief",
    },
    {
      src: torchAsset("05-buudy-red-light-torch-arm-joint-pain-relief.webp"),
      alt: "Targeted application of the Buudy LED Torch on forearm and wrist joint for localized pain relief and cellular repair",
    },
    {
      src: torchAsset("06-buudy-red-light-torch-deep-tissue-muscle-recovery.webp"),
      alt: "Close-up of Buudy LED Torch emitting concentrated 630nm, 660nm, and 850nm wavelengths for deep tissue muscle recovery and elbow joint relief",
    },
  ],
  gifts: [],
  specs: [
    { label: "Dimensions", value: "2.5cm × 12cm (0.98 in × 4.72 in)" },
    { label: "Model", value: "H100-3H" },
    { label: "Wavelength", value: "630nm, 660nm, 850nm" },
    { label: "Power", value: "7W" },
    { label: "Operating Voltage", value: "3.7V" },
    { label: "Protection Level", value: "IPX5 (Living Waterproof)" },
    { label: "Battery", value: "18650 Ricoh Lithium (2x included)" },
    { label: "Material", value: "Aluminum alloy" },
    { label: "Charging Method", value: "USB battery dock charger" },
    { label: "Weight", value: "74g" },
    { label: "Warranty", value: "24 months" },
    { label: "Lifespan", value: "50,000+ hours" },
  ],
  included: [
    { quantity: "1x", label: "Buudy LED Torch (3-Core Red Light Flashlight)" },
    { quantity: "2x", label: "18650 Lithium Rechargeable Batteries" },
    { quantity: "1x", label: "Zipper Storage Box (Travel Case)" },
    { quantity: "1x", label: "Triangular Bracket (Tripod Stand)" },
    { quantity: "1x", label: "Anti-Loss Lanyard (Tail Rope)" },
    { quantity: "1x", label: "Red Light Instruction Manual" },
    { quantity: "1x", label: "USB Charger (Dock Charger)" },
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
    "3 precision wavelengths",
    "7W high-power output",
    "IPX5 waterproof",
    "24 month warranty",
  ],
};

export const buudyIplDevice: Product = {
  id: "buudy-ipl-device",
  sku: "BUUDY-IPL-ICE",
  slug: "buudy-ipl-hair-removal-device",
  template: "ipl",
  name: "Buudy IPL Hair Removal Device",
  heroTitle: "Buudy IPL",
  heroEmphasis: "Device",
  shortDescription:
    "Painless at-home laser hair removal with Ice Cooling technology and 999,999 flashes for smooth skin.",
  description:
    "Experience professional-grade, painless hair removal at home. The Buudy IPL Device features an advanced ice-cooling head that stays at 5-8°C to soothe your skin while treating hair follicles. With 9 intensity levels and 999,999 flashes, it's a lifetime solution for smooth, hair-free skin.",
  seoTitle: "Buudy IPL Hair Removal Device | Painless Ice Cooling Laser",
  seoDescription:
    "Shop the Buudy IPL Hair Removal Device in the UK: 999,999 flashes, Ice Cooling technology, 9 intensity levels, painless hair removal at home.",
  currency: market.currency,
  priceCents: 12900, // TODO: Update with real pricing
  compareAtCents: 24900, // TODO: Update with real pricing
  rating: 4.9,
  reviewCount: 450,
  customerCount: "1,000+",
  promoCode: "SMOOTH20",
  promoLabel: "Launch promo applied",
  cartImage: "/images/products/buudy-ipl/hero.png",
  gallery: [
    {
      src: "/images/products/buudy-ipl/hero.png",
      alt: "Buudy IPL Hair Removal Device",
    },
    {
      src: "/images/products/buudy-ipl/standalone.png",
      alt: "Buudy IPL Device with Ice Cooling Display",
    },
    {
      src: "/images/products/buudy-ipl/lifestyle.png",
      alt: "2 Years of Smooth Skin",
    },
    {
      src: "/images/products/buudy-ipl/cooling.png",
      alt: "Ice Cooling for Sensitive Zones",
    },
    {
      src: "/images/products/buudy-ipl/arm.png",
      alt: "15-Min Full Body Treatment",
    },
  ],
  gifts: [],
  specs: [
    { label: "Cooling Technology", value: "Sapphire Ice Cooling (5-8°C)" },
    { label: "Flashes", value: "999,999 flashes (lifetime use)" },
    { label: "Intensity Levels", value: "9 adjustable levels" },
    { label: "Modes", value: "Auto (continuous) and Manual (single flash)" },
    { label: "Power Source", value: "Mains powered (Plug-in)" },
    { label: "Lamp Tube", value: "Quartz tube" },
  ],
  included: [
    { quantity: "1x", label: "Buudy IPL Hair Removal Device" },
    { quantity: "1x", label: "Power Adapter (UK)" },
    { quantity: "1x", label: "Protective Glasses" },
    { quantity: "1x", label: "Shaving Razor" },
    { quantity: "1x", label: "User Manual" },
  ],
  highlights: [
    "Virtually painless with Ice Cooling",
    "999,999 flashes - no refills needed",
    "Results visible in just 4 weeks",
    "Safe for face and body",
  ],
  keyBenefits: [
    "Painless hair removal",
    "Long-lasting smooth skin",
    "Saves money on salon trips",
    "Quick full body treatments",
  ],
  faqs: iplFaqs,
  badges: [
    "Ice Cooling Tech",
    "Painless Treatment",
    "999,999 Flashes",
    "1 Year Warranty",
  ],
};

export const products = [buudyMask, buudyRedTorch, buudyIplDevice];

export const productsById = Object.fromEntries(
  products.map((product) => [product.id, product]),
) as Record<string, Product>;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return productsById[id];
}
