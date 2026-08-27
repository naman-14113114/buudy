import type {
  QuizAnswers,
  QuizLightMode,
  QuizLightModeId,
  QuizPlanDay,
  QuizPlanItem,
  QuizResult,
} from "@/data/skincareQuiz";

type SkinRoutine = {
  cleanser: string;
  morning: string;
  aftercare: string;
  recovery: string;
};

type RoutineTimes = {
  morning: string;
  meal: string;
  movement: string;
  prep: string;
  mask: string;
  aftercare: string;
  sleep: string;
};

export const allQuizLightModes: QuizLightMode[] = [
  {
    id: "red",
    name: "Red",
    wavelength: "633nm",
    swatch: "oklch(58% 0.19 28)",
    purpose: "Firmness and smoother-looking skin support",
  },
  {
    id: "blue",
    name: "Blue",
    wavelength: "415nm",
    swatch: "oklch(55% 0.18 250)",
    purpose: "A focused mode for blemish-prone routines",
  },
  {
    id: "green",
    name: "Green",
    wavelength: "525nm",
    swatch: "oklch(66% 0.13 150)",
    purpose: "Uneven-looking tone and visible dark-mark support",
  },
  {
    id: "cyan",
    name: "Cyan",
    wavelength: "490nm",
    swatch: "oklch(72% 0.12 205)",
    purpose: "A gentler-looking option for reactive-skin routines",
  },
  {
    id: "yellow",
    name: "Yellow",
    wavelength: "590nm",
    swatch: "oklch(79% 0.15 88)",
    purpose: "Dullness and comfort-focused routine support",
  },
  {
    id: "purple",
    name: "Purple",
    swatch: "oklch(58% 0.16 305)",
    purpose: "A secondary mode for blemish-mark routines",
  },
  {
    id: "white",
    name: "White",
    swatch: "oklch(94% 0.02 85)",
    purpose: "A broad-spectrum option for future routine rotation",
  },
  {
    id: "nir",
    name: "Near-infrared",
    wavelength: "830nm",
    swatch: "oklch(36% 0.12 18)",
    purpose: "Deeper light support for firmness-focused routines",
  },
];

const modeById = Object.fromEntries(
  allQuizLightModes.map((mode) => [mode.id, mode]),
) as Record<QuizLightModeId, QuizLightMode>;

const concernLabels: Record<string, string> = {
  "Acne-Prone": "breakouts",
  "Dryness and Dehydration": "dryness",
  Dullness: "dullness",
  "Early Signs of Aging": "early signs of ageing",
  Hyperpigmentation: "uneven tone",
  "Mature Skin": "firmness",
  "Oily Skin / Blackheads": "oiliness and congestion",
  "Sensitive / Rosacea-prone": "redness-prone skin",
};

function addModes(target: QuizLightModeId[], modes: QuizLightModeId[]) {
  modes.forEach((mode) => {
    if (!target.includes(mode)) {
      target.push(mode);
    }
  });
}

function getRecommendedModes(answers: QuizAnswers) {
  const modes: QuizLightModeId[] = [];
  const concerns = answers.concern;

  if (
    concerns.includes("Acne-Prone") ||
    concerns.includes("Oily Skin / Blackheads")
  ) {
    addModes(modes, ["blue", "purple", "red"]);
  }

  if (
    concerns.includes("Early Signs of Aging") ||
    concerns.includes("Mature Skin") ||
    answers.eyes.includes("Fine Lines and Wrinkles")
  ) {
    addModes(modes, ["red", "nir", "yellow"]);
  }

  if (
    concerns.includes("Hyperpigmentation") ||
    concerns.includes("Dullness")
  ) {
    addModes(modes, ["green", "yellow", "white"]);
  }

  if (concerns.includes("Sensitive / Rosacea-prone")) {
    addModes(modes, ["cyan", "yellow", "red"]);
  }

  if (concerns.includes("Dryness and Dehydration")) {
    addModes(modes, ["red", "yellow", "white"]);
  }

  if (answers.eyes.includes("Dark Circles") || answers.eyes.includes("Puffiness")) {
    addModes(modes, ["yellow", "cyan"]);
  }

  if (modes.length === 0) {
    addModes(modes, ["red", "green", "yellow", "nir"]);
  }

  return modes.slice(0, 6).map((mode) => modeById[mode]);
}

function getSkinRoutine(skinType: string): SkinRoutine {
  switch (skinType) {
    case "Dry Skin":
      return {
        cleanser: "Use a fragrance-free cream or milky cleanser, then pat dry without rubbing.",
        morning:
          "Apply a hydrating serum with glycerin or hyaluronic acid, a ceramide moisturiser, then broad-spectrum SPF 50.",
        aftercare:
          "Apply a simple hydrating serum to slightly damp skin and seal it with a ceramide-rich moisturiser.",
        recovery:
          "Keep the recovery evening simple: gentle cleanse, hydrating serum and a barrier-supporting moisturiser.",
      };
    case "Oily Skin":
      return {
        cleanser: "Use a gentle gel cleanser and rinse thoroughly, without scrubbing or trying to strip every trace of oil.",
        morning:
          "Use a lightweight niacinamide serum if already tolerated, an oil-free moisturiser, then broad-spectrum SPF 50.",
        aftercare:
          "Use a light, non-comedogenic moisturiser. Keep strong exfoliating acids and retinoids away from the mask session.",
        recovery:
          "Choose a calm recovery routine with a gentle cleanse and lightweight moisturiser. Avoid adding another exfoliation step.",
      };
    case "Combination Skin":
      return {
        cleanser: "Use a mild gel cleanser, concentrating on the T-zone while treating the cheeks gently.",
        morning:
          "Use a light hydrating serum, moisturise dry areas more generously, then apply broad-spectrum SPF 50 everywhere.",
        aftercare:
          "Apply a light lotion across the face, adding a second thin layer only where the cheeks feel tight.",
        recovery:
          "On the recovery evening, skip exfoliation and use the same balanced lotion across the face.",
      };
    case "Sensitive Skin":
      return {
        cleanser: "Use a fragrance-free, low-foam cleanser with lukewarm water and pat the skin dry.",
        morning:
          "Keep layers minimal: a familiar barrier serum or moisturiser followed by broad-spectrum SPF 50.",
        aftercare:
          "Use only products your skin already tolerates, preferably a fragrance-free barrier moisturiser.",
        recovery:
          "Make this a full barrier evening with no acids, scrubs, retinoids or newly introduced products.",
      };
    default:
      return {
        cleanser: "Use a gentle daily cleanser and make sure the skin is completely clean and dry.",
        morning:
          "Apply a familiar antioxidant or hydrating serum, moisturiser and broad-spectrum SPF 50.",
        aftercare:
          "Use a familiar hydrating serum and moisturiser, keeping the routine uncomplicated after light therapy.",
        recovery:
          "Use a gentle cleanse and moisturiser only, giving the skin a quiet evening between sessions.",
      };
  }
}

function getRoutineTimes(routineTime: string): RoutineTimes {
  if (routineTime === "Morning") {
    return {
      morning: "07:00",
      meal: "12:30",
      movement: "18:00",
      prep: "07:00",
      mask: "07:15",
      aftercare: "07:30",
      sleep: "22:30",
    };
  }

  if (routineTime === "Evening") {
    return {
      morning: "07:30",
      meal: "12:30",
      movement: "17:45",
      prep: "19:50",
      mask: "20:00",
      aftercare: "20:15",
      sleep: "22:30",
    };
  }

  return {
    morning: "07:30",
    meal: "12:30",
    movement: "18:00",
    prep: "19:20",
    mask: "19:30",
    aftercare: "19:45",
    sleep: "22:30",
  };
}

function getEyeRecovery(eyes: string[]) {
  if (eyes.includes("No Eye Concern")) {
    return "Keep the eye area comfortable and protected with SPF. Do not stare directly at the LEDs and use the supplied eye protection as directed.";
  }

  const tips: string[] = [];

  if (eyes.includes("Dark Circles")) {
    tips.push("keep wake and sleep times consistent");
  }

  if (eyes.includes("Puffiness")) {
    tips.push("use a cool compress for five minutes after waking");
  }

  if (eyes.includes("Fine Lines and Wrinkles")) {
    tips.push("apply a familiar peptide or hydrating eye product after, not before, the mask");
  }

  return `${tips.join(", ")}. Use the supplied eye protection as directed and never stare directly at the LEDs.`;
}

const mealGuidance = [
  "Build one meal around a protein source plus vitamin C-rich fruit or vegetables, such as eggs with peppers or yoghurt with berries. Keep water visible and sip regularly.",
  "Choose a balanced plate with an omega-3 or plant-fat source, such as salmon, chia, walnuts or olive oil, plus vegetables and a steady carbohydrate.",
  "Make fibre the anchor today with beans, lentils, oats or whole grains and at least two differently coloured vegetables. Adapt this to allergies and dietary needs.",
  "Choose a lower-sugar lunch or snack by pairing carbohydrate with protein or fat. This is a consistency habit, not a restrictive diet rule.",
  "Repeat the balanced meal that felt easiest this week. Aim for regular meals and enough water rather than a complicated skin detox.",
];

const movementGuidance = [
  "Take a brisk 20-minute walk. If you sweat, rinse or cleanse afterwards so perspiration is not left sitting on the skin.",
  "Complete 10 minutes of mobility plus a 15-minute walk. Keep intensity comfortable enough that the habit is easy to repeat.",
  "Use a recovery pace: an easy 20-minute walk and five minutes of slow breathing or stretching.",
  "Choose 20 to 25 minutes of movement you enjoy. Cleanse away sweat and keep the skin bare for any later mask session.",
  "Pair 15 minutes of walking with five minutes of neck and shoulder mobility to close the starter week without overcomplicating it.",
];

function createRestDay(
  day: number,
  skinRoutine: SkinRoutine,
  times: RoutineTimes,
  eyeRecovery: string,
): QuizPlanDay {
  return {
    day,
    title: "Barrier recovery day",
    focus: "Let consistency do the work",
    summary:
      "No mask session today. The pause keeps the starter programme measured while skincare, food, movement and sleep stay on schedule.",
    timeline: [
      {
        time: times.morning,
        label: "Morning skincare",
        title: "Protect the barrier",
        detail: skinRoutine.morning,
        kind: "skincare",
      },
      {
        time: times.meal,
        label: "Food habit",
        title: "Build a colourful plate",
        detail: mealGuidance[day - 1],
        kind: "food",
      },
      {
        time: times.movement,
        label: "Movement",
        title: "Active recovery",
        detail: movementGuidance[day - 1],
        kind: "movement",
      },
      {
        time: times.mask,
        label: "No LED today",
        title: "Keep the evening gentle",
        detail: skinRoutine.recovery,
        kind: "recovery",
      },
      {
        time: times.sleep,
        label: "Wind-down",
        title: "Protect tomorrow's routine",
        detail: `${eyeRecovery} Aim for a consistent sleep window that gives you roughly seven to nine hours if that is suitable for you.`,
        kind: "recovery",
      },
    ],
  };
}

function createTreatmentDay({
  day,
  focus,
  mode,
  skinRoutine,
  times,
  eyeRecovery,
  ledUsePaused,
  routineTime,
}: {
  day: number;
  focus: string;
  mode: QuizLightMode;
  skinRoutine: SkinRoutine;
  times: RoutineTimes;
  eyeRecovery: string;
  ledUsePaused: boolean;
  routineTime: string;
}): QuizPlanDay {
  const modeLabel = `${mode.name}${mode.wavelength ? ` ${mode.wavelength}` : ""}`;
  const prepItem: QuizPlanItem = {
    time: times.prep,
    label: "Mask preparation",
    title: "Clean, bare and completely dry",
    detail: `${skinRoutine.cleanser} Do not apply oils, makeup, acids, retinoids or unfamiliar products before the session.`,
    kind: "skincare",
  };
  const maskItem: QuizPlanItem = ledUsePaused
    ? {
        time: times.mask,
        label: "Safety pause",
        title: `${modeLabel} is reserved for later`,
        detail:
          "Do not begin the LED session until a qualified healthcare professional has confirmed it is appropriate for your circumstances. Continue the non-LED parts of the plan.",
        kind: "mask",
      }
    : {
        time: times.mask,
        label: "Buudy mask",
        title: `10 minutes with ${modeLabel}`,
        detail: `Fit the mask comfortably, use the supplied eye protection as directed and select ${mode.name}. Use one 10-minute session only, never more than once in a day, and keep at least 24 hours between sessions. If the device manual gives a different instruction, follow the manual.`,
        kind: "mask",
      };
  const aftercareItem: QuizPlanItem = {
    time: times.aftercare,
    label: "Aftercare",
    title: routineTime === "Morning" ? "Hydrate, then protect" : "Hydrate and close the routine",
    detail:
      routineTime === "Morning"
        ? `${skinRoutine.aftercare} Finish with broad-spectrum SPF 50 before daylight exposure.`
        : skinRoutine.aftercare,
    kind: "skincare",
  };
  const morningItem: QuizPlanItem = {
    time: times.morning,
    label: "Morning skincare",
    title: "Start with daily protection",
    detail: skinRoutine.morning,
    kind: "skincare",
  };
  const mealItem: QuizPlanItem = {
    time: times.meal,
    label: "Food habit",
    title: "Support a repeatable day",
    detail: mealGuidance[day - 1],
    kind: "food",
  };
  const movementItem: QuizPlanItem = {
    time: times.movement,
    label: "Movement",
    title: "Move, then cleanse if needed",
    detail: movementGuidance[day - 1],
    kind: "movement",
  };
  const sleepItem: QuizPlanItem = {
    time: times.sleep,
    label: "Wind-down",
    title: "Make recovery visible",
    detail: `${eyeRecovery} Keep the final 30 minutes calm and aim for a consistent sleep time.`,
    kind: "recovery",
  };

  const timeline =
    routineTime === "Morning"
      ? [prepItem, maskItem, aftercareItem, mealItem, movementItem, sleepItem]
      : [morningItem, mealItem, movementItem, prepItem, maskItem, aftercareItem, sleepItem];

  return {
    day,
    title: `${mode.name} focus`,
    focus,
    summary: `${modeLabel} is in this day because your answers prioritised ${focus.toLowerCase()}. ${mode.purpose}.`,
    mode,
    timeline,
  };
}

function getProfileTag(concerns: string[]) {
  const labels = concerns.map((concern) => concernLabels[concern] ?? concern);

  return labels.length > 2
    ? `${labels[0]}, ${labels[1]} +${labels.length - 2}`
    : labels.join(" and ");
}

function getSafetyState(answers: QuizAnswers) {
  const sensitivityFlags = answers.sensitivity.filter(
    (flag) => flag !== "No sensitivity flag",
  );
  const ledUsePaused = answers.pregnant === "Yes" || sensitivityFlags.length > 0;

  if (!ledUsePaused) {
    return { ledUsePaused, safetyWarning: undefined };
  }

  const reasons = [
    answers.pregnant === "Yes" ? "pregnancy or breastfeeding" : "",
    ...sensitivityFlags.map((flag) => flag.toLowerCase()),
  ].filter(Boolean);

  return {
    ledUsePaused,
    safetyWarning: `Your answers flagged ${reasons.join(", ")}. The LED steps are paused until a qualified healthcare professional confirms that light therapy and your current products or medication are appropriate for you.`,
  };
}

export function buildSkincareQuizResult(answers: QuizAnswers): QuizResult {
  const recommendedModes = getRecommendedModes(answers);
  const skinRoutine = getSkinRoutine(answers.skinType);
  const times = getRoutineTimes(answers.routineTime);
  const eyeRecovery = getEyeRecovery(answers.eyes);
  const safety = getSafetyState(answers);
  const concerns = answers.concern.map(
    (concern) => concernLabels[concern] ?? concern.toLowerCase(),
  );
  const rotation = [
    recommendedModes[0],
    recommendedModes[1] ?? recommendedModes[0],
    recommendedModes[2] ?? recommendedModes[0],
    recommendedModes[3] ?? recommendedModes[1] ?? recommendedModes[0],
  ];
  const focus = (index: number) =>
    concerns[index] ?? concerns[0] ?? "a balanced glow routine";

  const starterPlan: QuizPlanDay[] = [
    createTreatmentDay({
      day: 1,
      focus: `A calm baseline for ${focus(0)}`,
      mode: rotation[0],
      skinRoutine,
      times,
      eyeRecovery,
      ledUsePaused: safety.ledUsePaused,
      routineTime: answers.routineTime,
    }),
    createTreatmentDay({
      day: 2,
      focus: `A targeted follow-up for ${focus(1)}`,
      mode: rotation[1],
      skinRoutine,
      times,
      eyeRecovery,
      ledUsePaused: safety.ledUsePaused,
      routineTime: answers.routineTime,
    }),
    createRestDay(3, skinRoutine, times, eyeRecovery),
    createTreatmentDay({
      day: 4,
      focus: `A second route into ${focus(2)}`,
      mode: rotation[2],
      skinRoutine,
      times,
      eyeRecovery,
      ledUsePaused: safety.ledUsePaused,
      routineTime: answers.routineTime,
    }),
    createTreatmentDay({
      day: 5,
      focus: `A consistency session for ${focus(0)}`,
      mode: rotation[3],
      skinRoutine,
      times,
      eyeRecovery,
      ledUsePaused: safety.ledUsePaused,
      routineTime: answers.routineTime,
    }),
  ];

  return {
    profileTag: getProfileTag(answers.concern),
    profileSummary: `Your ${answers.age} profile combines ${answers.skinType.toLowerCase()} with ${concerns.join(", ")}. The timetable is anchored to your ${answers.routineTime.toLowerCase()} preference and includes ${answers.eyes.includes("No Eye Concern") ? "preventive eye-area care" : "specific eye-area recovery habits"}.`,
    ledSetting: recommendedModes
      .map((mode) => `${mode.name}${mode.wavelength ? ` ${mode.wavelength}` : ""}`)
      .join(", "),
    ledUsePaused: safety.ledUsePaused,
    safetyWarning: safety.safetyWarning,
    recommendedModes,
    starterPlan,
  };
}
