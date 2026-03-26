import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hlorenzoz.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
