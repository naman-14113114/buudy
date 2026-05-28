"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { primaryNavigation, secondaryNavigation } from "@/data/navigation";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const { totals, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(58,31,61,.14)] bg-[rgba(247,241,232,.88)] backdrop-blur-xl">
      <div className="buudy-wrap flex min-h-[72px] items-center justify-between gap-6">
        <nav className="hidden gap-7 lg:flex" aria-label="Primary">
          {primaryNavigation.map((item) => (
            <Link
              className="buudy-mono text-[var(--plum)] opacity-80 transition hover:opacity-100"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="buudy-display text-4xl text-[var(--plum)]"
          href="/"
          aria-label="Buudy home"
        >
          buudy<span className="text-[var(--gold)]">.</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden gap-7 xl:flex" aria-label="Secondary">
            {secondaryNavigation.map((item) => (
              <Link
                className="buudy-mono text-[var(--plum)] opacity-80 transition hover:opacity-100"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            aria-label={`Open cart with ${totals.itemCount} items`}
            className="buudy-mono inline-flex items-center gap-2 rounded-full border border-[rgba(58,31,61,.18)] px-4 py-2 text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
            data-testid="cart-trigger"
            onClick={openCart}
            type="button"
          >
            <ShoppingBag size={16} strokeWidth={1.8} />
            <span className="hidden sm:inline">Bag -</span>
            {totals.itemCount}
          </button>
        </div>
      </div>
    </header>
  );
}
