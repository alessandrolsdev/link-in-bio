"use client";
import { useEffect, useState } from "react";
// Removemos import de useSound pois não é usado aqui, mas no SoundManager
// Se houvesse som aqui, seria mantido.

/**
 * Hook personalizado para detectar o "Konami Code".
 * Sequência: ↑ ↑ ↓ ↓ ← → ← → B A
 * 
 * Ao detectar a sequência correta, ativa o modo "Hacker" (God Mode),
 * alterando classes globais e emitindo um alerta visual.
 * 
 * @returns {boolean} Estado indicando se o modo hacker está ativo.
 */
export const useKonami = () => {
  const [input, setInput] = useState<string[]>([]);
  const [isHackerMode, setIsHackerMode] = useState(false);

  const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];

      // Mantém o histórico apenas com o tamanho da sequência necessária
      if (newInput.length > konamiCode.length) {
        newInput.shift();
      }

      setInput(newInput);

      // Verifica se a sequência bate com o código Konami
      if (JSON.stringify(newInput) === JSON.stringify(konamiCode)) {
        activateHackerMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  const activateHackerMode = () => {
    setIsHackerMode((prev) => !prev);
    // playUnlock();

    // Toggle da classe global para ativar CSS específico
    document.body.classList.toggle("hacker-mode");

    if (!document.body.classList.contains("hacker-mode")) {
      alert("SYSTEM REBOOT: Normal Mode Restored");
    } else {
      alert("ACCESS GRANTED: God Mode Enabled");
    }
  };

  return isHackerMode;
};