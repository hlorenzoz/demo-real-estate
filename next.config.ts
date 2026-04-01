import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

const nextConfig: NextConfig = {
  // CRITICAL RESTART TRIGGER - 2026-04-01T07:44:00
  env: {
    RESTART_ID: "18de5419-2683-4f29-bc32-265489af7436-v7",
    SERWIST_SUPPRESS_TURBOPACK_WARNING: "1"
  },
  turbopack: {}, // Silence Next.js TIP for custom builds
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hlorenzoz.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withSerwist(nextConfig);


