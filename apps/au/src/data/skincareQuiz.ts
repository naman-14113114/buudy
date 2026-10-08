export type QuizQuestionId =
  | "concern"
  | "skinType"
  | "pregnant"
  | "sensitivity"
  | "routineTime";

export type QuizOption = {
  value: string;
  label: string;
  description?: string;
  exclusive?: boolean;
};

export type QuizQuestion = {
  id: QuizQuestionId;
  title: string;
  subtitle: string;
  selection: "single" | "multiple";
  options: QuizOption[];
};

export type QuizAnswers = {
  concern: string[];
  skinType: string;
  pregnant: string;
  sensitivity: string[];
  routineTime: string;
};

export type QuizLightModeId =
  | "red"
  | "blue"
  | "green"
  | "cyan"
  | "yellow"
  | "purple"
  | "white"
  | "nir";

export type QuizLightMode = {
  id: QuizLightModeId;
  name: string;
  wavelength?: string;
  swatch: string;
  purpose: string;
};

export type QuizPlanItemKind =
  | "skincare"
  | "mask"
  | "food"
  | "movement"
  | "recovery";

export type QuizPlanItem = {
  time: string;
  label: string;
  title: string;
  detail: string;
  kind: QuizPlanItemKind;
};

export type QuizPlanDay = {
  day: number;
  title: string;
  focus: string;
  summary: string;
  mode?: QuizLightMode;
  timeline: QuizPlanItem[];
};

export type QuizResult = {
  profileTag: string;
  profileSummary: string;
  ledSetting: string;
  ledUsePaused: boolean;
  safetyWarning?: string;
  recommendedModes: QuizLightMode[];
  starterPlan: QuizPlanDay[];
};

export const emptyQuizAnswers: QuizAnswers = {
  concern: [],
  skinType: "",
  pregnant: "",
  sensitivity: [],
  routineTime: "",
};

export const skincareQuizQuestions: QuizQuestion[] = [
  {
    id: "concern",
    title: "What matters most to your skin right now?",
    subtitle: "Select your main concern first. You can add others, but we will keep your starting plan focused.",
    selection: "multiple",
    options: [
      { value: "Acne-Prone", label: "Breakouts and blemishes" },
      {
        value: "Dryness and Dehydration",
        label: "Dryness and comfortable hydration",
      },
      { value: "Dullness", label: "Dull-looking skin and radiance" },
      { value: "Early Signs of Aging", label: "Early fine lines and smoothing" },
      {
        value: "Hyperpigmentation",
        label: "Uneven-looking tone and sun spots",
      },
      { value: "Mature Skin", label: "Firmness and elasticity support" },
      { value: "Oily Skin / Blackheads", label: "Oiliness and congestion" },
      {
        value: "Sensitive / Rosacea-prone",
        label: "Reactive or redness-prone skin",
      },
    ],
  },
  {
    id: "skinType",
    title: "How does your skin feel most days?",
    subtitle: "This helps frame how you cleanse and moisturise around light sessions.",
    selection: "single",
    options: [
      {
        value: "Normal Skin",
        label: "Balanced",
        description: "Generally comfortable without feeling tight or very oily.",
      },
      {
        value: "Dry Skin",
        label: "Dry or tight",
        description: "Needs rich hydration and can feel rough or flaky.",
      },
      {
        value: "Oily Skin",
        label: "Oily or shiny",
        description: "Prone to shine and visible congestion through the day.",
      },
      {
        value: "Combination Skin",
        label: "Combination",
        description: "Oily through the T-zone with drier cheeks.",
      },
      {
        value: "Sensitive Skin",
        label: "Sensitive",
        description: "Easily flushes, stings, or reacts to new products.",
      },
    ],
  },
  {
    id: "pregnant",
    title: "Are you pregnant or nursing?",
    subtitle: "LED light safety is not established for pregnancy, so we recommend caution first.",
    selection: "single",
    options: [
      { value: "No", label: "No" },
      { value: "Yes", label: "Yes" },
      { value: "Prefer not to say", label: "Prefer not to say" },
    ],
  },
  {
    id: "sensitivity",
    title: "Do any light-sensitivity flags apply?",
    subtitle: "Select anything that applies. If none do, choose that option to continue.",
    selection: "multiple",
    options: [
      {
        value: "No sensitivity flag",
        label: "None of these apply",
        exclusive: true,
      },
      {
        value: "Light-sensitising medication",
        label: "Taking medication that causes light sensitivity",
        description: "Examples include certain antibiotics, retinoids, or steroids.",
      },
      {
        value: "History of seizures or epilepsy",
        label: "History of seizures or light-triggered epilepsy",
      },
      {
        value: "Active rash, wound, or unknown skin condition",
        label: "Active rash, broken skin, or unassessed lesion",
      },
    ],
  },
  {
    id: "routineTime",
    title: "When is it easiest to take five minutes?",
    subtitle: "Consistency matters far more than the exact time of day.",
    selection: "single",
    options: [
      {
        value: "Morning",
        label: "Morning",
        description: "A calm start before makeup or sunscreen.",
      },
      {
        value: "Evening",
        label: "Evening",
        description: "Part of winding down before sleep.",
      },
      {
        value: "Flexible",
        label: "Whenever fits the day",
        description: "Ready to adapt as time allows.",
      },
    ],
  },
];
