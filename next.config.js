/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mqhnawmdfocsjmnxzafp.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['192.168.1.49:3000'],
  },
};

module.exports = nextConfig; 