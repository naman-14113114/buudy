"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, LockKeyhole, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gallery, gifts, unitPrice } from "./content";
import styles from "./preview.module.css";

const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

export function MaskGallery() {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.heroImage}>
        {gallery.map((photo, index) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1200px) 52vw, 592px"
            preload={index === 0}
            className={styles.galleryImage}
            hidden={selected !== index}
          />
        ))}
        <span className={styles.imageCaption}>THE CLEOPATRA EDITION</span>
      </div>
      <div className={styles.galleryControls}>
        <div className={styles.thumbnails} aria-label="Product images">
          {gallery.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`View ${photo.label.toLowerCase()}`}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={styles.thumbnail}
            >
              <Image src={photo.src} alt="" width={52} height={52} sizes="52px" />
            </button>
          ))}
        </div>
        <span className={styles.galleryCount} aria-live="polite">0{selected + 1} <span>/ 03</span></span>
      </div>
    </div>
  );
}

export function PurchasePreview({ children }: { children: ReactNode }) {
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const mainButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const total = money.format(unitPrice * quantity);

  useEffect(() => {
    const button = mainButton.current;
    if (!button) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowSticky(!entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(button);
    return () => observer.disconnect();
  }, []);

  function previewCheckout() {
    // Intentionally no cart, analytics purchase event, or payment request on a design preview.
    dialog.current?.showModal();
  }

  return (
    <>
      <section className={styles.hero} aria-labelledby="product-heading">
        <div className={styles.productIntroduction}>{children}</div>
        <div className={styles.selectionColumn}>
          <div className={styles.selectionPanel}>
            <div className={styles.selectionHeading}>
              <h2>Your selection</h2>
              <span className={styles.selectionStep}>01 <span>/ 02</span></span>
            </div>
            <div className={styles.selectedProduct}>
              <Image src={gallery[0].src} alt="Buudy LED Mask" width={76} height={86} sizes="76px" />
              <div>
                <h3>Buudy LED Mask</h3>
                <p>Cleopatra Edition</p>
                <span>Face &amp; neck light therapy</span>
              </div>
            </div>
            <div className={styles.quantityRow}>
              <span id="quantity-label">Quantity</span>
              <div className={styles.quantityControl} role="group" aria-labelledby="quantity-label">
                <button type="button" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} aria-hidden="true" /></button>
                <output aria-live="polite" aria-label="Mask quantity">{quantity}</output>
                <button type="button" aria-label="Increase quantity" disabled={quantity === 10} onClick={() => setQuantity((value) => Math.min(10, value + 1))}><Plus size={15} aria-hidden="true" /></button>
              </div>
            </div>
            <div className={styles.includedList}>
              <p className={styles.smallLabel}>INCLUDED WITH YOUR MASK</p>
              {gifts.map((gift) => (
                <div key={gift.name} className={styles.includedRow}>
                  <Check size={14} aria-hidden="true" />
                  <span>{gift.name}</span>
                  <span className={styles.includedLabel}>Included</span>
                </div>
              ))}
            </div>
            <dl className={styles.priceBreakdown}>
              <div><dt>Mask{quantity > 1 ? ` × ${quantity}` : ""}</dt><dd>{total}</dd></div>
              <div><dt>UK delivery</dt><dd className={styles.freeDelivery}>Free</dd></div>
              <div className={styles.totalRow}><dt>Total</dt><dd aria-live="polite">{total}</dd></div>
            </dl>
            <button ref={mainButton} type="button" className={styles.checkoutButton} onClick={previewCheckout}>
              <LockKeyhole size={16} aria-hidden="true" />
              <span>Continue to secure checkout</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className={styles.checkoutNote}>Delivery and payment details on the next step.</p>
            <p className={styles.previewNote}>Design preview · checkout not connected</p>
            <div className={styles.returnNote}>
              <RotateCcw size={17} aria-hidden="true" />
              <span>Easy returns <span>·</span> <Link href="/policies/return-policy">See return policy</Link></span>
            </div>
          </div>
          <p className={styles.supportNote}>A question before you order? <Link href="/pages/contact-us">We’re here to help.</Link></p>
        </div>
      </section>

      <div className={`${styles.stickyBar} ${showSticky ? styles.stickyVisible : ""}`} inert={!showSticky} aria-hidden={!showSticky}>
        <div className={styles.stickyInner}>
          <div className={styles.stickyProduct}>
            <Image src={gallery[0].src} alt="" width={48} height={48} sizes="48px" />
            <div><strong>Buudy LED Mask</strong><span>{quantity > 1 ? `${quantity} masks · ` : ""}Your complete skincare kit</span></div>
          </div>
          <div className={styles.stickyPrice}><strong>{total}</strong><span>Free UK delivery</span></div>
          <button type="button" className={styles.checkoutButton} onClick={previewCheckout}>
            <span>Continue to checkout</span><ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog ref={dialog} className={styles.previewDialog} aria-labelledby="preview-title" aria-describedby="preview-description" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <button type="button" className={styles.closeDialog} aria-label="Close checkout preview" onClick={() => dialog.current?.close()}><X size={22} aria-hidden="true" /></button>
        <p className={styles.eyebrow}>DESIGN PREVIEW</p>
        <h2 id="preview-title">You’re ready for the next step.</h2>
        <p id="preview-description">This page is a visual preview. The new checkout has not been connected, and no order has been placed.</p>
        <div className={styles.dialogSummary}><span>{quantity} × Buudy LED Mask</span><strong>{total}</strong></div>
        <button type="button" className={styles.checkoutButton} onClick={() => dialog.current?.close()}>Back to the preview <ArrowRight size={18} aria-hidden="true" /></button>
      </dialog>
    </>
  );
}
