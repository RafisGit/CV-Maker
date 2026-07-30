import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Uncomment for static export (note: requires removing SSR features like auth callback)
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["localhost", "127.0.0.1"],
};

export default nextConfig;
