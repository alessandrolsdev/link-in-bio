// src/components/CyberCard.tsx
import React from 'react';

interface CyberCardProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  href: string;
}

export const CyberCard = ({ title, subtitle, icon, href }: CyberCardProps) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full block"
    >
      {/* 1. Borda Brilhante (só aparece no hover) */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon via-neon-glow to-neon rounded-xl opacity-0 group-hover:opacity-75 transition duration-500 blur-sm group-hover:blur-md" />
      
      {/* 2. O Cartão em si */}
      <div className="relative flex items-center justify-between p-6 bg-surface rounded-xl border border-white/10 group-hover:border-neon/50 transition-colors">
        
        <div className="flex items-center gap-4">
          {/* Ícone (se tiver) */}
          {icon && <div className="text-neon text-2xl">{icon}</div>}
          
          <div className="flex flex-col">
            {/* Título Clean */}
            <span className="text-lg font-bold text-white tracking-tight">
              {title}
            </span>
            {/* Subtítulo Tech/Mono */}
            <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest group-hover:text-neon transition-colors">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Seta indicativa */}
        <div className="text-zinc-600 group-hover:text-white transition-transform group-hover:translate-x-1">
          →
        </div>
      </div>
    </a>
  );
};