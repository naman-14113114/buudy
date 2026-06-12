"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { signOutAction } from "@/app/actions/auth";
import { primaryNavigation, secondaryNavigation } from "@/data/navigation";
import { useCart } from "@/components/cart/CartProvider";

type HeaderSession = {
  user: {
    id: string;
    email: string;
  } | null;
  profile: {
    fullName: string | null;
    email: string;
  } | null;
  isAdmin: boolean;
};

export function Header() {
  const { totals, openCart } = useCart();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const [session, setSession] = useState<HeaderSession | null>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/account/session", {
          cache: "no-store",
        });

        if (response.ok) {
          setSession((await response.json()) as HeaderSession);
        }
      } catch {
        setSession({ user: null, profile: null, isAdmin: false });
      }
    }

    loadSession();
    window.addEventListener("focus", loadSession);

    return () => window.removeEventListener("focus", loadSession);
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (
        accountMenuOpen &&
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);

    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [accountMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen || !mobileMenuMounted) {
      return;
    }

    const timeout = window.setTimeout(() => setMobileMenuMounted(false), 280);

    return () => window.clearTimeout(timeout);
  }, [mobileMenuMounted, mobileMenuOpen]);

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
        setMobileMenuOpen(false);
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

  const signedIn = Boolean(session?.user);
  const accountLabel =
    session?.profile?.fullName || session?.user?.email || "Account";

  return (
    <header
      className="relative z-40 border-b border-[rgba(58,31,61,.14)] bg-[rgba(247,241,232,.88)] backdrop-blur-xl"
    >
      <div className="buudy-wrap relative flex min-h-[64px] items-center justify-between gap-4 lg:min-h-[72px] lg:gap-6">
        <button
          aria-controls="mobile-site-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label="Open navigation menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.18)] text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)] lg:hidden"
          onClick={() => {
            setAccountMenuOpen(false);
            setMobileMenuMounted(true);
            setMobileMenuOpen(true);
          }}
          type="button"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>

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
          className="absolute left-1/2 flex -translate-x-1/2 items-center lg:static lg:translate-x-0"
          href="/"
          aria-label="Buudy home"
        >
          <Image
            alt="Buudy Logo"
            className="h-[clamp(40px,4vw,50px)] w-auto object-contain"
            height={74}
            priority
            sizes="(min-width: 1024px) 180px, 150px"
            src="/media/products/buudy-led-mask/images/ChatGPT Image May 31, 2026, 12_10_21 AM.png"
            width={220}
          />
        </Link>

        <div className="flex items-center gap-3 lg:gap-6">
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
            className="relative grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.18)] text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)] lg:h-12 lg:w-12"
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

          <div className="relative hidden lg:block" ref={accountMenuRef}>
            <button
              aria-expanded={accountMenuOpen}
              aria-haspopup="menu"
              aria-label={signedIn ? `Open account menu for ${accountLabel}` : "Open account menu"}
              className="inline-flex h-12 items-center gap-1 rounded-full border border-[rgba(58,31,61,.18)] px-3 text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
              onClick={() => {
                setAccountMenuOpen((open) => !open);
              }}
              type="button"
            >
              <UserRound size={18} strokeWidth={1.8} />
              <ChevronDown
                className={`transition ${accountMenuOpen ? "rotate-180" : ""}`}
                size={14}
              />
            </button>

            {accountMenuOpen ? (
              <div
                className="absolute right-0 top-[calc(100%+12px)] w-72 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_24px_70px_-42px_rgba(58,31,61,.75)]"
                role="menu"
              >
                <div className="border-b border-[var(--border)] p-4">
                  <p className="buudy-mono text-[var(--gold)]">
                    {signedIn ? "Signed in" : "Buudy account"}
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-[var(--plum)]">
                    {signedIn ? accountLabel : "Save profile and order history"}
                  </p>
                </div>

                <div className="p-2">
                  {signedIn ? (
                    <>
                      <HeaderMenuLink href="/my-profile" label="My Profile" />
                      <HeaderMenuLink href="/order-history" label="Order History" />
                      <HeaderMenuLink
                        href="/account-settings"
                        icon={<Settings size={16} />}
                        label="Account Settings"
                      />
                      {session?.isAdmin ? (
                        <HeaderMenuLink
                          href="/admin"
                          icon={<LayoutDashboard size={16} />}
                          label="Admin Dashboard"
                        />
                      ) : null}
                      <form action={signOutAction}>
                        <button
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
                          type="submit"
                        >
                          <LogOut size={16} />
                          Sign out
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <HeaderMenuLink href="/sign-in" label="Sign in" />
                      <HeaderMenuLink href="/sign-up" label="Sign up" />
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </div>
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
                onClick={() => setMobileMenuOpen(false)}
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
                    onClick={() => setMobileMenuOpen(false)}
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
                        onClick={() => setMobileMenuOpen(false)}
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
                        onClick={() => setMobileMenuOpen(false)}
                      />
                    ))}
                  </nav>

                  <p className="buudy-eyebrow mt-7 px-2">Account</p>
                  <div className="mt-2">
                    {signedIn ? (
                      <>
                        <MobileMenuLink
                          href="/my-profile"
                          label="My Profile"
                          onClick={() => setMobileMenuOpen(false)}
                        />
                        <MobileMenuLink
                          href="/order-history"
                          label="Order History"
                          onClick={() => setMobileMenuOpen(false)}
                        />
                        <MobileMenuLink
                          href="/account-settings"
                          label="Account Settings"
                          onClick={() => setMobileMenuOpen(false)}
                        />
                        {session?.isAdmin ? (
                          <MobileMenuLink
                            href="/admin"
                            label="Admin Dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                          />
                        ) : null}
                        <form action={signOutAction}>
                          <button
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
                            type="submit"
                          >
                            <LogOut size={16} />
                            Sign out
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <MobileMenuLink
                          href="/sign-in"
                          label="Sign in"
                          onClick={() => setMobileMenuOpen(false)}
                        />
                        <MobileMenuLink
                          href="/sign-up"
                          label="Sign up"
                          onClick={() => setMobileMenuOpen(false)}
                        />
                      </>
                    )}
                  </div>
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

function HeaderMenuLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
      href={href}
      role="menuitem"
    >
      {icon ?? <UserRound size={16} />}
      {label}
    </Link>
  );
}
