import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['covers.openlibrary.org'], // allow Open Library covers
  },
};

export default nextConfig;
