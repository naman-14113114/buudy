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
  fullName: string;
  age: number;
  skinType: string;
  routine: string;
  experience: string;
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
    body: "The face is only half the story. Unlike many popular brands that neglect the neck or charge extra for a separate attachment, Buudy includes integrated neck coverage. It is specifically designed to firm and rejuvenate the neck area, preventing ageing where it often shows most.",
  },
  {
    title: "7 LED Colours + NIR Multi-Spectrum",
    kicker: "Therapy in a single device",
    body: "Why settle for one or three colours? Buudy offers 7 visible wavelengths plus a dedicated 830nm near-infrared mode: Red, Blue, Green, Cyan, Yellow, Purple, White, and NIR. Whether you are fighting stubborn acne, reducing deep wrinkles, or supporting skin repair, you have a professional-grade solution for every skin concern.",
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
    title: "Buudy AI Companion App",
    kicker: "Your personal skincare coach",
    body: "Pair your mask with the free Buudy app at app.buudy.com for guided LED sessions, personalised treatment plans, and progress tracking. It walks you through each wavelength, times your sessions automatically, and adapts your routine as your skin improves.",
  },
];

export const iplFeatures: Feature[] = [
  {
    title: "Sapphire Ice-Cooling Technology",
    kicker: "Painless at 5°C",
    body: "Unlike traditional IPL devices that can cause burning or discomfort, our built-in Sapphire Ice-Cooling head maintains a consistent 5-8°C temperature. This instantly soothes the skin while the light pulses, ensuring a completely painless and comfortable hair removal experience even on sensitive areas.",
  },
  {
    title: "999,999 Lifetime Flashes",
    kicker: "No Refills Needed",
    body: "Never worry about running out of flashes. With up to 999,999 flashes, the Buudy IPL device provides enough pulses for a lifetime of full-body treatments for you and even your partner. It's a one-time investment that completely replaces expensive salon laser treatments.",
  },
  {
    title: "9 Adjustable Intensity Levels",
    kicker: "Customized for You",
    body: "Whether you're treating stubborn thick hair on your legs or fine hair on your upper lip, you can customize the power output with 9 distinct intensity levels. Start low for sensitive areas and increase the intensity for faster results on thicker hair.",
  },
  {
    title: "Dual Treatment Modes",
    kicker: "Auto & Manual Glide",
    body: "Use the Manual Mode for precision treatments on smaller areas like the bikini line, underarms, and face. Switch to Auto Glide Mode for effortless, continuous flashes while gliding the device across larger areas like your legs or back—completing a full body session in just 15 minutes.",
  },
  {
    title: "Visible Results in 4 Weeks",
    kicker: "Clinically Proven",
    body: "Our high-energy IPL targets the hair follicle at the root, breaking the cycle of hair growth. With consistent use, you will see a noticeable reduction in hair growth in just 4 weeks, leading to permanently smooth, hair-free skin.",
  },
];

export const serumFeatures: Feature[] = [
  {
    title: "100% Optical Permeability",
    kicker: "Zero-Scattering Hydrogel Matrix",
    body: "Unlike traditional serums loaded with silicones and oils that reflect up to 34% of therapeutic light, Buudy's 100% water-based matrix matches the refractive index of skin moisture (n ~ 1.33), allowing Red (630nm) and NIR (830nm) photons to penetrate directly into dermal fibroblasts.",
  },
  {
    title: "Multi-Molecular Hyaluronic Acid (2%)",
    kicker: "Deep Multi-Depth Dermal Plumping",
    body: "Combines low, medium, and high molecular weight hyaluronic acids. Low weights penetrate deep into extracellular matrices to bind water, while high weights protect the stratum corneum from warmth dehydration during 10-minute phototherapy sessions.",
  },
  {
    title: "Provitamin B5 & Sodium PCA",
    kicker: "72-Hour Moisture Reservoir",
    body: "Synergistic humectant complex draws in moisture from the air and locks it into intercellular lipid layers, relieving tight, dehydrated barriers and restoring supple elasticity without oiliness.",
  },
  {
    title: "Organic White Tea & Sage",
    kicker: "Antioxidant Barrier Defence",
    body: "Enriched with certified organic White Tea and Sage botanical extracts to defend against environmental oxidative stress, soothe micro-inflammation, and keep skin calm and luminous.",
  },
  {
    title: "Device & Diode Safe",
    kicker: "Zero Diode Clouding",
    body: "Completely oil-free, non-comedogenic, and non-sticky. Leaves zero greasy film on medical-grade silicone LED diodes and wipes clean in seconds with a damp cloth, safeguarding your LED mask investment.",
  },
  {
    title: "ECOCERT COSMOS Certified",
    kicker: "100% Natural Origin Formulation",
    body: "Free from parabens, synthetic fragrances, silicones, and mineral oils. Formulated in Europe under strict ECOCERT COSMOS standards to calm sensitive skin barriers and prevent thermal redness flush.",
  },
];

export const peptideSerumFeatures: Feature[] = [
  {
    title: "Bio-Fermented Hexapeptide-11",
    kicker: "Cellular Collagen Synthesis",
    body: "Powered by bio-fermented Hexapeptide-11, this advanced peptide communicates directly with dermal fibroblasts during the critical post-light window, accelerating structural collagen type I and III synthesis and smoothing expression lines.",
  },
  {
    title: "Dipalmitoyl Hydroxyproline",
    kicker: "Deep Wrinkle Remodelling & Firmness",
    body: "A plant-derived hydroxyproline amino acid vector that penetrates deep into dermal architecture. It reinforces collagen fibres, inhibits enzymatic degradation of elastin, and visibly lifts and tightens facial contours.",
  },
  {
    title: "Dual-Action Multi-Molecular HA",
    kicker: "Multi-Depth Hydration Reservoir",
    body: "Combines low and high molecular weight hyaluronic acids with Sodium PCA to draw moisture deep into intercellular matrices, replenishing volume and delivering immediate bouncy plumpness.",
  },
  {
    title: "Organic Blueberry & Ginkgo Biloba",
    kicker: "Antioxidant Barrier Defence",
    body: "Rich in anthocyanins and flavonoids from certified organic Blueberry fruit and Ginkgo Biloba extracts. Neutralises environmental free radicals, boosts microcirculation, and protects newly formed collagen fibres.",
  },
  {
    title: "Nourishing Jojoba & Strawberry Seed",
    kicker: "Lightweight Barrier Lipid Restoration",
    body: "Cold-pressed organic Jojoba and Strawberry seed oils restore vital skin lipids without heavy greasiness or pore congestion, locking in hydration and leaving a silky, velvet finish.",
  },
  {
    title: "ECOCERT COSMOS Natural Certified",
    kicker: "100% Natural Origin European Standard",
    body: "Formulated under Europe's most stringent organic cosmetics standards. 100% cruelty-free, vegan, and free from synthetic parabens, artificial fragrances, silicones, and mineral oils.",
  },
];

export const cleanserFeatures: Feature[] = [
  {
    title: "Sulphate-Free Micellar Cleansing",
    kicker: "Zero-Strip Moisture Balance",
    body: "Gentle plant-derived Coco-Glucoside and Cocamidopropyl Betaine surfactants create a delicate micro-foam that effortlessly dissolves excess sebum, environmental pollutants, and daily impurities without stripping the vital acid mantle.",
  },
  {
    title: "Organic Mate Leaf Extract",
    kicker: "Antioxidant & Blemish Soothing",
    body: "Rich in bioactive polyphenols and caffeine, organic Ilex Paraguariensis (Mate) leaf extract actively calms micro-inflammation, defends against oxidative cellular stress, and clarifies congested pores for a noticeably calmer complexion.",
  },
  {
    title: "Arctic Iceland Moss & Lichen",
    kicker: "Natural Antimicrobial Defence",
    body: "Sourced from pristine Nordic ecosystems, Cetraria Islandica and Usnea Barbata provide potent natural antibacterial lichen acids that help purge acne-triggering bacteria while establishing a protective, soothing moisture film.",
  },
  {
    title: "Alpine Juniper Callus Stem Cells",
    kicker: "Sebum & Pore Refining Matrix",
    body: "Cultivated using sustainable plant biotechnology, Juniperus Communis callus extract delivers concentrated secondary metabolites that help regulate overactive sebaceous glands and visibly tighten enlarged, congested pores.",
  },
  {
    title: "Natural Osmolytes (Glycerin & Sodium PCA)",
    kicker: "Deep Intercellular Hydration",
    body: "Infused with skin-identical physiological humectants that draw moisture deep into stratum corneum layers, ensuring skin emerges remarkably soft, supple, and hydrated after rinsing with zero tight, squeaky after-feel.",
  },
  {
    title: "415nm Blue Light & LED Primer",
    kicker: "Optimised Photon Penetration",
    body: "Formulated specifically as the essential pre-light cleansing step. By clearing light-scattering surface lipids, dead cells, and cosmetic residues, it ensures 100% of 415nm blue and 630nm red therapeutic photons penetrate unimpeded into target dermal tissue.",
  },
];

export const prebioticSerumFeatures: Feature[] = [
  {
    title: "2% Bioactive Prebiotics",
    kicker: "Microbiome Barrier Fortification",
    body: "Infused with a cosmeceutical-grade 2% concentration of Lactobacillus Ferment Lysate. Prebiotics nourish and balance beneficial skin microflora, reinforcing the natural cutaneous moisture barrier and calming reactivity against environmental aggressors.",
  },
  {
    title: "Dual Multi-Molecular Hyaluronic Acid",
    kicker: "Multi-Depth Weightless Plumping",
    body: "Combines hydrolyzed low-molecular and high-molecular sodium hyaluronate. Deeply hydrates cellular matrices to plump fine lines, soothe tightness, and lock in all-day moisture without heaviness or sticky residue.",
  },
  {
    title: "Physiological Osmolytes (Sodium PCA & Glycerin)",
    kicker: "72-Hour Moisture Reservoir",
    body: "Formulated with skin-identical natural moisturising factors (NMF) that bind environmental moisture into stratum corneum lipid bilayers, leaving sensitive and dehydrated skin feeling supple, soft, and refreshed.",
  },
  {
    title: "100% Optical Transparency",
    kicker: "Zero-Scattering LED Phototherapy Synergy",
    body: "100% water-based fluid jelly matrix matches the natural refractive index of skin moisture (n ~ 1.33). Free of light-scattering silicones and heavy oils, allowing 100% of 630nm Red, 415nm Blue, and 830nm Near-Infrared photons to reach dermal targets unhindered.",
  },
  {
    title: "Skin-Calibrated pH 4.5–5.1",
    kicker: "Acid Mantle & Barrier Defence",
    body: "Buffered to the physiological pH of healthy skin to sustain optimal microflora diversity, soothe redness, prevent moisture flaking, and maintain the protective lipid mantle.",
  },
  {
    title: "ECOCERT COSMOS Natural Certified",
    kicker: "99% Natural Origin European Standard",
    body: "Formulated under Europe's most stringent organic cosmetics standards. 99% natural origin, 10% organic ingredients, 100% vegan, cruelty-free, and packaged in recyclable heavy glass with a precision PP #5 dropper.",
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
    alt: "Buudy LED Mask anti-ageing mode",
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
    fullName: "Donna Parker",
    age: 52,
    skinType: "Dry, mature skin",
    routine:
      "Cleanse and dry the skin, use red and near-infrared light for 10 minutes four times a week, then apply a hydrating serum and moisturiser.",
    experience:
      "After eight weeks of consistent sessions, Donna felt that her cheeks and jawline looked firmer and more defined.",
  },
  {
    id: "result-02",
    image: productAsset("02-fine-lines.webp"),
    concern: "Fine Lines",
    title: "IT REALLY WORKS!!",
    quote:
      '"After using for 1 month, I cannot believe the difference! Fine lines are much less noticeable."',
    name: "Jane P.",
    fullName: "Jane Phillips",
    age: 46,
    skinType: "Normal-to-dry skin",
    routine:
      "Use red light on clean, dry skin for 10 minutes four times a week, followed by peptide serum and moisturiser, with SPF each morning.",
    experience:
      "After one month, Jane felt that the fine lines around her eyes and forehead looked softer and less noticeable.",
  },
  {
    id: "result-03",
    image: productAsset("03-neck-firming.webp"),
    concern: "Neck Firming",
    title: "Incredible results",
    quote:
      '"In less than 2 months, noticed the fine lines around my eyes and mouth are much less noticeable."',
    name: "Sarah K.",
    fullName: "Sarah King",
    age: 49,
    skinType: "Dry, sensitive skin",
    routine:
      "Treat the face and neck with red and near-infrared light for 10 minutes four times a week, then finish with a fragrance-free ceramide moisturiser.",
    experience:
      "Within two months, Sarah noticed that fine lines around her eyes, mouth, and neck looked less pronounced.",
  },
  {
    id: "result-04",
    image: productAsset("04-forehead-lines.webp"),
    concern: "Forehead Lines",
    title: "Better than Botox",
    quote:
      '"Within just a few weeks, my skin started to clear up and the scars began to fade."',
    name: "Michelle L.",
    fullName: "Michelle Lewis",
    age: 41,
    skinType: "Combination, acne-prone skin",
    routine:
      "Alternate blue and red modes for 10 minutes four times a week on freshly cleansed skin, followed by niacinamide and a light moisturiser.",
    experience:
      "After several weeks, Michelle felt that her skin looked clearer and the appearance of old blemish marks had begun to fade.",
  },
  {
    id: "result-05",
    image: productAsset("05-jawline-sculpting.webp"),
    concern: "Jawline Sculpting",
    title: "Defined my face!",
    quote:
      '"I never thought I would see my jawline again without surgery. This device is a total game changer."',
    name: "James D.",
    fullName: "James Davies",
    age: 44,
    skinType: "Normal skin",
    routine:
      "Use red and near-infrared light for 10 minutes four evenings a week after cleansing, then apply a lightweight moisturiser.",
    experience:
      "After eight weeks, James felt that his jawline looked more defined and his skin appeared firmer overall.",
  },
  {
    id: "result-06",
    image: productAsset("06-skin-radiance.webp"),
    concern: "Skin Radiance",
    title: "Literal Glow Up",
    quote:
      '"My skin looks so much more radiant and healthy. I have even stopped wearing heavy foundation!"',
    name: "Karen W.",
    fullName: "Karen Wilson",
    age: 38,
    skinType: "Dehydrated, dull skin",
    routine:
      "Use red light for 10 minutes five times a week on clean, dry skin, then follow with hyaluronic serum and moisturiser.",
    experience:
      "After five weeks, Karen noticed a brighter, more radiant appearance and felt comfortable wearing lighter foundation.",
  },
  {
    id: "result-07",
    image: productAsset("07-under-eye-bags.webp"),
    concern: "Under Eye Bags",
    title: "Eyes look refreshed",
    quote:
      '"The puffiness under my eyes has vanished. I look like I have actually had 8 hours of sleep!"',
    name: "Linda S.",
    fullName: "Linda Scott",
    age: 55,
    skinType: "Sensitive, mature skin",
    routine:
      "Use red and near-infrared light for 10 minutes four times a week, then apply a gentle eye cream and barrier-supporting moisturiser.",
    experience:
      "After six weeks, Linda felt that the under-eye area looked fresher and the appearance of puffiness was reduced.",
  },
  {
    id: "result-08",
    image: productAsset("08-skin-texture.webp"),
    concern: "Skin Texture",
    title: "Smooth as silk",
    quote:
      '"The overall texture of my skin has improved immensely. It feels incredibly soft and looks smooth."',
    name: "Jennifer H.",
    fullName: "Jennifer Harris",
    age: 36,
    skinType: "Combination skin with uneven texture",
    routine:
      "Use red light for 10 minutes four times a week after cleansing, followed by a barrier serum and non-comedogenic moisturiser.",
    experience:
      "After six weeks, Jennifer felt that her skin looked smoother and more even and felt noticeably softer.",
  },
];

export const serumTransformations: Transformation[] = [
  {
    id: "serum-result-01",
    image: "/images/products/buudy-serum/transformations/ha-transformation-01.webp",
    concern: "Dermal Hydration & Fine Line Smoothing",
    title: "Remarkable hydration and line smoothing",
    quote:
      '"My skin felt parched and dull with noticeable surface creases. Within 4 weeks of pairing this gel with red light, the dry lines completely flattened out."',
    name: "Clare M.",
    fullName: "Clare Mitchell",
    age: 46,
    skinType: "Dehydrated, fine-lined mature skin",
    routine:
      "Apply 2 pumps of Double Hydration Boost Gel to clean skin morning and evening; pre-treat skin before 10-minute Buudy Red Light (630nm) sessions 4x weekly.",
    experience:
      "Clinical photographic evaluation at day 28 demonstrated significant stratum corneum rehydration, visual softening of perioral and forehead micro-creases, and restored cellular plumpness.",
  },
  {
    id: "serum-result-02",
    image: "/images/products/buudy-serum/transformations/ha-transformation-02.webp",
    concern: "Cheek Turgor & Plumpness",
    title: "Visibly plumper cheeks and restored bounce",
    quote:
      '"The multi-molecular hyaluronic acid combined with red light therapy gave my cheek area back its youthful cushion and bounce."',
    name: "Hannah S.",
    fullName: "Hannah Scott",
    age: 42,
    skinType: "Normal to dry skin with loss of moisture cushion",
    routine:
      "2 pumps applied evenly over face and neck, followed by 10 minutes of Red & Near-Infrared phototherapy.",
    experience:
      "Lateral facial profiling revealed noticeable dermal redensification and improved surface turgor across the malar cheek area after 4 weeks of consistent application.",
  },
  {
    id: "serum-result-03",
    image: "/images/products/buudy-serum/transformations/ha-transformation-03.webp",
    concern: "Moisture Barrier Restoration & Deep Radiance",
    title: "Deep moisture glow with zero congestion",
    quote:
      '"Finding a hydrating gel that doesn\'t pill or cause breakouts under phototherapy was impossible until this. My skin barrier feels completely renewed."',
    name: "Amara D.",
    fullName: "Amara Davies",
    age: 38,
    skinType: "Fitzpatrick Type V, moisture-depleted combination skin",
    routine:
      "Daily AM & PM application on damp skin followed by lightweight barrier cream, plus 4x weekly Buudy 630nm/830nm LED sessions.",
    experience:
      "8-week serial photography demonstrated substantial restoration of epidermal moisture retention, unified tone clarity, and a healthy lit-from-within radiant glow.",
  },
  {
    id: "serum-result-04",
    image: "/images/products/buudy-serum/transformations/ha-transformation-04.webp",
    concern: "Periorbital Hydration & Under-Eye Smoothing",
    title: "Crow's feet look softer and deeply hydrated",
    quote:
      '"The fine crepiness under and around my eyes improved dramatically. The optical-grade gel lets every ray of red light sink in without reflection."',
    name: "Rachel T.",
    fullName: "Rachel Thompson",
    age: 50,
    skinType: "Dry, sensitive periorbital skin",
    routine:
      "Gentle press of 1 pump around eye contour and smile lines prior to 10-minute LED session, sealed with ceramide moisturiser.",
    experience:
      "High-magnification periorbital tracking confirmed reduction in micro-wrinkle depth and significant improvement in epidermal hydration across crow's feet and lower eyelid tissue.",
  },
];

export const peptideTransformations: Transformation[] = [
  {
    id: "peptide-result-01",
    image: "/images/products/buudy-peptide-serum/transformations/peptide-transformation-01.webp",
    concern: "Dynamic Expression Line Smoothing",
    title: "Expression lines visibly relaxed and smoothed",
    quote:
      '"The targeted hexapeptides act like a topical line relaxer. The deep creases radiating from my eye corners smoothed out noticeably within 4 weeks."',
    name: "Victoria W.",
    fullName: "Victoria Ward",
    age: 48,
    skinType: "Mature skin with dynamic expression lines",
    routine:
      "Apply 3–4 drops of Collagen-Lock Hexapeptide Serum morning and night, followed by 10 minutes of Red & Near-Infrared LED therapy 4x weekly.",
    experience:
      "Clinical macro photography showed significant attenuation of active crow's feet creasing and enhanced dermal elasticity after 28 days of targeted hexapeptide application.",
  },
  {
    id: "peptide-result-02",
    image: "/images/products/buudy-peptide-serum/transformations/peptide-transformation-02.webp",
    concern: "Skin Firmness & Wrinkle Smoothing",
    title: "Firmer dermal cushion and tightened temple area",
    quote:
      '"My skin has regained structural firmness that I thought was gone for good. Even my aesthetician remarked on the improved skin density."',
    name: "Gillian H.",
    fullName: "Gillian Hughes",
    age: 53,
    skinType: "Loss of elasticity, thinning mature skin",
    routine:
      "Morning and evening application focused on upper face and temples, paired with evening 630nm/830nm LED mask phototherapy.",
    experience:
      "High-resolution facial tracking documented measurable reduction in wrinkle surface area and visibly tighter periorbital skin architecture.",
  },
  {
    id: "peptide-result-03",
    image: "/images/products/buudy-peptide-serum/transformations/peptide-transformation-03.webp",
    concern: "Collagen Restoration & Under-Eye Density",
    title: "Restored collagen density and under-eye bounce",
    quote:
      '"Under-eye crepe paper skin was my biggest insecurity. This peptide concentrate rebuilt that supple cushion within 6 weeks."',
    name: "Eleanor B.",
    fullName: "Eleanor Bennett",
    age: 45,
    skinType: "Dehydrated, thin skin with under-eye crepiness",
    routine:
      "Smooth 2 drops around orbital rim and forehead lines, lock in with peptide cream following red/infrared light sessions.",
    experience:
      "Serial photographic analysis recorded an apparent surge in localised skin firmness, with significant smoothing of static under-eye lines and improved collagen structure.",
  },
  {
    id: "peptide-result-04",
    image: "/images/products/buudy-peptide-serum/transformations/peptide-transformation-04.webp",
    concern: "Elasticity Bounce & Nasolabial Firming",
    title: "Lifted mid-face and softened smile folds",
    quote:
      '"The difference in mid-face firmness and nasolabial fold depth is night and day. My jawline and cheeks look visibly lifted."',
    name: "Margaret C.",
    fullName: "Margaret Collins",
    age: 56,
    skinType: "Mature skin, loss of structural volume",
    routine:
      "Daily AM & PM application of Collagen-Lock Hexapeptide Booster over face and neck, with 10-minute Buudy 7-Colour LED Mask sessions 5x weekly.",
    experience:
      "Full-face standardized clinical assessment after 60 days demonstrated visible firming of the mid-face vectors, softened nasolabial folds, and restored facial contour definition.",
  },
];

export const cleanserTransformations: Transformation[] = [
  {
    id: "cleanser-result-01",
    image: "/images/products/buudy-face-wash/transformations/cleanser-transformation-01.webp",
    concern: "Cleared Blemish Breakouts & Acne Purifying",
    title: "Cleared cystic jawline blemishes in 4 weeks",
    quote:
      '"Most acne washes stripped my barrier raw. This purifying cleanser cleared my persistent inflammatory breakouts while leaving my face calm, soft, and balanced."',
    name: "Chloe M.",
    fullName: "Chloe Morris",
    age: 27,
    skinType: "Oily, breakout-prone sensitive skin",
    routine:
      "Massage 1–2 pumps on damp skin for 60 seconds AM & PM; rinse with lukewarm water, followed by 10 minutes of 415nm Blue Light therapy.",
    experience:
      "Clinical dermatological evaluation (Wellman Center photographic protocol) demonstrated rapid resolution of active inflammatory papules and pustules along the cheek and jawline with zero post-cleanse barrier tightness.",
  },
  {
    id: "cleanser-result-02",
    image: "/images/products/buudy-face-wash/transformations/cleanser-transformation-02.webp",
    concern: "Pore Refinement & Follicular Clearing",
    title: "Visibly tightened pores and calmed follicular acne",
    quote:
      '"The Iceland Moss and Mate Leaf purified my congested pores without stinging. My adult acne flare-ups subsided and my skin texture smoothed out completely."',
    name: "Nathan G.",
    fullName: "Nathan Green",
    age: 33,
    skinType: "Congested, combination acne-prone skin",
    routine:
      "Daily twice-daily cleanse, followed by Buudy Double Hydration Boost Gel and 10 minutes of Red/Blue LED phototherapy.",
    experience:
      "Standardised multi-week trial photography showed clear reduction in follicular congestion, visibly minimised pore diameter, and significant healing of persistent facial blemishes.",
  },
  {
    id: "cleanser-result-03",
    image: "/images/products/buudy-face-wash/transformations/cleanser-transformation-03.webp",
    concern: "Blackhead Clearing & Sebum Reduction",
    title: "Dissolved blackheads and eliminated T-zone shine",
    quote:
      '"My nose and chin were constantly bumpy with stubborn blackheads. Pairing this wash with blue light cleared the sebaceous plugs in less than 3 weeks."',
    name: "Jessica B.",
    fullName: "Jessica Bennett",
    age: 24,
    skinType: "Excess sebum, open comedones and blackheads",
    routine:
      "Gentle circular lather morning and night, followed by targeted 415nm blue light sessions on the T-zone.",
    experience:
      "Sebaceous follicular analysis recorded a dramatic reduction in active comedone counts, normalised lipid sebum output, and visibly purified mid-face skin texture.",
  },
  {
    id: "cleanser-result-04",
    image: "/images/products/buudy-face-wash/transformations/cleanser-transformation-04.webp",
    concern: "Papule Clearing & Complexion Clarifying",
    title: "Smooth, calm, clear skin without flaking",
    quote:
      '"It preps my skin perfectly before the LED mask. Removing the light-blocking oils made my blue and red light treatments work twice as fast."',
    name: "Gemma T.",
    fullName: "Gemma Taylor",
    age: 29,
    skinType: "Blemish-prone skin with post-breakout sensitivity",
    routine:
      "Pre-light cleanse with Blemish Purifying Face Wash, pat dry, 10 minutes Buudy 7-Colour LED Mask, followed by light moisturiser.",
    experience:
      "Serial clinical photography confirmed rapid clearing of erythematous papules, prevention of secondary pustular eruptions, and improved skin clarity across the cheeks.",
  },
];

export const prebioticTransformations: Transformation[] = [
  {
    id: "prebiotic-result-01",
    image: "/images/products/buudy-prebiotics-serum/transformations/prebiotic-transformation-01.webp",
    concern: "Redness & Persistent Rosacea Calming",
    title: "Calmed angry cheek flush and chronic erythema",
    quote:
      '"I struggled with persistent facial redness for years. The Lactobacillus Ferment Lysate extinguished the burning sensation and faded the red blotches in weeks."',
    name: "Laura K.",
    fullName: "Laura Kendrick",
    age: 39,
    skinType: "Reactive, rosacea-prone sensitive skin",
    routine:
      "Apply 3–4 drops of Bioactive Prebiotics Jelly Serum to damp skin AM & PM, paired with 10 minutes of Yellow (590nm) and Red (630nm) LED phototherapy.",
    experience:
      "Standardised clinical photography at 6 weeks demonstrated marked reduction in vascular erythema across the central cheek region, with sustained calming of reactive flares.",
  },
  {
    id: "prebiotic-result-02",
    image: "/images/products/buudy-prebiotics-serum/transformations/prebiotic-transformation-02.webp",
    concern: "Skin Barrier Repair & Perioral Sensitivity",
    title: "Repaired broken barrier and soothed flaking",
    quote:
      '"My skin barrier was stripped raw from harsh treatments. This soothing prebiotic gel rebuilt my protective mantle with zero stinging or grease."',
    name: "Sophie R.",
    fullName: "Sophie Richardson",
    age: 32,
    skinType: "Compromised, sensitised moisture barrier",
    routine:
      "Generous application morning and evening on clean face, followed by barrier-repair cream and Red light LED therapy.",
    experience:
      "High-magnification evaluation confirmed complete resolution of micro-flaking, accelerated epidermal healing, and restoration of the physiological acid mantle pH.",
  },
  {
    id: "prebiotic-result-03",
    image: "/images/products/buudy-prebiotics-serum/transformations/prebiotic-transformation-03.webp",
    concern: "Inflamed Barrier Repair & Diffuse Erythema",
    title: "Dramatic reduction in diffuse facial redness",
    quote:
      '"The cooling jelly absorbs immediately and creates a protective shield. The general red flush over my entire face calmed down visibly within 2 weeks."',
    name: "David P.",
    fullName: "David Phillips",
    age: 41,
    skinType: "Sensitive, easily flushed erythema-prone skin",
    routine:
      "2 pumps smoothed over freshly cleansed face before bedtime and prior to 10 minutes of soothing LED phototherapy.",
    experience:
      "Cross-polarised dermatological imaging revealed significant down-regulation of cutaneous inflammatory redness and strengthened epidermal moisture barrier integrity.",
  },
  {
    id: "prebiotic-result-04",
    image: "/images/products/buudy-prebiotics-serum/transformations/prebiotic-transformation-04.webp",
    concern: "Soothed Irritation & Reactive Flush Reduction",
    title: "Immediate comfort for irritated, stinging skin",
    quote:
      '"Whenever my skin acts up or feels sensitised by the weather, this jelly immediately restores equilibrium and cools the heat right out of my face."',
    name: "Emma L.",
    fullName: "Emma Lawson",
    age: 36,
    skinType: "Hyper-reactive, sensitive combination skin",
    routine:
      "Gentle press of 3 drops onto clean face and neck, followed by daily SPF and alternating Red/Blue LED light sessions.",
    experience:
      "Serial clinical monitoring documented a rapid decrease in cutaneous sensitivity scores, normalised skin microbiome balance, and uniform, healthy complexion tone.",
  },
];

export const reviewVideos: ReviewVideo[] = [
  {
    id: "review-01",
    poster: productMediaAsset("review-01.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-01.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-02",
    poster: productMediaAsset("review-02.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-02.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-03",
    poster: productMediaAsset("review-03.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-03.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-04",
    poster: productMediaAsset("review-04.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-04.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-05",
    poster: productMediaAsset("review-05.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-05.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-06",
    poster: productMediaAsset("review-06.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-06.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-07",
    poster: productMediaAsset("review-07.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-07.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-08",
    poster: productMediaAsset("review-08.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-08.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-09",
    poster: productMediaAsset("review-09.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-09.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-10",
    poster: productMediaAsset("review-10.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-10.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-11",
    poster: productMediaAsset("review-11.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-11.mp4", "buudy-led-mask", "videos"),
  },
  {
    id: "review-12",
    poster: productMediaAsset("review-12.webp", "buudy-led-mask", "videos"),
    src: productMediaAsset("review-12.mp4", "buudy-led-mask", "videos"),
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
    description: "Anti-ageing and Revitalisation",
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
    nm: "630nm",
    name: "RED",
    color: "#d4523a",
    description:
      "Supports smoother-looking skin, fine-line care, and collagen rituals.",
  },
  {
    nm: "660nm",
    name: "DEEP RED",
    color: "#b9332c",
    description:
      "A deeper red wavelength for targeted body and skin wellness sessions.",
  },
  {
    nm: "850nm",
    name: "NIR",
    color: "#7a2b2b",
    description:
      "Near-infrared light for localized muscle stiffness and body relief routines.",
  },
];

export const torchFeatures: Feature[] = [
  {
    title: "Compact Build",
    kicker: "12cm (4.72 in) handheld design",
    body: "Lightweight 74g design works at home, the office, or during travel, with durable one-button operation for quick targeted sessions.",
  },
  {
    title: "Clinical Strength",
    kicker: "3 precision wavelengths",
    body: "The torch combines red, deep red, and near-infrared wavelengths for a focused skin and body care routine.",
  },
  {
    title: "Precision Wavelengths",
    kicker: "630, 660, 850nm",
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
    src: productAsset(
      "07-buudy-red-light-torch-lifestyle-portable-relief.webp",
      "buudy-red-torch",
    ),
    alt: "Buudy LED Torch held by a woman for portable on-the-go body and skin wellness",
  },
  {
    src: productAsset(
      "08-buudy-red-light-torch-neck-targeted-wellness.webp",
      "buudy-red-torch",
    ),
    alt: "Woman using Buudy LED Torch with protective eyewear for targeted neck light therapy",
  },
  {
    src: productAsset(
      "11-buudy-red-light-torch-multi-body-treatment-grid.webp",
      "buudy-red-torch",
    ),
    alt: "Buudy LED Torch multi-zone application guide for elbow, hand, back, and knee relief",
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
      "The device uses LED technology with specific wavelengths: 630nm, 660nm, and 850nm. It emits red and near-infrared light for non-invasive application on body surfaces, where light energy may support local blood circulation and relieve muscle stiffness.",
  },
  {
    question: "Can I use this device on any part of my body?",
    answer:
      "Yes, the compact design allows localized application on most body areas, including the back, knees, and shoulders. Always follow the user manual for positioning and session duration.",
  },
  {
    question: "Can I use it in my country?",
    answer:
      "Yes. The Buudy LED Torch is dual voltage, which means it can be used worldwide without any issues.",
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
      "The Buudy LED Torch is exclusively sold through buudy.com at approved clinics, salons, and spas with a strict MSRP. There are no other authorized online sites.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order has been dispatched, you will receive a shipping confirmation email containing your tracking number and a link to track your parcel.",
  },
];

export const expertVideo = {
  poster: productAsset("dermatologist-video-poster.png"),
  src: productMediaAsset(
    "Buudy Dermatologists Video.webm",
    "buudy-led-mask",
    "videos",
  ),
};

export const comparison = {
  intro: "Here is a comparison, but really, there is no comparison.",
  columns: [
    { label: "Buudy", price: "£179", featured: true },
    { label: "Brand A", price: "£299" },
    { label: "Brand B", price: "£399" },
    { label: "Brand C", price: "£372" },
  ],
  rows: [
    ["Portable", "Hands-free, cordless and rechargeable", "-", "-", "-"],
    ["Light Colours", "7 LED Colours + NIR", "3 total", "1 total", "3 total"],
    ["Neck Coverage", "Yes", "-", "-", "-"],
    ["Customizable treatments", "Yes", "-", "-", "Yes"],
    ["Hands-free, cordless, rechargeable", "Yes", "Yes", "-", "-"],
    ["App companion (iPhone/Android)", "Yes", "-", "-", "-"],
    [
      "Treatment Time (Full Face + Neck)",
      "3 mins",
      "10 mins",
      "10 mins",
      "3 mins",
    ],
  ],
};

export const touchTech = [
  {
    title: "Built-in Tap Tech",
    body: "Cycle through your personalised colour treatments with just a gentle tap.",
  },
  {
    title: "Lightweight & Portable",
    body: "Take spa-quality treatments anywhere with the long-lasting rechargeable battery.",
  },
  {
    title: "Effortless Consistency",
    body: "Just put it on for 3 minutes a day and let the mask do the work while you watch your favourite show.",
  },
];

export const standardMaskFaqs: FAQItem[] = [
  {
    question: "Is Buudy the best LED face mask for UK buyers?",
    answer:
      "Buudy is designed for UK shoppers comparing LED face masks for anti-ageing, breakout-prone skin, and neck coverage. The mask combines 192 high-density LEDs with seven visible colours plus 830nm near-infrared, so one device can support red light firmness routines, blue light breakout routines, tone-balancing modes, and deeper near-infrared sessions. Unlike face-only masks, Buudy covers the jawline and neck, which matters because the neck often shows visible ageing early. It is cordless, rechargeable, and controlled with a simple tap system, making consistent at-home use easier than clinic appointments or wired masks. The current UK launch offer is £179 with a £449 compare-at price, free tracked UK shipping, a free glow kit while available, and an easy return and refund policy.",
  },
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
      "Infra-red: 830nm. Red: 633nm. Blue: 415nm. Green: 525nm. Cyan: 490nm. Yellow: 590nm. Purple: 390nm. White: 510nm. Irradiance / Power Density: 32mW/cm2.",
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
      "The Buudy LED Mask is exclusively sold through www.buudy.co.uk at approved clinics, salons, and spas with a strict MSRP. There are no other authorized online sites. You will also find Press links only taking you back to us.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order has been dispatched, you will receive a shipping confirmation email containing your tracking number and a link to track your parcel.",
  },
];

export const buudyLedMaskFaqs: FAQItem[] = [
  {
    question: "Is Buudy the best LED face mask for UK buyers?",
    answer:
      "Buudy is designed for UK shoppers comparing LED face masks for anti-ageing, breakout-prone skin, and neck coverage. The mask combines 192 high-density LEDs with seven visible colours plus 830nm near-infrared, so one device can support red light firmness routines, blue light breakout routines, tone-balancing modes, and deeper near-infrared sessions. Unlike face-only masks, Buudy covers the jawline and neck, which matters because the neck often shows visible ageing early. It is cordless, rechargeable, and controlled with a simple tap system, making consistent at-home use easier than clinic appointments or wired masks. The current UK launch offer is £179 with a £449 compare-at price, free tracked UK shipping, a free glow kit while available, and an easy return and refund policy.",
  },
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
      "Infra-red: 830nm. Red: 633nm. Blue: 415nm. Green: 525nm. Cyan: 490nm. Yellow: 590nm. Purple: 390nm. White: 510nm. Irradiance / Power Density: 32mW/cm2.",
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
      "The Buudy LED Mask is exclusively sold through www.buudy.co.uk at approved clinics, salons, and spas with a strict MSRP. There are no other authorized online sites. You will also find Press links only taking you back to us.",
  },
  {
    question: "Why is Cleopatra written on the mask?",
    answer:
      "This is the genuine Cleopatra Edition LED Face Mask, supplied and distributed exclusively by Buudy in the UK. When you order from Buudy, you receive the authentic clinical multi-spectrum mask, backed by our official UK warranty, fast tracked UK delivery, and dedicated local customer support.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order has been dispatched, you will receive a shipping confirmation email containing your tracking number and a link to track your parcel.",
  },
];

export const faqs: FAQItem[] = buudyLedMaskFaqs;

export const iplFaqs: FAQItem[] = [
  {
    question: "Does the ice cooling really make it painless?",
    answer: "Yes! The Buudy IPL device features an advanced sapphire ice-cooling head that lowers the temperature to 5-8°C during treatment. This counteracts the heat of the IPL flash, making the experience virtually painless, even on sensitive areas.",
  },
  {
    question: "How many flashes does it have?",
    answer: "The device comes packed with 999,999 flashes, which is enough for a lifetime of full-body treatments. You will never need to buy a replacement cartridge.",
  },
  {
    question: "How often should I use it?",
    answer: "For best results, we recommend using the device 2-3 times a week for the first 4 weeks, 1-2 times a week for weeks 5-8, and then just once a month for maintenance.",
  },
  {
    question: "Is it safe for my skin tone and hair colour?",
    answer: "IPL technology works best on high-contrast combinations, such as light skin with dark hair (black, brown, or dark blonde). It is less effective on very light blonde, red, or grey hair, and is not recommended for very dark skin tones due to the risk of burns.",
  },
  {
    question: "Can I use it on my face and bikini line?",
    answer: "Absolutely. The device has 9 adjustable intensity levels, allowing you to lower the power for sensitive areas like the upper lip, chin, and bikini line, while using higher power for legs and arms.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order has been dispatched, you will receive a shipping confirmation email containing your tracking number and a link to track your parcel.",
  },
];
