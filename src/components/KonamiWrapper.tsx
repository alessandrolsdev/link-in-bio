"use client";
import { useKonami } from "@/hooks/useKonami";

/**
 * Wrapper Lógico para o Easter Egg "Konami Code".
 * Este componente não renderiza nada visualmente, apenas ativa o hook que escuta a sequência de teclas.
 * Quando a sequência (↑ ↑ ↓ ↓ ← → ← → B A) é detectada, o "Modo Hacker" é ativado globalmente.
 */
export const KonamiWrapper = () => {
  useKonami();
  return null;
};