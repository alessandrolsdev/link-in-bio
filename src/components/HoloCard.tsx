"use client"; // Precisa ser Client Component para animação

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const HoloCard = ({ title, subtitle, icon, href, index }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }} // Entrada em cascata
      className="relative block w-full rounded-xl bg-zinc-900/40 border border-white/5 overflow-hidden group"
      style={{ perspective: "1000px" }}
    >
      {/* O Brilho que segue o mouse (Spotlight) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative flex items-center justify-between p-5 z-10 transition-transform duration-200 group-hover:scale-[1.01]">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-white/5 text-neon ring-1 ring-white/10 group-hover:ring-neon/50 transition-all">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-zinc-100">{title}</h3>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-neon transition-colors">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="text-zinc-600 group-hover:translate-x-1 transition-transform">
          →
        </div>
      </div>
    </motion.a>
  );
};