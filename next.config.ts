import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; a stray package-lock.json above this repo
  // otherwise makes Turbopack guess wrong.
  turbopack: { root: __dirname },
  /* config options here */
};

export default nextConfig;
