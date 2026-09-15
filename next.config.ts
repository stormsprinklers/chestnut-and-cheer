import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [32, 48, 64, 96, 128, 180, 256],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "utah.christmas" }],
        destination: "https://www.utah.christmas/:path*",
        permanent: true,
      },
      {
        source: "/seasonal-holiday-lighting",
        destination: "/christmas-light-installation/residential",
        permanent: true,
      },
      {
        source: "/commercial-holiday-lighting",
        destination: "/christmas-light-installation/commercial",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=(self)" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
