import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://localhost:3000"],
  turbopack: { root: "../../" },
};

export default nextConfig;
