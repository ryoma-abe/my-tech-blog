import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "nddoozqljpwizemfnrjm.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb", // 必要に応じて値を変更
    },
  },
};

export default nextConfig;
