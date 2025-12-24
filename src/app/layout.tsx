import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// --- 1. IMPORTANDO OS EFEITOS VISUAIS E LÓGICOS ---
import { CursorTracker } from "@/components/CursorTracker"; // Rastreia o mouse para o Spotlight
import { NoiseOverlay } from "@/components/NoiseOverlay";   // Textura de TV antiga (Film Grain)
import { BackgroundOrbs } from "@/components/BackgroundOrbs"; // Luzes ambientais flutuantes
import { SoundManager } from "@/components/SoundManager";   // Sistema de Sons (Click/Hover)

// --- 2. IMPORTANDO AS FERRAMENTAS DE INTERATIVIDADE ---
import { CommandMenu } from "@/components/CommandMenu";     // Menu Secreto (Ctrl + K)
import { KonamiWrapper } from "@/components/KonamiWrapper"; // Easter Egg (Konami Code)
import { TerminalModal } from "@/components/TerminalModal"; // Terminal Hacker (Botão Flutuante)
import { MatrixRain } from "@/components/MatrixRain";
// Configurando as fontes (Clean + Hacker)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

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
    url: "https://seu-link-vercel.app", // Coloque seu link final aqui
    title: "Alessandro Lima | FullStack Engineer",
    description: "Interfaces Imersivas & Código Limpo.",
    siteName: "Alessandro Lima Portfolio",
    // images: [ ... ] // A gente pode gerar essa imagem depois
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
        {/* --- CAMADA 1: BACKGROUND & AMBIÊNCIA --- */}
        <div className="cyber-grid" /> {/* Grade Animada (Vem do CSS Global) */}
        <BackgroundOrbs />             {/* Luzes Verdes Flutuantes */}
        <NoiseOverlay />               {/* Textura Granulada */}
        <MatrixRain />                 {/* Efeito Matrix */}
        {/* --- CAMADA 2: LÓGICA INVISÍVEL --- */}
        <CursorTracker />              {/* Atualiza variáveis CSS do mouse */}
        <SoundManager />               {/* Gerencia os sons de UI */}
        <KonamiWrapper />              {/* Escuta o código secreto */}
        

        {/* --- CAMADA 3: INTERFACE GLOBAL --- */}
        <CommandMenu />                {/* O Menu Ctrl+K (Fica escondido até chamar) */}
        
        {/* --- CAMADA 4: O CONTEÚDO DA PÁGINA --- */}
        {children}

        {/* --- CAMADA 5: ELEMENTOS FLUTUANTES (Acima de tudo) --- */}
        <TerminalModal />              {/* O Botão do Terminal no canto */}
        
      </body>
    </html>
  );
}