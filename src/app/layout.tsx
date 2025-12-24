import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Importando os componentes de efeitos visuais
import { CursorTracker } from "@/components/CursorTracker";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { BackgroundOrbs } from "@/components/BackgroundOrbs";
import { SoundManager } from "@/components/SoundManager";
import { CommandMenu } from "@/components/CommandMenu";
import { KonamiWrapper } from "@/components/KonamiWrapper";

// Configurando as fontes
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Alessandro Lima | FullStack Dev",
  description: "Landing Pages de Alta Conversão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${jetbrains.variable} bg-background text-white antialiased overflow-x-hidden`}>

        {/* 1. Rastreia o mouse para o Spotlight */}
        <CursorTracker />
        <SoundManager />
        {/* 2. Textura de grãos (TV antiga) */}
        <NoiseOverlay />

        {/* 3. Orbs de luz flutuando no fundo */}
        <BackgroundOrbs />

        {/* 4. A Grade Cibernética (Do CSS global) */}
        <div className="cyber-grid" />
        <CommandMenu />
        <KonamiWrapper />
        {/* O Conteúdo da página entra aqui */}
        {children}
      </body>
    </html>
  );
}