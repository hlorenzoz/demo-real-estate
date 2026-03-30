import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CRITICAL RESTART TRIGGER - 2026-03-30T14:49:00
  // This changes the config to force a full Next.js/Turbopack runtime restart.
  env: {
    RESTART_ID: "18de5419-2683-4f29-bc32-265489af7436-v4"
  },
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

export default nextConfig;
