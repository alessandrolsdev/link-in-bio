"use client";
import { motion } from "framer-motion";

/**
 * Componente de Fundo Animado (Orbs).
 * Renderiza esferas de luz difusa que se movem suavemente ao fundo para criar ambiência.
 * Utiliza Framer Motion para animações contínuas e infinitas.
 */
export const BackgroundOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Orb 1 - Canto Superior Esquerdo */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-neon/20 rounded-full blur-[128px]"
      />

      {/* Orb 2 - Canto Inferior Direito */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 -right-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-[128px]"
      />
    </div>
  );
};