"use client";

import { useEffect, useState, useRef } from "react";
import type { ProductImage } from "@/lib/media";

const zoomIconSVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [transitionOpacity, setTransitionOpacity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);

  // 1. Handle opacity transition during image changes
  useEffect(() => {
    setTransitionOpacity(0.5);
    const timeout = setTimeout(() => {
      setDisplayIndex(currentIndex);
      setTransitionOpacity(1);
    }, 150);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  // 2. Navigation controls
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 3. Auto-rotate effect
  useEffect(() => {
    if (isLightboxOpen || isPaused) return;

    const interval = setInterval(() => {
      goNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isLightboxOpen, isPaused, images.length]);

  // 4. Center active thumbnail in mobile horizontal scrolling list
  useEffect(() => {
    if (thumbsRef.current && window.innerWidth <= 768) {
      const activeThumb = thumbsRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        const scrollPos =
          activeThumb.offsetLeft -
          thumbsRef.current.offsetWidth / 2 +
          activeThumb.offsetWidth / 2;
        thumbsRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
      }
    }
  }, [currentIndex]);

  // 5. Keyboard event listener for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, images.length]);

  // 6. Mobile swipe gesture handlers on main wrapper
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (window.innerWidth <= 768) {
      if (touchEndX < touchStartXRef.current - swipeThreshold) {
        goNext();
      } else if (touchEndX > touchStartXRef.current + swipeThreshold) {
        goPrev();
      }
    }
  };

  const currentImage = images[displayIndex] ?? images[0];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* --- CSS STYLES --- */
        /* 1. CONTAINER */
        .buudyLED-23435t23-container { max-width: 900px; margin: 0 auto; padding: 10px 10px 40px 10px !important; box-sizing: border-box; width: 100%; display: block; position: relative; z-index: 1; }
        /* 2. MAIN IMAGE */
        .buudyLED-23435t23-main_wrapper { position: relative; width: 100%; padding-bottom: 100%; background-color: transparent; margin-bottom: 20px; border-radius: 25px; overflow: hidden; cursor: zoom-in; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); box-sizing: border-box; }
        .buudyLED-23435t23-main_img { position: absolute; top: 0; left: 0; width: 100%; height: 100.5%; object-fit: cover; object-position: center; display: block; transition: opacity 0.3s ease; }
        /* 3. THUMBNAILS GRID */
        .buudyLED-23435t23-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; }
        .buudyLED-23435t23-thumb_item { position: relative; width: 100%; padding-bottom: 100%; cursor: pointer; border-radius: 15px; overflow: hidden; border: none; box-shadow: inset 0 0 0 2px transparent; background: transparent; box-sizing: border-box; transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .buudyLED-23435t23-thumb_img { position: absolute; top: 0; left: 0; width: 100%; height: 100.5%; object-fit: cover; object-position: center; display: block; transition: transform 0.3s ease; z-index: 0; }
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
        .buudyLED-23435t23-lightbox_img { max-width: 90vw; max-height: 85vh; border-radius: 25px; box-shadow: 0 0 30px rgba(0, 0, 0, 0.5); user-select: none; object-fit: contain; }
        .buudyLED-23435t23-close { position: absolute; top: 20px; right: 30px; background: none; border: none; color: #333; font-size: 40px; font-weight: bold; cursor: pointer; z-index: 100000001; }
        .buudyLED-23435t23-modal_nav { width: 60px; height: 60px; background: rgba(0, 0, 0, 0.1); border-radius: 50%; }
        .buudyLED-23435t23-modal_nav:hover { background: rgba(0, 0, 0, 0.2); }
        .buudyLED-23435t23-modal_nav .buudyLED-23435t23-icon { border-color: #333; }
        /* 6. ZOOM BUTTON */
        .buudyLED-23435t23-zoom_btn { position: absolute; bottom: 10px; right: 10px; width: 25px !important; min-height: 25px !important; background-color: rgba(255, 255, 255, 0.9); border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); transition: transform 0.2s ease, background-color 0.2s ease; color: #000; }
        .buudyLED-23435t23-zoom_btn:hover { background-color: #fff; transform: scale(1.1); }
        
        /* 7. MOBILE RESPONSIVENESS */
        @media (max-width: 768px) { 
            .buudyLED-23435t23-grid { 
                display: flex; 
                flex-wrap: nowrap;
                overflow-x: auto;
                gap: 12px; 
                padding-bottom: 10px;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
            } 
            /* Hide Zoom Button on Mobile */
            .buudyLED-23435t23-zoom_btn {
                display: none !important;
            }
            /* Custom Scrollbar for Mobile */
            .buudyLED-23435t23-grid::-webkit-scrollbar {
                height: 5px;
            }
            .buudyLED-23435t23-grid::-webkit-scrollbar-track {
                background: rgba(0,0,0,0.05);
                border-radius: 4px;
            }
            .buudyLED-23435t23-grid::-webkit-scrollbar-thumb {
                background: rgba(0,0,0,0.2);
                border-radius: 4px;
            }
            .buudyLED-23435t23-thumb_item {
                flex: 0 0 28%; /* Show ~3.5 items to hint at scrolling */
                min-width: 80px; 
                padding-bottom: 0; /* Override desktop padding hack */
                aspect-ratio: 1 / 1; /* Maintain perfect square */
                scroll-snap-align: start;
            }
            .buudyLED-23435t23-thumb_img {
                height: 100%; /* Reset the 100.5% height to exact fit */
            }
        }
      ` }} />

      <div className="buudyLED-23435t23-container" id="buudyLED-23435t23-Container">
        <div
          className="buudyLED-23435t23-main_wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsLightboxOpen(true)}
        >
          <img
            src={currentImage.src}
            id="buudyLED-23435t23-MainImg"
            className="buudyLED-23435t23-main_img"
            alt={currentImage.alt}
            style={{ opacity: transitionOpacity }}
          />

          {/* Overlaid Badges */}
          <span className="buudy-mono absolute right-5 top-5 z-10 rounded-full bg-[var(--plum)] px-4 py-2 text-[var(--cream)] shadow-[0_10px_24px_-18px_rgba(58,31,61,.8)]">
            3 Free Gifts
          </span>
          <span className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5 rounded-full bg-[rgba(247,241,232,.92)] px-3.5 py-2 text-[var(--plum)] shadow-[0_10px_24px_-18px_rgba(58,31,61,.55)]">
            <svg
              aria-hidden="true"
              className="h-3 w-[21px] flex-shrink-0 object-contain rounded-[1px]"
              viewBox="0 0 19 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#B22234" height="10" width="19" />
              <line stroke="#FFFFFF" strokeWidth="1" x1="0" x2="19" y1="1" y2="1" />
              <line stroke="#FFFFFF" strokeWidth="1" x1="0" x2="19" y1="3" y2="3" />
              <line stroke="#FFFFFF" strokeWidth="1" x1="0" x2="19" y1="5" y2="5" />
              <line stroke="#FFFFFF" strokeWidth="1" x1="0" x2="19" y1="7" y2="7" />
              <line stroke="#FFFFFF" strokeWidth="1" x1="0" x2="19" y1="9" y2="9" />
              <rect fill="#3C3B6E" height="5.38" width="7.6" />
              <g fill="#FFFFFF">
                <circle cx="0.63" cy="0.45" r="0.15" />
                <circle cx="1.89" cy="0.45" r="0.15" />
                <circle cx="3.15" cy="0.45" r="0.15" />
                <circle cx="4.41" cy="0.45" r="0.15" />
                <circle cx="5.67" cy="0.45" r="0.15" />
                <circle cx="6.93" cy="0.45" r="0.15" />
                <circle cx="1.26" cy="0.90" r="0.15" />
                <circle cx="2.52" cy="0.90" r="0.15" />
                <circle cx="3.78" cy="0.90" r="0.15" />
                <circle cx="5.04" cy="0.90" r="0.15" />
                <circle cx="6.30" cy="0.90" r="0.15" />
                <circle cx="0.63" cy="1.35" r="0.15" />
                <circle cx="1.89" cy="1.35" r="0.15" />
                <circle cx="3.15" cy="1.35" r="0.15" />
                <circle cx="4.41" cy="1.35" r="0.15" />
                <circle cx="5.67" cy="1.35" r="0.15" />
                <circle cx="6.93" cy="1.35" r="0.15" />
                <circle cx="1.26" cy="1.80" r="0.15" />
                <circle cx="2.52" cy="1.80" r="0.15" />
                <circle cx="3.78" cy="1.80" r="0.15" />
                <circle cx="5.04" cy="1.80" r="0.15" />
                <circle cx="6.30" cy="1.80" r="0.15" />
                <circle cx="0.63" cy="2.25" r="0.15" />
                <circle cx="1.89" cy="2.25" r="0.15" />
                <circle cx="3.15" cy="2.25" r="0.15" />
                <circle cx="4.41" cy="2.25" r="0.15" />
                <circle cx="5.67" cy="2.25" r="0.15" />
                <circle cx="6.93" cy="2.25" r="0.15" />
                <circle cx="1.26" cy="2.70" r="0.15" />
                <circle cx="2.52" cy="2.70" r="0.15" />
                <circle cx="3.78" cy="2.70" r="0.15" />
                <circle cx="5.04" cy="2.70" r="0.15" />
                <circle cx="6.30" cy="2.70" r="0.15" />
                <circle cx="0.63" cy="3.15" r="0.15" />
                <circle cx="1.89" cy="3.15" r="0.15" />
                <circle cx="3.15" cy="3.15" r="0.15" />
                <circle cx="4.41" cy="3.15" r="0.15" />
                <circle cx="5.67" cy="3.15" r="0.15" />
                <circle cx="6.93" cy="3.15" r="0.15" />
                <circle cx="1.26" cy="3.60" r="0.15" />
                <circle cx="2.52" cy="3.60" r="0.15" />
                <circle cx="3.78" cy="3.60" r="0.15" />
                <circle cx="5.04" cy="3.60" r="0.15" />
                <circle cx="6.30" cy="3.60" r="0.15" />
                <circle cx="0.63" cy="4.05" r="0.15" />
                <circle cx="1.89" cy="4.05" r="0.15" />
                <circle cx="3.15" cy="4.05" r="0.15" />
                <circle cx="4.41" cy="4.05" r="0.15" />
                <circle cx="5.67" cy="4.05" r="0.15" />
                <circle cx="6.93" cy="4.05" r="0.15" />
                <circle cx="1.26" cy="4.50" r="0.15" />
                <circle cx="2.52" cy="4.50" r="0.15" />
                <circle cx="3.78" cy="4.50" r="0.15" />
                <circle cx="5.04" cy="4.50" r="0.15" />
                <circle cx="6.30" cy="4.50" r="0.15" />
                <circle cx="0.63" cy="4.95" r="0.15" />
                <circle cx="1.89" cy="4.95" r="0.15" />
                <circle cx="3.15" cy="4.95" r="0.15" />
                <circle cx="4.41" cy="4.95" r="0.15" />
                <circle cx="5.67" cy="4.95" r="0.15" />
                <circle cx="6.93" cy="4.95" r="0.15" />
              </g>
            </svg>
            <span className="buudy-mono leading-none">Made in USA</span>
          </span>

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

          <button
            className="buudyLED-23435t23-zoom_btn"
            aria-label="Zoom image"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            dangerouslySetInnerHTML={{ __html: zoomIconSVG }}
          />
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
            <div
              key={image.src}
              className={`buudyLED-23435t23-thumb_item ${
                index === currentIndex ? "buudyLED-23435t23-active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            >
              <img
                src={image.src}
                className="buudyLED-23435t23-thumb_img"
                alt={image.alt}
              />
              <button
                className="buudyLED-23435t23-zoom_btn"
                aria-label="Zoom image"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setIsLightboxOpen(true);
                }}
                dangerouslySetInnerHTML={{ __html: zoomIconSVG }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="buudyLED-23435t23-lightbox"
        id="buudyLED-23435t23-Modal"
        style={{ display: isLightboxOpen ? "flex" : "none" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsLightboxOpen(false);
          }
        }}
      >
        <div className="buudyLED-23435t23-lightbox_content" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsLightboxOpen(false);
          }
        }}>
          <button
            className="buudyLED-23435t23-close"
            id="buudyLED-23435t23-ModalClose"
            aria-label="Close View"
            onClick={() => setIsLightboxOpen(false)}
          >
            &times;
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
          <img
            className="buudyLED-23435t23-lightbox_img"
            id="buudyLED-23435t23-ModalImg"
            src={images[currentIndex]?.src}
            alt="Expanded Product View"
          />
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
      </div>
    </>
  );
}
