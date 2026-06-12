import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  HelpCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import {
  contactHelpLinks,
  contactPage,
  contactSocialLinks,
} from "@/data/contact";
import { homeAsset } from "@/lib/media";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

function ContactHero() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-glow -left-24 top-8 h-[440px] w-[440px] bg-[#f4a17b]" />
      <div className="buudy-glow -right-24 bottom-0 h-[480px] w-[480px] bg-[#a05080]" />

      <div className="buudy-wrap relative z-10 grid gap-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
        <div>
          <p className="buudy-eyebrow">{contactPage.eyebrow}</p>
          <h1 className="buudy-display mt-5 text-[3.2rem] leading-[1.02] text-[var(--plum)] sm:text-[4.5rem] md:text-[5.8rem]">
            {contactPage.title.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="buudy-italic">
              {contactPage.title.split(" ").slice(-1).join(" ")}
            </em>
          </h1>
          <p className="buudy-copy mt-6 max-w-2xl text-lg">{contactPage.copy}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="buudy-mono rounded-full bg-[var(--plum)] px-4 py-3 text-[var(--cream)] transition hover:bg-[var(--cream)] hover:text-[var(--ink)]"
              href="mailto:support@buudy.com"
            >
              {contactPage.supportLabel}
            </a>
            <span className="buudy-mono rounded-full border border-[var(--border)] bg-[rgba(247,241,232,.72)] px-4 py-3 text-[var(--plum)]">
              {contactPage.supportHours}
            </span>
            <span className="buudy-mono rounded-full border border-[var(--border)] bg-[rgba(247,241,232,.72)] px-4 py-3 text-[var(--plum)]">
              13 Harefield Rd, Rickmansworth, England, WD3 1LY, UK
            </span>
          </div>

          <p className="mt-8 max-w-xl leading-8 text-[var(--muted)]">
            {contactPage.supportIntro}
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--blush)] shadow-[0_30px_70px_-44px_rgba(58,31,61,.45)]">
            <Image
              alt="Buudy LED light therapy support"
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 92vw"
              src={homeAsset("01-home-led-mask-hero.png")}
            />
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[rgba(58,31,61,.9)] p-5 text-[var(--cream)] shadow-[0_20px_55px_-30px_rgba(0,0,0,.6)]">
            <div className="flex items-center gap-3">
              <Sparkles className="text-[var(--gold)]" size={18} />
              <p className="buudy-mono text-[var(--gold)]">Support desk</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-[rgba(247,241,232,.78)]">
              Product guidance, order updates, and routine support for your
              Buudy light therapy devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HelpAndSocial() {
  return (
    <section className="buudy-section bg-[var(--plum)] py-24 text-[var(--cream)]">
      <div className="buudy-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <SectionHeading
          eyebrow="Help center"
          title={
            <>
              FAQ, help, and <em className="buudy-italic">social updates</em>.
            </>
          }
          copy={contactPage.helpCopy}
          invert
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {contactHelpLinks.map((link) => (
            <Link
              className="rounded-[18px] border border-[rgba(247,241,232,.16)] bg-[rgba(247,241,232,.08)] p-5 transition hover:-translate-y-1 hover:bg-[rgba(247,241,232,.12)]"
              href={link.href}
              key={link.label}
            >
              <HelpCircle className="text-[var(--gold)]" size={20} />
              <h2 className="buudy-display mt-4 text-2xl">{link.label}</h2>
              <p className="mt-3 text-sm leading-6 text-[rgba(247,241,232,.74)]">
                {link.copy}
              </p>
            </Link>
          ))}
        </div>

        <div className="lg:col-start-2">
          <p className="buudy-mono text-[var(--gold)]">Connect with us</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {contactSocialLinks.map((link) => (
              <a
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(247,241,232,.18)] px-4 text-sm font-semibold text-[var(--cream)] transition hover:bg-[var(--cream)] hover:text-[var(--plum)]"
                href={link.href}
                key={link.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
                <ExternalLink size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-24" id="contact-form">
      <div className="buudy-glow -left-32 top-10 h-[400px] w-[400px] bg-[#f4a17b]" />
      <div className="buudy-wrap relative z-10 grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Contact form"
            title={
              <>
                Send us a <em className="buudy-italic">message</em>.
              </>
            }
            copy={contactPage.formCopy}
          />

          <div className="mt-8 grid gap-4">
            <div className="flex gap-4 rounded-[18px] border border-[var(--border)] bg-[rgba(247,241,232,.72)] p-5">
              <MessageCircle className="mt-1 flex-none text-[var(--gold)]" size={20} />
              <p className="text-sm leading-6 text-[var(--muted)]">
                Include your order number if your message is about shipping,
                returns, or an existing purchase.
              </p>
            </div>
            <div className="flex gap-4 rounded-[18px] border border-[var(--border)] bg-[rgba(247,241,232,.72)] p-5">
              <Clock3 className="mt-1 flex-none text-[var(--gold)]" size={20} />
              <p className="text-sm leading-6 text-[var(--muted)]">
                Messages are reviewed Monday through Friday during support
                hours.
              </p>
            </div>
          </div>

          <Button asChild className="mt-8" variant="ghost">
            <Link href="/pages/faqs">
              Browse FAQs first
              <ArrowRight size={17} />
            </Link>
          </Button>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export function ContactPage() {
  return (
    <>
      <ContactHero />
      <HelpAndSocial />
      <FormSection />
    </>
  );
}
