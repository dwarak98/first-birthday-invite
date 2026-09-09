import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: false },
      { source: "/ta", destination: "/?lang=ta", permanent: false },
    ];
  },
};

export default nextConfig;
