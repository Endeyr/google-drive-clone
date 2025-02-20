import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // For ignoring small errors when building
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
