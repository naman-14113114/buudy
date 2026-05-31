import { productAsset, productMediaAsset } from "@/lib/media";

export type Feature = {
  title: string;
  kicker: string;
  body: string;
};

export type Transformation = {
  id: string;
  concern: string;
  image: string;
  title: string;
  quote: string;
  name: string;
};

export type ReviewVideo = {
  id: string;
  poster: string;
  src: string;
  fallbackSrc?: string;
};

export type Wavelength = {
  nm: string;
  name: string;
  description: string;
  color: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const features: Feature[] = [
  {
    title: "Unrivaled LED Density",
    kicker: "192 High-Intensity LEDs",
    body: 'Most competitors space out their lights, leaving "dead zones" on your skin. Buudy features 192 High-Density LEDs, which is more than double the amount found in standard masks. This ensures every single inch of your skin receives consistent, effective treatment for faster results.',
  },
  {
    title: "Full Neck Coverage",
    kicker: 'Say No to "Turkey Neck"',
    body: "The face is only half the story. Unlike many popular brands that neglect the neck or charge extra for a separate attachment, Buudy includes integrated neck coverage. It is specifically designed to firm and rejuvenate the neck area, preventing aging where it often shows most.",
  },
  {
    title: "8-in-1 Multi-Spectrum",
    kicker: "Therapy in a single device",
    body: "Why settle for one or three colors? Buudy offers 7 visible light colors plus a dedicated 830nm near-infrared mode: Infra-red, Red, Blue, Green, Cyan, Yellow, Purple, and White. Whether you are fighting stubborn acne, reducing deep wrinkles, or supporting skin repair, you have a professional-grade solution for every skin concern.",
  },
  {
    title: "Cordless Freedom",
    kicker: '"Go-Anywhere" Wearability',
    body: 'Do not be tethered to a wall. Our mask is completely cordless and rechargeable with a 2-hour battery life. Combined with our "Tap Technology", which lets you change settings with a simple touch, you can enjoy your 10-minute "me time" while moving around.',
  },
  {
    title: "Certified Safety",
    kicker: "Expert Approved",
    body: "Your safety is our priority. The Buudy LED Mask is Health Canada Approved and carries CE, FCC, and ROHS certifications. It is also endorsed by Dermatologists and Licensed Aestheticians who recognize it as a superior way to boost the efficacy of your existing skincare routine at home.",
  },
  {
    title: "Ultimate Value",
    kicker: "A one-time investment",
    body: "Compare the cost: while other high-end masks retail for $300-$400, Buudy offers superior technology and more LEDs for a fraction of the price. It is a one-time investment that replaces expensive salon visits and recurring spa subscriptions forever.",
  },
];

export const realLifeImages = [
  {
    src: productAsset("10-buudy-led-mask-dermatologist-recommended.webp"),
    alt: "Dermatologist recommended Buudy LED Mask",
  },
  {
    src: productAsset("02-buudy-led-mask-side-profile.webp"),
    alt: "Buudy LED Mask side profile",
  },
  {
    src: productAsset("15-buudy-led-mask-warranty.webp"),
    alt: "Buudy LED Mask warranty",
  },
  {
    src: productAsset("08-buudy-led-mask-lifestyle-use.webp"),
    alt: "Buudy LED Mask lifestyle use",
  },
  {
    src: productAsset("11-buudy-led-mask-flexible-silicone.webp"),
    alt: "Flexible silicone Buudy LED Mask",
  },
  {
    src: productAsset("14-buudy-led-mask-award-2026.webp"),
    alt: "Buudy LED Mask award 2026",
  },
  {
    src: productAsset("03-buudy-led-mask-anti-ageing-mode.webp"),
    alt: "Buudy LED Mask anti-aging mode",
  },
  {
    src: productAsset("13-buudy-led-mask-starter-kit.webp"),
    alt: "Buudy LED Mask starter kit",
  },
];

export const transformations: Transformation[] = [
  {
    id: "result-01",
    image: productAsset("01-sagging-cheeks.webp"),
    concern: "Sagging Cheeks",
    title: "Best investment ever",
    quote:
      '"I have noticed a significant reduction in the sagging around my cheeks and jawline."',
    name: "Donna P.",
  },
  {
    id: "result-02",
    image: productAsset("02-fine-lines.webp"),
    concern: "Fine Lines",
    title: "IT REALLY WORKS!!",
    quote:
      '"After using for 1 month, I cannot believe the difference! Fine lines are much less noticeable."',
    name: "Jane P.",
  },
  {
    id: "result-03",
    image: productAsset("03-neck-firming.webp"),
    concern: "Neck Firming",
    title: "Incredible results",
    quote:
      '"In less than 2 months, noticed the fine lines around my eyes and mouth are much less noticeable."',
    name: "Sarah K.",
  },
  {
    id: "result-04",
    image: productAsset("04-forehead-lines.webp"),
    concern: "Forehead Lines",
    title: "Better than Botox",
    quote:
      '"Within just a few weeks, my skin started to clear up and the scars began to fade."',
    name: "Michelle L.",
  },
  {
    id: "result-05",
    image: productAsset("05-jawline-sculpting.webp"),
    concern: "Jawline Sculpting",
    title: "Defined my face!",
    quote:
      '"I never thought I would see my jawline again without surgery. This device is a total game changer."',
    name: "James D.",
  },
  {
    id: "result-06",
    image: productAsset("06-skin-radiance.webp"),
    concern: "Skin Radiance",
    title: "Literal Glow Up",
    quote:
      '"My skin looks so much more radiant and healthy. I have even stopped wearing heavy foundation!"',
    name: "Karen W.",
  },
  {
    id: "result-07",
    image: productAsset("07-under-eye-bags.webp"),
    concern: "Under Eye Bags",
    title: "Eyes look refreshed",
    quote:
      '"The puffiness under my eyes has vanished. I look like I have actually had 8 hours of sleep!"',
    name: "Linda S.",
  },
  {
    id: "result-08",
    image: productAsset("08-skin-texture.webp"),
    concern: "Skin Texture",
    title: "Smooth as silk",
    quote:
      '"The overall texture of my skin has improved immensely. It feels incredibly soft and looks smooth."',
    name: "Jennifer H.",
  },
];

export const reviewVideos: ReviewVideo[] = [
  {
    id: "review-01",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486304350_448129a4-6d94-4e44-b8af-511f3e7999b2.webp",
    src: productMediaAsset("review-01.mp4", "buudy-led-mask", "videos"),
    fallbackSrc: "https://cdn2.videowise.com/converted/videos/1680194145059_06e68cf3-1a7d-4636-a05a-8c1922a066a4_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-02",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486138534_38dd960f-2287-4bfc-b1be-af40bc8ef5d6.webp",
    src: productMediaAsset("review-02.mp4", "buudy-led-mask", "videos"),
    fallbackSrc: "https://cdn2.videowise.com/converted/videos/1686511751028_e8ecbe6c-94ca-4754-bff1-4bdfff8aad16_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-03",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485722607_ded18359-40b7-427c-b2a9-62e48436f87c.webp",
    src: productMediaAsset("review-03.mp4", "buudy-led-mask", "videos"),
    fallbackSrc: "https://cdn2.videowise.com/converted/videos/1679081088110_c7eea873-a477-4a43-aafb-bcbc47f285ca_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-04",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485860443_d12fd0ec-8701-4fe7-8e68-1c801ff59f85.webp",
    src: productMediaAsset("review-04.mp4", "buudy-led-mask", "videos"),
    fallbackSrc: "https://cdn2.videowise.com/converted/videos/1684780828045_7e4e871c-89be-45e4-9fb5-1d4c9ac1f30f_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-05",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485816239_f9dba8d1-d096-4067-aff8-eb4a72366122.webp",
    src: productMediaAsset("review-05.mp4", "buudy-led-mask", "videos"),
    fallbackSrc: "https://cdn2.videowise.com/converted/videos/1679081092710_1bac0b63-1caf-46ec-8a9e-33981ec0d67c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-06",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485713943_cdd6cc24-2387-470e-b124-abd3854c444a.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081090744_9551ac45-ed4a-43b8-b9ac-8213907377b3_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-07",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485680835_1fadaf66-e8f6-4c8b-aa7c-4396245b1faa.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081088709_a5c725fc-6f49-4c5b-a9df-fcc86e2f961c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-08",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485637662_4fa63d64-8298-4f58-9f47-9adfa370720d.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081087361_1db3b2cc-7be9-4715-bb3f-0fefa4d95837_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-09",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485657649_d1f364b2-99cf-46f6-96f5-e4e7c804a5d9.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081086957_557b2d69-79d2-4cee-8ba8-63e316eff8c7_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-10",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485662907_1e32b62d-e59f-4f2e-abaf-aa9707c46121.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080157636_4c0c5485-0c6c-476f-bcd4-086de0efc4d1_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-11",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485718861_90220ac1-9cdb-473c-8c10-b35687131177.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081086115_9020e9ed-ef75-440f-abce-58841caacb36_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-12",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485624094_cecf6646-da77-4ac9-883e-7cf30e8e552f.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080526334_a0e26759-7e98-43bf-a8fe-040939abf286_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-13",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485613490_a1d783da-99e3-4a91-b8d0-79bcddf4abfe.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081085529_9c218c6e-a0e2-439b-81ff-c50a5407fda3_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-14",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486208158_29d80d75-e1ff-4e39-b80a-ab619343d7cd.webp",
    src: "https://cdn2.videowise.com/converted/videos/1680194146707_01323415-baa1-49fb-8fbe-8999c06b4f92_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-15",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485623797_ca63ba95-91e6-464b-aa69-c33b028a278e.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080560470_ddd1fcb3-c697-4b68-97b1-5f59c1785c9f_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-16",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485614738_57d086fc-b048-4943-80ba-2e48eb216f79.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080559256_14815e68-76c4-4f4c-8991-323dbaa4c875_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-17",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485864339_9ebd6aeb-50d4-4a65-bcf6-5e8375e300d3.webp",
    src: "https://cdn2.videowise.com/converted/videos/1680194146380_4a1dfd25-f7cb-4f36-99b3-9f347213bd09_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-18",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485607620_ce8129d0-16a2-403d-9ef6-15f2d31ca9fb.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080553322_9cc8ec50-1e9b-4003-a64b-b7e5ead46693_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-19",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485604796_4f40348a-0122-4862-9991-381075c11974.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080003371_048b58f6-6a7b-42b9-bcdf-3497fb4566c9_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-20",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485973867_0371638d-c985-4dc3-880a-201d20ff0843.webp",
    src: "https://cdn2.videowise.com/converted/videos/1685495777020_4be03046-1648-42e3-8d35-8cc2988703fd_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-21",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485966523_e259ced8-349a-4757-8484-cbbede120591.webp",
    src: "https://cdn2.videowise.com/converted/videos/1685495788646_9c258eff-7927-476a-b762-a80b0f06d9b6_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-22",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485968766_cf0be9a8-a1de-43df-ab1b-4e216bc5870f.webp",
    src: "https://cdn2.videowise.com/converted/videos/1685495790866_dc5a4963-5545-4605-a051-037126fa3441_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-23",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486127842_b494c98a-fffc-4212-a210-fa087c5557a5.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511754055_118a8958-9318-41c7-a32d-7274fcd00e1f_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-24",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486148762_77c98016-f2cb-4ac8-ace0-858d47fa077f.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511755900_b02e84dc-b238-4083-8adc-bf1e03031116_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-25",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486133236_7778286b-f568-4290-9e0d-dbc77c7c059b.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511743499_33e12c2d-1a10-4f64-be09-d753d4993093_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-26",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486138545_f0794e86-5c68-4520-bf50-aab136b03516.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511747618_c7adc1a0-07e9-4168-b9a6-61ec3fa055dc_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-27",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486056792_591ed0b5-bfc7-4b3a-8157-697d2f003ee1.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511742070_88202514-7c65-4c97-91ea-6df0aa4491d5_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-28",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486143433_69a5ad16-e0be-41c5-80b5-2f984b593616.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511744702_3d725a4a-1a9b-4bfc-963b-687a7e9c1681_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-29",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486030997_e6361edb-97d6-4158-985a-5c39e242e738.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511740669_a9093ce7-c7f1-434f-92a0-663217393a67_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-30",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486133504_f0995a73-a08e-465b-b9dc-b6afd05afa47.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511736936_e8e21d3f-5411-4eae-9e30-6990bccbdb74_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-31",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486042898_a3733ea2-e5a4-4063-ab48-5969ea7c25fd.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511721203_4c27669b-75b8-4d66-b4db-014b87d8e851_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-32",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486031184_db6562f9-5414-468e-ab1e-2b3d3df446a9.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511718245_136b4b13-74af-4d7f-9a5b-202728b15358_h264q6clip.mp4#t=0.1",
  },
];

export const wavelengths: Wavelength[] = [
  {
    nm: "830nm",
    name: "INFRA-RED",
    color: "#a52c25",
    description: "Near-infrared support for deeper skincare rituals",
  },
  {
    nm: "633nm",
    name: "RED",
    color: "#d4523a",
    description: "Anti-aging and Revitilization",
  },
  {
    nm: "415nm",
    name: "BLUE",
    color: "#4a6acf",
    description: "Anti-acne Fighter",
  },
  {
    nm: "525nm",
    name: "GREEN",
    color: "#5cc987",
    description: "Reduces dark spots",
  },
  {
    nm: "490nm",
    name: "CYAN",
    color: "#5dc4d8",
    description: "Reduces Swollen capillaries",
  },
  {
    nm: "590nm",
    name: "YELLOW",
    color: "#e8c34a",
    description: "Balances skin texture",
  },
  {
    nm: "390nm",
    name: "PURPLE",
    color: "#8a52c0",
    description: "Red and Blue in one",
  },
  {
    nm: "510nm",
    name: "WHITE",
    color: "#f5f0e0",
    description: "Speed up skin metabolism",
  },
];

export const torchWavelengths: Wavelength[] = [
  {
    nm: "460nm",
    name: "BLUE",
    color: "#4a6acf",
    description: "Supports acne-focused routines and surface-level skin clarity.",
  },
  {
    nm: "630nm",
    name: "RED",
    color: "#d4523a",
    description: "Supports smoother-looking skin, fine-line care, and collagen rituals.",
  },
  {
    nm: "660nm",
    name: "DEEP RED",
    color: "#b9332c",
    description: "A deeper red wavelength for targeted body and skin wellness sessions.",
  },
  {
    nm: "850nm",
    name: "NIR",
    color: "#7a2b2b",
    description: "Near-infrared light for localized muscle stiffness and body relief routines.",
  },
  {
    nm: "900nm",
    name: "NIR+",
    color: "#4d2525",
    description: "Near-infrared support for deeper, focused application on body areas.",
  },
];

export const torchFeatures: Feature[] = [
  {
    title: "Compact Build",
    kicker: "4.92 inch handheld design",
    body: "Lightweight enough for home, the office, or travel, with durable one-button operation for quick targeted sessions.",
  },
  {
    title: "Clinical Strength",
    kicker: "3 visible and 2 invisible LEDs",
    body: "The T5 torch combines blue, red, deep red, and near-infrared wavelengths for a focused skin and body care routine.",
  },
  {
    title: "Precision Wavelengths",
    kicker: "460, 630, 660, 850, 900nm",
    body: "Use the specific wavelength blend for localized application on the face, back, knees, shoulders, hands, feet, or other target areas.",
  },
  {
    title: "Rapid Treatment",
    kicker: "Targeted 1 to 5 minute sessions",
    body: "Hold the torch over the target area for quick sessions, building gradually as your body gets used to red light therapy.",
  },
];

export const torchDetailImages = [
  {
    src: productAsset("09-buudy-red-torch-detail-wide.jpeg", "buudy-red-torch"),
    alt: "Buudy Red Torch detail image",
  },
  {
    src: productAsset("10-buudy-red-torch-wellness.jpeg", "buudy-red-torch"),
    alt: "Buudy Red Torch wellness use",
  },
  {
    src: productAsset("11-buudy-red-torch-treatment.jpeg", "buudy-red-torch"),
    alt: "Buudy Red Torch treatment application",
  },
];

export const torchHowToUse = [
  "Set up the red light therapy device on a chair, table, wall, or door, then uncover the target area before use.",
  "Position the device 4 to 6 inches away from the skin for best results.",
  "Treat each area that needs attention for 5 to 15 minutes, starting with 1 to 2 minutes per area.",
  "Increase time slowly over the next few weeks as your body gets used to red light therapy.",
  "Use four to ten times a week depending on your routine, allowing at least 6 hours between multiple daily sessions.",
];

export const torchFaqs: FAQItem[] = [
  {
    question: "How does this handheld light therapy device work?",
    answer:
      "The device uses LED technology with specific wavelengths: 460nm, 630nm, 660nm, 850nm, and 900nm. It emits blue, red, and near-infrared light for non-invasive application on body surfaces, where light energy may support local blood circulation and relieve muscle stiffness.",
  },
  {
    question: "Can I use this device on any part of my body?",
    answer:
      "Yes, the compact design allows localized application on most body areas, including the back, knees, and shoulders. Always follow the user manual for positioning and session duration.",
  },
  {
    question: "Can I use it in my country?",
    answer:
      "Yes. The Buudy Red Torch is dual voltage, which means it can be used worldwide without any issues.",
  },
  {
    question:
      "What if I am pregnant, sensitive to light, have epilepsy, or take light sensitive medication?",
    answer:
      "Consult your physician or another qualified healthcare professional before using LED products. People who may be sensitive to light, including women who are pregnant, people with epilepsy, or people taking medications such as tetracycline, steroids, or cortisone injections, should not use LED products without medical guidance.",
  },
  {
    question: "Do you sell this anywhere else?",
    answer:
      "The Buudy Red Torch is exclusively sold through buudy.com at approved clinics, salons, and spas with a strict MSRP. There are no other authorized online sites.",
  },
];

export const expertVideo = {
  poster: productAsset("dermatologist-video-poster.png"),
  src: productMediaAsset("Buudy Dermatologists Video.webm", "buudy-led-mask", "videos"),
};

export const comparison = {
  intro: "Here is a comparison, but really, there is no comparison.",
  columns: [
    { label: "Buudy", price: "$199", featured: true },
    { label: "Brand A", price: "$299" },
    { label: "Brand B", price: "$399" },
    { label: "Brand C", price: "$372" },
  ],
  rows: [
    ["Portable", "Hands-free, cordless and rechargeable", "-", "-", "-"],
    ["Light Colors", "7 total", "3 total", "1 total", "3 total"],
    ["Neck Coverage", "Yes", "-", "-", "-"],
    ["Customizable treatments", "Yes", "-", "-", "Yes"],
    ["Hands-free, cordless, rechargeable", "Yes", "Yes", "-", "-"],
    ["App companion (iPhone/Android)", "Yes", "-", "-", "-"],
    ["Treatment Time (Full Face + Neck)", "3 mins", "10 mins", "10 mins", "3 mins"],
  ],
};

export const touchTech = [
  {
    title: "Built-in Tap Tech",
    body: "Cycle through your personalized color treatments with just a gentle tap.",
  },
  {
    title: "Lightweight & Portable",
    body: "Take spa-quality treatments anywhere with the long-lasting rechargeable battery.",
  },
  {
    title: "Effortless Consistency",
    body: "Just put it on for 3 minutes a day and let the mask do the work while you watch your favorite show.",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "Does this cover the neck?",
    answer:
      "Yes, one of the best things about the Buudy LED Mask is that it covers your neck as well! So many LED masks neglect the neck entirely or do not include it.",
  },
  {
    question: "How many LEDs does the Buudy LED Mask have?",
    answer: "The Buudy LED Mask has 192 LEDs.",
  },
  {
    question: "What are the wavelengths? Irradiance / Power Density?",
    answer:
      "Red: 633nm. Blue: 415nm. Green: 525nm. Cyan: 490nm. Yellow: 590nm. Purple: 390nm. White: 510nm. Irradiance / Power Density: 32mW/cm2.",
  },
  {
    question: "Can I use it in my country?",
    answer:
      "Yes! The Buudy LED Mask is dual voltage which means it can be used worldwide without any issues.",
  },
  {
    question:
      "What if I am pregnant, sensitive to light, have epilepsy, or taking light sensitive medication?",
    answer:
      "We always recommend that you consult with your physician or other qualified health care professional before using LED products. Anyone who is potentially sensitive to light should take caution before using LED products. For example, women who are pregnant, people with epilepsy, or people who are taking certain medications such as tetracycline, steroids, or cortisone injections (which may cause light sensitivity) should not use LED products and must consult with their physician or healthcare provider.",
  },
  {
    question: "Do you sell this anywhere else?",
    answer:
      "The Buudy LED Mask is exclusively sold through buudy.com at approved clinics, salons, and spas with a strict MSRP. There are no other authorized online sites. You will also find Press links only taking you back to us.",
  },
];
