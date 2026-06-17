"use client";
import useSound from "use-sound";
import { useEffect } from "react";

/**
 * Gerenciador de Efeitos Sonoros (SFX).
 * Usa delegação de eventos para tocar sons em elementos interativos
 * sem anexar listeners individuais a cada link ou botão do DOM.
 */
export const SoundManager = () => {
  const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.5 });
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });

  useEffect(() => {
    let hoveredInteractive: Element | null = null;

    const getInteractiveTarget = (target: EventTarget | null): Element | null => {
      if (!(target instanceof Element)) return null;
      return target.closest("a, button");
    };

    const handlePointerOver = (event: PointerEvent) => {
      const interactive = getInteractiveTarget(event.target);
      if (!interactive || interactive === hoveredInteractive) return;

      hoveredInteractive = interactive;
      playHover();
    };

    const handlePointerOut = (event: PointerEvent) => {
      const currentInteractive = getInteractiveTarget(event.target);
      const nextInteractive = getInteractiveTarget(event.relatedTarget);

      if (
        currentInteractive &&
        currentInteractive === hoveredInteractive &&
        currentInteractive !== nextInteractive
      ) {
        hoveredInteractive = null;
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (getInteractiveTarget(event.target)) {
        playClick();
      }
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("click", handleClick);
    };
  }, [playHover, playClick]);

  return null; // Componente lógico, sem renderização visual
};
