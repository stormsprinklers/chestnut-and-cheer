import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [32, 48, 64, 96, 128, 180, 256],
  },
};

export default nextConfig;
