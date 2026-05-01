import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "testing.ijsigma.org",
      },
    ],
  },
};

export default nextConfig;
