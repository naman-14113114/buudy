import type { QuizAnswers, QuizResult } from "@/data/skincareQuiz";

type SkinRoutine = {
  prep: string;
  protect: string;
};

function getLedRecommendation(concerns: string[]) {
  if (
    concerns.includes("Acne-Prone") ||
    concerns.includes("Oily Skin / Blackheads")
  ) {
    return {
      setting: "Blue Light (415nm) & Purple Light",
      details:
        "Blue light is clinically proven to target and destroy acne-causing bacteria beneath the skin surface. Alternate with Purple light to heal existing blemishes and prevent future breakouts.",
    };
  }

  if (
    concerns.includes("Early Signs of Aging") ||
    concerns.includes("Mature Skin")
  ) {
    return {
      setting: "Red Light (633nm)",
      details:
        "Red light penetrates deep into the dermis to stimulate natural collagen production, reduce fine lines, and firm up sagging skin for a youthful appearance.",
    };
  }

  if (
    concerns.includes("Hyperpigmentation") ||
    concerns.includes("Dullness")
  ) {
    return {
      setting: "Green Light (525nm) & White Light",
      details:
        "Green light breaks down melanin clusters to fade dark spots and even skin tone. White light accelerates skin metabolism for a radiant, healthy glow.",
    };
  }

  if (concerns.includes("Sensitive / Rosacea-prone")) {
    return {
      setting: "Cyan Light (490nm) & Yellow Light (590nm)",
      details:
        "Cyan reduces swollen capillaries and calms inflammation, while Yellow light flushes toxins and balances skin texture to relieve redness quickly.",
    };
  }

  return {
    setting: "Red Light (633nm)",
    details:
      "The gold standard for maintaining collagen levels, boosting hydration, and keeping your complexion healthy and radiant.",
  };
}

function getSkinRoutine(skinType: string): SkinRoutine {
  switch (skinType) {
    case "Dry Skin":
      return {
        prep: "Use a gentle, milky cleanser.",
        protect:
          "Apply a Hyaluronic Acid serum on damp skin to draw in moisture. Seal your routine with a rich ceramide cream to protect your barrier.",
      };
    case "Oily Skin":
      return {
        prep: "Double cleanse in the evenings.",
        protect:
          "Incorporate Niacinamide to regulate sebum production naturally, and finish with a lightweight, oil-free gel moisturizer.",
      };
    case "Combination Skin":
      return {
        prep: "Balance is key. Use a mild foaming cleanser.",
        protect:
          "Spot-treat your oily T-zone and apply a medium-weight lotion to your drier cheeks.",
      };
    default:
      return {
        prep: "Maintain your healthy barrier with a gentle cleanser.",
        protect:
          "Use a daily antioxidant serum, like Vitamin C, and SPF 50 every morning.",
      };
  }
}

function getEyeTips(eyes: string[]) {
  if (eyes.includes("No Eye Concern")) {
    return "Keep up the good work. Protect your delicate eye area with SPF daily to prevent future damage and thinning of the skin.";
  }

  return `To target your ${eyes
    .join(" and ")
    .toLowerCase()}, ensure you get adequate rest and apply a caffeine or peptide-based eye cream before your LED treatment to boost circulation.`;
}

function getProfileTag(concerns: string[]) {
  return concerns.length > 2
    ? `${concerns[0]}, ${concerns[1]} +${concerns.length - 2}`
    : concerns.join(", ");
}

export function buildSkincareQuizResult(answers: QuizAnswers): QuizResult {
  const led = getLedRecommendation(answers.concern);
  const skinRoutine = getSkinRoutine(answers.skinType);
  const eyeTips = getEyeTips(answers.eyes);

  return {
    profileTag: getProfileTag(answers.concern),
    profileSummary: `Based on your profile (Age: ${answers.age}, ${answers.skinType}), we have formulated the perfect clinical home-routine for you.`,
    ledSetting: led.setting,
    pregnancyWarning:
      answers.pregnant === "Yes"
        ? "Because you are pregnant or breastfeeding, we strongly advise consulting your physician before using LED Light Therapy or introducing new active ingredients."
        : undefined,
    routine: [
      {
        number: "01",
        title: "Prep & Cleanse",
        copy: `${skinRoutine.prep} Make sure your face is completely clean and dry before light therapy for maximum light penetration.`,
      },
      {
        number: "02",
        title: "Buudy LED Therapy (10 Mins)",
        copy: `${led.details} Use 3-4 times a week for best results.`,
        highlighted: true,
      },
      {
        number: "03",
        title: "Hydrate & Protect",
        copy: `${skinRoutine.protect} Don't forget your eye area: ${eyeTips}`,
      },
    ],
  };
}

