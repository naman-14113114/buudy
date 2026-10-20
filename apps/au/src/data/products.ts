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
  template: "mask" | "torch" | "ipl" | "minimal";
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
      sub: "AU$109 targeted red light device\nincluded free with your order",
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
    src: productAsset("buudy-7-colour-led-mask-before-after-acne-breakouts-complexion-uk.webp"),
    alt: "Buudy 7 Colour LED Mask before and after clinical results: clears active acne breakouts and calms inflamed complexion UK",
    pills: [
      { text: "2-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Blue 7-min", bg: "#2563EB", textColor: "#FFFFFF" },
      { text: "Yellow 3-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-anti-ageing-eye-wrinkles-uk.webp"),
    alt: "Buudy 7 Colour LED Mask before and after anti-ageing results: visibly reduces crow's feet and eye-area fine lines UK",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Red 6-min", bg: "#DC2626", textColor: "#FFFFFF" },
      { text: "White 4-min", bg: "#FFFFFF", textColor: "#1C1917", borderColor: "rgba(0, 0, 0, 0.18)" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-blemish-clarity-radiance-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask before and after transformation: clears post-acne marks and enhances skin radiance UK",
    pills: [
      { text: "3-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Purple 3-min", bg: "#9333EA", textColor: "#FFFFFF" },
      { text: "Blue 7-min", bg: "#2563EB", textColor: "#FFFFFF" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-dark-spots-pigmentation-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask before and after results: fades dark spots and sun-induced hyperpigmentation UK",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Green 7-min", bg: "#16A34A", textColor: "#FFFFFF" },
      { text: "Red 3-min", bg: "#DC2626", textColor: "#FFFFFF" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-evens-skin-tone-smoothing-uk.webp"),
    alt: "Buudy 7 Colour LED Mask before and after clinical comparison: evens mottled skin tone and smooths fine texture UK",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Green 6-min", bg: "#16A34A", textColor: "#FFFFFF" },
      { text: "Yellow 4-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-cystic-acne-jawline-uk.webp"),
    alt: "Buudy 7 Colour LED Mask before and after results: eliminates persistent cystic acne and smooths lower cheek and jawline UK",
    pills: [
      { text: "3-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Blue 6-min", bg: "#2563EB", textColor: "#FFFFFF" },
      { text: "Purple 4-min", bg: "#9333EA", textColor: "#FFFFFF" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-calms-redness-rosacea-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask before and after: calms facial redness, sensitivity and rosacea flush UK",
    pills: [
      { text: "2-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Cyan 7-min", bg: "#0891B2", textColor: "#FFFFFF" },
      { text: "Yellow 3-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
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
      sub: "AU$109 targeted red light device\nincluded free with your order",
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
    src: productAsset("buudy-7-colour-led-mask-before-after-acne-breakouts-complexion-uk.webp"),
    alt: "Buudy 7 Colour LED Mask before and after clinical results: clears active acne breakouts and calms inflamed complexion UK",
    pills: [
      { text: "2-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Blue 7-min", bg: "#2563EB", textColor: "#FFFFFF" },
      { text: "Yellow 3-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-anti-ageing-eye-wrinkles-uk.webp"),
    alt: "Buudy 7 Colour LED Mask before and after anti-ageing results: visibly reduces crow's feet and eye-area fine lines UK",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Red 6-min", bg: "#DC2626", textColor: "#FFFFFF" },
      { text: "White 4-min", bg: "#FFFFFF", textColor: "#1C1917", borderColor: "rgba(0, 0, 0, 0.18)" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-blemish-clarity-radiance-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask before and after transformation: clears post-acne marks and enhances skin radiance UK",
    pills: [
      { text: "3-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Purple 3-min", bg: "#9333EA", textColor: "#FFFFFF" },
      { text: "Blue 7-min", bg: "#2563EB", textColor: "#FFFFFF" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-dark-spots-pigmentation-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask before and after results: fades dark spots and sun-induced hyperpigmentation UK",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Green 7-min", bg: "#16A34A", textColor: "#FFFFFF" },
      { text: "Red 3-min", bg: "#DC2626", textColor: "#FFFFFF" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-evens-skin-tone-smoothing-uk.webp"),
    alt: "Buudy 7 Colour LED Mask before and after clinical comparison: evens mottled skin tone and smooths fine texture UK",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Green 6-min", bg: "#16A34A", textColor: "#FFFFFF" },
      { text: "Yellow 4-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-cystic-acne-jawline-uk.webp"),
    alt: "Buudy 7 Colour LED Mask before and after results: eliminates persistent cystic acne and smooths lower cheek and jawline UK",
    pills: [
      { text: "3-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Blue 6-min", bg: "#2563EB", textColor: "#FFFFFF" },
      { text: "Purple 4-min", bg: "#9333EA", textColor: "#FFFFFF" },
    ],
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
    src: productAsset("buudy-7-colour-led-mask-before-after-calms-redness-rosacea-uk.webp"),
    alt: "Buudy 7 Colour LED Face Mask before and after: calms facial redness, sensitivity and rosacea flush UK",
    pills: [
      { text: "2-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Cyan 7-min", bg: "#0891B2", textColor: "#FFFFFF" },
      { text: "Yellow 3-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
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
    "Salon-grade light therapy reimagined for Australian homes. The Buudy LED Mask combines 192 high-density LEDs, 7 visible light colours plus a dedicated 830nm near-infrared mode, full face and neck coverage, cordless wearability, and a simple ritual built for consistent at-home skincare.",
  seoTitle: "Best LED Face Mask Australia | Buudy Red Light Therapy Mask",
  seoDescription:
    "Shop the Buudy LED Face Mask in Australia: 192 LEDs, red and blue light therapy, 830nm near-infrared mode, face plus neck coverage, cordless design, easy returns and refunds, and free glow kit.",
  currency: market.currency,
  priceCents: 29900,
  compareAtCents: 64900,
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
      valueCents: 6900,
      image: productMediaAsset("ChatGPT Image May 31, 2026, 11_53_13 PM.png"),
      label: "Exclusive item",
      href: "/pages/premium-travel-box",
    },
    {
      id: "buudy-led-torch",
      name: "Buudy LED Torch",
      valueCents: 10900,
      image: productAsset("01-buudy-red-light-therapy-torch-main.webp", "buudy-red-torch"),
      label: "Limited edition",
      href: "/products/red-light-torch",
    },
    {
      id: "skincare-ebook",
      name: "Skincare E-Book",
      valueCents: 2900,
      image: "/images/products/skincare-ebook/skincare-ebook.png",
      label: "Digital copy",
      href: "/products/skincare-ebook",
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
  faqs: buudyLedMaskFaqs,
  badges: [
    "Health Canada approved",
    "CE / FCC / ROHS",
    "Easy return and refund",
    "Dermatologist endorsed",
  ],
};

export const buudy7ColourMask: Product = {
  ...buudyMask,
  slug: "buudy-7-colour-led-mask",
  gallery: fullLedMaskGallery,
  faqs: standardMaskFaqs,
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
  priceCents: 10900,
  compareAtCents: 21900,
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
      src: torchAsset("buudy-led-torch-premium-gift-set.webp"),
      alt: "Buudy LED Torch complete gift set with 2x rechargeable batteries, dock charger, tripod and travel case",
    },
    {
      src: torchAsset("buudy-led-torch-sculptural-warm-stone.webp"),
      alt: "Buudy LED Torch in precision-crafted aircraft-grade aluminum alloy on warm stone",
      badge: {
        title: "AIRCRAFT-GRADE\nALUMINUM ALLOY",
        sub: "Precision-milled metal body engineered\nfor durability & rapid heat dissipation",
        position: "top-left",
        theme: "white",
      },
    },
    {
      src: torchAsset("buudy-led-torch-silver-black-on-blush.webp"),
      alt: "Buudy LED Torch precision silver and black aesthetic with 3 clinical wavelengths",
      badge: {
        title: "3 CLINICAL\nWAVELENGTHS",
        sub: "630nm, 660nm visible red light\nplus 850nm deep near-infrared",
        position: "top-left",
        theme: "dark",
      },
    },
    {
      src: torchAsset("buudy-led-torch-mini-tripod-red-glow.webp"),
      alt: "Buudy LED Torch emitting active red and near-infrared light on mini tripod stand",
      badge: {
        title: "HANDS-FREE\nTRIPOD STAND",
        sub: "Stationary targeted treatment with\nincluded adjustable bracket",
        position: "bottom-left",
        theme: "dark",
      },
    },
    {
      src: torchAsset("buudy-led-torch-handheld-ergonomics.webp"),
      alt: "Buudy LED Torch held in hand demonstrating portable compact ergonomics",
      badge: {
        title: "ULTRA-LIGHTWEIGHT\n& ERGONOMIC",
        sub: "Only 74g with one-button control\nand anti-drop lanyard",
        position: "top-right",
        theme: "dark",
      },
    },
    {
      src: torchAsset("buudy-led-torch-travel-case-scale.webp"),
      alt: "Buudy LED Torch beside custom zipper travel case demonstrating portable scale",
      badge: {
        title: "TRAVEL-READY\nPROTECTION",
        sub: "Compact 12cm form factor fits\nsecurely in dedicated zipper case",
        position: "top-left",
        theme: "dark",
      },
    },
    {
      src: torchAsset("04-buudy-red-light-torch-neck-shoulder-treatment.webp"),
      alt: "Woman using the Buudy LED Torch for targeted red and near-infrared light therapy on her neck and shoulder for skin smoothing and tension relief",
      badge: {
        title: "NECK & SHOULDER\nRELIEF",
        sub: "Targeted soothing warmth & light\nfor everyday muscle tension",
        position: "bottom-left",
        theme: "white",
      },
    },
    {
      src: torchAsset("05-buudy-red-light-torch-arm-joint-pain-relief.webp"),
      alt: "Targeted application of the Buudy LED Torch on forearm and wrist joint for localized pain relief and cellular repair",
      badge: {
        title: "LOCALIZED JOINT\nRECOVERY",
        sub: "Direct deep-tissue light therapy\nfor joints, wrists & elbows",
        position: "bottom-left",
        theme: "white",
      },
    },
    {
      src: torchAsset("06-buudy-red-light-torch-deep-tissue-muscle-recovery.webp"),
      alt: "Close-up of Buudy LED Torch emitting concentrated 630nm, 660nm, and 850nm wavelengths for deep tissue muscle recovery and elbow joint relief",
      badge: {
        title: "DEEP TISSUE\nRECOVERY",
        sub: "850nm near-infrared light penetrates\ndeep into tired muscles",
        position: "top-left",
        theme: "dark",
      },
    },
    {
      src: torchAsset("07-buudy-red-light-torch-lifestyle-portable-relief.webp"),
      alt: "Buudy LED Torch held by a woman for portable on-the-go body and skin wellness",
    },
    {
      src: torchAsset("11-buudy-red-light-torch-multi-body-treatment-grid.webp"),
      alt: "Buudy LED Torch multi-zone application guide for elbow, hand, back, and knee relief",
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
    "Shop the Buudy IPL Hair Removal Device in Australia: 999,999 flashes, Ice Cooling technology, 9 intensity levels, painless hair removal at home.",
  currency: market.currency,
  priceCents: 19900,
  compareAtCents: 39900,
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
    { quantity: "1x", label: "Power Adapter (AU)" },
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

export const ebookFaqs: FAQItem[] = [
  {
    question: "How do I receive the e-book after purchasing?",
    answer:
      "Your e-book download link is dispatched instantly to your email inbox immediately upon checkout completion. You can download and access the PDF right away on any device.",
  },
  {
    question: "What devices can I read the e-book on?",
    answer:
      "The guide is provided as a universal, high-resolution PDF compatible with Apple iPhones, iPads, Android smartphones and tablets, Kindle e-readers, MacBooks, and Windows PCs.",
  },
  {
    question: "What topics and wavelengths are covered in the guide?",
    answer:
      "The guide spans 38 chapters covering red (630nm), near-infrared (830nm), blue (460nm), green (525nm), yellow (590nm), purple, and cyan wavelengths, cellular mitochondrial ATP synthesis, and tailored routines for anti-ageing, acne, hyperpigmentation, and redness.",
  },
];

export const giftCardFaqs: FAQItem[] = [
  {
    question: "How will the recipient receive the gift card?",
    answer:
      "The digital gift card is delivered instantly via email to you (or directly to the recipient if specified) containing a secure 16-digit voucher code, redemption instructions, and a printable gift certificate.",
  },
  {
    question: "Does the Buudy Gift Card expire?",
    answer:
      "Yes, the Buudy Gift Card expires 3 months from the day you receive it. The recipient can redeem their AU$30 balance site-wide anytime within this 3-month validity period.",
  },
  {
    question: "Can the gift card balance be used across multiple orders?",
    answer:
      "Yes. If your total order amount is less than the AU$30 gift card balance, any remaining balance stays on the voucher code for future purchases within the 3-month validity window.",
  },
];

export const packageProtectionFaqs: FAQItem[] = [
  {
    question: "What does Buudy Package Protection cover?",
    answer:
      "Package Protection covers 100% of the replacement value if your order is damaged during transit, lost by the courier, or stolen from your doorstep (porch piracy).",
  },
  {
    question: "How quickly are replacement claims processed?",
    answer:
      "Claims are reviewed and processed within 24 hours. Once verified, a brand-new replacement unit is immediately dispatched via tracked express courier.",
  },
  {
    question: "How do I file a claim if my package is lost or damaged?",
    answer:
      "Simply email our dedicated priority claims team at support@buudy.com with your order number and brief details (or photos if damaged). We handle carrier investigations on your behalf.",
  },
];

export const buudySkincareEbook: Product = {
  id: "buudy-skincare-ebook",
  sku: "BUUDY-EBOOK-SKINCARE",
  slug: "skincare-ebook",
  template: "minimal",
  name: "The Clinical Light Masterclass E-Book",
  heroTitle: "Clinical Skincare",
  heroEmphasis: "Masterclass",
  shortDescription:
    "The definitive 40+ page clinical guide to 7-colour photobiomodulation, multi-device synergy, and active skincare chemistry.",
  description:
    "The official Buudy Clinical Light Masterclass E-Book. 40+ comprehensive clinical pages and 38 chapters covering photobiomodulation physics, mitochondrial activation, wavelength depth penetration maps, 5 bespoke clinical pathways, active ingredient pairings, and printable 90-day progress trackers. Delivered instantly in high-resolution PDF format.",
  seoTitle: "The Clinical Light Masterclass E-Book (Digital PDF) | Buudy",
  seoDescription:
    "Download the official 40+ page Clinical Light Masterclass E-Book by Buudy: 7-colour photobiomodulation protocols, 830nm NIR guide, and active skincare chemistry.",
  currency: market.currency,
  priceCents: 2900,
  compareAtCents: 5900,
  rating: 0,
  reviewCount: 0,
  customerCount: "",
  promoCode: "",
  promoLabel: "",
  cartImage: "/images/products/skincare-ebook/skincare-ebook.png",
  gallery: [
    {
      src: "/images/products/skincare-ebook/skincare-ebook.png",
      alt: "The Clinical Light Masterclass E-Book by Buudy",
    },
  ],
  gifts: [],
  specs: [
    { label: "Format", value: "Instant Digital Download (PDF)" },
    { label: "Length", value: "40+ Clinical Pages (38 Chapters)" },
    { label: "Compatibility", value: "iPhone, iPad, Android, Mac, PC, Kindle" },
    { label: "Delivery", value: "Instant Email Link + Direct Access" },
    { label: "Language", value: "English" },
    { label: "Publisher", value: "Buudy Clinical Editorial Board" },
  ],
  included: [
    { quantity: "1x", label: "Full Clinical Light Masterclass E-Book (High-Res PDF)" },
    { quantity: "5x", label: "Bespoke Wavelength Routine Cards" },
    { quantity: "1x", label: "Active Skincare Ingredient Pairing Guide" },
    { quantity: "1x", label: "Printable 90-Day Weekly Session Tracker" },
  ],
  highlights: [
    "38 in-depth clinical chapters covering all 7 therapeutic wavelengths & 830nm NIR",
    "5 bespoke condition pathways for anti-ageing, acne, redness, pigmentation & radiance",
    "Active ingredient pairing cheat sheets (Vitamin C, Niacinamide, Retinoids, Peptides)",
    "Printable 90-day treatment calendar and weekly tracking sheets",
    "Instant digital delivery to your inbox with lifetime access & free future updates",
  ],
  keyBenefits: [
    "Maximize your LED Mask & Torch results with clinical protocols",
    "Prevent active skincare contraindications & ingredient pilling",
    "Track your progress with structured 90-day milestone templates",
    "Read anytime on your smartphone, tablet, e-reader, or laptop",
  ],
  badges: [
    "Instant PDF Download",
    "40+ Clinical Pages",
    "Official Companion",
    "Lifetime Access",
  ],
  faqs: ebookFaqs,
};

export const buudyGiftCard: Product = {
  id: "buudy-gift-card",
  sku: "BUUDY-GIFT-CARD",
  slug: "buudy-gift-card",
  template: "minimal",
  name: "Buudy Official Digital Gift Card",
  heroTitle: "Buudy Official",
  heroEmphasis: "Gift Card",
  shortDescription:
    "The ultimate gift of radiant glow. Instant electronic voucher delivery directly to your inbox. Valid for 3 months from date of receipt.",
  description:
    "Give the gift of clinical wellness and radiant skin. The Buudy Official AU$30 Digital Gift Card is delivered instantly via email and is valid for 3 months from the date you receive it. Valid site-wide across the Buudy 7 Colour LED Face Mask, Buudy LED Torch, IPL Hair Removal, and all beauty accessories.",
  seoTitle: "Buudy Official AU$30 Digital Gift Card | Instant Voucher Delivery",
  seoDescription:
    "Give the gift of glowing skin. The Buudy AU$30 digital gift card is delivered instantly via email and valid for 3 months from receipt. Site-wide redemption.",
  currency: market.currency,
  priceCents: 3000,
  compareAtCents: 6000,
  rating: 0,
  reviewCount: 0,
  customerCount: "",
  promoCode: "",
  promoLabel: "",
  cartImage: "/images/products/buudy-gift-card/buudy-gift-card-with-gold-ribbon.webp",
  gallery: [
    {
      src: "/images/products/buudy-gift-card/buudy-gift-card-with-gold-ribbon.webp",
      alt: "Buudy Official Digital Gift Card with Gold Ribbon",
    },
  ],
  gifts: [],
  specs: [
    { label: "Delivery", value: "Instant Digital Email Delivery" },
    { label: "Expiry Date", value: "Expires 3 months from day received" },
    { label: "Redemption", value: "Site-wide on all Buudy products & kits" },
    { label: "Format", value: "16-Digit Secure Electronic Voucher Code" },
    { label: "Value", value: "AU$30.00 Fixed Voucher Amount" },
    { label: "Currency", value: "AUD ($)" },
  ],
  included: [
    { quantity: "1x", label: "Official Buudy Digital Gift Voucher Code" },
    { quantity: "1x", label: "Instant Email Presentation with Custom Message" },
    { quantity: "1x", label: "Printable Gift Certificate PDF" },
  ],
  highlights: [
    "Instant digital delivery dispatched directly to your inbox within seconds",
    "Valid for 3 months from the date you receive it",
    "Valid site-wide on all LED masks, torches, IPL devices, and skincare accessories",
    "Personalized gift note option to include your heartfelt message",
    "Simple zero-friction redemption during checkout",
  ],
  keyBenefits: [
    "Gifting made effortless for birthdays, anniversaries, and holidays",
    "Allows recipient to choose their ideal light therapy device",
    "Fixed AU$30 voucher amount for quick, easy checkout",
    "3-month validity window for flexible redemption",
  ],
  badges: [
    "Instant Email Delivery",
    "Valid for 3 Months",
    "Site-Wide Valid",
    "100% Satisfaction",
  ],
  faqs: giftCardFaqs,
};

export const buudyPackageProtection: Product = {
  id: "buudy-package-protection",
  sku: "BUUDY-PKG-PROTECTION",
  slug: "buudy-package-protection",
  template: "minimal",
  name: "Buudy Complete Package Protection",
  heroTitle: "Complete Package",
  heroEmphasis: "Protection",
  shortDescription:
    "Complete transit damage, loss, and theft guarantee for your order with expedited zero-cost unit replacement.",
  description:
    "Secure your order for pennies. Buudy Package Protection provides 100% peace of mind against accidental transit damage, lost courier shipments, defective deliveries, and doorstep theft. Includes fast-track 24-hour claims processing and immediate brand-new unit reshipment at zero additional charge.",
  seoTitle: "Buudy Complete Package Protection | Transit & Theft Guarantee",
  seoDescription:
    "Protect your Buudy delivery against courier damage, loss, and theft. Instant zero-cost replacement and priority dispatch.",
  currency: market.currency,
  priceCents: 500,
  compareAtCents: 500,
  rating: 0,
  reviewCount: 0,
  customerCount: "",
  promoCode: "",
  promoLabel: "",
  cartImage: "/images/products/buudy-package-protection/buudy-package-protection.webp",
  gallery: [
    {
      src: "/images/products/buudy-package-protection/buudy-package-protection.webp",
      alt: "Buudy Complete Package Protection Transit Guarantee",
    },
  ],
  gifts: [],
  specs: [
    { label: "Coverage Type", value: "Full Transit Damage, Loss & Doorstep Theft" },
    { label: "Claims Processing", value: "Fast-Track within 24 Hours" },
    { label: "Replacement Cost", value: "AU$0 (Zero Deductible, Brand New Unit)" },
    { label: "Underwriting", value: "Direct Buudy Official Guarantee" },
    { label: "Courier Support", value: "Australia Post, StarTrack, Toll & Express Couriers" },
  ],
  included: [
    { quantity: "1x", label: "Full Order Transit Insurance Coverage" },
    { quantity: "1x", label: "Expedited Zero-Cost Replacement Guarantee" },
    { quantity: "1x", label: "Priority 24/7 VIP Customer Support Fast-Track" },
  ],
  highlights: [
    "100% complete coverage against courier damage, lost parcels & porch piracy",
    "Fast-track 24-hour claims response with zero paperwork hassle",
    "Immediate brand-new unit replacement dispatched via tracked express courier",
    "Covers your entire order from dispatch until safely in your hands",
    "Dedicated claims specialist handles carrier investigations for you",
  ],
  keyBenefits: [
    "Total peace of mind from our warehouse to your doorstep",
    "Skip lengthy postal courier investigation waiting periods",
    "Brand new replacement dispatched with zero deductible fees",
    "Priority queue status with dedicated resolution liaison",
  ],
  badges: [
    "100% Transit Coverage",
    "Zero Deductible",
    "24h Express Replacement",
    "Doorstep Theft Protection",
  ],
  faqs: packageProtectionFaqs,
};

export const products = [
  buudyMask,
  buudyRedTorch,
  buudyIplDevice,
  buudySkincareEbook,
  buudyGiftCard,
  buudyPackageProtection,
];

export const productsById = Object.fromEntries(
  products.map((product) => [product.id, product]),
) as Record<string, Product>;

export function getProductBySlug(slug: string) {
  if (slug === "buudy-gift-card" || slug === "gift-card" || slug === "buudygiftcard") return buudyGiftCard;
  if (slug === "buudy-package-protection" || slug === "package-protection" || slug === "buudypackageprotection") return buudyPackageProtection;
  if (slug === "skincare-ebook" || slug === "buudy-skincare-ebook") return buudySkincareEbook;
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return productsById[id];
}
