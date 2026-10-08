import type { Metadata } from "next";
import { SkincareQuizPage } from "@/components/quiz/SkincareQuizPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skincare Quiz and Simple Five-Day Plan",
  description:
    "Answer five short questions for a clear Buudy LED mask starting point, a simple first-week routine, and a free customer skincare guide.",
  alternates: {
    canonical: "/pages/skincare-quiz",
  },
  openGraph: {
    title: "Skincare Quiz and Simple Five-Day Plan | Buudy",
    description:
      "Find one clear starting mode and a manageable first-week skincare routine. Read the Buudy customer guide free.",
    url: absoluteUrl("/pages/skincare-quiz"),
  },
};

export default function Page() {
  return <SkincareQuizPage />;
}
