import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,  // Bắt buộc fix lỗi TS
  },
};

export default nextConfig;
