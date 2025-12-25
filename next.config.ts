import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // Spotify
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // <--- ADICIONE ISSO AQUI (YouTube)
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;