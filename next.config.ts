import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/veni-bible/:path*",
        destination: "/venibible/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
