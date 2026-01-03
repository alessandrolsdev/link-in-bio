"use client";
import { useKonami } from "@/hooks/useKonami";

/**
 * Wrapper Lógico para o Easter Egg "Konami Code".
 * Este componente não renderiza nada visualmente, apenas ativa o hook que escuta a sequência de teclas.
 * Quando a sequência (↑ ↑ ↓ ↓ ← → ← → B A) é detectada, o "Modo Hacker" é ativado globalmente.
 * Deve ser colocado no nível mais alto possível da árvore de componentes (ex: layout).
 *
 * @returns {null} Componente lógico, sem renderização.
 */
export const KonamiWrapper = () => {
  useKonami();
  return null;
};