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
        label: "Dryness and dehydration",
      },
      { value: "Dullness", label: "Dull or tired-looking skin" },
      { value: "Early Signs of Aging", label: "Early signs of ageing" },
      { value: "Hyperpigmentation", label: "Uneven tone and dark marks" },
      { value: "Mature Skin", label: "Loss of firmness" },
      { value: "Oily Skin / Blackheads", label: "Oiliness and blackheads" },
      {
        value: "Sensitive / Rosacea-prone",
        label: "Redness-prone or reactive skin",
      },
    ],
  },
  {
    id: "skinType",
    title: "How does your skin usually behave?",
    subtitle: "Choose the closest match. This changes cleansing and aftercare.",
    selection: "single",
    options: [
      {
        value: "Combination Skin",
        label: "Combination skin",
        description:
          "Oilier through the forehead, nose or chin, with cheeks that may feel normal or dry.",
      },
      {
        value: "Dry Skin",
        label: "Dry skin",
        description:
          "Often feels tight, looks dull or develops flaky patches.",
      },
      {
        value: "Normal Skin",
        label: "Balanced skin",
        description:
          "Generally comfortable with occasional changes rather than persistent oiliness or dryness.",
      },
      {
        value: "Oily Skin",
        label: "Oily skin",
        description:
          "Frequent shine, congestion or enlarged-looking pores.",
      },
      {
        value: "Sensitive Skin",
        label: "Sensitive skin",
        description:
          "Easily feels hot, tight, itchy or uncomfortable when products change.",
      },
    ],
  },
  {
    id: "pregnant",
    title: "Are you pregnant or breastfeeding?",
    subtitle: "We ask so the result can pause LED use and point you to professional advice when needed.",
    selection: "single",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    id: "sensitivity",
    title: "Do any light-sensitivity flags apply?",
    subtitle: "Select every relevant item. Safety takes priority over a recommendation.",
    selection: "multiple",
    options: [
      {
        value: "Photosensitising medication",
        label: "I use medication or skincare that can increase light sensitivity",
      },
      {
        value: "Epilepsy or seizure history",
        label: "I have epilepsy or a seizure history",
      },
      {
        value: "Light-triggered reaction",
        label: "Bright light can trigger headaches or skin reactions",
      },
      {
        value: "No sensitivity flag",
        label: "None of these apply",
        exclusive: true,
      },
    ],
  },
  {
    id: "routineTime",
    title: "When does a short routine fit your day?",
    subtitle: "We will use this as a reminder, not an exact appointment. Follow your device manual for session length.",
    selection: "single",
    options: [
      {
        value: "Morning",
        label: "Morning",
        description: "Before your usual daytime skincare and sun protection.",
      },
      {
        value: "Evening",
        label: "Evening",
        description: "After cleansing and before your usual moisturiser.",
      },
      {
        value: "Flexible",
        label: "My schedule changes",
        description: "Choose a comfortable time on each session day.",
      },
    ],
  },
];
