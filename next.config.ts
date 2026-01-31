import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {hostname:"img.clerk.com"},
      {hostname:"assets.aceternity.com"},
      {hostname:"avatars.githubusercontent.com"}
    ]
  },
  // Optimize routing performance
  experimental: {
    optimizePackageImports: ['@clerk/nextjs', 'framer-motion', 'lucide-react'],
  },
  // Enable faster page transitions
  compress: true,
};

export default nextConfig;