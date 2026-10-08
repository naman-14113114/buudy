import { productMediaAsset } from "@/lib/media";

export type EbookChapter = {
  chapter: string;
  title: string;
  page: string;
  description: string;
  highlights: string[];
};

export type EbookPart = {
  partNumber: string;
  partTitle: string;
  pageRange: string;
  summary: string;
  iconName: "dna" | "spectrum" | "torch" | "compass" | "flask" | "sparkles";
  chapters: EbookChapter[];
};

export type EbookFaq = {
  question: string;
  answerHtml: string;
};

export const ebookParts: EbookPart[] = [
  {
    partNumber: "PART I",
    partTitle: "Cellular Science & Clinical Biology",
    pageRange: "Pages 4–8",
    summary:
      "The biophysical foundation of Photobiomodulation (PBM): how specific light photons stimulate mitochondrial ATP synthesis and trigger cellular regeneration.",
    iconName: "dna",
    chapters: [
      {
        chapter: "Ch 01",
        title: "The Physics of Photobiomodulation (Irradiance & Joules)",
        page: "Page 4",
        description:
          "Understand fluence, irradiance (mW/cm²), and the biphasic dose-response curve that separates clinical light therapy from superficial gimmicks.",
        highlights: ["Optical power density", "Biphasic dose curve", "Optimal light absorption"],
      },
      {
        chapter: "Ch 02",
        title: "The Biological Engine: Cytochrome c Oxidase & ATP",
        page: "Page 5",
        description:
          "How photons bind to Unit IV of the mitochondrial respiratory chain, boosting cellular energy, fibroblast motility, and collagen production.",
        highlights: ["Mitochondrial activation", "ATP energy surge", "Fibroblast stimulation"],
      },
      {
        chapter: "Ch 03",
        title: "Wavelength Depth Penetration Anatomical Map",
        page: "Page 6",
        description:
          "Visual cross-section mapping each nanometre depth—from 415nm epidermal acne defense to 830nm subcutaneous deep tissue regeneration.",
        highlights: ["Epidermis to dermis map", "Subcutaneous penetration", "Target tissue matching"],
      },
      {
        chapter: "Ch 04",
        title: "The 90-Day Cellular Transformation Timeline",
        page: "Page 7",
        description:
          "Realistic week-by-week biological milestones: Day 1–14 cellular awakening, Day 15–45 collagen scaffolding, Day 46–90 structural remodeling.",
        highlights: ["Week-by-week timeline", "Collagen maturation", "Sustained results"],
      },
      {
        chapter: "Ch 05",
        title: "Clinical Safety, Certifications & Eye Protection",
        page: "Page 8",
        description:
          "Photobiological safety standards, zero UV emission verification, built-in silicone eye cushions, and contraindication guidelines.",
        highlights: ["Zero UV guarantee", "Eye safety architecture", "Safe everyday use"],
      },
    ],
  },
  {
    partNumber: "PART II",
    partTitle: "The Buudy 7-Colour + NIR Spectrum Encyclopedia",
    pageRange: "Pages 9–18",
    summary:
      "Comprehensive deep dive into each therapeutic wavelength: biological mechanism, primary skin indications, and clinical session protocols.",
    iconName: "spectrum",
    chapters: [
      {
        chapter: "Ch 06",
        title: "633nm Deep Red Light (Anti-Ageing & Collagen Synthesis)",
        page: "Page 9",
        description:
          "The gold standard wavelength for stimulating type I pro-collagen, reducing wrinkle depth, and restoring skin elasticity.",
        highlights: ["Collagen stimulation", "Fine line smoothing", "Skin plumping"],
      },
      {
        chapter: "Ch 07",
        title: "830nm Near-Infrared Mode (Deep Dermal Structural Repair)",
        page: "Page 10",
        description:
          "Invisible deep-penetrating infrared light that accelerates microcirculation, lymphatic drainage, and elastin cross-linking.",
        highlights: ["Deepest tissue reach", "Elastin remodeling", "Microcirculation boost"],
      },
      {
        chapter: "Ch 08",
        title: "415nm Targeted Blue Light (Acne Bacteria Eradication)",
        page: "Page 11",
        description:
          "Excites endogenous porphyrins inside P. acnes bacteria to trigger singlet oxygen release, sterilizing active breakouts without drying the skin.",
        highlights: ["P. acnes destruction", "Blemish calming", "Sebum regulation"],
      },
      {
        chapter: "Ch 09",
        title: "525nm Green Light (Melanocyte & Dark Spot Control)",
        page: "Page 12",
        description:
          "Targets hyperactive melanocytes at the basal layer to fade sun spots, post-inflammatory hyperpigmentation (PIH), and uneven skin tone.",
        highlights: ["Melanocyte regulation", "Dark spot fading", "Even luminous tone"],
      },
      {
        chapter: "Ch 10",
        title: "490nm Cyan Light (Capillary Soothing & Rosacea)",
        page: "Page 13",
        description:
          "Dual-action wavelength that constricts dilated microcapillaries, reduces persistent erythema, and strengthens fragile barriers.",
        highlights: ["Redness reduction", "Capillary soothing", "Barrier comfort"],
      },
      {
        chapter: "Ch 11",
        title: "590nm Yellow Light (Lymphatic Detox & Radiance)",
        page: "Page 14",
        description:
          "Stimulates lymphatic drainage to clear cellular debris, depuff swollen morning contours, and restore healthy skin radiance.",
        highlights: ["Lymphatic drainage", "Morning depuffing", "Glow restoration"],
      },
      {
        chapter: "Ch 12",
        title: "390nm Purple Light (Dual Red/Blue Acne Synergy)",
        page: "Page 15",
        description:
          "Simultaneous anti-bacterial sterilisation and anti-inflammatory cellular repair for adult acne and persistent hormonal flare-ups.",
        highlights: ["Dual-action synergy", "Fast blemish recovery", "Post-acne mark repair"],
      },
      {
        chapter: "Ch 13",
        title: "510nm White Light (Cellular Turnover Booster)",
        page: "Page 16",
        description:
          "Full-spectrum penetration that optimizes overall cellular metabolism, tightens lax skin, and promotes rapid cellular renewal.",
        highlights: ["Full-spectrum boost", "Metabolic acceleration", "Skin firming"],
      },
      {
        chapter: "Ch 14",
        title: "Integrated Neck & Décolletage Coverage",
        page: "Page 17",
        description:
          "Why treating the neck and upper chest is non-negotiable for an even age profile, and how Buudy's extended shield eliminates disparity.",
        highlights: ["Full neck shield", "Tech-neck smoothing", "Unified age tone"],
      },
      {
        chapter: "Ch 15",
        title: "Mask Hardware Mastery & Maintenance",
        page: "Page 18",
        description:
          "Tap-control cycling, 1500mAh cordless battery management, sanitization best practices, and travel storage tips.",
        highlights: ["Tap controls", "Cordless freedom", "Hygienic cleaning"],
      },
    ],
  },
  {
    partNumber: "PART III",
    partTitle: "The Buudy LED Torch Targeted Powerhouse",
    pageRange: "Pages 19–24",
    summary:
      "How to harness the concentrated 7W optical power of your free companion LED Torch for stubborn spot treatments and full-body wellness.",
    iconName: "torch",
    chapters: [
      {
        chapter: "Ch 16",
        title: "Torch Engineering Specs & 7W High-Power Core",
        page: "Page 19",
        description:
          "Anodized aerospace aluminium housing, optical precision lens, high irradiance spot density, and magnetic wireless dock.",
        highlights: ["7W focused power", "Solid aluminium body", "Magnetic dock"],
      },
      {
        chapter: "Ch 17",
        title: "The Tri-Wavelength Optical Engine (630nm / 660nm / 850nm)",
        page: "Page 20",
        description:
          "Three simultaneous therapeutic wavelengths delivered in a concentrated beam for maximum photon absorption at target depths.",
        highlights: ["Triple wavelength beam", "Concentrated photon flux", "Rapid penetration"],
      },
      {
        chapter: "Ch 18",
        title: "Facial Precision Spot Protocols (Lines, Flares, Lip Lines)",
        page: "Page 21",
        description:
          "3-minute targeted spot routines for stubborn crow's feet, deep nasolabial folds, 11-lines, and emergency breakout calming.",
        highlights: ["Crow's feet & 11 lines", "Nasolabial spot treatment", "Emergency blemish protocol"],
      },
      {
        chapter: "Ch 19",
        title: "Full-Body Joint, Muscle & Tension Protocols",
        page: "Page 22",
        description:
          "How 850nm near-infrared photons penetrate deep into wrist joints, neck stiffness, shoulder knots, and post-workout soreness.",
        highlights: ["Joint comfort", "Muscle recovery", "Targeted body relief"],
      },
      {
        chapter: "Ch 20",
        title: "The 'Target & Flood' Dual-Device Methodology",
        page: "Page 23",
        description:
          "The clinic-inspired 2-step ritual: 3 minutes of high-intensity torch spot prep followed by 10 minutes of full-face mask flood light.",
        highlights: ["Clinic synergy", "2-step method", "Accelerated outcomes"],
      },
      {
        chapter: "Ch 21",
        title: "Battery Charging Dock & Safety Guidelines",
        page: "Page 24",
        description:
          "Operating parameters, direct contact recommendations, eye safety precautions, and battery care.",
        highlights: ["Wireless charging", "Skin contact guide", "Safety parameters"],
      },
    ],
  },
  {
    partNumber: "PART IV",
    partTitle: "Skin Diagnostics & Bespoke Clinical Pathways",
    pageRange: "Pages 25–32",
    summary:
      "5 goal-specific, step-by-step treatment pathways with exact weekly schedules, recommended light modes, and active ingredient pairings.",
    iconName: "compass",
    chapters: [
      {
        chapter: "Ch 22",
        title: "Diagnostic Self-Assessment Matrix",
        page: "Page 25",
        description:
          "Identify your primary skin phenotype, reactivity threshold, and lifestyle factors to select your ideal clinical protocol.",
        highlights: ["Phenotype matching", "Reactivity assessment", "Pathway selection"],
      },
      {
        chapter: "Ch 23",
        title: "Pathway 1 — Advanced Collagen Architecture (Age 35+)",
        page: "Page 26",
        description:
          "4-day weekly rotation: Red (633nm) + NIR (830nm) combined with copper peptides and hyaluronic acid for maximum structural firming.",
        highlights: ["4-day weekly plan", "Copper peptide synergy", "Deep line plumping"],
      },
      {
        chapter: "Ch 24",
        title: "Pathway 2 — Hormonal Blemish & Active Acne Eradication",
        page: "Page 27",
        description:
          "Targeted blue (415nm) and purple (390nm) alternating protocol to purge bacteria, clear congestion, and prevent post-acne scarring.",
        highlights: ["Anti-bacterial rotation", "Sebum balancing", "Scar prevention"],
      },
      {
        chapter: "Ch 25",
        title: "Pathway 3 — Melasma & Dark Spot Correction",
        page: "Page 28",
        description:
          "Green (525nm) and cyan (490nm) gentle non-thermal therapy paired with niacinamide and tranexamic acid to fade stubborn pigmentation.",
        highlights: ["Melanin suppression", "Non-thermal safety", "Niacinamide pairing"],
      },
      {
        chapter: "Ch 26",
        title: "Pathway 4 — Rosacea & Reactive Redness Calming",
        page: "Page 29",
        description:
          "Low-intensity cyan (490nm) and yellow (590nm) sessions to strengthen capillary walls and reduce flushing without heat accumulation.",
        highlights: ["Capillary resilience", "Anti-inflammatory calming", "Barrier relief"],
      },
      {
        chapter: "Ch 27",
        title: "Pathway 5 — Dull Skin Revival & Pre-Event Glow",
        page: "Page 30",
        description:
          "The 48-hour event protocol: Yellow (590nm) lymphatic flush + Red (633nm) collagen boost for instantly radiant, makeup-ready skin.",
        highlights: ["Instant radiance", "48-hour glow ritual", "Event preparation"],
      },
      {
        chapter: "Ch 28",
        title: "Decade-by-Decade Skincare Guidance (20s, 30s, 40s, 50s+)",
        page: "Page 31",
        description:
          "Tailored maintenance and prevention strategies calibrated for the biological cellular turnover rate of each age group.",
        highlights: ["20s prevention", "30s collagen maintenance", "40s & 50s+ restoration"],
      },
      {
        chapter: "Ch 29",
        title: "Eye Area Recovery Specialist Protocol",
        page: "Page 32",
        description:
          "Safe peri-orbital techniques for treating under-eye dark circles, morning puffiness, and dynamic expression lines.",
        highlights: ["Dark circle reduction", "Under-eye depuffing", "Peri-orbital safety"],
      },
    ],
  },
  {
    partNumber: "PART V",
    partTitle: "Ingredient Chemistry & Active Skincare Synergy",
    pageRange: "Pages 33–38",
    summary:
      "The scientific rules of what to apply before, during, and after your LED sessions to amplify results and avoid photo-reactions.",
    iconName: "flask",
    chapters: [
      {
        chapter: "Ch 30",
        title: "The Pre-Treatment Golden Rule: Clean, Bare Skin",
        page: "Page 33",
        description:
          "Why sunscreen, heavy oils, and opaque silicone primers reflect therapeutic photons, and how proper cleansing ensures 100% light transmission.",
        highlights: ["100% light transmission", "Clean skin protocol", "Zero optical barriers"],
      },
      {
        chapter: "Ch 31",
        title: "Hyaluronic Acid, Glycerin & Peptide Synergy",
        page: "Page 34",
        description:
          "Water-based hydrators that enhance optical refractive index and supercharge collagen synthesis during and immediately post-session.",
        highlights: ["Optical coupling", "Peptide absorption", "Deep hydration lock"],
      },
      {
        chapter: "Ch 32",
        title: "Retinoids, AHAs & BHAs: Safe Timing Protocols",
        page: "Page 35",
        description:
          "How to structure potent actives: never immediately before LED sessions; always apply 30–60 minutes post-treatment or on alternate evenings.",
        highlights: ["Active timing rules", "Zero irritation risk", "Maximum efficacy"],
      },
      {
        chapter: "Ch 33",
        title: "Vitamin C & Antioxidants: Morning Synergy",
        page: "Page 36",
        description:
          "Pairing stable L-ascorbic acid or THD ascorbate with morning red light to neutralize free radicals and fortify environmental defense.",
        highlights: ["Antioxidant defense", "Free radical protection", "Daytime glow"],
      },
      {
        chapter: "Ch 34",
        title: "Photosensitizing Ingredients to Avoid Before Sessions",
        page: "Page 35",
        description:
          "Comprehensive safety list: citrus essential oils, St. John's Wort, certain acne acids, and medications that increase photosensitivity.",
        highlights: ["Safety checklist", "Ingredient red flags", "Reaction prevention"],
      },
      {
        chapter: "Ch 35",
        title: "Post-Treatment Barrier Sealing & Ceramide Creams",
        page: "Page 37",
        description:
          "How to lock in the biological gains of your 10-minute ritual with ceramide-rich barrier creams and essential lipids.",
        highlights: ["Lipid restoration", "Moisture seal", "Barrier fortification"],
      },
    ],
  },
  {
    partNumber: "PART VI",
    partTitle: "The Buudy IPL Ritual & Lifestyle Protocols",
    pageRange: "Pages 39–42",
    summary:
      "Long-term wellness protocols, combining light therapy with IPL smooth skin routines, travel consistency, and troubleshooting.",
    iconName: "sparkles",
    chapters: [
      {
        chapter: "Ch 36",
        title: "Synergy with the Buudy IPL Hair Removal Ritual",
        page: "Page 39",
        description:
          "How to sequence IPL sessions with red/cyan LED recovery for ultra-smooth, calm, irritation-free skin from head to toe.",
        highlights: ["IPL sequencing", "Post-IPL calming", "Smooth skin synergy"],
      },
      {
        chapter: "Ch 37",
        title: "Weekly Treatment Planning Schedules & Trackers",
        page: "Page 40",
        description:
          "Printable / digital weekly treatment planners to track your sessions, light modes, and visible transformation over 90 days.",
        highlights: ["Weekly calendar", "Progress tracker", "Habit consistency"],
      },
      {
        chapter: "Ch 38",
        title: "Frequently Asked Questions & Troubleshooting",
        page: "Page 41",
        description:
          "Clinical answers to session frequency, combining multiple colours in one day, sharing devices with family members, and device care.",
        highlights: ["Expert troubleshooting", "Session frequency", "Device longevity"],
      },
    ],
  },
];

export const ebookData = {
  title: "The Clinical Light Masterclass",
  subtitle:
    "The Definitive Clinical Guide to 7-Colour Photobiomodulation, Precision Multi-Device Synergy & Active Skincare Chemistry",
  edition: "Official Customer Companion Edition",
  pdfFilename: "Buudy-Clinical-Skincare-Masterclass-Guide.pdf",
  pdfPath: "/Buudy-Clinical-Skincare-Masterclass-Guide.pdf",
  legacyPdfPath: "/Buudy-Clinical-Masterclass-EBook.pdf",
  fileSize: "1.5 MB",
  pageCount: "40+ Pages",
  chapterCount: "38 Clinical Chapters",
  coverImage: productMediaAsset("free_guide-v2.webp"),
  coverImageAlt: "The Clinical Light Masterclass E-Book Cover Preview",
  
  commitments: [
    {
      number: "01",
      title: "Uncompromising Optical Power",
      description:
        "192 high-density LED emitters calibrated to exact therapeutic nanometres, eliminating dead zones across the entire face and neck.",
    },
    {
      number: "02",
      title: "Complete Spectrum Freedom",
      description:
        "7 visible wavelengths plus dedicated 830nm Near-Infrared, giving you bespoke solutions for wrinkles, acne, dark spots, and redness.",
    },
    {
      number: "03",
      title: "The Target & Flood Protocol",
      description:
        "Master the clinical synergy between wide-field facial flood light (LED Mask) and high-power spot treatment (7W LED Torch).",
    },
    {
      number: "04",
      title: "Active Chemistry Transparency",
      description:
        "Exact biological mechanisms (Cytochrome c Oxidase & ATP), ingredient pairing charts, and clear 90-day timelines without guesswork.",
    },
  ],

  parts: ebookParts,

  faqs: [
    {
      question: "How do I download and save the E-Book to my phone or tablet?",
      answerHtml:
        "Simply tap the <strong>Download E-Book (PDF)</strong> button above. On iPhone/iPad, it will open directly in Safari where you can tap the Share button and select <em>Save to Files</em> or <em>Books</em>. On Android devices, it downloads immediately to your <em>Downloads</em> folder and can be opened in Google Drive, Adobe Acrobat, or any PDF reader.",
    },
    {
      question: "Is this E-Book completely free for all Buudy customers?",
      answerHtml:
        "Yes! The Clinical Light Masterclass is our official customer companion edition. It is included free with every Buudy LED Mask order (£19 / $19 standalone value), and we make the digital PDF freely accessible here for all our customers and community members worldwide.",
    },
    {
      question: "Can I read this guide before my Buudy LED Mask arrives in the post?",
      answerHtml:
        "Absolutely. In fact, we highly encourage reading <strong>Part I (Cellular Science)</strong> and <strong>Part IV (Bespoke Clinical Pathways)</strong> while your package is on its way. That way, you will know your exact skin pathway, ideal weekly schedule, and active ingredient pairings the moment you unbox your device.",
    },
    {
      question: "Can I print this E-Book at home?",
      answerHtml:
        "Yes. The PDF is rendered in standard high-resolution A4/Letter dimensions with clean typography, clear diagrams, and printable weekly calendar trackers in Part VI that you can pin to your bathroom mirror or vanity.",
    },
    {
      question: "What should I do if I have specific questions not covered in the guide?",
      answerHtml:
        "Our dedicated customer support team is always here to help. You can reach us anytime at <a href='mailto:support@buudy.co.uk' class='text-[var(--gold)] underline hover:text-[var(--plum)]'>support@buudy.co.uk</a> or visit our <a href='/pages/contact-us' class='text-[var(--gold)] underline hover:text-[var(--plum)]'>Contact Us</a> page for personalized guidance.",
    },
  ],
};
