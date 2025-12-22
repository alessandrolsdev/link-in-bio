import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // O domínio de imagens do Spotify
        port: '',
        pathname: '/image/**', // Permite qualquer caminho de imagem
      },
    ],
  },
};

export default nextConfig;