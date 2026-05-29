import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
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
    ],
  },
};

export default nextConfig;
