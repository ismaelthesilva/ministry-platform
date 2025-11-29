import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    return config;
  },
};

export default nextConfig;
