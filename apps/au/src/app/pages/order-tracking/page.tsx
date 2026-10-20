import type { Metadata } from "next";
import { OrderTrackingPage } from "@/components/order-tracking/OrderTrackingPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Tracking | Buudy Australia",
  description:
    "Track your Buudy LED Mask or torch order in real-time. Enter your tracking number or order number for up-to-date delivery progress.",
  alternates: {
    canonical: "/order-tracking",
  },
  openGraph: {
    title: "Order Tracking | Buudy Australia",
    description:
      "Track your Buudy LED Mask or torch order in real-time. Enter your tracking number or order number for up-to-date delivery progress.",
    url: absoluteUrl("/order-tracking"),
  },
};

export default function Page() {
  return <OrderTrackingPage />;
}
