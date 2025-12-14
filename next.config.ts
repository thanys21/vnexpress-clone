import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,  // Bắt buộc fix lỗi TS
  },

  images: {
    domains: ['res.cloudinary.com'], // Thêm domain của Cloudinary
  },
};

export default nextConfig;
