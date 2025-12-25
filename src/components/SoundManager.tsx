"use client";
import useSound from "use-sound";
import { useEffect } from "react";

/**
 * Gerenciador de Efeitos Sonoros (SFX).
 * Adiciona sons de 'hover' e 'click' automaticamente a todos os botões e links da página.
 * Utiliza MutationObserver para garantir que elementos criados dinamicamente também recebam sons.
 */
export const SoundManager = () => {
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });

  useEffect(() => {
    // Função para anexar listeners de som aos elementos interativos
    const addSoundToElements = () => {
      const elements = document.querySelectorAll("a, button");

      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => playHover());
        el.addEventListener("click", () => playClick());
      });

      // Cleanup para evitar listeners duplicados
      return () => {
        elements.forEach((el) => {
          el.removeEventListener("mouseenter", () => playHover());
          el.removeEventListener("click", () => playClick());
        });
      };
    };

    // Executa na montagem inicial
    const cleanup = addSoundToElements();

    // Observa mudanças no DOM para aplicar sons a novos elementos
    const observer = new MutationObserver(addSoundToElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, [playHover, playClick]);

  return null; // Componente lógico, sem renderização visual
};