import type { NextConfig } from "next";

/** static export للإنتاج فقط — في dev يسمح بمعاينة كل المسارات دون تقييد generateStaticParams */
const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  poweredByHeader: false,
  staticPageGenerationTimeout: 180,
  experimental: {
    staticGenerationMaxConcurrency: 1,
    staticGenerationRetryCount: 5,
    inlineCss: true,
    optimizePackageImports: ["react-markdown"],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  /**
   * static export لا يدعم Image Optimization API — التحسين عند البناء عبر
   * `npm run images:build` و `npm run images:responsive` + srcset في ResponsiveImage.
   */
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
