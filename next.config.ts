import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://files.stripe.com/links/**")],
  },
  experimental: {
    optimizePackageImports: ["package-name"],
  },
};

export default nextConfig;
