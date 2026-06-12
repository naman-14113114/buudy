import { productMediaAsset } from "@/lib/media";

export type FreeGiftDetailSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type FreeGiftDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  note: string;
  image: string;
  imageAlt: string;
  cardTitle: string;
  cardBullets: string[];
  sections: FreeGiftDetailSection[];
  primaryCtaLabel: string;
};

const bundleFooter =
  "The Buudy LED Mask offer works best as a complete ritual: the mask, the travel case, the LED Torch, and the customer skincare guide all support the same goal.";

export const freeGiftBundleFooter = bundleFooter;

export const freeGiftDetails: FreeGiftDetail[] = [
  {
    slug: "premium-travel-box",
    eyebrow: "Free Bonus Gift",
    title: "Premium Travel Box",
    seoTitle: "Premium Travel Box for Buudy LED Mask",
    seoDescription:
      "Discover the premium travel box included with the Buudy LED Mask offer for protected storage, organized accessories, and easier travel.",
    intro:
      "The Premium Travel Box is the practical bonus most customers do not realize they will appreciate until the mask becomes part of their weekly routine. It gives your Buudy LED Mask a dedicated home, protects it between sessions, and makes travel much easier.",
    note:
      "This travel box is currently included as a free bonus with the Buudy LED Mask offer.",
    image: productMediaAsset("ChatGPT Image May 31, 2026, 11_53_13 PM.png"),
    imageAlt: "Premium Travel Box for the Buudy LED Mask",
    cardTitle: "Why it increases the value of your order",
    cardBullets: [
      "Keeps the mask protected between uses",
      "Makes the full ritual easier to store and organize",
      "Helps frequent travellers stay consistent",
      "Feels like part of a complete premium set",
    ],
    sections: [
      {
        title: "Why customers care about this one",
        paragraphs: [
          "Customers buying a higher-consideration device often want reassurance that the package feels complete. A dedicated travel box does that immediately. It makes the mask feel giftable, more premium, and easier to keep in good condition.",
          "It also reduces the little friction points that can stop people from staying consistent, like not knowing where to keep the charger, goggles, or guide.",
        ],
      },
      {
        title: "What it helps solve",
        paragraphs: [
          "The best skincare tools only work when they stay part of your routine. A proper case helps you keep the mask safe, tidy, and close at hand instead of tucked away loosely in a drawer.",
          "That matters if you want your purchase to feel like a long-term ritual rather than a one-week impulse.",
        ],
        bullets: [
          "Cleaner storage at home",
          "Better protection during travel",
          "Less risk of cables and accessories getting misplaced",
          "A more premium unboxing and ownership experience",
        ],
      },
    ],
    primaryCtaLabel: "Claim The Mask + Free Gifts",
  },
  {
    slug: "buudy-led-torch",
    eyebrow: "Free Bonus Gift",
    title: "Buudy LED Torch",
    seoTitle: "Buudy LED Torch Bonus Gift",
    seoDescription:
      "Explore the targeted Buudy LED Torch included as a free companion gift with the Buudy LED Mask offer.",
    intro:
      "The Buudy LED Torch adds precision to the main mask offer. While the LED Mask gives you broad face-and-neck coverage, the torch gives you a smaller tool you can use for targeted touch-up areas and travel-friendly sessions.",
    note:
      "The current Buudy LED Mask offer includes the LED Torch as a free bonus gift.",
    image: productMediaAsset("free_torch.png"),
    imageAlt: "Buudy LED Torch bonus gift",
    cardTitle: "Why customers like this bonus",
    cardBullets: [
      "Great for targeted touch-up zones",
      "Smaller format for travel and quick routines",
      "Complements the full-size mask instead of replacing it",
      "Makes the bundle feel more complete",
    ],
    sections: [
      {
        title: "Where a smaller companion device helps",
        paragraphs: [
          "Some customers love the idea of a main mask for full sessions and a smaller companion for precision. The torch fits that role well because it gives the bundle more flexibility.",
          "It helps the offer feel like a system rather than a single product.",
        ],
        bullets: [
          "Smaller touch-up areas",
          "Targeted use during travel",
          "Extra attention around detail zones",
          "A convenient companion when you do not want a full mask session",
        ],
      },
      {
        title: "Why this bonus improves the bundle",
        paragraphs: [
          "It answers a common question before it is asked: What if I want something more targeted too? Instead of buying another device later, the offer already covers both broad treatment and precision support.",
          "That makes the bundle feel more generous and easier to justify.",
        ],
      },
    ],
    primaryCtaLabel: "Claim The Mask + Free Gifts",
  },
  {
    slug: "skincare-guide",
    eyebrow: "Customer Guide Bonus",
    title: "The Buudy Skincare Guide",
    seoTitle: "The Buudy Skincare Guide Bonus",
    seoDescription:
      "Learn what is inside the Buudy Skincare Guide delivered after your LED Mask purchase, including wavelength guidance and treatment plans.",
    intro:
      "This is not a generic PDF. It is a full Buudy customer guide designed to help LED Mask buyers get more value out of the device from day one. It explains the wavelengths, shows how to build a routine, and turns uncertainty into a clear treatment plan.",
    note:
      "The Buudy Skincare Guide is delivered after your LED Mask purchase. The private guide file is not published on this page.",
    image: productMediaAsset("free_guide-v2.webp"),
    imageAlt: "Buudy Skincare Guide bonus",
    cardTitle: "What customers unlock inside",
    cardBullets: [
      "LED science explained simply",
      "Your 7 wavelengths plus NIR, broken down clearly",
      "Skin-type guidance and weekly treatment plans",
      "AM and PM rituals, ingredient pairings, and a results timeline",
    ],
    sections: [
      {
        title: "What is inside the guide",
        paragraphs: [
          "The guide walks customers through the Buudy method from first principles to practical routines. It covers the science of LED light therapy, the role of each wavelength, skin-type matching, weekly protocols, morning and evening rituals, and the best ingredients to pair with LED sessions.",
          "It also includes a results timeline, travel tips, routine examples by decade, common myths, and a bonus chapter on the Buudy IPL ritual.",
        ],
        bullets: [
          "Welcome to the Buudy Method",
          "The Science of LED Light Therapy",
          "Your 7 Wavelengths + NIR, Explained",
          "Find Your Skin Type",
          "Your Personalised Treatment Plan",
          "The Daily Routine: AM and PM",
          "The Best Ingredients to Pair",
          "Results timeline, travel tips, and skin guidance",
        ],
      },
      {
        title: "Why the guide matters",
        paragraphs: [
          "A common hesitation is simple: What if I buy the mask and still do not know how to use it properly? The guide removes that fear. It gives customers a clear starting point and makes the purchase feel supported instead of self-directed.",
          "That turns the order into a complete ritual, not just a product shipment.",
        ],
      },
    ],
    primaryCtaLabel: "Buy To Unlock This Guide",
  },
];

export function getFreeGiftDetail(slug: string) {
  return freeGiftDetails.find((gift) => gift.slug === slug);
}
