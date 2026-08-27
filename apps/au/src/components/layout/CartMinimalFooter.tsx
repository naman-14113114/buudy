import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/policies/shipping-policy", label: "Shipping Policy" },
  { href: "/policies/return-policy", label: "Return Policy" },
  { href: "/policies/refund-policy", label: "Refund Policy" },
  { href: "/policies/privacy-policy", label: "Privacy Policy" },
  { href: "/policies/terms-of-service", label: "Terms of Service" },
  { href: "/pages/contact-us", label: "Contact Us" },
];

export function CartMinimalFooter() {
  return (
    <footer className="border-t border-[rgba(247,241,232,.14)] bg-[var(--ink)] pt-8 pb-28 lg:py-8">
      <div className="buudy-wrap text-center">
        <p className="buudy-mono text-[var(--gold)]">
          Secure Payments &bull; Free Tracked Shipping &bull; Easy Support
        </p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              className="text-sm text-[rgba(247,241,232,.72)] transition hover:text-[var(--cream)]"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
