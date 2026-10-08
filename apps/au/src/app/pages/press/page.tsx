import type { Metadata } from "next";
import { PressPage } from "@/components/press/PressPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "In The Press | Buudy LED Light Therapy",
  description:
    "Discover various leading publications and media features where Buudy LED light therapy innovations have been spotted.",
  alternates: {
    canonical: "/pages/press",
  },
  openGraph: {
    title: "In The Press | Buudy",
    description:
      "Discover various leading publications and media features where Buudy LED light therapy innovations have been spotted.",
    url: absoluteUrl("/pages/press"),
    images: [
      {
        url: absoluteUrl("/images/press/vanity-fair-sept23.png"),
        width: 1200,
        height: 900,
        alt: "Buudy In The Press",
      },
    ],
  },
};

export default function Page() {
  return <PressPage />;
}
