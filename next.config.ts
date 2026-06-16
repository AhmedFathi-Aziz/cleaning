import type { NextConfig } from "next";

/** static export للإنتاج فقط — في dev يسمح بمعاينة كل المسارات دون تقييد generateStaticParams */
const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  poweredByHeader: false,
  staticPageGenerationTimeout: 180,
  async redirects() {
    if (process.env.NODE_ENV === "production") return [];
    return [
      { source: "/cleaning/:city/:district", destination: "/:city/:district", permanent: true },
      { source: "/jeddah/:path*", destination: "/areas", permanent: true },
      { source: "/dammam/:path*", destination: "/areas", permanent: true },
      { source: "/khobar/:path*", destination: "/areas", permanent: true },
      { source: "/makkah/:path*", destination: "/areas", permanent: true },
      { source: "/madinah/:path*", destination: "/areas", permanent: true },
      { source: "/taif/:path*", destination: "/areas", permanent: true },
      { source: "/abha/:path*", destination: "/areas", permanent: true },
      { source: "/tabuk/:path*", destination: "/areas", permanent: true },
      { source: "/buraydah/:path*", destination: "/areas", permanent: true },
      { source: "/hail/:path*", destination: "/areas", permanent: true },
      { source: "/jazan/:path*", destination: "/areas", permanent: true },
      { source: "/najran/:path*", destination: "/areas", permanent: true },
      { source: "/al-ahsa/:path*", destination: "/areas", permanent: true },
      { source: "/jubail/:path*", destination: "/areas", permanent: true },
    ];
  },
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
