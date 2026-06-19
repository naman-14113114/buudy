"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type IdleWindow = Window & {
  cancelIdleCallback?: (handle: number) => void;
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
};

export function PageMediaPreloader() {
  const pathname = usePathname();

  useEffect(() => {
    const preloaders: HTMLImageElement[] = [];
    const idleWindow = window as IdleWindow;

    const preloadPageImages = () => {
      const sources = new Set<string>();

      document.querySelectorAll<HTMLImageElement>("main img").forEach((image) => {
        const source = image.currentSrc || image.src;
        if (source) sources.add(source);
      });

      document.querySelectorAll<HTMLVideoElement>("main video[poster]").forEach((video) => {
        if (video.poster) sources.add(video.poster);
      });

      sources.forEach((source) => {
        const image = new window.Image();
        image.decoding = "async";
        image.fetchPriority = "low";
        image.src = source;
        preloaders.push(image);
      });
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(preloadPageImages, {
        timeout: 1000,
      });
      return () => {
        idleWindow.cancelIdleCallback?.(handle);
        preloaders.length = 0;
      };
    }

    const timeout = window.setTimeout(preloadPageImages, 250);
    return () => {
      window.clearTimeout(timeout);
      preloaders.length = 0;
    };
  }, [pathname]);

  return null;
}
