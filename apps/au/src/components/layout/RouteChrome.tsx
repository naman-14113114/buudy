"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type RouteChromeProps = {
  cartFooter: ReactNode;
  cartHeader: ReactNode;
  children: ReactNode;
  defaultFooter: ReactNode;
  defaultHeader: ReactNode;
};

export function RouteChrome({
  cartFooter,
  cartHeader,
  children,
  defaultFooter,
  defaultHeader,
}: RouteChromeProps) {
  const pathname = usePathname();
  const isCart = pathname === "/cart";

  return (
    <>
      {isCart ? cartHeader : defaultHeader}
      <main>{children}</main>
      {isCart ? cartFooter : defaultFooter}
    </>
  );
}
