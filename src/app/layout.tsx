import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css"; // <--- SE ESSA LINHA NÃO ESTIVER AQUI, NADA FUNCIONA!

// Configurando as fontes (Clean + Hacker)
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
      <body className={`${inter.variable} ${jetbrains.variable} bg-background text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}