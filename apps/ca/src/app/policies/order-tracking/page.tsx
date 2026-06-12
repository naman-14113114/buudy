import type { Metadata } from "next";
import { OrderTrackingPage } from "@/components/policies/OrderTrackingPage";

export const metadata: Metadata = {
  title: "Order Tracking | Buudy",
  description: "Locate your Buudy LED Mask order status, shipment timeline, and official carrier tracking updates.",
  alternates: {
    canonical: "/policies/order-tracking",
  },
};

export default function Page() {
  return <OrderTrackingPage />;
}
