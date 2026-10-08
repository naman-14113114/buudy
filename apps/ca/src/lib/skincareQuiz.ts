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
          time: "Today",
          label: "Rest day",
          title: "Give your skin an easy day",
          detail: `${skinBasics} You do not need to make up a missed session or rotate through more colours.`,
          kind: "recovery",
        },
      ];

  return {
    day,
    title: sessionDay ? (ledUsePaused ? "Skincare and safety check" : `${mode.name} starting day`) : "Rest and skincare",
    focus: sessionDay
      ? ledUsePaused
        ? "Pause light use for now"
        : day === 1
          ? "Try one comfortable session"
          : "Repeat only if it felt right"
      : "A useful day without LED",
    summary: sessionDay
      ? ledUsePaused
        ? "This light session is paused. Keep the simple skincare steps and seek individual advice first."
        : `Your quiz points to ${mode.name} as a starting mode. Use your device manual for timing and frequency; this is a suggestion, not a treatment prescription.`
      : "Rest days help you judge comfort and keep the routine manageable.",
    mode: sessionDay && !ledUsePaused ? mode : undefined,
    timeline,
  };
}

export function buildSkincareQuizResult(answers: QuizAnswers): QuizResult {
  const primary = concernCopy[answers.concern[0]] ?? concernCopy.Dullness;
  const secondary = answers.concern
    .slice(1)
    .map((concern) => concernCopy[concern])
    .find((concern) => concern && concern.mode !== primary.mode);
  const recommendedModes = [modeById[primary.mode], ...(secondary ? [modeById[secondary.mode]] : [])];
  const safety = getSafetyState(answers);

  return {
    profileTag: primary.label,
    profileSummary: `Your main concern is ${primary.label}. You described your skin as ${answers.skinType.toLowerCase()}. Keep the first week simple.${secondary ? ` You can revisit ${secondary.label} later.` : ""}`,
    ledSetting: recommendedModes.map((mode) => mode.name).join(" and "),
    ledUsePaused: safety.ledUsePaused,
    safetyWarning: safety.safetyWarning,
    recommendedModes,
    starterPlan: Array.from({ length: 5 }, (_, index) =>
      createDay(index + 1, modeById[primary.mode], answers, safety.ledUsePaused),
    ),
  };
}
