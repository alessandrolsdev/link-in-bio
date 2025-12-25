// src/components/CyberCard.tsx
import React from 'react';

interface CyberCardProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  href: string;
}

/**
 * Card com estilo Cyberpunk/Neon.
 * Apresenta um efeito de borda brilhante e gradiente ao passar o mouse.
 * 
 * @param {CyberCardProps} props - Propriedades do card.
 */
export const CyberCard = ({ title, subtitle, icon, href }: CyberCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full block"
    >
      {/* Efeito de Borda Brilhante (Glow Border) */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon via-neon-glow to-neon rounded-xl opacity-0 group-hover:opacity-75 transition duration-500 blur-sm group-hover:blur-md" />

      {/* Container Principal do Card */}
      <div className="relative flex items-center justify-between p-6 bg-surface rounded-xl border border-white/10 group-hover:border-neon/50 transition-colors">

        <div className="flex items-center gap-4">
          {/* Ícone opcional */}
          {icon && <div className="text-neon text-2xl">{icon}</div>}

          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight">
              {title}
            </span>
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest group-hover:text-neon transition-colors">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Indicador de navegação (Seta) */}
        <div className="text-zinc-600 group-hover:text-white transition-transform group-hover:translate-x-1">
          →
        </div>
      </div>
    </a>
  );
};