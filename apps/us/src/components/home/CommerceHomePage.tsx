"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronDown, Menu, ShoppingBag, Truck, RotateCcw, Sparkles } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { homeAsset, productMediaAsset } from "@/lib/media";
import styles from "./CommerceHomePage.module.css";

const maskHref = "/products/buudy-led-mask";
const modes = [
  { name: "Red", wave: "633 nm", color: "#bc3939", title: "For your glow routine.", copy: "Make red light part of a consistent routine for smoother-looking skin and the appearance of fine lines." },
  { name: "Blue", wave: "415 nm", color: "#4274b6", title: "For clearer-looking skin.", copy: "Explore the mask’s blue light setting when blemishes are part of your skincare concerns." },
  { name: "Green", wave: "525 nm", color: "#478463", title: "For an even-looking complexion.", copy: "Discover green light as part of the Buudy wavelength guide for the appearance of uneven tone." },
  { name: "Cyan", wave: "490 nm", color: "#33858e", title: "A fresh addition to your routine.", copy: "Get to know the cyan setting and find its place in your routine with Buudy’s treatment guide." },
  { name: "Yellow", wave: "590 nm", color: "#a67c22", title: "Find your everyday setting.", copy: "Explore yellow light in the Buudy treatment guide and build a routine around your skin goals." },
  { name: "Purple", wave: "Visible light", color: "#866296", title: "More ways to make it yours.", copy: "Explore the purple setting alongside the mask’s other visible light modes." },
  { name: "White", wave: "Visible light", color: "#b8a8a5", title: "Light that fits your ritual.", copy: "Discover white light and the full range of settings in your Buudy treatment guide." },
  { name: "Near-infrared", wave: "830 nm", color: "#683e4d", title: "Beyond the visible spectrum.", copy: "A dedicated 830 nm near-infrared mode gives you another setting to explore alongside the seven visible colors." },
];

const questions = [
  { question: "What makes the Buudy mask different?", answer: "The Buudy LED Mask combines 192 LEDs, seven visible light colors and a dedicated 830 nm near-infrared mode. It includes face and neck coverage in one cordless, rechargeable device." },
  { question: "Does it cover my neck too?", answer: "Yes. The mask extends below the face to cover the neck, so both areas can be part of the same session." },
  { question: "How do I choose a light mode?", answer: "Start with the skincare quiz and the treatment guide supplied with your mask. The free Buudy companion app also helps you plan, time, and track your sessions. Follow the product instructions for session duration and frequency." },
  { question: "What comes with the mask?", answer: "The mask bundle includes a premium travel box, Buudy LED Torch, skincare e-book, charger, eye supports, user manual, and treatment guide. See the product page for the current offer and full details." },
  { question: "What should I check before using it?", answer: "Read the instructions and safety guidance before your first session. If you are pregnant, have a light-sensitive condition, epilepsy, or take medication that causes light sensitivity, consult a qualified healthcare professional before use." },
  { question: "Where can I find shipping and return details?", answer: "Buudy offers free US shipping and a 90-day return window. Read the shipping and return policies for delivery estimates, eligibility, and the steps to request a return." },
];

function ShopLink({ children = "Shop the LED Mask", light = false }: { children?: React.ReactNode; light?: boolean }) {
  return <Link className={`${styles.button} ${light ? styles.buttonLight : ""}`} href={maskHref}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}

function HomepageHeader() {
  const { totals, openCart } = useCart();
  return (
    <>
      <a className={styles.skipLink} href="#buudy-home-content">Skip to content</a>
      <div className={styles.announcement}>A little light. A little me-time. <span>Free US shipping on every order.</span></div>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" aria-label="Buudy home" className={styles.logo}>
            Buudy<span>.</span>
          </Link>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <Link href={maskHref}>LED Face Mask</Link>
            <Link href="/products/red-light-torch">LED Torch</Link>
            <a href="#why-buudy">Why Buudy</a>
            <Link href="/pages/skincare-quiz">Skin Quiz</Link>
          </nav>
          <div className={styles.headerActions}>
            <Link href={maskHref} className={styles.headerShop}>Shop Buudy <ArrowRight size={16} aria-hidden="true" /></Link>
            <button className={styles.cartButton} onClick={openCart} aria-label={`Open cart with ${totals.itemCount} items`}><ShoppingBag size={21} aria-hidden="true" /><span>{totals.itemCount}</span></button>
            <details className={styles.mobileMenu}>
              <summary aria-label="Open navigation menu"><Menu size={24} aria-hidden="true" /></summary>
              <nav aria-label="Mobile navigation">
                <Link href={maskHref}>LED Face Mask <ArrowRight size={18} aria-hidden="true" /></Link>
                <Link href="/products/red-light-torch">LED Torch <ArrowRight size={18} aria-hidden="true" /></Link>
                <Link href="/pages/skincare-quiz">Find your routine <ArrowRight size={18} aria-hidden="true" /></Link>
                <Link href="/pages/about-us">Our story <ArrowRight size={18} aria-hidden="true" /></Link>
                <Link href="/pages/contact-us">Get in touch <ArrowRight size={18} aria-hidden="true" /></Link>
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}

function LightModes() {
  const [activeMode, setActiveMode] = useState(0);
  const mode = modes[activeMode];
  return (
    <section className={styles.modes} id="light-modes" aria-labelledby="light-modes-title">
      <div className={styles.modesIntro}><p className={styles.eyebrow}>One mask. More possibilities.</p><h2 id="light-modes-title">Different days.<br />Different light.</h2><p>Seven visible colors. Near-infrared, too. Get to know the settings that make your Buudy ritual personal.</p></div>
      <div className={styles.modeExplorer}>
        <div className={styles.modeButtons} role="group" aria-label="Explore light modes">
          {modes.map((item, index) => <button key={item.name} onClick={() => setActiveMode(index)} aria-pressed={index === activeMode} aria-controls="buudy-mode-description"><span style={{ backgroundColor: item.color }} aria-hidden="true" />{item.name}</button>)}
        </div>
        <div className={styles.modeDescription} id="buudy-mode-description" aria-live="polite" aria-atomic="true">
          <div className={styles.modeIdentity}><span className={styles.modeOrb} style={{ backgroundColor: mode.color }} aria-hidden="true" /><div><span>{mode.name} light</span><p>{mode.wave}</p></div></div>
          <h3>{mode.title}</h3><p>{mode.copy}</p>
          <Link href={maskHref} className={styles.textLink}>Explore the full mask <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <p className={styles.finePrint}>Use the treatment guide to plan your sessions. Results vary from person to person.</p>
      </div>
    </section>
  );
}

function HomepageFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}><Link href="/" aria-label="Buudy home" className={styles.footerWordmark}>Buudy<span>.</span></Link><p>Your skin. Your light. Your time.</p><a href="mailto:support@buudy.com">support@buudy.com <ArrowRight size={17} aria-hidden="true" /></a><span>Monday to Friday, 9am–5pm EST</span></div>
        <div><h3>Find your glow</h3><Link href={maskHref}>LED Face Mask</Link><Link href="/products/red-light-torch">LED Torch</Link><Link href="/pages/skincare-quiz">Skincare Quiz</Link><a href="https://app.buudy.com" target="_blank" rel="noopener noreferrer">Buudy Companion App</a></div>
        <div><h3>A little guidance</h3><Link href="/pages/about-us">Our Story</Link><Link href="/pages/faqs">FAQs</Link><Link href="/pages/contact-us">Contact Us</Link><Link href="/pages/best-led-face-mask-us">LED Mask Guide</Link></div>
        <div><h3>Shop with confidence</h3><Link href="/policies/shipping-policy">Shipping</Link><Link href="/policies/return-policy">Returns</Link><Link href="/policies/refund-policy">Refunds</Link><Link href="/policies/privacy-policy">Privacy</Link><Link href="/policies/terms-of-service">Terms</Link><Link href="/policies/cookies-policy">Cookies</Link></div>
      </div>
      <div className={styles.footerBottom}><span>© {new Date().getFullYear()} Buudy. All rights reserved.</span><div><a href="https://www.instagram.com/buudy_com" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.youtube.com/@buudy-com" target="_blank" rel="noopener noreferrer">YouTube</a><span>United States · USD</span></div></div>
    </footer>
  );
}

export function CommerceHomePage() {
  return (
    <div className={styles.home} data-buudy-home>
      <HomepageHeader />
      <div id="buudy-home-content">
        <section className={styles.hero} aria-labelledby="buudy-home-title">
          <div className={styles.heroCopy}><p className={styles.eyebrow}>Your at-home light therapy ritual</p><h1 id="buudy-home-title">Good skin days<br />start with <span>light.</span></h1><p className={styles.heroDescription}>Meet the Buudy LED Mask. Face and neck care, seven light colors, and a little time just for you.</p><div className={styles.heroActions}><ShopLink /><Link className={styles.textLink} href="/pages/skincare-quiz">Find my routine <ArrowRight size={16} aria-hidden="true" /></Link></div><div className={styles.heroNote}><Check size={15} aria-hidden="true" />Cordless care. From the comfort of home.</div></div>
          <div className={styles.heroImage}><Image src={homeAsset("09-home-younger-you.png")} alt="Relaxing at home with the illuminated Buudy LED face and neck mask" fill preload sizes="(min-width: 900px) 57vw, 100vw" className={styles.cover} /><span className={styles.heroImageLabel}>Make room for your glow.</span><a className={styles.heroDown} href="#why-buudy" aria-label="Discover the Buudy mask"><ArrowDown size={20} /></a></div>
        </section>

        <div className={styles.reassurance}><span><Truck size={19} aria-hidden="true" />Free US shipping</span><span><RotateCcw size={18} aria-hidden="true" />90-day returns</span><span><Sparkles size={18} aria-hidden="true" />Face + neck. One mask.</span></div>

        <section className={styles.intro} id="why-buudy"><p className={styles.eyebrow}>Skincare, in a new light</p><div><h2>More care.<br />Less complication.</h2><p>A routine you can actually make time for. Buudy brings LED light therapy into your home with built-in neck coverage, simple tap controls, and the freedom to go cordless.</p></div></section>

        <section className={styles.product} aria-labelledby="meet-mask-title">
          <div className={styles.productImage}><Image src={productMediaAsset("Cleopatra-LED-Red-Light-Mask.webp")} alt="Buudy LED Mask illuminated in red light during a skincare session" fill sizes="(min-width: 900px) 50vw, 100vw" className={styles.cover} /><span className={styles.imageBadge}>Your new me-time essential</span></div>
          <div className={styles.productCopy}><p className={styles.eyebrow}>The Buudy LED Mask</p><h2 id="meet-mask-title">Big on light.<br />Easy on your routine.</h2><p>Designed to bring your face and neck into the same ritual. Choose your light mode, tap to adjust, and enjoy a moment that’s yours.</p><dl className={styles.specs}><div><dt>192 LEDs</dt><dd>High-density coverage</dd></div><div><dt>7 colors + NIR</dt><dd>More ways to personalize</dd></div><div><dt>Fully cordless</dt><dd>Recharge. Wear. Unwind.</dd></div></dl><ShopLink>Discover the mask</ShopLink><Link className={styles.textLink} href={`${maskHref}#reviews`}>Explore customer stories <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </section>

        <LightModes />

        <section className={styles.ritual} id="ritual" aria-labelledby="ritual-title">
          <div className={styles.ritualCopy}><p className={styles.eyebrow}>Fits into real life</p><h2 id="ritual-title">Your favorite part<br />of slowing down.</h2><p>No wall socket. No complicated remote. A rechargeable mask and simple tap controls make it easier to build a routine that stays with you.</p><ol><li><span>01</span><div><h3>Make a little space.</h3><p>Start with clean skin and read your treatment guide.</p></div></li><li><span>02</span><div><h3>Find your light.</h3><p>Choose a mode and intensity to suit your routine.</p></div></li><li><span>03</span><div><h3>Let it be your time.</h3><p>Follow the recommended session, then keep coming back.</p></div></li></ol><ShopLink /></div>
          <div className={styles.ritualVideo}><video controls playsInline preload="none" poster={homeAsset("01-home-led-mask-hero.png")} aria-label="Watch how Buudy fits into an at-home skincare routine"><source src="/media/products/buudy-led-mask/videos/buudy-goddess-bg.mp4" type="video/mp4" />Your browser does not support video.</video><span>See Buudy in use</span></div>
        </section>

        <section className={styles.bundle} aria-labelledby="bundle-title"><div className={styles.bundleHeading}><p className={styles.eyebrow}>A thoughtful start</p><h2 id="bundle-title">A little more<br />with your mask.</h2><p>Your glow kit brings the essentials together, from protected storage to a little guidance along the way.</p><ShopLink>See the complete bundle</ShopLink></div><div className={styles.gifts}><article><div><Image src={homeAsset("buudy-travel-case.png")} alt="Premium Buudy travel and storage box" fill sizes="(min-width: 900px) 22vw, 44vw" className={styles.contain} /><span>Included</span></div><h3>Keep it close.</h3><p>Premium Travel Box</p></article><article><div><Image src={productMediaAsset("35-w.webp")} alt="Buudy LED Torch for targeted light sessions" fill sizes="(min-width: 900px) 22vw, 44vw" className={styles.contain} /><span>Included</span></div><h3>A little extra light.</h3><p>Buudy LED Torch</p></article><article><div><Image src="/images/products/buudy-led-mask/skincare-ebook.png" alt="Buudy skincare guide e-book" fill sizes="(min-width: 900px) 22vw, 44vw" className={styles.contain} /><span>Included</span></div><h3>Know your ritual.</h3><p>Skincare E-Book</p></article></div></section>

        <section className={styles.quiz} aria-labelledby="quiz-title"><div className={styles.quizImage}><Image src={homeAsset("01-home-led-mask-hero.png")} alt="Checking the fit of a Buudy LED Mask in a mirror" fill sizes="(min-width: 900px) 48vw, 100vw" className={styles.cover} /></div><div className={styles.quizCopy}><p className={styles.eyebrow}>A routine that feels like you</p><h2 id="quiz-title">Not sure where<br />to start?</h2><p>A few simple questions can help you explore your skin goals and find your next step.</p><Link className={styles.button} href="/pages/skincare-quiz">Take the skincare quiz <ArrowRight size={18} aria-hidden="true" /></Link><span>Simple questions. A clearer starting point.</span></div></section>

        <section className={styles.app} aria-labelledby="app-title"><div><p className={styles.eyebrow}>Your companion, beyond the mask</p><h2 id="app-title">Make consistency<br />a little easier.</h2><p>Meet the free Buudy companion app. Plan your routine, time your sessions, and track your progress in one place.</p><div className={styles.appFeatures}><span><Check size={16} aria-hidden="true" />Plan</span><span><Check size={16} aria-hidden="true" />Time</span><span><Check size={16} aria-hidden="true" />Track</span></div><a href="https://app.buudy.com" className={styles.button} target="_blank" rel="noopener noreferrer">Explore the Buudy app <ArrowRight size={18} aria-hidden="true" /></a></div><div className={styles.appImage}><Image src={homeAsset("buudy-companion-routine.png")} alt="Buudy companion app for planning and tracking LED mask sessions" fill sizes="(min-width: 900px) 50vw, 100vw" className={styles.contain} /></div></section>

        <section className={styles.faq} aria-labelledby="home-faq-title"><div><p className={styles.eyebrow}>A little clarity</p><h2 id="home-faq-title">Good questions.<br />Clear answers.</h2><Link className={styles.textLink} href="/pages/faqs">Visit our FAQs <ArrowRight size={17} aria-hidden="true" /></Link></div><div className={styles.questions}>{questions.map(item => <details key={item.question}><summary>{item.question}<ChevronDown size={19} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>

        <section className={styles.finalCta}><p className={styles.eyebrow}>It’s your time to glow</p><h2>Make a little<br />room for you.</h2><ShopLink light /></section>
      </div>
      <HomepageFooter />
    </div>
  );
}
