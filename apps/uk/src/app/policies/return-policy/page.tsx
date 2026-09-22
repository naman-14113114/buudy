import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Return Policy | Buudy",
  description: "Learn about the simple, stress-free return and refund policy for the Buudy LED Skincare Mask.",
  alternates: {
    canonical: "/policies/return-policy",
  },
};

export default function Page() {
  return <PolicyPage policyType="return-policy" />;
}
