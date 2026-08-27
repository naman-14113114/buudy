export type QuizQuestionId =
  | "concern"
  | "eyes"
  | "skinType"
  | "pregnant"
  | "sensitivity"
  | "routineTime"
  | "age";

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
  eyes: string[];
  skinType: string;
  pregnant: string;
  sensitivity: string[];
  routineTime: string;
  age: string;
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
  eyes: [],
  skinType: "",
  pregnant: "",
  sensitivity: [],
  routineTime: "",
  age: "",
};

export const skincareQuizQuestions: QuizQuestion[] = [
  {
    id: "concern",
    title: "What would you most like to improve?",
    subtitle: "Select every concern that matters to you. We use the full mix in your plan.",
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
    id: "eyes",
    title: "What does your eye area need?",
    subtitle: "Select any that apply so the routine includes the right recovery habits.",
    selection: "multiple",
    options: [
      { value: "Dark Circles", label: "Dark circles" },
      {
        value: "Fine Lines and Wrinkles",
        label: "Fine lines",
      },
      { value: "Puffiness", label: "Puffiness" },
      {
        value: "No Eye Concern",
        label: "No specific eye concern",
        exclusive: true,
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
    subtitle: "This adds the appropriate safety pause to your programme.",
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
    title: "When can you consistently make ten minutes?",
    subtitle: "Your answer sets the exact times in the first five days.",
    selection: "single",
    options: [
      {
        value: "Morning",
        label: "Morning, between 7am and 9am",
        description: "Best if you prefer to finish treatment before SPF and the day begins.",
      },
      {
        value: "Evening",
        label: "Evening, between 7pm and 10pm",
        description: "Best if you want to cleanse, use the mask and complete aftercare together.",
      },
      {
        value: "Flexible",
        label: "My schedule changes",
        description: "We will use a flexible evening anchor that can move by up to one hour.",
      },
    ],
  },
  {
    id: "age",
    title: "Which age range should the plan consider?",
    subtitle: "This adjusts recovery, firmness and consistency guidance.",
    selection: "single",
    options: [
      { value: "18 - 24", label: "18 to 24" },
      { value: "25 - 34", label: "25 to 34" },
      { value: "35 - 44", label: "35 to 44" },
      { value: "45 - 54", label: "45 to 54" },
      { value: "55 - 64", label: "55 to 64" },
      { value: "65 - 74", label: "65 to 74" },
      { value: "75+", label: "75+" },
    ],
  },
];
