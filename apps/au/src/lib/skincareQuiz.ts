import type {
  QuizAnswers,
  QuizLightMode,
  QuizLightModeId,
  QuizPlanDay,
  QuizPlanItem,
  QuizResult,
} from "@/data/skincareQuiz";

export const allQuizLightModes: QuizLightMode[] = [
  { id: "red", name: "Red", wavelength: "633nm", swatch: "#b94742", purpose: "A starting option for firmness-focused routines" },
  { id: "blue", name: "Blue", wavelength: "415nm", swatch: "#526dc0", purpose: "A starting option for blemish-focused routines" },
  { id: "green", name: "Green", wavelength: "525nm", swatch: "#659b74", purpose: "A starting option for uneven-looking tone" },
  { id: "cyan", name: "Cyan", wavelength: "490nm", swatch: "#68aab0", purpose: "An option to discuss if your skin is reactive" },
  { id: "yellow", name: "Yellow", wavelength: "590nm", swatch: "#d5ae54", purpose: "A starting option for dull-looking skin" },
  { id: "purple", name: "Purple", swatch: "#9b6bac", purpose: "An additional mode in the device" },
  { id: "white", name: "White", swatch: "#e7e0d7", purpose: "An additional mode in the device" },
  { id: "nir", name: "Near-infrared", wavelength: "830nm", swatch: "#743744", purpose: "An additional mode in the device" },
];

const modeById = Object.fromEntries(
  allQuizLightModes.map((mode) => [mode.id, mode]),
) as Record<QuizLightModeId, QuizLightMode>;

const concernCopy: Record<string, { label: string; mode: QuizLightModeId }> = {
  "Acne-Prone": { label: "breakouts and blemishes", mode: "blue" },
  "Dryness and Dehydration": { label: "dryness and dehydration", mode: "red" },
  Dullness: { label: "dull-looking skin", mode: "yellow" },
  "Early Signs of Aging": { label: "early signs of ageing", mode: "red" },
  Hyperpigmentation: { label: "uneven-looking tone", mode: "green" },
  "Mature Skin": { label: "firmness", mode: "red" },
  "Oily Skin / Blackheads": { label: "oiliness and congestion", mode: "blue" },
  "Sensitive / Rosacea-prone": { label: "reactive or redness-prone skin", mode: "cyan" },
};

function getSkinBasics(skinType: string) {
  if (skinType === "Dry Skin") {
    return "Use a gentle cleanser and a moisturiser you already tolerate. Avoid leaving skin feeling stripped or tight.";
  }
  if (skinType === "Oily Skin") {
    return "Use a gentle cleanser and a light moisturiser you already tolerate. Avoid aggressive scrubbing.";
  }
  if (skinType === "Sensitive Skin") {
    return "Keep to familiar, fragrance-free products if those work for you. Pause if skin feels irritated.";
  }
  return "Cleanse gently and finish with a familiar moisturiser. Keep new actives out of the first week.";
}

function getSafetyState(answers: QuizAnswers) {
  const flags = answers.sensitivity.filter((flag) => flag !== "No sensitivity flag");
  const reactiveSkin = answers.skinType === "Sensitive Skin" || answers.concern.includes("Sensitive / Rosacea-prone");
  const ledUsePaused = answers.pregnant === "Yes" || flags.length > 0 || reactiveSkin;
  if (!ledUsePaused) return { ledUsePaused, safetyWarning: undefined };

  return {
    ledUsePaused,
    safetyWarning:
      "Your answers suggest checking with a qualified healthcare professional before using the LED mask. The plan below keeps the skincare steps, but pauses all light sessions until you have that advice.",
  };
}

function createDay(
  day: number,
  mode: QuizLightMode,
  answers: QuizAnswers,
  ledUsePaused: boolean,
): QuizPlanDay {
  const sessionDay = day === 1 || day === 3 || day === 5;
  const skinBasics = getSkinBasics(answers.skinType);
  const preference = answers.routineTime === "Flexible"
    ? "a time that works for you"
    : `${answers.routineTime.toLowerCase()} time`;
  const timeline: QuizPlanItem[] = sessionDay
    ? [
        {
          time: "Before",
          label: "Prepare",
          title: "Start with clean, dry skin",
          detail: skinBasics,
          kind: "skincare",
        },
        {
          time: ledUsePaused ? "Safety" : "Session",
          label: ledUsePaused ? "Safety pause" : "Your mask",
          title: ledUsePaused ? "Hold off on LED use" : `Explore ${mode.name} at ${preference}`,
          detail: ledUsePaused
            ? "Wait for individual advice before starting light therapy. You can still follow the gentle skincare steps."
            : "Follow the session length, frequency, fit and eye-protection instructions supplied with your device. Stop if you feel discomfort.",
          kind: "mask",
        },
        {
          time: "After",
          label: "Keep it simple",
          title: "Notice comfort, then moisturise",
          detail: ledUsePaused
            ? "Use a familiar moisturiser if your skin feels comfortable. Notice what helps your skin feel settled."
            : "Use a familiar moisturiser if your skin feels comfortable. Make a brief note about how the session felt.",
          kind: "skincare",
        },
      ]
    : [
        {
          time: "Morning",
          label: "Protect",
          title: "Cleanse, moisturise, and apply SPF",
          detail: skinBasics,
          kind: "skincare",
        },
        {
          time: "Rest",
          label: "Skin rhythm",
          title: "No LED session scheduled today",
          detail: "A rest day between sessions gives you a chance to see how your skin feels and settles.",
          kind: "recovery",
        },
        {
          time: "Evening",
          label: "Settle",
          title: "Wash away the day gently",
          detail: "Cleanse gently and apply your moisturiser. Keep the evening simple so your barrier stays calm.",
          kind: "skincare",
        },
      ];

  const focus = sessionDay ? `${mode.name} light session` : "Rest & support day";
  const summary = sessionDay
    ? `A planned ${mode.name.toLowerCase()} session for your skin priority.`
    : "Keep your skincare routine simple and let your skin rest.";

  return {
    day,
    title: `Day ${day}: ${focus}`,
    focus,
    summary,
    mode: sessionDay ? mode : undefined,
    timeline,
  };
}

export function buildSkincareQuizResult(answers: QuizAnswers): QuizResult {
  const primaryConcern = answers.concern[0] || "Early Signs of Aging";
  const config = concernCopy[primaryConcern] || concernCopy["Early Signs of Aging"];
  const primaryMode = modeById[config.mode];
  const { ledUsePaused, safetyWarning } = getSafetyState(answers);
  const starterPlan = [1, 2, 3, 4, 5].map((day) =>
    createDay(day, primaryMode, answers, ledUsePaused),
  );

  return {
    profileTag: config.label,
    profileSummary: `Your responses point to starting with ${primaryMode.name.toLowerCase()} light for ${config.label}. A gentle alternating pattern over five days gives your skin time to adjust.`,
    ledSetting: primaryMode.name,
    ledUsePaused,
    safetyWarning,
    recommendedModes: [primaryMode],
    starterPlan,
  };
}
