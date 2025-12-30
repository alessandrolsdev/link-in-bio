import type { NextConfig } from "next";

/**
 * Configurações principais do Next.js.
 * Define padrões para otimização de imagens, domínios permitidos e outras opções de build.
 * 
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co', // Imagens da API do Spotify
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // Thumbnails do YouTube
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;