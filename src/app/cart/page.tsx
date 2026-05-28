import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Buudy cart, product offers, free shipping, and checkout.",
  alternates: {
    canonical: "/cart",
  },
};

export default function CartPage() {
  return <CartPageContent />;
}
