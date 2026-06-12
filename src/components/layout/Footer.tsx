import Link from "next/link";
import Image from "next/image";
import { footerMenus, paymentIcons } from "@/data/footer";
import { productMediaAsset } from "@/lib/media";

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--cream)]">
      <div className="buudy-wrap py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link className="inline-block" href="/">
              <Image
                alt="Buudy"
                className="h-auto w-44"
                height={58}
                src={productMediaAsset("buudy_footer_logo.png")}
                width={174}
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[rgba(247,241,232,.62)]">
              Salon-grade LED light therapy, beautifully wearable. Designed in
              the United Kingdom.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[rgba(247,241,232,.62)]">
              13 Harefield Rd, Rickmansworth, England, WD3 1LY, UK
            </p>
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
              Monday - Friday - 9am - 5pm GMT
            </p>
            <a
              className="mt-3 block text-sm underline underline-offset-4"
              href="mailto:support@buudy.com"
            >
              support@buudy.com
            </a>
            
            {/* Social Media Links using Inline SVGs */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61565686185222"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] text-[var(--cream)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--ink)] hover:-translate-y-1"
                aria-label="Follow Buudy on Facebook"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/buudy_com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] text-[var(--cream)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--ink)] hover:-translate-y-1"
                aria-label="Follow Buudy on Instagram"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@buudy-com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] text-[var(--cream)] transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--ink)] hover:-translate-y-1"
                aria-label="Subscribe to Buudy on YouTube"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[rgba(247,241,232,.14)] pt-8">
          <p className="buudy-mono text-[rgba(247,241,232,.5)]">
            (c) 2026 Buudy - All rights reserved
          </p>
          <div className="flex gap-3">
            {paymentIcons.map((icon) => (
              <span
                className="inline-flex h-7 w-11 items-center justify-center overflow-hidden rounded bg-[rgba(247,241,232,.96)]"
                key={icon.label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={icon.label}
                  className="h-full w-full object-cover"
                  decoding="async"
                  loading="lazy"
                  src={icon.src}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
