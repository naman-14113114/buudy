import type { Metadata } from "next";
import { SkincareQuizPage } from "@/components/quiz/SkincareQuizPage";

export const metadata: Metadata = {
  title: "Personalized Skincare Quiz",
  description:
    "Take the Buudy skincare quiz to match your concerns with a personalized LED light therapy and daily skincare routine.",
  alternates: {
    canonical: "/pages/skincare-quiz",
  },
  openGraph: {
    title: "Personalized Skincare Quiz | Buudy",
    description:
      "Build a personalized LED light therapy and daily skincare routine in 60 seconds.",
    url: "https://buudy.com/pages/skincare-quiz",
  },
};

export default function Page() {
  return <SkincareQuizPage />;
}

