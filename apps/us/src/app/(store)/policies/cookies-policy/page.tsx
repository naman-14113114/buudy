import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Cookies Policy | Buudy",
  description: "How Buudy utilizes secure cookies to enhance, personalize and optimize your online storefront experience.",
  alternates: {
    canonical: "/policies/cookies-policy",
  },
};

export default function Page() {
  return <PolicyPage policyType="cookies-policy" />;
}
