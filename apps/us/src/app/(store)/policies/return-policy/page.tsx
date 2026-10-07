import { languageAlternates } from "@/lib/international/markets";
import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Return Policy | Buudy",
  description: "Review Buudy's return eligibility, authorization, refund timing and mandatory consumer rights before ordering.",
  alternates: {
    canonical: "/policies/return-policy",
    languages: languageAlternates("/policies/return-policy"),
  },
};

export default function Page() {
  return <PolicyPage policyType="return-policy" />;
}
