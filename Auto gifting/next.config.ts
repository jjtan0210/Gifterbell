import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trigger redeploy with env vars
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
