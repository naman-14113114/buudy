import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://buudy.com/",
      lastModified: new Date("2026-05-28"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://buudy.com/products/buudy-led-mask",
      lastModified: new Date("2026-05-28"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://buudy.com/products/red-light-torch",
      lastModified: new Date("2026-05-28"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://buudy.com/cart",
      lastModified: new Date("2026-05-28"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://buudy.com/pages/contact-us",
      lastModified: new Date("2026-05-29"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://buudy.com/pages/skincare-quiz",
      lastModified: new Date("2026-05-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
