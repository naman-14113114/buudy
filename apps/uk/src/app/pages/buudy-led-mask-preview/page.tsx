import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BatteryCharging, Check, ChevronDown, ScanFace, Smartphone, Sun } from "lucide-react";
import { gifts, logo } from "./content";
import { MaskGallery, PurchasePreview } from "./PurchasePreview";
import styles from "./preview.module.css";

export const metadata: Metadata = {
  title: "LED Mask — Page Preview",
  description: "A preview of the Buudy LED Mask purchase page, with face and neck coverage, product details, and the included skincare kit.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: "/pages/buudy-led-mask-preview", languages: {} },
  openGraph: {
    title: "Buudy LED Mask — Page Preview",
    description: "Your at-home skincare ritual, made simple.",
    url: "/pages/buudy-led-mask-preview",
    images: [{ url: "/images/products/buudy-led-mask/02-buudy-led-mask-side-profile.webp", width: 1600, height: 1600, alt: "Buudy LED Mask" }],
  },
};

const questions = [
  {
    title: "What is included with my mask?",
    answer: <>The preview shows the Buudy LED Mask, premium travel case, Buudy LED Torch and digital skincare eBook. Free UK delivery is included in the displayed offer. The final offer and contents will be confirmed when the new checkout is connected.</>,
  },
  {
    title: "How do I use the mask?",
    answer: <>Start with clean, dry skin, position the mask comfortably and choose your light setting. Follow the supplied user guide for session length, frequency, eye protection and safety precautions. Do not use the mask beyond the recommended session time.</>,
  },
  {
    title: "What should I check before using LED light therapy?",
    answer: <>Read the device instructions and safety guidance before use. If you have a medical condition, light sensitivity, or take medication that may cause photosensitivity, check with a qualified healthcare professional before using the device. Results vary from person to person.</>,
  },
  {
    title: "What if I need help with delivery or returns?",
    answer: <>Our team can help with your order. See our <Link href="/policies/shipping-policy">delivery information</Link> and <Link href="/policies/return-policy">90-day return policy</Link> for the full terms, or <Link href="/pages/contact-us">contact Buudy support</Link>.</>,
  },
];

export default function BuudyLedMaskPreviewPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image src={logo} alt="Buudy" width={180} height={60} sizes="180px" preload className={styles.logo} />
      </header>

      <div className={styles.container}>
        <PurchasePreview>
          <p className={styles.eyebrow}>YOUR AT-HOME SKINCARE RITUAL</p>
          <h1 id="product-heading" className={styles.title}>Buudy LED <em>Mask</em></h1>
          <p className={styles.subtitle}>Light therapy for your face and neck, made simple.</p>
          <MaskGallery />
          <div className={styles.heroBenefits}>
            <div><ScanFace size={24} strokeWidth={1.25} aria-hidden="true" /><span>Face &amp; neck<br />coverage</span></div>
            <div><BatteryCharging size={24} strokeWidth={1.25} aria-hidden="true" /><span>Cordless<br />convenience</span></div>
            <div><Sun size={24} strokeWidth={1.25} aria-hidden="true" /><span>Multiple<br />light modes</span></div>
          </div>
        </PurchasePreview>

        <section className={styles.ritualSection} aria-labelledby="ritual-heading">
          <div className={styles.lifestyleImage}>
            <Image src="/images/products/buudy-led-mask/08-buudy-led-mask-lifestyle-use.webp" alt="A woman wearing the Buudy face and neck mask while relaxing with a book and a drink at home" fill sizes="(max-width: 760px) 100vw, 480px" />
            <span>A LITTLE TIME, JUST FOR YOU.</span>
          </div>
          <div className={styles.ritualCopy}>
            <p className={styles.eyebrow}>MEET YOUR EVERYDAY RITUAL</p>
            <h2 id="ritual-heading">One mask.<br />A simple daily <em>ritual.</em></h2>
            <p>Make room for a little you-time. Buudy brings LED light therapy into your home, with a face-and-neck design that fits around your routine.</p>
            <div className={styles.featureList}>
              <div><Check size={17} aria-hidden="true" /><p><strong>Face and neck, together.</strong><span>A single design with coverage beyond the face.</span></p></div>
              <div><Check size={17} aria-hidden="true" /><p><strong>Your routine. Your light setting.</strong><span>Seven visible colours plus near-infrared light.</span></p></div>
              <div><Check size={17} aria-hidden="true" /><p><strong>Comfortably cordless.</strong><span>A rechargeable mask for your at-home sessions.</span></p></div>
            </div>
          </div>
        </section>

        <section className={styles.kitSection} aria-labelledby="kit-heading">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>MORE THAN JUST THE MASK</p><h2 id="kit-heading">Everything <em>included.</em></h2></div>
            <p>Thoughtful extras to complete your routine.<br />Included with your mask, at no extra cost.</p>
          </div>
          <div className={styles.giftGrid}>
            {gifts.map((gift, index) => (
              <article className={styles.giftCard} key={gift.name}>
                <div className={styles.giftImage}>
                  <Image src={gift.src} alt={gift.alt} fill sizes="(max-width: 480px) 44vw, (max-width: 760px) 30vw, 350px" />
                  <span className={styles.giftNumber}>0{index + 1}</span>
                  <span className={styles.giftBadge}>Included</span>
                </div>
                <h3>{gift.name}</h3><p>{gift.description}</p>
              </article>
            ))}
          </div>
          <a className={styles.appStrip} href="https://app.buudy.com" target="_blank" rel="noopener noreferrer">
            <span className={styles.appIcon}><Smartphone size={27} strokeWidth={1.3} aria-hidden="true" /></span>
            <span><strong>A little guidance, whenever you need it.</strong><span>Explore the Buudy companion app for your routine.</span></span>
            <span className={styles.appLink}>Meet your companion <ArrowUpRight size={16} aria-hidden="true" /></span>
          </a>
        </section>

        <section className={styles.routineSection} aria-labelledby="routine-heading">
          <p className={styles.eyebrow}>A MOMENT FOR YOURSELF</p>
          <h2 id="routine-heading">Fits into your <em>routine.</em></h2>
          <div className={styles.routineGrid}>
            <div><span>01</span><h3>Start fresh.</h3><p>Begin with clean, dry skin and make yourself comfortable.</p></div>
            <div><span>02</span><h3>Choose your setting.</h3><p>Position your mask and select the light setting for your session.</p></div>
            <div><span>03</span><h3>Take a little time.</h3><p>Follow the session length and safety advice in your user guide.</p></div>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div><p className={styles.eyebrow}>THE LITTLE DETAILS</p><h2 id="faq-heading">Before you <em>order.</em></h2><p>Good to know before your first session.</p></div>
          <div className={styles.faqList}>
            {questions.map((question) => (
              <details key={question.title} className={styles.faq}>
                <summary>{question.title}<ChevronDown size={18} aria-hidden="true" /></summary>
                <div className={styles.faqAnswer}>{question.answer}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
      <footer className={styles.footer}>
        <Image src={logo} alt="Buudy" width={120} height={40} sizes="120px" />
        <p>Skincare, in your own time.</p>
        <nav aria-label="Policies and support">
          <Link href="/policies/shipping-policy">Delivery</Link>
          <Link href="/policies/return-policy">Returns</Link>
          <Link href="/policies/privacy-policy">Privacy</Link>
          <Link href="/pages/contact-us">Contact</Link>
        </nav>
        <span>© {new Date().getFullYear()} Buudy. All rights reserved.</span>
      </footer>
    </div>
  );
}
