import type { Metadata } from "next";
import { SkincareQuizPage } from "@/components/quiz/SkincareQuizPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personalised Skincare Quiz and 5-Day Plan",
  description:
    "Build a personalised five-day Buudy LED mask calendar with timed light sessions, skincare, food, movement and recovery guidance.",
  alternates: {
    canonical: "/pages/skincare-quiz",
  },
  openGraph: {
    title: "Personalised Skincare Quiz and 5-Day Plan | Buudy",
    description:
      "Unlock a detailed five-day LED mask calendar shaped around your skin concerns, schedule and safety profile.",
    url: absoluteUrl("/pages/skincare-quiz"),
  },
};

export default function Page() {
  return <SkincareQuizPage />;
}
