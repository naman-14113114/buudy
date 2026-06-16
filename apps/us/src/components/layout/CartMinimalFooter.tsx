import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/return-policy", label: "Return Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/pages/contact-us", label: "Contact Us" },
];

export function CartMinimalFooter() {
  return (
    <footer className="border-t border-[rgba(247,241,232,.12)] bg-[var(--ink)]">
      <div className="buudy-wrap py-7 text-center">
        <p className="buudy-mono text-[0.68rem] tracking-[0.18em] text-[var(--gold)] sm:text-xs">
          Secure payments {"\u2022"} Free tracked shipping {"\u2022"} Easy support
        </p>

        <nav
          aria-label="Checkout footer"
          className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[rgba(247,241,232,.76)]"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              className="transition hover:text-[var(--cream)]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
