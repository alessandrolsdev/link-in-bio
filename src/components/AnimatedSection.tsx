"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const AnimatedSection = ({ children, delay }: { children: ReactNode; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} // Começa invisível, descido e borrado
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} // Fica nítido e sobe
      transition={{ duration: 0.7, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }} // Curva de animação suave (Apple style)
    >
      {children}
    </motion.div>
  );
};