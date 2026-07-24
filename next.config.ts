import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "almirahcollective.com",
      },
      {
        protocol: "https",
        hostname: "zscukxpafikmszrqwodc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
