import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@buudy/ui", "@buudy/shared"],
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: path.join(process.cwd(), "../.."),
  },
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.trustpilotreview.shop",
      },
      {
        protocol: "https",
        hostname: "img.thesitebase.net",
      },
      {
        protocol: "https",
        hostname: "img.shopbase.com",
      },
      {
        protocol: "https",
        hostname: "assets.thesitebase.net",
      },
      {
        protocol: "https",
        hostname: "images.videowise.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // xPage Drop exact slugs
      {
        source: "/policies/privacy",
        destination: "/policies/privacy-policy",
        permanent: true,
      },
      {
        source: "/policies/refund_return",
        destination: "/policies/return-policy",
        permanent: true,
      },
      {
        source: "/policies/shipping",
        destination: "/policies/shipping-policy",
        permanent: true,
      },
      {
        source: "/policies/terms_of_service",
        destination: "/policies/terms-of-service",
        permanent: true,
      },
      // Root policy shortcuts to canonical /policies/*
      {
        source: "/privacy-policy",
        destination: "/policies/privacy-policy",
        permanent: true,
      },
      {
        source: "/return-policy",
        destination: "/policies/return-policy",
        permanent: true,
      },
      {
        source: "/shipping-policy",
        destination: "/policies/shipping-policy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/policies/terms-of-service",
        permanent: true,
      },
      {
        source: "/refund-policy",
        destination: "/policies/refund-policy",
        permanent: true,
      },
      {
        source: "/cookies-policy",
        destination: "/policies/cookies-policy",
        permanent: true,
      },
      // Order tracking aliases
      {
        source: "/policies/order-tracking",
        destination: "/order-tracking",
        permanent: true,
      },
      {
        source: "/pages/order-tracking",
        destination: "/order-tracking",
        permanent: true,
      },
      // Guide uppercase to lowercase canonical redirect
      {
        source: "/pages/best-led-face-mask-Canada",
        destination: "/pages/best-led-face-mask-canada",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
