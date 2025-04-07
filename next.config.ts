import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
