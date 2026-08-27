"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-FSV104S5S3";
const BING_UET_TAG_ID =
  process.env.NEXT_PUBLIC_BING_UET_TAG_ID || "211072489";
const MICROSOFT_SHOPPING_UET_TAG_ID = "355060364";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    uetq?: {
      push: (...args: unknown[]) => unknown;
    };
    shoppingUetq?: {
      push: (...args: unknown[]) => unknown;
    };
    __buudyGa4Ready?: boolean;
    __buudyUetReady?: boolean;
    __buudyShoppingUetReady?: boolean;
  }
}

function loadExternalScript(id: string, src: string) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function initGa4() {
  if (!GA4_MEASUREMENT_ID) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

  loadExternalScript(
    "buudy-ga4-loader",
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      GA4_MEASUREMENT_ID,
    )}`,
  );

  if (!window.__buudyGa4Ready) {
    window.gtag("js", new Date());
    window.__buudyGa4Ready = true;
  }
}

function trackGa4PageView() {
  if (!GA4_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag("config", GA4_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

function initBingUet() {
  if (
    (!BING_UET_TAG_ID && !MICROSOFT_SHOPPING_UET_TAG_ID) ||
    (window.__buudyUetReady && window.__buudyShoppingUetReady)
  ) {
    return;
  }

  window.uetq = window.uetq || { push: () => undefined };
  window.shoppingUetq = window.shoppingUetq || {
    push: () => undefined,
  };

  const script = document.createElement("script");
  script.id = "buudy-bing-uet-loader";
  script.text = `
    (function(w,d,t,r,u,s){
      var f,n,i;
      w[u]=w[u]||[];
      w[s]=w[s]||[];
      f=function(){
        var o={ti:"${BING_UET_TAG_ID}", enableAutoSpaTracking:true};
        o.q=w[u];
        w[u]=new UET(o);
        w[u].push("pageLoad");

        var shoppingOptions={ti:"${MICROSOFT_SHOPPING_UET_TAG_ID}", enableAutoSpaTracking:true};
        shoppingOptions.q=w[s];
        w[s]=new UET(shoppingOptions);
        w[s].push("pageLoad");
      };
      n=d.createElement(t);
      n.src=r;
      n.async=1;
      n.onload=n.onreadystatechange=function(){
        var s=this.readyState;
        if(!s||s==="loaded"||s==="complete"){
          f();
          n.onload=n.onreadystatechange=null;
        }
      };
      i=d.getElementsByTagName(t)[0];
      i.parentNode.insertBefore(n,i);
    })(window,document,"script","https://bat.bing.com/bat.js","uetq","shoppingUetq");
  `;
  document.head.appendChild(script);
  window.__buudyUetReady = true;
  window.__buudyShoppingUetReady = true;
}

export function MarketingAnalytics() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    initGa4();
    initBingUet();
  }, []);

  useEffect(() => {
    const path = `${window.location.pathname}${window.location.search}`;

    if (lastTrackedPath.current === path) {
      return;
    }

    trackGa4PageView();

    if (lastTrackedPath.current && window.uetq) {
      window.uetq.push("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    if (lastTrackedPath.current && window.shoppingUetq) {
      window.shoppingUetq.push("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    lastTrackedPath.current = path;
  }, [pathname]);

  return null;
}
