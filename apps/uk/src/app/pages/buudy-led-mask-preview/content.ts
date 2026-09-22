import buudyLogo from "../../../../public/images/buudy-logo-preview.png";

// Existing Buudy store assets only. Static import gives the original logo a safe asset URL.
export const logo = buudyLogo;

export const gallery = [
  {
    src: "/images/products/buudy-led-mask/02-buudy-led-mask-side-profile.webp",
    alt: "The Buudy face and neck LED mask held beside a woman's face, with its purple light illuminated",
    label: "Mask overview",
  },
  {
    src: "/media/products/buudy-led-mask/images/O3-w.webp",
    alt: "The illuminated inside of the Buudy LED mask, shown in front of a mirror",
    label: "Inside the mask",
  },
  {
    src: "/images/products/buudy-led-mask/01-buudy-led-mask-front.webp",
    alt: "Close-up of the bronze and white Buudy LED mask being worn",
    label: "Mask detail",
  },
] as const;

export const gifts = [
  {
    name: "Premium travel case",
    description: "A home for your mask, wherever you go.",
    src: "/images/products/buudy-led-mask/premium-travel-box.png",
    alt: "Buudy's white protective travel case being held upright",
  },
  {
    name: "Buudy LED Torch",
    description: "A compact addition to your light routine.",
    src: "/images/products/buudy-red-torch/01-buudy-red-light-therapy-torch-main.webp",
    alt: "Buudy LED Torch held by a woman applying targeted 630nm and 660nm red light to her cheek for facial skin rejuvenation and collagen stimulation",
  },
  {
    name: "Skincare eBook",
    description: "Your digital introduction to light therapy.",
    src: "/media/products/buudy-led-mask/images/free_guide-v2.webp",
    alt: "Buudy's Red Light Therapy Revolution guide displayed on a tablet and phone",
  },
] as const;

export const unitPrice = 179;
