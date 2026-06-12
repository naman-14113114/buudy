import type { MetadataRoute } from "next";
import { market } from "@/lib/market";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = [
    "/admin",
    "/account-settings",
    "/my-profile",
    "/order-history",
    "/order-confirmation",
    "/sign-in",
    "/sign-up",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "GoogleOther",
          "Applebot",
          "Bingbot",
        ],
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: `${market.siteUrl}/sitemap.xml`,
  };
}
