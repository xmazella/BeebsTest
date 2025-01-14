import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.paris.fr",
        pathname: "/qfapv4/**",
      },
    ],
  },
};

export default nextConfig;
