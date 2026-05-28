import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Refund Policy | Buudy",
  description: "Conditions regarding order cancellations, adjustments, and refunds for Buudy Light Therapy purchases.",
  alternates: {
    canonical: "/policies/refund-policy",
  },
};

export default function Page() {
  return <PolicyPage policyType="refund-policy" />;
}
