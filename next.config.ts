import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // OpenNext on Cloudflare Workers cannot serve `/_next/image` like Vercel; remote fetches
    // from Google CDN/Unsplash/Pexels then fail and the UI shows broken images. Use native
    // <img> URLs so the browser loads assets directly (same as local when optimizer is unused).
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

void import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
