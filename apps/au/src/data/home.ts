import { homeAsset, productAsset, productMediaAsset } from "@/lib/media";
import { buudyMask, buudyRedTorch } from "./products";

export const homeHero = {
  eyebrow: "Next-generation light therapy",
  title: "Perfected for you.",
  copy: "Professional-grade skincare from the comfort of your home. Experience radiant, youthful skin with 7 wavelengths plus 830nm near-infrared, complete neck coverage, and 100% wireless freedom.",
  ctaLabel: "Shop the Buudy Mask",
  ctaHref: `/products/${buudyMask.slug}`,
  images: [
    {
      src: homeAsset("01-home-led-mask-hero.png"),
      alt: "Buudy LED mask hero image",
    },
    {
      src: homeAsset("02-home-led-mask-lifestyle.png"),
      alt: "Buudy LED mask lifestyle image",
    },
    {
      src: homeAsset("03-home-led-mask-light.png"),
      alt: "Buudy LED mask light therapy image",
    },
  ],
};

export const homeMaskSpotlight = {
  eyebrow: "Professional grade",
  title: "The Buudy LED light therapy mask with 7 LED colours + NIR",
  copy: "Modern problems require modern solutions. The Buudy LED light therapy mask does it all wirelessly. No more fumbling around with outdated remotes and power cords. With simple built-in tap technology, you can glow while lounging around the house.",
  image: {
    src: homeAsset("04-home-mask-spotlight.png"),
    alt: "Buudy LED mask product spotlight",
  },
  product: buudyMask,
};

export const homeSkincareGuideIntro = {
  eyebrow: "Skincare quiz",
  title: "Start with a ritual that knows what your skin needs.",
  copy: "Take the Buudy Skincare Quiz to understand your unique skin concerns, choose the right routine, and feel confident from your first session. It is simple, supportive, and made for real at-home consistency.",
  ctaLabel: "Start Quiz",
  ctaHref: "/pages/skincare-quiz",
};

export const homeTechnologySpotlight = {
  eyebrow: "7 wavelengths plus 830nm near-infrared",
  title: "A smarter way to plan your glow.",
  copy: "Use the guide to match your skin goals with the right Buudy LED Mask mode. From collagen support to clearer-looking skin, each wavelength has a purpose and a place in your weekly routine.",
  ctaLabel: "Shop the mask",
  ctaHref: `/products/${buudyMask.slug}`,
  image: {
    src: productMediaAsset("buudy_7_wavelength.webp"),
    alt: "Buudy 7 wavelengths plus near-infrared guide",
  },
};

export const homeFeatureCards = [
  {
    title: "Industry leading 192 LEDs",
    copy: "Your Buudy LED Mask is armed with 192 powerful LEDs to have you glowing in your best light.",
    image: productAsset("03-buudy-led-mask-anti-ageing-mode.webp"),
  },
  {
    title: "For all different types",
    copy: "There is a light for everyone. It is non-invasive and contains no ingredients. Get a picture perfect glow.",
    image: productAsset("08-buudy-led-mask-lifestyle-use.webp"),
  },
  {
    title: "Full neck coverage",
    copy: "The neck is always first to show signs of ageing. Get your neck glowing with a simple tap.",
    image: productAsset("01-buudy-led-mask-front.webp"),
  },
];

export const homeLightTherapy = {
  eyebrow: "Light therapy origin",
  title: "What is light therapy and where did it come from?",
  copy: "You can say thanks to our friends at the international space station for this patented technology. Light therapy was originally used to grow plants in outer space. Since then, countless studies over decades have shown benefits across bio applications. It is non-invasive, contains no ingredients, and is a product you can use over and over again.",
  image: {
    src: homeAsset("08-home-light-therapy-story.jpeg"),
    alt: "Light therapy editorial image",
  },
};

export const homeYoungerYou = {
  title: "Reveal a younger you",
  copy: "With 192 high density LEDs and neck coverage built into one powerful mask, you can spend time to give yourself more time. It is self care when you need it, at anytime.",
  image: {
    src: homeAsset("09-home-younger-you.png"),
    alt: "Buudy LED mask reveal a younger you",
  },
};


export const homeTorchSpotlight = {
  eyebrow: "Portable and powerful",
  title: "Targeted light therapy in your hand.",
  copy: 'Simply set aside some "Me Time" for 15 minutes a day while you watch your favourite show. The Red Torch harnesses high-power LED technology for blood circulation support, stiffness relief, and targeted body care.',
  ctaLabel: "Buy Now",
  ctaHref: `/products/${buudyRedTorch.slug}`,
  image: {
    src: productMediaAsset("35-w.webp"),
    alt: "Buudy Red Torch product spotlight",
  },
  product: buudyRedTorch,
};

export const homeWavelengthMap = {
  eyebrow: "Personalised treatment guide",
  title: "Your wavelength map",
  copy: "Tap any of the 16 facial zones, select your skin concern, and discover exactly which LED wavelength to use and why.",
  zones: [
    "Forehead",
    "Under eyes",
    "Cheeks",
    "Jawline",
    "Neck",
    "Smile lines",
  ],
};

export const homeCustomerReviewsGrid = {
  title: "Why try the Buudy LED mask?",
  copy: "Tons of glowing reviews from customers!",
  ctaLabel: "About Us",
  ctaHref: "/pages/about-us",
  image: productMediaAsset("banner_collage_image.jpeg")
};
