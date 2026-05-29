"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  UserRound,
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
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<HeaderSession | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

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
    lastScrollY.current = window.scrollY;
    let frame = 0;

    function updateHeader() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 24 || delta < -8) {
        setHidden(false);
      } else if (currentY > 120 && delta > 8) {
        setHidden(true);
        setMenuOpen(false);
      }

      lastScrollY.current = currentY;
      frame = 0;
    }

    function onScroll() {
      if (!frame) {
        frame = window.requestAnimationFrame(updateHeader);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);

    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const signedIn = Boolean(session?.user);
  const accountLabel =
    session?.profile?.fullName || session?.user?.email || "Account";

  return (
    <header
      className={`sticky top-0 z-40 border-b border-[rgba(58,31,61,.14)] bg-[rgba(247,241,232,.88)] backdrop-blur-xl transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      onFocusCapture={() => setHidden(false)}
    >
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
            className="relative grid h-12 w-12 place-items-center rounded-full border border-[rgba(58,31,61,.18)] text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
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

          <div className="relative" ref={menuRef}>
            <button
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-label={signedIn ? `Open account menu for ${accountLabel}` : "Open account menu"}
              className="inline-flex h-12 items-center gap-1 rounded-full border border-[rgba(58,31,61,.18)] px-3 text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)]"
              onClick={() => {
                setHidden(false);
                setMenuOpen((open) => !open);
              }}
              type="button"
            >
              <UserRound size={18} strokeWidth={1.8} />
              <ChevronDown
                className={`transition ${menuOpen ? "rotate-180" : ""}`}
                size={14}
              />
            </button>

            {menuOpen ? (
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
    </header>
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
