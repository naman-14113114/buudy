import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";
import { market } from "@/lib/market";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Buudy cart, product offers, free shipping, and checkout.",
  alternates: {
    canonical: "/cart",
  },
  robots: {
    index: false,
    follow: false,
  },
};

// The cart comes from the browser; Whop collects the buyer details at checkout.
// Keeping this shell static allows it to be cached and prefetched in full.
export default function CartPage() {
  return (
    <>
    <link rel="preconnect" href="https://buudy.com" />
    <CartPageContent
      initialCustomer={{
        fullName: "",
        email: "",
        phone: "",
        shippingLine1: "",
        shippingLine2: "",
        shippingCity: "",
        shippingState: "",
        shippingPostalCode: "",
        shippingCountry: market.country,
        marketingOptIn: false,
      }}
    />
    </>
  );
}
