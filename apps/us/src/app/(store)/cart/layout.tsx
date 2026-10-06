import { CartMinimalHeader } from "@/components/layout/CartMinimalHeader";
import { CartMinimalFooter } from "@/components/layout/CartMinimalFooter";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartMinimalHeader />
      {children}
      <CartMinimalFooter />
    </>
  );
}
