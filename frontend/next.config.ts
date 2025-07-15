import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3001/', 'http://192.168.178.46:3001'],
  images: {
    domains: ['images.pexels.com'],
  },
};

export default nextConfig;
