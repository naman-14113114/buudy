"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { ProductImage } from "@/lib/media";

export function ProductGallery({
  images,
  hasGifts = true,
}: {
  images: ProductImage[];
  hasGifts?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);



  // 2. Navigation controls
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);
  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);
  const openLightbox = useCallback(
    (index = currentIndex) => {
      setCurrentIndex(index);
      setIsLightboxOpen(true);
    },
    [currentIndex],
  );

  // 3. Auto-rotate effect
  useEffect(() => {
    if (isLightboxOpen || isPaused) return;

    const interval = setInterval(() => {
      goNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [goNext, isLightboxOpen, isPaused]);

  // 4. Center active thumbnail only in the stacked gallery strip.
  useEffect(() => {
    if (thumbsRef.current && window.innerWidth < 1024) {
      const activeThumb = thumbsRef.current.children[
        currentIndex
      ] as HTMLElement;
      if (activeThumb) {
        const scrollPos =
          activeThumb.offsetLeft -
          thumbsRef.current.offsetWidth / 2 +
          activeThumb.offsetWidth / 2;
        thumbsRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
      }
    }
  }, [currentIndex]);

  // 5. Keep modal focus contained and lock the page while magnified.
  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    previousActiveElementRef.current =
      document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "Tab" && lightboxRef.current) {
        const focusable = Array.from(
          lightboxRef.current.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])",
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [goNext, goPrev, isLightboxOpen]);

  // 6. Mobile swipe gesture handlers on main wrapper
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (window.innerWidth < 768) {
      if (touchEndX < touchStartXRef.current - swipeThreshold) {
        goNext();
      } else if (touchEndX > touchStartXRef.current + swipeThreshold) {
        goPrev();
      }
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* --- CSS STYLES --- */
        /* 1. CONTAINER */
        .buudyLED-23435t23-container { max-width: 900px; margin: 0 auto; padding: 10px 10px 10px 10px !important; box-sizing: border-box; width: 100%; display: block; position: relative; z-index: 1; }
        /* 2. MAIN IMAGE */
        .buudyLED-23435t23-main_wrapper { position: relative; width: 100%; padding-bottom: 100%; background-color: transparent; margin-bottom: 20px; border-radius: 25px; overflow: hidden; cursor: url("/cursor-zoom-in.svg") 20 20, zoom-in; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); box-sizing: border-box; }
        .buudyLED-23435t23-main_img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        /* 3. THUMBNAILS GRID */
        .buudyLED-23435t23-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; }
        .buudyLED-23435t23-thumb_item { position: relative; appearance: none; width: 100%; padding: 0 0 100%; cursor: url("/cursor-zoom-in.svg") 20 20, zoom-in; border-radius: 15px; overflow: hidden; border: none; box-shadow: inset 0 0 0 2px transparent; background: transparent; box-sizing: border-box; transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .buudyLED-23435t23-thumb_img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; transition: transform 0.3s ease; z-index: 0; }
        .buudyLED-23435t23-thumb_item:hover { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16), inset 0 0 0 1px rgba(0, 0, 0, 0.05); z-index: 1; }
        .buudyLED-23435t23-thumb_item:hover .buudyLED-23435t23-thumb_img { transform: scale(1.08); }
        .buudyLED-23435t23-thumb_item.buudyLED-23435t23-active { box-shadow: inset 0 0 0 2px #000; }
        /* 4. ARROWS */
        .buudyLED-23435t23-arrow { position: absolute; top: 50%; transform: translateY(-50%); background-color: rgba(255, 255, 255, 0.9); border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); padding: 0; transition: transform 0.2s, background-color 0.2s; }
        .buudyLED-23435t23-arrow:hover { background-color: #fff; transform: translateY(-50%) scale(1.1); }
        .buudyLED-23435t23-icon { border: solid #333; border-width: 0 3px 3px 0; display: inline-block; padding: 5px; }
        .buudyLED-23435t23-icon_right { transform: rotate(-45deg); margin-left: -4px; }
        .buudyLED-23435t23-icon_left { transform: rotate(135deg); margin-right: -4px; }
        .buudyLED-23435t23-prev { left: 15px; }
        .buudyLED-23435t23-next { right: 15px; }
        /* 5. LIGHTBOX OVERLAY */
        .buudyLED-23435t23-lightbox { position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: none; justify-content: center; align-items: center; background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 99999999; pointer-events: auto; }
        .buudyLED-23435t23-lightbox_content { position: relative; z-index: 100000000; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
        .buudyLED-23435t23-lightbox_stage { position: relative; display: inline-flex; align-items: center; justify-content: center; max-width: 90vw; max-height: 85vh; border-radius: 25px; overflow: hidden; }
        .buudyLED-23435t23-lightbox_img { max-width: 90vw; max-height: 85vh; border-radius: 25px; box-shadow: 0 0 30px rgba(0, 0, 0, 0.5); user-select: none; object-fit: contain; transition: opacity 0.3s ease; }
        .buudyLED-23435t23-close { position: absolute; top: 20px; right: 30px; display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 50%; background: rgba(247, 241, 232, .94); border: 1px solid rgba(58, 31, 61, .18); color: var(--plum); cursor: pointer; z-index: 100000001; transition: transform .2s ease, background-color .2s ease; }
        .buudyLED-23435t23-close:hover { background: var(--cream); transform: scale(1.06); }
        .buudyLED-23435t23-modal_nav { width: 60px; height: 60px; background: rgba(0, 0, 0, 0.1); border-radius: 50%; }
        .buudyLED-23435t23-modal_nav:hover { background: rgba(0, 0, 0, 0.2); }
        .buudyLED-23435t23-modal_nav .buudyLED-23435t23-icon { border-color: #333; }
        
        /* 6. EDITORIAL IMAGE BADGES & ANIMATIONS */
        .buudy-gallery-badge {
          position: absolute;
          z-index: 6;
          pointer-events: none;
          user-select: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 0 !important;
          background: transparent !important;
          background-color: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          box-sizing: border-box;
          max-width: 250px;
          will-change: opacity, transform;
        }
        .buudy-gallery-badge--top-left {
          top: 26px;
          left: 26px;
          align-items: flex-start;
          text-align: left;
          max-width: 240px;
          animation: buudyBadgeSlideInLeft 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .buudy-gallery-badge--bottom-left {
          bottom: 26px;
          left: 26px;
          align-items: flex-start;
          text-align: left;
          max-width: 240px;
          animation: buudyBadgeSlideInLeft 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .buudy-gallery-badge--top-right {
          top: 26px;
          right: 26px;
          align-items: flex-end;
          text-align: right;
          max-width: 240px;
          animation: buudyBadgeSlideInRight 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .buudy-gallery-badge--bottom-right {
          bottom: 26px;
          right: 26px;
          align-items: flex-end;
          text-align: right;
          max-width: 240px;
          animation: buudyBadgeSlideInRight 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .buudy-gallery-badge__header {
          display: block;
          margin: 0;
          padding: 0;
        }
        .buudy-gallery-badge__title {
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: clamp(16px, 2.2vw, 20px);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #111111;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 12px rgba(255, 255, 255, 0.85);
          white-space: normal !important;
          word-wrap: break-word;
          overflow-wrap: break-word;
          margin: 0;
          display: block;
        }
        .buudy-gallery-badge__sub {
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: clamp(11.5px, 1.4vw, 13.5px);
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: -0.01em;
          color: #374151;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
          white-space: normal !important;
          word-wrap: break-word;
          overflow-wrap: break-word;
          margin: 0;
          margin-top: 2px;
          display: block;
          animation: buudySubSlideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
          will-change: opacity, transform;
        }
        .buudy-gallery-badge--top-right .buudy-gallery-badge__sub,
        .buudy-gallery-badge--bottom-right .buudy-gallery-badge__sub {
          animation: buudySubSlideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
        }
        .buudy-gallery-badge--white .buudy-gallery-badge__title {
          color: #ffffff !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 0, 0, 0.75) !important;
        }
        .buudy-gallery-badge--white .buudy-gallery-badge__sub {
          color: rgba(255, 255, 255, 0.92) !important;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85) !important;
        }
        .buudy-gallery-badge--lightbox {
          max-width: clamp(150px, 35vw, 240px);
          z-index: 10 !important;
        }
        .buudy-gallery-badge--lightbox.buudy-gallery-badge--top-left {
          top: clamp(14px, 2.5vw, 24px);
          left: clamp(14px, 2.5vw, 24px);
        }
        .buudy-gallery-badge--lightbox.buudy-gallery-badge--bottom-left {
          bottom: clamp(14px, 2.5vw, 24px);
          left: clamp(14px, 2.5vw, 24px);
        }
        .buudy-gallery-badge--lightbox.buudy-gallery-badge--top-right {
          top: clamp(14px, 2.5vw, 24px);
          right: clamp(14px, 2.5vw, 24px);
        }
        .buudy-gallery-badge--lightbox.buudy-gallery-badge--bottom-right {
          bottom: clamp(14px, 2.5vw, 24px);
          right: clamp(14px, 2.5vw, 24px);
        }
        @keyframes buudyBadgeSlideInLeft {
          0% {
            opacity: 0;
            transform: translate3d(-36px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes buudyBadgeSlideInRight {
          0% {
            opacity: 0;
            transform: translate3d(36px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes buudySubSlideInLeft {
          0% {
            opacity: 0;
            transform: translate3d(-14px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes buudySubSlideInRight {
          0% {
            opacity: 0;
            transform: translate3d(14px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @media screen and (max-width: 767px) {
          .buudy-gallery-badge {
            max-width: clamp(135px, 42vw, 175px) !important;
            gap: 2px !important;
          }
          .buudy-gallery-badge--top-left {
            top: clamp(10px, 3vw, 16px) !important;
            left: clamp(10px, 3vw, 16px) !important;
            animation-name: buudyBadgeSlideInLeftMobile !important;
          }
          .buudy-gallery-badge--bottom-left {
            bottom: clamp(10px, 3vw, 16px) !important;
            left: clamp(10px, 3vw, 16px) !important;
            animation-name: buudyBadgeSlideInLeftMobile !important;
          }
          .buudy-gallery-badge--top-right {
            top: clamp(10px, 3vw, 16px) !important;
            right: clamp(10px, 3vw, 16px) !important;
            animation-name: buudyBadgeSlideInRightMobile !important;
          }
          .buudy-gallery-badge--bottom-right {
            bottom: clamp(10px, 3vw, 16px) !important;
            right: clamp(10px, 3vw, 16px) !important;
            animation-name: buudyBadgeSlideInRightMobile !important;
          }
          .buudy-gallery-badge__title {
            font-size: clamp(12px, 3.4vw, 14.5px) !important;
            line-height: 1.16 !important;
          }
          .buudy-gallery-badge__sub {
            font-size: clamp(9.5px, 2.6vw, 11px) !important;
            line-height: 1.25 !important;
            margin-top: 1px !important;
          }
        }
        @keyframes buudyBadgeSlideInLeftMobile {
          0% {
            opacity: 0;
            transform: translate3d(-16px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes buudyBadgeSlideInRightMobile {
          0% {
            opacity: 0;
            transform: translate3d(16px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* 7. STACKED RESPONSIVENESS */
        @media (max-width: 1023px) { 
            .buudyLED-23435t23-grid { 
                display: flex; 
                flex-wrap: nowrap;
                overflow-x: auto;
                gap: 12px; 
                padding-bottom: 4px;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE/Edge */
            } 
            /* Hide scrollbar for Chrome/Safari/Opera */
            .buudyLED-23435t23-grid::-webkit-scrollbar {
                display: none;
            }
            .buudyLED-23435t23-thumb_item {
                flex: 0 0 28%; /* Show ~3.5 items to hint at scrolling */
                min-width: 80px; 
                padding: 0; /* Override desktop padding hack */
                aspect-ratio: 1 / 1; /* Maintain perfect square */
                scroll-snap-align: start;
            }
            .buudyLED-23435t23-thumb_img {
                height: 100%; /* Reset the 100.5% height to exact fit */
            }
        }
      `,
        }}
      />

      <div
        className="buudyLED-23435t23-container"
        id="buudyLED-23435t23-Container"
      >
        <div
          className="buudyLED-23435t23-main_wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            const isVideo =
              image.src.endsWith(".mp4") || image.src.endsWith(".webm");

            return (
              <div
                key={image.src}
                className={`buudyLED-23435t23-slide ${
                  isActive ? "buudyLED-23435t23-slide_active" : ""
                }`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1,
                  pointerEvents: isActive ? "auto" : "none",
                  transition: "opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                onClick={() => openLightbox(index)}
              >
                {isVideo ? (
                  <video
                    src={image.src}
                    id={isActive ? "buudyLED-23435t23-MainImg" : undefined}
                    className="buudyLED-23435t23-main_img"
                    autoPlay={isActive}
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={image.src}
                    id={isActive ? "buudyLED-23435t23-MainImg" : undefined}
                    className="buudyLED-23435t23-main_img"
                    alt={image.alt}
                    decoding="async"
                    fetchPriority={index === 0 ? "high" : "low"}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}

                {isActive && image.badge && (
                  <div key={`badge-${index}-${image.src}`}>
                    <GalleryImageBadge badge={image.badge} />
                  </div>
                )}
              </div>
            );
          })}

          <button
            className="buudyLED-23435t23-arrow buudyLED-23435t23-prev"
            aria-label="Previous Image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goPrev();
            }}
          >
            <i className="buudyLED-23435t23-icon buudyLED-23435t23-icon_left" />
          </button>
          <button
            className="buudyLED-23435t23-arrow buudyLED-23435t23-next"
            aria-label="Next Image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goNext();
            }}
          >
            <i className="buudyLED-23435t23-icon buudyLED-23435t23-icon_right" />
          </button>
        </div>

        <div
          className="buudyLED-23435t23-grid"
          id="buudyLED-23435t23-Thumbs"
          ref={thumbsRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {images.map((image, index) => (
            <button
              aria-label={`Magnify ${image.alt}`}
              key={image.src}
              className={`buudyLED-23435t23-thumb_item ${
                index === currentIndex ? "buudyLED-23435t23-active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(index);
              }}
              type="button"
            >
              {image.src.endsWith(".mp4") || image.src.endsWith(".webm") ? (
                <video
                  src={image.src}
                  className="buudyLED-23435t23-thumb_img"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={image.src}
                  className="buudyLED-23435t23-thumb_img"
                  alt={image.alt}
                  decoding="async"
                  fetchPriority="low"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {isLightboxOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              aria-label="Expanded product gallery"
              aria-modal="true"
              className="buudyLED-23435t23-lightbox"
              id="buudyLED-23435t23-Modal"
              ref={lightboxRef}
              role="dialog"
              style={{ display: "flex" }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsLightboxOpen(false);
                }
              }}
            >
              <div
                className="buudyLED-23435t23-lightbox_content"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsLightboxOpen(false);
                  }
                }}
              >
                <button
                  className="buudyLED-23435t23-close"
                  id="buudyLED-23435t23-ModalClose"
                  aria-label="Close View"
                  onClick={() => setIsLightboxOpen(false)}
                  ref={closeButtonRef}
                >
                  <X aria-hidden="true" size={24} />
                </button>
                <button
                  className="buudyLED-23435t23-arrow buudyLED-23435t23-modal_nav buudyLED-23435t23-prev"
                  id="buudyLED-23435t23-ModalPrev"
                  aria-label="Previous Image"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                >
                  <i className="buudyLED-23435t23-icon buudyLED-23435t23-icon_left" />
                </button>
                <div className="buudyLED-23435t23-lightbox_stage">
                  {images[currentIndex]?.src?.endsWith(".mp4") ||
                  images[currentIndex]?.src?.endsWith(".webm") ? (
                    <video
                      className="buudyLED-23435t23-lightbox_img"
                      id="buudyLED-23435t23-ModalImg"
                      src={images[currentIndex]?.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      className="buudyLED-23435t23-lightbox_img"
                      id="buudyLED-23435t23-ModalImg"
                      src={images[currentIndex]?.src}
                      alt="Expanded Product View"
                      decoding="async"
                    />
                  )}
                  {images[currentIndex]?.badge && (
                    <div key={`modal-badge-${currentIndex}-${images[currentIndex]?.src}`}>
                      <GalleryImageBadge badge={images[currentIndex].badge!} isLightbox />
                    </div>
                  )}
                </div>
                <button
                  className="buudyLED-23435t23-arrow buudyLED-23435t23-modal_nav buudyLED-23435t23-next"
                  id="buudyLED-23435t23-ModalNext"
                  aria-label="Next Image"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                >
                  <i className="buudyLED-23435t23-icon buudyLED-23435t23-icon_right" />
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function GalleryImageBadge({
  badge,
  isLightbox = false,
}: {
  badge: NonNullable<ProductImage["badge"]>;
  isLightbox?: boolean;
}) {
  const positionClass = badge.position
    ? `buudy-gallery-badge--${badge.position}`
    : "buudy-gallery-badge--top-left";
  const themeClass = badge.theme === "white" ? "buudy-gallery-badge--white" : "";
  const lightboxClass = isLightbox ? "buudy-gallery-badge--lightbox" : "";

  return (
    <div
      className={`buudy-gallery-badge ${positionClass} ${themeClass} ${lightboxClass}`}
    >
      <div className="buudy-gallery-badge__header">
        <span className="buudy-gallery-badge__title">
          {badge.title.split("\n").map((line, idx, arr) => (
            <span key={idx}>
              {line}
              {idx < arr.length - 1 && <br />}
            </span>
          ))}
        </span>
      </div>
      {badge.sub && (
        <span className="buudy-gallery-badge__sub">{badge.sub}</span>
      )}
    </div>
  );
}
