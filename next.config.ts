import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  experimental: { cpus: 2 },
};
export default nextConfig;
