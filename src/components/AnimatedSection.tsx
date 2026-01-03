"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Propriedades para o componente AnimatedSection.
 */
interface AnimatedSectionProps {
  /** O conteúdo a ser animado. */
  children: ReactNode;
  /** O atraso (em segundos) antes de iniciar a animação. */
  delay: number;
}

/**
 * Wrapper de Animação de Seção.
 * Aplica um efeito suave de entrada (fade-in + slide-up) para os elementos filhos.
 * Utiliza o Framer Motion para controlar a opacidade, posição Y e filtro de desfoque.
 * 
 * @param {AnimatedSectionProps} props - As propriedades do componente.
 */
export const AnimatedSection = ({ children, delay }: AnimatedSectionProps) => {
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