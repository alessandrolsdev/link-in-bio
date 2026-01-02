import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { CursorTracker } from "@/components/CursorTracker";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { SoundManager } from "@/components/SoundManager";

import { CommandMenu } from "@/components/CommandMenu";
import { KonamiWrapper } from "@/components/KonamiWrapper";
import { MatrixRain } from "@/components/MatrixRain";

// Configuração de fontes otimizadas
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

/**
 * Metadados globais da aplicação (SEO padrão).
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  title: {
    default: "Alessandro Lima | FullStack Engineer",
    template: "%s | Alessandro Lima"
  },
  description: "Desenvolvedor FullStack focado em React, Next.js e Interfaces de Alta Performance. Confira meus projetos e setup.",
  keywords: ["FullStack", "Developer", "React", "Next.js", "Portfolio", "Alessandro Lima"],
  authors: [{ name: "Alessandro Lima" }],
  creator: "Alessandro Lima",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seu-link-vercel.app",
    title: "Alessandro Lima | FullStack Engineer",
    description: "Interfaces Imersivas & Código Limpo.",
    siteName: "Alessandro Lima Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Layout Raiz (RootLayout)
 * Envolve toda a aplicação e gerencia providers globais, fontes e elementos de interface persistentes (como background e modais).
 * 
 * Estrutura de Camadas (Layers):
 * 1. Background & Ambiência (Grid, Noise, Matrix)
 * 2. Lógica Invisível (Cursor, Som, Konami)
 * 3. Interface Global (Command Menu)
 * 4. Conteúdo da Página ({children})
 * 5. Elementos Flutuantes (Terminal)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${jetbrains.variable} bg-background text-white antialiased overflow-x-hidden`}
      >
        {/* Camada 1: Background & Ambiência */}
        <div className="cyber-grid" />
        <BackgroundOrbs />
        <NoiseOverlay />
        <MatrixRain />

        {/* Camada 2: Lógica Invisível e Utilitários */}
        <CursorTracker />
        <SoundManager />
        <KonamiWrapper />

        {/* Camada 3: Componentes de Interface Globais */}
        <CommandMenu />

        {/* Camada 4: Conteúdo da Página */}
        {children}

      </body>
    </html>
  );
}