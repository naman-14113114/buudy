import type { MetadataRoute } from "next";
import { market } from "@/lib/market";

const routes = [
  { path: "/", lastModified: "2026-06-16" },
  { path: "/products/buudy-led-mask", lastModified: "2026-06-16" },
  { path: "/pages/best-led-face-mask-uk", lastModified: "2026-06-16" },
  { path: "/products/red-light-torch", lastModified: "2026-06-16" },
  { path: "/pages/contact-us", lastModified: "2026-06-16" },
  { path: "/pages/about-us", lastModified: "2026-06-16" },
  { path: "/pages/faqs", lastModified: "2026-06-16" },
  { path: "/pages/skincare-quiz", lastModified: "2026-06-16" },
  { path: "/pages/premium-travel-box", lastModified: "2026-06-16" },
  { path: "/pages/buudy-led-torch", lastModified: "2026-06-16" },
  { path: "/pages/skincare-guide", lastModified: "2026-06-16" },
  { path: "/shipping-policy", lastModified: "2026-06-16" },
  { path: "/return-policy", lastModified: "2026-06-16" },
  { path: "/refund-policy", lastModified: "2026-06-16" },
  { path: "/privacy-policy", lastModified: "2026-06-16" },
  { path: "/terms-of-service", lastModified: "2026-06-16" },
  { path: "/cookies-policy", lastModified: "2026-06-16" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${market.siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(route.lastModified),
  }));
}
