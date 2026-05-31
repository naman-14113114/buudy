export type QuizQuestionId =
  | "concern"
  | "eyes"
  | "skinType"
  | "pregnant"
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
  age: string;
};

export type QuizRoutineStep = {
  number: string;
  title: string;
  copy: string;
  highlighted?: boolean;
};

export type QuizResult = {
  profileTag: string;
  profileSummary: string;
  ledSetting: string;
  pregnancyWarning?: string;
  routine: QuizRoutineStep[];
};

export const emptyQuizAnswers: QuizAnswers = {
  concern: [],
  eyes: [],
  skinType: "",
  pregnant: "",
  age: "",
};

export const skincareQuizQuestions: QuizQuestion[] = [
  {
    id: "concern",
    title: "What are your main skin concerns?",
    subtitle: "Select all that apply.",
    selection: "multiple",
    options: [
      { value: "Acne-Prone", label: "Acne-Prone" },
      {
        value: "Dryness and Dehydration",
        label: "Dryness and Dehydration",
      },
      { value: "Dullness", label: "Dullness" },
      { value: "Early Signs of Aging", label: "Early Signs of Aging" },
      { value: "Hyperpigmentation", label: "Hyperpigmentation" },
      { value: "Mature Skin", label: "Mature Skin" },
      { value: "Oily Skin / Blackheads", label: "Oily Skin / Blackheads" },
      {
        value: "Sensitive / Rosacea-prone",
        label: "Sensitive / Rosacea-prone",
      },
    ],
  },
  {
    id: "eyes",
    title: "How about your eye area?",
    subtitle: "Select any that apply.",
    selection: "multiple",
    options: [
      { value: "Dark Circles", label: "Dark Circles" },
      {
        value: "Fine Lines and Wrinkles",
        label: "Fine Lines and Wrinkles",
      },
      { value: "Puffiness", label: "Puffiness" },
      {
        value: "No Eye Concern",
        label: "No Eye Concern",
        exclusive: true,
      },
    ],
  },
  {
    id: "skinType",
    title: "What best describes your skin type?",
    subtitle: "Select one option.",
    selection: "single",
    options: [
      {
        value: "Combination Skin",
        label: "Combination Skin",
        description:
          "Your T-zone gives you trouble occasionally. Larger pores on the forehead, nose, or chin, but cheeks may feel drier.",
      },
      {
        value: "Dry Skin",
        label: "Dry Skin",
        description:
          "Skin feels dull and has an unquenchable thirst. Flaky patches and a tight sensation are common.",
      },
      {
        value: "Normal Skin",
        label: "Normal Skin",
        description:
          "Lucky you. Skin is generally in good shape. You would like to start a routine because prevention is the best medicine.",
      },
      {
        value: "Oily Skin",
        label: "Oily Skin",
        description:
          "Non-stop shine and blotting throughout the day. Pesky pimples and clogged pores are constant companions.",
      },
    ],
  },
  {
    id: "pregnant",
    title: "Are you pregnant or breastfeeding?",
    subtitle: "We ask to ensure our recommendations are completely safe.",
    selection: "single",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
  {
    id: "age",
    title: "Knowing your age helps us tailor your routine.",
    subtitle: "Select your age range.",
    selection: "single",
    options: [
      { value: "18 - 24", label: "18 - 24" },
      { value: "25 - 34", label: "25 - 34" },
      { value: "35 - 44", label: "35 - 44" },
      { value: "45 - 54", label: "45 - 54" },
      { value: "55 - 64", label: "55 - 64" },
      { value: "65 - 74", label: "65 - 74" },
      { value: "75+", label: "75+" },
    ],
  },
];

