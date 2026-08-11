"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import type { ProductImage } from "@/lib/media";
import { market } from "@/lib/market";

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

  const currentImage = images[currentIndex] ?? images[0];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* --- CSS STYLES --- */
        /* 1. CONTAINER */
        .buudyLED-23435t23-container { max-width: 900px; margin: 0 auto; padding: 10px 10px 10px 10px !important; box-sizing: border-box; width: 100%; display: block; position: relative; z-index: 1; }
        /* 2. MAIN IMAGE */
        .buudyLED-23435t23-main_wrapper { position: relative; width: 100%; padding-bottom: 100%; background-color: transparent; margin-bottom: 20px; border-radius: 25px; overflow: hidden; cursor: zoom-in; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); box-sizing: border-box; }
        .buudyLED-23435t23-main_img { position: absolute; top: 0; left: 0; width: 100%; height: 100.5%; object-fit: cover; object-position: center; display: block; }
        /* 3. THUMBNAILS GRID */
        .buudyLED-23435t23-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; }
        .buudyLED-23435t23-thumb_item { position: relative; appearance: none; width: 100%; padding: 0 0 100%; cursor: zoom-in; border-radius: 15px; overflow: hidden; border: none; box-shadow: inset 0 0 0 2px transparent; background: transparent; box-sizing: border-box; transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .buudyLED-23435t23-thumb_img { position: absolute; top: 0; left: 0; width: 100%; height: 100.5%; object-fit: cover; object-position: center; display: block; transition: transform 0.3s ease; z-index: 0; }
        .buudyLED-23435t23-thumb_zoom { position: absolute; bottom: 9px; left: 9px; z-index: 2; display: grid; width: 29px; height: 29px; place-items: center; border: 1px solid rgba(58, 31, 61, .16); border-radius: 50%; background: rgba(247, 241, 232, .92); color: var(--plum); opacity: 0; transform: translateY(5px); transition: opacity .2s ease, transform .2s ease; }
        .buudyLED-23435t23-thumb_item:hover { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.16), inset 0 0 0 1px rgba(0, 0, 0, 0.05); z-index: 1; }
        .buudyLED-23435t23-thumb_item:hover .buudyLED-23435t23-thumb_img { transform: scale(1.08); }
        .buudyLED-23435t23-thumb_item:hover .buudyLED-23435t23-thumb_zoom,
        .buudyLED-23435t23-thumb_item:focus-visible .buudyLED-23435t23-thumb_zoom { opacity: 1; transform: translateY(0); }
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
        .buudyLED-23435t23-lightbox_img { max-width: 90vw; max-height: 85vh; border-radius: 25px; box-shadow: 0 0 30px rgba(0, 0, 0, 0.5); user-select: none; object-fit: contain; }
        .buudyLED-23435t23-close { position: absolute; top: 20px; right: 30px; display: flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 50%; background: rgba(247, 241, 232, .94); border: 1px solid rgba(58, 31, 61, .18); color: var(--plum); cursor: pointer; z-index: 100000001; transition: transform .2s ease, background-color .2s ease; }
        .buudyLED-23435t23-close:hover { background: var(--cream); transform: scale(1.06); }
        .buudyLED-23435t23-modal_nav { width: 60px; height: 60px; background: rgba(0, 0, 0, 0.1); border-radius: 50%; }
        .buudyLED-23435t23-modal_nav:hover { background: rgba(0, 0, 0, 0.2); }
        .buudyLED-23435t23-modal_nav .buudyLED-23435t23-icon { border-color: #333; }
        /* 6. ZOOM BUTTON */
        .buudyLED-23435t23-zoom_btn { position: absolute; bottom: 16px; left: 16px; width: 38px !important; min-height: 38px !important; background-color: rgba(247, 241, 232, 0.94); border: 1px solid rgba(58, 31, 61, .18); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 2px 6px rgba(58, 31, 61, 0.18); transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease; color: var(--plum); opacity: 0; }
        .buudyLED-23435t23-main_wrapper:hover .buudyLED-23435t23-zoom_btn, .buudyLED-23435t23-zoom_btn:focus-visible { opacity: 1; }
        .buudyLED-23435t23-zoom_btn:hover { background-color: #fff; transform: scale(1.1); }
        
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
            /* Hide Zoom Button on Mobile */
            .buudyLED-23435t23-zoom_btn {
                display: none !important;
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
            .buudyLED-23435t23-thumb_zoom {
                display: none !important;
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
          {currentImage.src.endsWith(".mp4") ||
          currentImage.src.endsWith(".webm") ? (
            <video
              src={currentImage.src}
              id="buudyLED-23435t23-MainImg"
              className="buudyLED-23435t23-main_img"
              autoPlay
              muted
              loop
              playsInline
              onClick={() => openLightbox()}

            />
          ) : (
            <img
              src={currentImage.src}
              id="buudyLED-23435t23-MainImg"
              className="buudyLED-23435t23-main_img"
              alt={currentImage.alt}
              decoding="async"
              fetchPriority="high"
              loading="eager"
              onClick={() => openLightbox()}

            />
          )}

          {/* Overlaid Badges */}
          {hasGifts && (
            <span className="buudy-mono absolute left-5 top-5 z-10 rounded-full bg-[var(--plum)] px-4 py-2 text-[var(--cream)] shadow-[0_10px_24px_-18px_rgba(58,31,61,.8)]">
              3 Free Gifts
            </span>
          )}
          <span className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5 rounded-full bg-[rgba(247,241,232,.92)] px-3.5 py-2 text-[var(--plum)] shadow-[0_10px_24px_-18px_rgba(58,31,61,.55)]">
            <svg
              aria-hidden="true"
              className="h-3 w-[21px] flex-shrink-0 object-contain rounded-[1px]"
              viewBox="0 0 60 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#012169" height="30" width="60" />
              <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
              <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="3" />
              <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
              <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
            </svg>
            <span className="buudy-mono leading-none">
              {market.madeInLabel}
            </span>
          </span>

          <button
            aria-label="Magnify current product image"
            className="buudyLED-23435t23-zoom_btn"
            onClick={(event) => {
              event.stopPropagation();
              openLightbox();
            }}
          >
            <Search aria-hidden="true" size={16} strokeWidth={2.2} />
          </button>

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
              <span aria-hidden="true" className="buudyLED-23435t23-thumb_zoom">
                <Search size={14} strokeWidth={2.2} />
              </span>
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
