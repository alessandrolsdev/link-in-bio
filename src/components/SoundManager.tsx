"use client";
import useSound from "use-sound";
import { useEffect } from "react";

export const SoundManager = () => {
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });

  useEffect(() => {
    // Adiciona som a todos os botões e links automaticamente
    const addSoundToElements = () => {
      const elements = document.querySelectorAll("a, button");
      
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => playHover());
        el.addEventListener("click", () => playClick());
      });

      // Cleanup para não duplicar eventos
      return () => {
        elements.forEach((el) => {
          el.removeEventListener("mouseenter", () => playHover());
          el.removeEventListener("click", () => playClick());
        });
      };
    };

    // Roda sempre que a página muda
    const cleanup = addSoundToElements();
    
    // Observer para pegar elementos que aparecem depois (ex: animações)
    const observer = new MutationObserver(addSoundToElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, [playHover, playClick]);

  return null;
};