"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Conditionally renders children based on the current pathname.
 * Used to hide the main Header/Footer on pages that provide their own
 * (e.g. the cart page uses CartMinimalHeader/CartMinimalFooter).
 */
export function HideOnPaths({
  children,
  paths,
}: {
  children: ReactNode;
  paths: string[];
}) {
  const pathname = usePathname();

  if (paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return <>{children}</>;
}
