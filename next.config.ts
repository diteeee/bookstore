import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['covers.openlibrary.org', 'i.gr-assets.com'], // include both domains
  },
};

export default nextConfig;
