"use client";
import { useEffect } from "react";

/**
 * Rastreador de Cursor (Cursor Tracker).
 * Atualiza variáveis CSS globais (--mouse-x, --mouse-y) conforma o mouse se move.
 * Essencial para efeitos de Spotlight e iluminação dinâmica que dependem da posição do mouse.
 * 
 * @example
 * // No CSS:
 * // background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), ...);
 */
export const CursorTracker = () => {
  useEffect(() => {
    /**
     * Atualiza as variáveis CSS com as coordenadas do mouse.
     * @param {MouseEvent} e - Evento de movimento do mouse.
     */
    const updateMouse = (e: MouseEvent) => {
      document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return null; // Componente lógico sem renderização visual direta
};