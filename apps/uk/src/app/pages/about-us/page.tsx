import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | UK LED Skincare Store - Buudy",
  description:
    "Learn about Buudy, our team of skincare advocates, our story of wire-free LED mask innovation, and our mission to make high-quality light therapy routines simple and effective.",
  alternates: {
    canonical: "/pages/about-us",
  },
  openGraph: {
    title: "About Buudy | High-Performance LED Skincare",
    description:
      "Learn about our team of skincare advocates, our story of wire-free LED mask innovation, and our mission to deliver visible results.",
    url: absoluteUrl("/pages/about-us"),
  },
};

export default function Page() {
  return <AboutPage />;
}
