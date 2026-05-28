import Link from "next/link";
import { footerMenus, paymentIcons } from "@/data/footer";

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--cream)]">
      <div className="buudy-wrap py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link className="buudy-display text-4xl" href="/">
              buudy<span className="text-[var(--gold)]">.</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[rgba(247,241,232,.62)]">
              Salon-grade LED light therapy, beautifully wearable. Designed in
              the United Kingdom.
            </p>
            <div className="mt-6 text-sm leading-7 text-[rgba(247,241,232,.62)]">
              <p className="buudy-mono text-[var(--gold)]">Business Information</p>
              <p className="mt-2">
                13 Harefield Rd, Rickmansworth,
                <br />
                England, WD3 1LY, UK
              </p>
            </div>
          </div>

          {footerMenus.map((menu) => (
            <div key={menu.title}>
              <p className="buudy-mono text-[var(--gold)]">{menu.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {menu.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm text-[rgba(247,241,232,.72)] transition hover:text-[var(--cream)]"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="buudy-mono text-[var(--gold)]">Get in touch</p>
            <p className="mt-4 text-sm leading-7 text-[rgba(247,241,232,.72)]">
              Operating Hours
              <br />
              Monday - Friday - 9am - 5pm EST
            </p>
            <a
              className="mt-3 inline-block text-sm underline underline-offset-4"
              href="mailto:support@buudy.com"
            >
              support@buudy.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[rgba(247,241,232,.14)] pt-8">
          <p className="buudy-mono text-[rgba(247,241,232,.5)]">
            (c) 2026 Buudy - All rights reserved
          </p>
          <div className="flex gap-3">
            {paymentIcons.map((icon) => (
              <span
                className="inline-flex h-7 w-11 items-center justify-center rounded bg-[rgba(247,241,232,.96)] p-1.5"
                key={icon.label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={icon.label} className="h-4 w-auto" src={icon.src} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
