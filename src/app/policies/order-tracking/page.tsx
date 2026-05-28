import type { Metadata } from "next";
import { OrderTrackingPage } from "@/components/policies/OrderTrackingPage";

export const metadata: Metadata = {
  title: "Order Tracking | Buudy",
  description: "Locate your shipment status, transit timeline, and review DHL tracking updates for your Buudy LED Mask order.",
  alternates: {
    canonical: "/policies/order-tracking",
  },
};

export default function Page() {
  return <OrderTrackingPage />;
}
