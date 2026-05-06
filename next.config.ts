import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Uncomment for static export (note: requires removing SSR features like auth callback)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
