import { languageAlternates } from "@/lib/international/markets";
import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping Policy | Buudy",
  description: "Detailed processing times, tracking rules, and free transit information for Buudy LED Skincare orders.",
  alternates: {
    canonical: "/policies/shipping-policy",
    languages: languageAlternates("/policies/shipping-policy"),
  },
};

export default function Page() {
  return <PolicyPage policyType="shipping-policy" />;
}
