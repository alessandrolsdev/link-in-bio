"use client";
import { useKonami } from "@/hooks/useKonami";

export const KonamiWrapper = () => {
  useKonami(); // Ativa o hook
  return null; // Não renderiza nada visualmente
};