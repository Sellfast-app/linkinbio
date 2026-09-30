import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "share.google" },
      { protocol: "https", hostname: "www.google.com" },
    ],
  },
};

export default nextConfig;
