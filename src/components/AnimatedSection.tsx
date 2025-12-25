"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Wrapper de Animação de Seção.
 * Aplica um efeito suave de entrada (fade-in + slide-up) para os elementos filhos.
 * 
 * @param {Object} props - As propriedades do componente.
 * @param {ReactNode} props.children - O conteúdo a ser animado.
 * @param {number} props.delay - O atraso (em segundos) antes de iniciar a animação.
 */
export const AnimatedSection = ({ children, delay }: { children: ReactNode; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} // Estado inicial: invisível, deslocado para baixo e desfocado
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}   // Estado final: visível, posição original e nítido
      transition={{ duration: 0.7, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }} // Curva de Bezier para suavidade estilo Apple
    >
      {children}
    </motion.div>
  );
};