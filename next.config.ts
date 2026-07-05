import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rqaxujguywstybvwwfbi.supabase.co",
      },
    ],
  },
};

export default nextConfig;
