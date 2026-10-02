"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { primaryNavigation, secondaryNavigation } from "@/data/navigation";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const { totals, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMobileMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMobileMenuMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMobileMenuOpen(true);
      });
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setMobileMenuMounted(false);
      closeTimeoutRef.current = null;
    }, 320);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuMounted) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
    document.documentElement.style.overscrollBehavior = "contain";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuMounted]);

  return (
    <header className="relative z-40 border-b border-[rgba(58,31,61,.14)] bg-[rgba(247,241,232,.88)] backdrop-blur-xl">
      <div className="buudy-wrap relative flex min-h-[64px] items-center justify-between gap-4 lg:min-h-[72px]">
        {/* Mobile Menu Trigger */}
        <button
          aria-controls="mobile-site-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label="Open navigation menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.18)] text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)] lg:hidden"
          onClick={openMobileMenu}
          type="button"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>

        {/* Left Side: Primary Navigation */}
        <nav
          className="hidden lg:flex items-center gap-5 xl:gap-6 2xl:gap-7"
          aria-label="Primary"
        >
          {primaryNavigation.map((item) => (
            <Link
              className="buudy-mono whitespace-nowrap text-[0.62rem] tracking-[0.14em] text-[var(--plum)] opacity-80 transition hover:opacity-100 xl:text-[0.69rem] xl:tracking-[0.2em]"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Center: Logo */}
        <Link
          className="absolute left-1/2 flex -translate-x-1/2 items-center shrink-0 px-2 lg:static lg:translate-x-0 xl:px-3"
          href="/"
          aria-label="Buudy home"
        >
          <Image
            alt="Buudy Logo"
            className="h-[34px] w-auto object-contain xl:h-[46px]"
            height={74}
            priority
            sizes="(min-width: 1280px) 180px, 140px"
            src="/media/products/buudy-led-mask/images/ChatGPT Image May 31, 2026, 12_10_21 AM.png"
            width={220}
          />
        </Link>

        {/* Right Side: Secondary Navigation + Cart */}
        <div className="flex items-center gap-4 lg:gap-5 xl:gap-6 2xl:gap-7">
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-6 2xl:gap-7"
            aria-label="Secondary"
          >
            {secondaryNavigation.map((item) => (
              <Link
                className="buudy-mono whitespace-nowrap text-[0.62rem] tracking-[0.14em] text-[var(--plum)] opacity-80 transition hover:opacity-100 xl:text-[0.69rem] xl:tracking-[0.2em]"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            aria-label={`Open cart with ${totals.itemCount} items`}
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(58,31,61,.18)] text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)] lg:h-12 lg:w-12"
            data-testid="cart-trigger"
            onClick={openCart}
            type="button"
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            {totals.itemCount > 0 ? (
              <span className="buudy-mono absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--plum)] px-1 text-[0.58rem] leading-none text-[var(--cream)]">
                {totals.itemCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {mobileMenuMounted && typeof document !== "undefined"
        ? createPortal(
            <div
              className={`fixed inset-0 z-[70] lg:hidden transition ${
                mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <button
                aria-label="Close navigation menu"
                className={`absolute inset-0 bg-[rgba(18,9,20,.52)] backdrop-blur-sm transition-opacity duration-300 ease-out ${
                  mobileMenuOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={closeMobileMenu}
                type="button"
              />
              <aside
                aria-label="Mobile navigation"
                aria-modal="true"
                className={`absolute inset-y-0 left-0 flex w-[min(88vw,22rem)] flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--card)] shadow-[18px_0_60px_-32px_rgba(18,9,20,.7)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                id="mobile-site-navigation"
                role="dialog"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                  <Image
                    alt="Buudy Logo"
                    className="h-10 w-auto object-contain"
                    height={74}
                    priority
                    sizes="150px"
                    src="/media/products/buudy-led-mask/images/ChatGPT Image May 31, 2026, 12_10_21 AM.png"
                    width={220}
                  />
                  <button
                    aria-label="Close navigation menu"
                    className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.18)] text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
                    onClick={closeMobileMenu}
                    type="button"
                  >
                    <X size={20} strokeWidth={1.8} />
                  </button>
                </div>

                <div className="flex-1 px-4 py-5">
                  <p className="buudy-eyebrow px-2">Shop</p>
                  <nav className="mt-2" aria-label="Mobile shop">
                    {primaryNavigation.map((item) => (
                      <MobileMenuLink
                        href={item.href}
                        key={item.label}
                        label={item.label}
                        onClick={closeMobileMenu}
                      />
                    ))}
                  </nav>

                  <p className="buudy-eyebrow mt-7 px-2">Help</p>
                  <nav className="mt-2" aria-label="Mobile help">
                    {secondaryNavigation.map((item) => (
                      <MobileMenuLink
                        href={item.href}
                        key={item.label}
                        label={item.label}
                        onClick={closeMobileMenu}
                      />
                    ))}
                  </nav>
                </div>
              </aside>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}

function MobileMenuLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      className="flex min-h-11 items-center rounded-xl px-3 py-3 text-sm font-semibold text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
      href={href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
