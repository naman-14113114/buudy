import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";
import { getCurrentAccount } from "@/lib/account";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Buudy cart, product offers, free shipping, and checkout.",
  alternates: {
    canonical: "/cart",
  },
};

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const account = await getCurrentAccount();

  return (
    <CartPageContent
      initialCustomer={{
        fullName: account.profile?.full_name ?? "",
        email: account.user?.email ?? account.profile?.email ?? "",
        phone: account.profile?.phone ?? "",
        shippingLine1: account.profile?.shipping_line1 ?? "",
        shippingLine2: account.profile?.shipping_line2 ?? "",
        shippingCity: account.profile?.shipping_city ?? "",
        shippingState: account.profile?.shipping_state ?? "",
        shippingPostalCode: account.profile?.shipping_postal_code ?? "",
        shippingCountry: account.profile?.shipping_country ?? "United States",
        marketingOptIn: account.profile?.marketing_opt_in ?? false,
      }}
    />
  );
}
