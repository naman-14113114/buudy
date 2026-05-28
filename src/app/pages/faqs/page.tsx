import type { Metadata } from "next";
import { FaqPage } from "@/components/faq/FaqPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Help & Support - Buudy",
  description:
    "Find answers to shipping policies, return policies, order tracking, payment methods, and technical questions about the Buudy LED Skincare Mask.",
  alternates: {
    canonical: "/pages/faqs",
  },
  openGraph: {
    title: "Buudy Help Center | Frequently Asked Questions",
    description:
      "Find answers to shipping policies, return policies, order tracking, payment methods, and technical questions about the Buudy LED Skincare Mask.",
    url: "https://buudy.com/pages/faqs",
  },
};

export default function Page() {
  return <FaqPage />;
}
